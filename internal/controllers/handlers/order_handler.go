package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jason123447/go-demo-project/internal/repository"
	"github.com/jason123447/go-demo-project/internal/services"
	"github.com/jason123447/go-demo-project/internal/utils"
)

func PostOrderHandler(c *gin.Context) {
	order := c.MustGet("validated_obj").(*repository.Order)
	if err := services.CreateOrderSvc(order); err != nil {
		panic(err)
	}
}
func PostOrderWithTransactionHandler(c *gin.Context) {
	order := c.MustGet("validated_obj").(*repository.Order)
	if err := services.CreateOrderWithTransaction(order); err != nil {
		panic(err)
	}
}

/* pagination implement */
func GetOrdersHandler(c *gin.Context) {
	paginator := utils.GeneratePaginator(c)
	userID, _ := c.Get("user_id")

	pagedOrders, err := services.GetOrderPagedSvc(paginator, userID.(int))
	if err != nil {
		panic(err)
	}
	c.JSON(http.StatusOK, pagedOrders)
}
