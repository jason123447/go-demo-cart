package services

import (
	"github.com/jason123447/go-demo-project/internal/repository"
)

func CreateProductSvc(product *repository.Product) error {
	err := repository.CreateProduct(product)
	return err
}
