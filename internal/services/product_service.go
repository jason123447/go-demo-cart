package services

import (
	"github.com/jason123447/go-demo-project/internal/repository"
)

/**
 * @todo 研究錯誤處理
 * @todo 調整mvc架構/naming
 */
func CreateProduct(product repository.Product) error {
	err := repository.CreateProduct(product)
	// if err != nil {
	// 	// log.Printf("Error: " + err.Error())
	// 	panic(err.Error())
	// }
	return err
}
