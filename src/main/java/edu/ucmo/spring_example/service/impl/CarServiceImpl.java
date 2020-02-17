package edu.ucmo.spring_example.service.impl;

import edu.ucmo.spring_example.dao.CarDao;
import edu.ucmo.spring_example.model.Car;
import edu.ucmo.spring_example.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Transactional
@Service(value = "carService")
public class CarServiceImpl implements CarService {

    @Autowired
    private CarDao carDao;

    public List<Car> findAll() {
        List<Car> list = new ArrayList<>();
        carDao.findAll().iterator().forEachRemaining(list::add);
        return list;
    }

    @Override
    public void delete(int id) {
        carDao.deleteById(id);
    }

    @Override
    public Car findById(int id) {
        Optional<Car> optionalCar = carDao.findById(id);
        return optionalCar.isPresent() ? optionalCar.get() : null;
        }

    @Override
    public List<Car> findByMake(String make) {
        return carDao.findByMake(make);
    }

    @Override
    public Car update(Car carUpdate) {
        Car car = findById(carUpdate.getId());
        if(car != null) {
            carDao.save(carUpdate);
        }
        return carUpdate;
    }

    @Override
    public Car save(Car car) {
        Car newCar = new Car(car.getMake(), car.getModel(), car.getYear());
        return carDao.save(newCar);
    }
}
