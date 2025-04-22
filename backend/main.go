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
	r.POST("/register", registerUser)
	r.GET("/users", getUsers)
	r.GET("/driver/rides", getDriverRides)
	r.GET("/getUser", getUserByID)
	r.GET("/user/rides", getRiderRides)
	r.POST("/addRider", addRiderToRide)
	r.GET("ride/hasRider", isRiderInRide)
	r.DELETE("/ride/cancel", cancelRideForRider)
	r.DELETE("driver/cancel", deleteDriverRide)
	r.Run("localhost:8080")
}
