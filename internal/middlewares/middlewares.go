package middlewares

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"reflect"
	"runtime/debug"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
	// "github.com/jason123447/go-demo-project/internal/repository"
)

var validate = validator.New()

// ErrorHandlerMiddleware 捕獲錯誤的中介層
func ErrorHandlerMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				log.Printf("\033[0;31m Panic recovered: %v \033[0m \nStack trace:\n%s", err, debug.Stack())
				c.JSON(http.StatusInternalServerError, gin.H{
					"status":  "error",
					"message": "Internal Server Error",
					"details": "An unexpected error occurred",
				})
			}
		}()
		c.Next() // 執行後續的 handler

		// 檢查是否有錯誤
		if len(c.Errors) > 0 {
			for _, e := range c.Errors {
				log.Println(e.Err)
			}
			// 返回統一的錯誤響應格式
			c.JSON(http.StatusInternalServerError, gin.H{
				"status":  "error",
				"message": "Internal Server Error",
				"details": c.Errors.String(),
			})
			return
		}
	}
}

func reflectCopyAny(input any) (any, error) {
	val := reflect.ValueOf(input)
	if val.Kind() != reflect.Ptr {
		return nil, errors.New("input must be a pointer")
	}
	val = val.Elem()
	if val.Kind() != reflect.Struct {
		return nil, errors.New("input must point to a struct")
	}
	copy := reflect.New(val.Type()).Elem()
	copy.Set(val)
	return copy.Addr().Interface(), nil
}

func ValidationMiddleware[T any]() gin.HandlerFunc {
	return func(c *gin.Context) {
		// println(reflect.TypeOf(obj).Kind() == reflect.Pointer)
		// c.ShouldBindWith(obj, binding.FormMultipart)
		var obj T
		if err := c.ShouldBindBodyWith(&obj, binding.JSON); err != nil {
			log.Printf("\033[0;31m Panic recovered: %v \033[0m \nStack trace:\n%s", err, debug.Stack())
			c.JSON(http.StatusBadRequest, gin.H{
				"error":  err.Error(),
				"status": "binding error",
			})
			c.Abort()
			return
		}

		if err := validate.Struct(&obj); err != nil {
			var validationErrors []string
			for _, err := range err.(validator.ValidationErrors) {
				validationErrors = append(validationErrors, err.Error())
			}
			log.Printf("\033[0;31m Panic recovered: %v \033[0m \nStack trace:\n%s", validationErrors, debug.Stack())
			c.JSON(http.StatusBadRequest, gin.H{
				"errors": validationErrors,
				"status": "validtion error",
			})

			c.Abort()
			return
		}
		validated_obj, copyErr := reflectCopyAny(&obj)
		if copyErr != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"status":  "error",
				"message": "Internal Server Error",
				"details": "An unexpected error occurred",
			})
			c.Abort()
			return
		}
		c.Set("validated_obj", validated_obj)
		c.Next()
	}
}

// /* auth */
func HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(hashedPassword), err
}

func CheckPassword(hashedPassword, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}

func GenerateJWT(userID int, secretKey string) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secretKey))
}

func AuthMiddleware(secretKey string) gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Missing token"})
			c.Abort()
			return
		}
		trimPrefixTokenString := strings.TrimPrefix(tokenString, "Bearer ")
		token, err := jwt.Parse(
			trimPrefixTokenString,
			func(token *jwt.Token) (interface{}, error) {
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fmt.Errorf("unexpected signing method")
				}
				return []byte(secretKey), nil
			})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		claims := token.Claims.(jwt.MapClaims)
		c.Set("user_id", int(claims["user_id"].(float64)))
		// c.Set("role", claims["role"].(string))
		c.Next()
	}
}
