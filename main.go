package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/jason123447/go-demo-project/internal/controllers"
	"github.com/jason123447/go-demo-project/internal/db"
	"github.com/jason123447/go-demo-project/internal/middlewares"
)

func main() {
	db.InitDB()
	r := gin.Default()
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, enctype, Origin")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})
	// r.Use(cors.Default())
	r.Use(middlewares.ErrorHandlerMiddleware())
	// controllers.setControllers(r)
	controllers.SetControllers(r)
	log.Fatal(r.Run(":8081"))
}
