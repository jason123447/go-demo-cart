// internal/repository/user_repository.go
package repository

import (
	"github.com/jason123447/go-demo-project/internal/db"
)

type User struct {
	ID       string
	Username string
}

func GetUserByID(id string) (*User, error) {
	database := db.DB
	var user User
	result := database.First(&user, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &user, nil
	// var user User
	// err := database.QueryRow("SELECT id, name FROM users WHERE id = $1", id).Scan(&user.ID, &user.Name)
	// if err == sql.ErrNoRows {
	//     return nil, nil
	// }
	// if err != nil {
	//     return nil, err
	// }
	// return &user, nil
}
