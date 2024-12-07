package services

import (
	"errors"

	"github.com/jason123447/go-demo-project/internal/db"
	"github.com/jason123447/go-demo-project/internal/repository"
	"github.com/jason123447/go-demo-project/internal/utils"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
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
	// for _, o := range *orders {
	// 	println(o.CreatedAt.String())
	// }
	var res = &utils.PagedResponse[repository.Order]{
		Paginator: paginator,
		Data:      orders,
	}
	return res, err
}

func CreateOrderWithTransaction(order *repository.Order) error {
	database := db.DB
	err := database.Transaction(func(tx *gorm.DB) error {
		for _, item := range order.OrderItems {
			var product repository.Product

			// Query product stock
			if err := tx.Clauses(clause.Locking{Strength: "UPDATE"}).
				Where("id = ?", item.ProductId).First(&product).Error; err != nil {
				return errors.New("Product not found")
			}

			// 檢查庫存
			if product.Stock < int32(item.Quantity) {
				return errors.New("Insufficient stock for product ID: " + string(rune(item.ProductId)))
			}

			// 更新庫存
			product.Stock -= int32(item.Quantity)
			if err := tx.Save(&product).Error; err != nil {
				return errors.New("failed to update stock")
			}
		}

		// create order
		order.Status = repository.OrderStatus_Pending
		println(order.CreatedAt.String())
		if err := tx.Create(order).Error; err != nil {
			return errors.New(("failed to create order"))
		}
		println(order.CreatedAt.String())

		return nil
	})
	return err
}
