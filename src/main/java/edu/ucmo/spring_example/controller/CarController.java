package edu.ucmo.spring_example.controller;

import edu.ucmo.spring_example.model.Car;
import edu.ucmo.spring_example.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("cars")
public class CarController {

    @Autowired
    private CarService carService;

    @PostMapping
    public Car saveUser(@RequestBody Car car){
        return carService.save(car);
    }

    @GetMapping
    public List<Car> listCser(){
        return carService.findAll();
    }

    @GetMapping("/{id}")
    public Car getOne(@PathVariable int id){
        return carService.findById(id);
    }

    @GetMapping("/make/{make}")
    public List<Car> getOne(@PathVariable String make){
        return carService.findByMake(make);
    }

    @PutMapping("/{id}")
    public Car update(@RequestBody Car car) {
        return carService.update(car);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        carService.delete(id);
     }
}
