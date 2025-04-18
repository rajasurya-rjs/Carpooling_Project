package main

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
)

type Ride struct {
	ID          uint          `gorm:"primaryKey" json:"id"`
	Origin      string        `json:"from"`
	Destination string        `json:"to"`
	Date        string        `json:"time"`
	Seats       int           `json:"seats"`
	Price       int           `json:"price"`
	DriverID    uint          `json:"driver_id"`
	RiderIDs    pq.Int64Array `gorm:"type:integer[]" json:"rider_ids"` // using PostgreSQL array support
	CreatedAt   time.Time
	UpdatedAt   time.Time
}

func getRides(c *gin.Context) { // for debuggin purposes
	data, err := load()

	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"Message": "Could not read the file"})
		return
	}

	if len(data) == 0 {
		c.IndentedJSON(http.StatusOK, gin.H{
			"rides":   []Ride{},
			"message": "No Rides Available",
		})
		return
	}

	c.IndentedJSON(http.StatusOK, &data)
}

func addRide(c *gin.Context) {
	var newRide Ride
	if err := c.BindJSON(&newRide); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		fmt.Printf("Error binding JSON: %v\n", err)
		return
	}

	newRide.RiderIDs = []int64{}

	if err := save(&newRide); err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"message": "couldn't save ride"})
		return
	}

	c.IndentedJSON(http.StatusCreated, gin.H{
		"status":  "success",
		"message": "Ride added successfully",
		"Ride":    newRide,
	})

}

func filterRides(c *gin.Context) {
	from := c.Query("from")
	to := c.Query("to")
	dateStr := c.Query("date")

	if from == "" || to == "" || dateStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Missing required query parameters: 'from', 'to', and 'date' are required",
		})
		return
	}

	queryDate, err := time.Parse("2006-01-02", dateStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid date format. Use YYYY-MM-DD",
		})
		return
	}

	var rides []Ride

	err = DB.Where("origin = ? AND destination = ? AND DATE(date) = ?", from, to, queryDate.Format("2006-01-02")).Find(&rides).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Database query failed",
		})
		return
	}

	if len(rides) == 0 {
		c.JSON(http.StatusOK, gin.H{
			"rides":   []Ride{}, // Include an empty rides array
			"message": "No rides found matching the criteria",
		})
		return
	}

	c.IndentedJSON(http.StatusOK, rides)
}

//Driver Rides

func getDriverRides(c *gin.Context) {
	driverIDparam := c.Query("driverId")

	if driverIDparam == "" {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Missing driverID query parameter"})
		return
	}

	driverID, err := strconv.Atoi(driverIDparam) 
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Invalid driverID format"})
		return
	}

	var rides []Ride

	if err := DB.Where("driver_id = ?", driverID).Find(&rides).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Database query failed"})
		return
	}

	if len(rides) == 0 {
		c.JSON(http.StatusOK, gin.H{
			"rides":   []Ride{},
			"message": "No upcoming rides for this driver",
		})
		return
	}

	c.IndentedJSON(http.StatusOK, rides)
}
