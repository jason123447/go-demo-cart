package main

import (
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jason123447/go-demo-project/internal/controllers"
	"github.com/jason123447/go-demo-project/internal/db"
	"github.com/jason123447/go-demo-project/internal/middlewares"
)

func main() {
	r := gin.Default()
	r.Use(cors.Default())
	r.Use(middlewares.ErrorHandlerMiddleware())
	db.InitDB()
	// controllers.setControllers(r)
	controllers.SetControllers(r)
	log.Fatal(r.Run(":8081"))
}
