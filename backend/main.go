package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	InitDB()
	r := gin.Default()

	r.Use(cors.Default())

	r.GET("/rides", getRides)
	r.POST("/add", addRide)
	r.GET("/rides/filter", filterRides)
	r.Run("localhost:8080")
}
