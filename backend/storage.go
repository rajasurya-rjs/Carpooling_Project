package main


func load() ([]Ride, error) {
	var rides []Ride

	if err := DB.Find(&rides).Error; err != nil {
		return nil, err
	}

	return rides, nil

}

func save(ride *Ride) error {
	if err := DB.Create(&ride).Error; err != nil {
		return err
	}
	return nil
}

func saveUser(user *User) error {
	if err := DB.Create(user).Error; err != nil {
		return err
	}
	return nil
}

func loadUsers() ([]User, error) {
	var users []User

	if err := DB.Find(&users).Error; err != nil {
		return nil, err
	}
	
	return users, nil

}

