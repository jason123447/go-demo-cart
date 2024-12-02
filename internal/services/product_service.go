package services

import (
	"github.com/jason123447/go-demo-project/internal/repository"
)

func CreateProductSvc(product *repository.Product) error {
	err := repository.CreateProduct(product)
	return err
}

/*
@todo pagination
*/
func GetAllProductsSvc() (*[]repository.QueryProduct, error) {
	products, err := repository.GetAllProducts()
	return products, err
}
