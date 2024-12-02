package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jason123447/go-demo-project/internal/services"
)

func GetUserHandler(c *gin.Context) {
	userID := c.Param("id")
	services.GetUserByID(userID)
	user, err := services.GetUserByID(userID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
	c.JSON(http.StatusOK, user)
}
