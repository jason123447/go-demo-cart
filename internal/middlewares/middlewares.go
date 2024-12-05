package middlewares

import (
	"errors"
	"log"
	"net/http"
	"reflect"
	"runtime/debug"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
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
