package main

import (
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"
	"todo-list/middleware"
	ginItem "todo-list/modules/item/transport/gin"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	// Set gin mode to release if GIN_MODE is set to release in environment variables
	ginMode := os.Getenv("GIN_MODE")
	if ginMode == "release" {
		gin.SetMode(gin.ReleaseMode)
	} else {
		gin.SetMode(gin.DebugMode)
	}

	r := gin.New()

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

	dbConfig := LoadDBConfig()

	dsn := dbConfig.ConnectionString()

	fmt.Println(dsn)
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

	port := os.Getenv("PORT")

	portNum, err := strconv.Atoi(port)
	if err != nil {
		portNum = 8080
	}

	if err := r.Run(fmt.Sprintf(":%d", portNum)); err != nil {
		return
	} // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}

type DBConfig struct {
	User     string
	Password string
	Host     string
	Port     string
	Name     string
}

// LoadDBConfig Function to load database configuration from environment variables
func LoadDBConfig() DBConfig {
	return DBConfig{
		User:     os.Getenv("DB_USER"),
		Password: os.Getenv("DB_PASSWORD"),
		Host:     os.Getenv("DB_HOST"),
		Port:     os.Getenv("DB_PORT"),
		Name:     os.Getenv("DB_NAME"),
	}
}

// ConnectionString Function to generate connection string for database
func (db DBConfig) ConnectionString() string {
	return fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		db.User, db.Password, db.Host, db.Port, db.Name)
}
