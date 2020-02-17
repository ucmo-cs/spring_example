package edu.ucmo.spring_example.service;

import edu.ucmo.spring_example.model.Car;
import java.util.List;

public interface CarService {

    Car save(Car user);
    List<Car> findAll();
    void delete(int id);

    List<Car> findByMake(String make);

    Car findById(int id);

    Car update(Car carDto);
}

