package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/jason123447/go-demo-project/internal/controllers/handlers"
	"github.com/jason123447/go-demo-project/internal/middlewares"
	"github.com/jason123447/go-demo-project/internal/repository"
)

func SetControllers(r *gin.Engine) {
	r.GET("/user/:id", handlers.GetUserHandler)
	r.POST("/product", middlewares.ValidationMiddleware(&repository.Product{}), handlers.PostProductHandler)
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
