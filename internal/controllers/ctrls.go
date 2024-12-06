package controllers

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/jason123447/go-demo-project/internal/controllers/handlers"
	"github.com/jason123447/go-demo-project/internal/db"
	"github.com/jason123447/go-demo-project/internal/middlewares"
	"github.com/jason123447/go-demo-project/internal/repository"
)

/*
shared private key: sPeL1/7t2FkhWjE6rjpeM1mmyJy7uMWFj57ky+7Y0G0=
@todo use secure configutaion replace
*/
var secretKey = "sPeL1/7t2FkhWjE6rjpeM1mmyJy7uMWFj57ky+7Y0G0="

func SetControllers(r *gin.Engine) {

	// println(middlewares.HashPassword("123456"))
	r.POST("/login", func(c *gin.Context) {
		var user repository.User
		if err := c.ShouldBindBodyWithJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid data"})
		}
		originPwd := user.Password
		database := db.DB
		result := database.Model(repository.User{}).Select("id, email, password_hash").Where("email = ?", user.Email).Find((&user))
		if result.Error != nil || result.RowsAffected == 0 {
			c.JSON(http.StatusNotFound, gin.H{"error": "Can't find this account"})
			c.Abort()
			return
		}
		if err := middlewares.CheckPassword(user.PassWordHash, originPwd); err != nil {
			c.JSON(http.StatusForbidden, gin.H{"error": "wrong password"})
			c.Abort()
			return
		}
		if token, err := middlewares.GenerateJWT(user.ID, secretKey); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Unexcepted error"})
			c.Abort()
			return
		} else {
			user.JwtToken = token
			user.Password = ""
			user.PassWordHash = ""
			c.JSON(http.StatusOK, user)
		}
	})
	r.GET("/user/:id", handlers.GetUserHandler)
	r.POST("/product", middlewares.ValidationMiddleware[repository.Product](), handlers.PostProductHandler)
	r.PUT("/product", middlewares.ValidationMiddleware[repository.Product](), handlers.PutProductHandler)
	r.GET("/product/img/:id", handlers.GetProductImgHandler)
	r.GET("/products", handlers.GetProductsHandler)

	// authRoute := r.Group("/auth")
	// authRoute.POST("/order", middlewares.ValidationMiddleware[repository.Order](), handlers.PostOrderHandler)

	r.POST("/order", middlewares.ValidationMiddleware[repository.Order](), handlers.PostOrderHandler)

	r.GET("/orders", middlewares.AuthMiddleware(secretKey), handlers.GetOrdersHandler)
	r.GET("/research", func(c *gin.Context) {
		img := c.DefaultQuery("img", "true")
		param := c.Query("param")
		println(img, param)
		var stringBuilder strings.Builder
		stringBuilder.WriteString(img)
		stringBuilder.WriteString(" - ")
		stringBuilder.WriteString(param)
		c.Writer.Write([]byte(stringBuilder.String()))
	})
}

// type Controller struct {
//     Ct        *gin.Context
//     Data      map[interface{}]interface{}
//     ChildName string
// }

// type ControllerInterface interface {
// 	// Init(ct *gin.Context, cn string) //初始化上下文和子類別名稱稱
// 	Prepare()      //開始執行之前的一些處理
// 	Get()          //method=GET 的處理
// 	Post()         //method=POST 的處理
// 	Delete()       //method=DELETE 的處理
// 	Put()          //method=PUT 的處理
// 	Head()         //method=HEAD 的處理
// 	Patch()        //method=PATCH 的處理
// 	Options()      //method=OPTIONS 的處理
// 	Finish()       //執行完成之後的處理
// 	Render() error //執行完 method 對應的方法之後渲染頁面
// }
