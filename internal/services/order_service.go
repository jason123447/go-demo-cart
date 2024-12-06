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

func GetOrderPagedSvc(paginator *utils.Paginator, userID int) (*utils.PagedResponse[repository.Order], error) {
	database := db.DB

	database.Model(&repository.Order{}).Where("user_id = ?", userID).Count(&paginator.Total)
	database = database.Scopes(paginator.GormPagination())

	orders, err := repository.GetOrdersPaged(database, userID)
	var res = &utils.PagedResponse[repository.Order]{
		Paginator: paginator,
		Data:      orders,
	}
	return res, err
}
