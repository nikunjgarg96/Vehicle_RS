package com.cognizant.Vehicle_RSservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.cognizant.Vehicle_RSservice.model.Vehicle;

public interface VehicleRepository extends CrudRepository<Vehicle, Integer> {

	Optional<Vehicle> findByName(String string);
	

}
