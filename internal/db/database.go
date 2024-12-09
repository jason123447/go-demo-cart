package db

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	/**
	 * host=db
	 * db is the name of the service in docker-compose.yml (docker-compose alias)
	 * use hsot=127.0.0.1 for local development
	 */
	dsn := "host=db user=admin password=admin dbname=go_demo_db port=5432 sslmode=disable TimeZone=Asia/Taipei"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}
	DB = db
}
