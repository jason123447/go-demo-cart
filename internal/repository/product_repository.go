package repository

import (
	"time"

	"github.com/jason123447/go-demo-project/internal/db"
)

type Product struct {
	ID          int       `json:"id" gorm:"primary_key"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Price       float32   `json:"price"`
	Stock       int32     `json:"stock"`
	CreatedAt   time.Time `json:"created_at"`
}

// curl -v -X POST http://localhost:8081/product \
// -H "Content-Type: application/json" \
//
//	-d '{
//	  "name": "Sample Product",
//	  "price": 99.99,
//	  "stock": 10
//	}'
func CreateProduct(product Product) error {
	database := db.DB
	result := database.Create(&product)
	return result.Error
}
