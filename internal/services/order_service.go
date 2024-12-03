package services

import "github.com/jason123447/go-demo-project/internal/repository"

func CreateOrderSvc(order *repository.Order) error {
	err := repository.CreateOrder(order)
	return err
}
