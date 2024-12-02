package repository

import (
	"time"

	"github.com/jason123447/go-demo-project/internal/db"
)

type Product struct {
	ID          int       `json:"id" gorm:"primary_key" validate:"-"`
	Name        string    `json:"name" validate:"-"`
	Description string    `json:"description" validate:"-"`
	Price       float64   `json:"price" validate:"gt=0"`
	Stock       int32     `json:"stock" validate:"min=0"`
	CreatedAt   time.Time `json:"created_at" validate:"-"`
}

// curl -v -X POST http://localhost:8081/product \
//
//	-H "Content-Type: application/json" \
//		-d '{
//		  "name": "Sample Product",
//		  "price": 99.99,
//		  "stock": 10
//		}'
func CreateProduct(product *Product) error {
	database := db.DB
	result := database.Create(&product)
	return result.Error
}
