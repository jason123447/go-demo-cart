package handlers

import (
	"net/http"

	// "runtime/debug"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/jason123447/go-demo-project/internal/repository"
	"github.com/jason123447/go-demo-project/internal/services"
)

func PostProductHandler(c *gin.Context) {
	var product repository.Product
	if err := c.ShouldBindBodyWith(&product, binding.JSON); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	services.CreateProductSvc(product)
}
