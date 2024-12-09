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
	// 讀取 init.sql 檔案
	// sqlFile, err := os.Open("init.sql")
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// defer sqlFile.Close()

	// sqlBytes, err := ioutil.ReadAll(sqlFile)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	dsn := "postgresql://admin:U4TvHRgMMTsWmG7Po0nWARLNYUgJMzgI@dpg-ctb9mnt2ng1s73dqs990-a/go_demo_db"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}
	DB = db
}
