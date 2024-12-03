package repository

import (
	"time"

	"github.com/jason123447/go-demo-project/internal/db"
)

type OrderStatus string

const (
	Pending OrderStatus = "Pending"
	Done    OrderStatus = "Done"
)

type OrderItem struct {
	ID        int     `json:"id" gorm:"primary_key"`
	OrderID   int     `json:"order_id"`
	ProductId int     `json:"product_id"`
	Quantity  int     `json:"quantity"`
	Price     float64 `json:"price"`
}

type Order struct {
	ID         int         `json:"id" gorm:"primary_key"`
	UserID     int         `json:"user_id"`
	Status     OrderStatus `json:"status"`
	Total      float64     `json:"total" validate:"gt=0"`
	CreatedAt  time.Time   `json:"created_at" validate:"-"`
	OrderItems []OrderItem `json:"order_items" gorm:"foreignKey:OrderID"`
}

func CreateOrder(order *Order) error {
	database := db.DB
	result := database.Create(order)
	return result.Error
}
