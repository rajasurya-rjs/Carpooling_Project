package main


func load() ([]Ride, error) {
	var rides []Ride

	if err := DB.Find(&rides).Error; err != nil {
		return nil, err
	}

	return rides, nil

}

func save(ride Ride) error {
	if err := DB.Create(&ride).Error; err != nil {
		return err
	}
	return nil
}
