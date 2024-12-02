package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jason123447/go-demo-project/internal/repository"
	"github.com/jason123447/go-demo-project/internal/services"
)

// func PostProductHandler(c *gin.Context) {
// 	var product repository.Product
// 	if err := c.ShouldBindBodyWith(&product, binding.JSON); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	// validator.New() is designed to be thread-safe and used as a singleton instance.
// 	validate := validator.New()
// 	if err := validate.Struct(product); err != nil {
// 		var validationErrors []string
// 		for _, err := range err.(validator.ValidationErrors) {
// 			validationErrors = append(validationErrors, err.Error())
// 		}
// 		c.JSON(http.StatusBadRequest, gin.H{"errors": validationErrors})
// 		return
// 	}
// 	services.CreateProductSvc(product)
// }

func PostProductHandler(c *gin.Context) {
	product := c.MustGet("validated_obj").(*repository.Product)
	if err := services.CreateProductSvc(product); err != nil {
		panic(err)
	}
}

func GetProductsHandler(c *gin.Context) {
	products, err := services.GetAllProductsSvc()
	if err != nil {
		panic(err)
	}
	c.JSON(http.StatusOK, products)
}
