package services

import (
	"github.com/jason123447/go-demo-project/internal/db"
	"github.com/jason123447/go-demo-project/internal/repository"
	"github.com/jason123447/go-demo-project/internal/utils"
)

func CreateOrderSvc(order *repository.Order) error {
	err := repository.CreateOrder(order)
	return err
}

func GetOrderPagedSvc(paginator *utils.Paginator, userID int) (*[]repository.Order, error) {
	database := db.DB
	database = database.Scopes(paginator.GormPagination())
	orders, err := repository.GetOrdersPaged(database, userID)
	return orders, err
}
