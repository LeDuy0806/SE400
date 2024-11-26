package main

import (
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"log"
	"net/http"
	"os"
	"time"
	"todo-list/middleware"
	ginItem "todo-list/modules/item/transport/gin"
)

func main() {
	r := gin.Default()

	r.Use(gin.Logger(), middleware.Recovery())

	// Configure CORS
	r.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization", "Encrypted"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// dsn := os.Getenv("DB_URL")
	dsn := "root:123@tcp(192.168.239.100:3306)/todo_db?charset=utf8mb4&parseTime=True&loc=Local"

	// Set up logger
	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags), // Log writer
		logger.Config{
			LogLevel: logger.Info, // Log level (Info, Warn, Error, Silent)
			// Slow threshold for logging (default is 200ms)
			SlowThreshold:             0,
			IgnoreRecordNotFoundError: true,
			Colorful:                  true,
		},
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: newLogger,
	})
	if err != nil {
		return
	}

	fmt.Println("Connected to database successfully")

	v1 := r.Group("/api")
	{
		items := v1.Group("/items")
		{
			items.POST("", ginItem.CreateItem(db))
			items.GET("", ginItem.ListItems(db))
			items.GET("/:id", ginItem.GetItem(db))
			items.PUT("/:id", ginItem.UpdateItem(db))
			items.DELETE("/:id", ginItem.DeleteItem(db))
		}
	}

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	if err := r.Run(fmt.Sprintf(":8080")); err != nil {
		return
	} // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
