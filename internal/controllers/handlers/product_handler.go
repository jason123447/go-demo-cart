package handlers

import (
	"net/http"
	"strconv"

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

func PutProductHandler(c *gin.Context) {
	product := c.MustGet("validated_obj").(*repository.Product)
	if err := services.UpdateProductSvc(product); err != nil {
		panic(err)
	}
}

func GetProductImgHandler(c *gin.Context) {
	productID, _ := strconv.Atoi((c.Param("id")))
	base64Str, err := services.GetProductImgSvc(productID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"id": productID, "img": base64Str})
	// c.JSON(http.StatusOK, repository.Product{ID: productID, Img: base64Str})
}

func GetProductsByIdsHandler(c *gin.Context) {
	ids := c.QueryArray("ids")
	var productIDs []int
	for _, id := range ids {
		intID, _ := strconv.Atoi(id)
		productIDs = append(productIDs, intID)
	}
	product, err := services.GetProductById(productIDs)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
		return
	}
	c.JSON(http.StatusOK, product)
}
