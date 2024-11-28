// internal/services/user_service.go
package services

import (
	"github.com/jason123447/go-demo-project/internal/repository"
)

// func GetUserByID(id string) (*repository.User, error) {
// 	user, err := repository.GetUserByID(id)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return user, nil
// }

func GetUserByID(id string) (*repository.User, error) {
	user, err := repository.GetUserByID(id)
	if err != nil {
		return nil, err
	}
	return user, nil
}
