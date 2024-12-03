package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/jason123447/go-demo-project/internal/repository"
	"github.com/jason123447/go-demo-project/internal/services"
)

func PostOrderHandler(c *gin.Context) {
	order := c.MustGet("validated_obj").(*repository.Order)
	if err := services.CreateOrderSvc(order); err != nil {
		panic(err)
	}
}
