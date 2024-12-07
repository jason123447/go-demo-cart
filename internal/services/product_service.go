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

func UpdateProductSvc(product *repository.Product) error {
	err := repository.UpdateProduct(product)
	return err
}

func GetProductImgSvc(id int) (string, error) {
	product, err := repository.GetProductById(id)
	return product.Img, err
}

func GetProductById(ids []int) (*[]repository.Product, error) {
	products, err := repository.GetProductsByIds(ids)
	return products, err
}
