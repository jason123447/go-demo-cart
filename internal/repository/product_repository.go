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
	Img         string    `json:"img" validate:"-"`
}

type QueryProduct struct {
	ID          int     `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	Stock       int32   `json:"stock"`
	Img         string  `json:"img" validate:"-"`
}

//	curl -v -X POST http://localhost:8081/product \
//		-H "Content-Type: application/json" \
//			-d '{
//			  "name": "Sample Product",
//			  "price": 99.99,
//			  "stock": 10
//			}'
func CreateProduct(product *Product) error {
	database := db.DB
	result := database.Create(&product)
	return result.Error
}

func GetAllProducts() (*[]QueryProduct, error) {
	database := db.DB
	var products []QueryProduct
	result := database.Model(Product{}).Order("id ASC").Find(&products)
	return &products, result.Error
}

// func GetAllProducts() (*[]QueryProduct, error) {
// 	database := db.DB
// 	var products []QueryProduct
// 	columns := []string{"id", "name", "description", "price", "stock", "img"}
// 	result := database.Model(&Product{}).Select(columns).Order("id ASC").Find(&products)
// 	return &products, result.Error
// }

func UpdateProduct(product *Product) error {
	database := db.DB
	return database.Model((Product{})).Where("id = ?", product.ID).Updates(&product).Error
}

func GetProductById(id int) (*Product, error) {
	database := db.DB
	var product Product
	result := database.First(&product, id)
	return &product, result.Error
}
