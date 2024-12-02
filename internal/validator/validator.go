package validator

import "github.com/go-playground/validator/v10"

var Validator = validator.New()

// package validator

// import (
// 	"sync"

// 	"github.com/go-playground/validator/v10"
// )

// var (
// 	instance *validator.Validate
// 	once     sync.Once
// )

// func GetValidator() *validator.Validate {
// 	once.Do(func() {
// 		instance = validator.New()
// 	})
// 	return instance
// }
