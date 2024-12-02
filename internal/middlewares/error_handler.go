package middlewares

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

// ErrorHandlerMiddleware 捕獲錯誤的中介層
func ErrorHandlerMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 設定一個狀態碼變數
		c.Next() // 執行後續的 handler

		// 檢查是否有錯誤
		if len(c.Errors) > 0 {
			for _, e := range c.Errors {
				log.Println(e.Err)
			}
			// 返回統一的錯誤響應格式
			c.JSON(http.StatusInternalServerError, gin.H{
				"status":  "error",
				"message": "Internal Server Error",
				"details": c.Errors.String(),
			})
			return
		}
	}
}
