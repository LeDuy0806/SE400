package main

import (
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestPingRoute(t *testing.T) {
	// Setup gin in test mode
	gin.SetMode(gin.TestMode)

	// Initialize the router
	r := gin.Default()

	// Define /ping route
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	// Create a new HTTP request to the /ping route
	req, _ := http.NewRequest(http.MethodGet, "/ping", nil)

	// Create a response recorder to record the response
	w := httptest.NewRecorder()

	// Serve the HTTP request
	r.ServeHTTP(w, req)

	// Check if the response code is 200 OK
	assert.Equal(t, http.StatusOK, w.Code)

	// Check if the response body contains the expected JSON
	expected := `{"message":"pong"}`
	assert.JSONEq(t, expected, w.Body.String())
}
