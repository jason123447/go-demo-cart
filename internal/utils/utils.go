package utils

import (
	"errors"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Paginator struct {
	Total    int64 `json:"total"`
	PageSize int   `json:"page_size"`
	Offset   int   `json:"offset"`
	Page     int   `json:"page"`
}

type PagedResponse[T any] struct {
	*Paginator
	Data *[]T `json:"data"`
}

func GeneratePaginator(c *gin.Context) *Paginator {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	pageSize, _ := strconv.Atoi(c.DefaultQuery("page_size", "10"))
	paginator := &Paginator{Page: page, PageSize: pageSize}
	PaginatorHandler(paginator)
	return paginator
}

/* Set default value to paginator */
func PaginatorHandler(paginator *Paginator) error {
	if paginator == nil {
		return errors.New("[paginator] 輸入錯誤")
	}
	if paginator.PageSize <= 0 {
		paginator.PageSize = 10
	}
	if (paginator.Page) <= 0 {
		paginator.Offset = 0
	} else if paginator.Page > 0 {
		paginator.Offset = (paginator.Page - 1) * paginator.PageSize
	}
	return nil
}

func (p *Paginator) GormPagination() func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Offset(p.Offset).Limit(p.PageSize)
	}
}
