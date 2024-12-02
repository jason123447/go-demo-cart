// internal/repository/user_repository.go
package repository

import (
	"github.com/jason123447/go-demo-project/internal/db"
)

type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
}

func GetUserByID(id int) (*User, error) {
	database := db.DB
	var user User
	result := database.First(&user, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &user, nil
}
