package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/jason123447/go-demo-project/internal/repository"
	"github.com/jason123447/go-demo-project/internal/services"
)

// func GetUserHandler(c *gin.Context) {
// 	userID := c.Param("id")
// 	services.GetUserByID(userID)
// 	user, err := services.GetUserByID(userID)
// 	if err != nil {
// 		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
// 		return
// 	}
// 	c.JSON(http.StatusOK, user)
// }

func CreateProductHandler(c *gin.Context) {
	var product repository.Product
	if err := c.ShouldBindBodyWith(&product, binding.JSON); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	services.CreateProduct(product)
}
