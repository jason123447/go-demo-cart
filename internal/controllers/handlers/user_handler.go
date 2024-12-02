package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jason123447/go-demo-project/internal/services"
)

func GetUserHandler(c *gin.Context) {
	userID, _ := strconv.Atoi(c.Param("id"))
	services.GetUserSvc(userID)
	user, err := services.GetUserSvc(userID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
	c.JSON(http.StatusOK, user)
}
