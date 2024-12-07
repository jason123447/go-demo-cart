// internal/repository/user_repository.go
package repository

import (
	"github.com/jason123447/go-demo-project/internal/db"
)

type User struct {
	ID           int    `json:"id"`
	Username     string `json:"username"`
	Email        string `json:"email"`
	Password     string `json:"password" gorm:"-"`
	JwtToken     string `json:"jwtToken" gorm:"-"`
	PassWordHash string `json:"password_hash" gorm:"column:password_hash"`
}

func GetUserByID(id int) (*User, error) {
	database := db.DB
	var user User
	result := database.First(&user, id)
	// println(database.ToSQL(func(tx *gorm.DB) *gorm.DB {
	// 	return tx.First(&user, id)
	// }))
	if result.Error != nil {
		return nil, result.Error
	}
	return &user, nil
}

// func GetUserByEmail()
