package repository

import (
	"time"

	"github.com/jason123447/go-demo-project/internal/db"
	"gorm.io/gorm"
)

type ORDERSTATUS string

const (
	OrderStatus_Pending  ORDERSTATUS = "Pending"
	OrderStatus_Done     ORDERSTATUS = "Done"
	OrderStatus_Canceled ORDERSTATUS = "Canceled"
)

// type STATUS string

// const (
// 	OrderStatus_Pending ORDERSTATUS = "Pending"
// 	OrderStatus_Done    ORDERSTATUS = "Done"
// )

type OrderItem struct {
	ID        int     `json:"id" gorm:"primary_key"`
	OrderID   int     `json:"order_id"`
	ProductId int     `json:"product_id"`
	Quantity  int     `json:"quantity"`
	Price     float64 `json:"price"`
	// Product   Product `json:"product" gorm:"foreignKey:ID;references:ProductId"`
}

type Order struct {
	ID     int         `json:"id" gorm:"primary_key"`
	UserID int         `json:"user_id"`
	Status ORDERSTATUS `json:"status"`
	Total  float64     `json:"total"`
	/*
		https://github.com/go-gorm/gorm/issues/4834
		gorm Create和Find的時區會不同 應該可以用gorm.Callback().Create().Before("gorm:create").Register("set_created_at", )處理
	*/
	CreatedAt  time.Time   `json:"created_at" validate:"-" gorm:"type:timestamp"`
	OrderItems []OrderItem `json:"order_items" gorm:"foreignKey:OrderID"`
	// gorm:"type:timestamp"
	// PrimaryKey_ID int `json:"id" gorm:"primary_key"`
	// OrderItems []OrderItem `json:"order_items" gorm:"foreignKey:OrderID;references:PrimaryKey_ID"`
}

func CreateOrder(order *Order) error {
	database := db.DB
	order.Status = OrderStatus_Pending
	result := database.Create(order)
	return result.Error
}

func GetOrdersPaged(db *gorm.DB, userID int) (*[]Order, error) {
	var orders []Order
	result := db.Preload("OrderItems").Where("user_id = ?", userID).Order("id ASC").Find(&orders)
	// result := db.Preload("OrderItems").Preload("OrderItems.Product").Where("user_id = ?", userID).Order("id ASC").Find(&orders)
	// db.Where("user_id = ?", userID).Find(&orders)
	return &orders, result.Error
}
