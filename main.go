package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/jason123447/go-demo-project/internal/controllers"
	"github.com/jason123447/go-demo-project/internal/db"
)

func main() {
	r := gin.Default()
	db.InitDB()
	// controllers.setControllers(r)
	controllers.SetControllers(r)
	log.Fatal(r.Run(":8081"))
}
