package edu.ucmo.spring_example.controller;

import edu.ucmo.spring_example.dao.CarDao;
import edu.ucmo.spring_example.model.Car;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
public class CarControllerTest {
    @Autowired
    private CarController carController;

    @Autowired
    private CarDao carDao;

    @Test
    public void testSaveDelete() {
        Car car = new Car("Rolls Royce", "Silver Shadow", 1965);
        long countBefore = carDao.count();
        car = carController.saveCar(car);
        long countAfter = carDao.count();
        assertNotNull(car.getId());
        assertEquals(countBefore + 1, countAfter);

        Car savedCar = carController.getOne(car.getId());
        assertEquals(car.getYear(), savedCar.getYear());
        assertTrue(car.getMake().equals(savedCar.getMake()));
        assertTrue(car.getModel().equals(savedCar.getModel()));

        carController.delete(car.getId());
        assertEquals(countBefore, carDao.count());
    }

    @Test
    public void testUpdate() {
        Car car = new Car("Rolls Royce", "Silver Shadow", 1965);
        car = carController.saveCar(car);
        assertNotNull(car.getId());

        car.setYear(1966);
        carController.update(car);

        Car savedCar = carController.getOne(car.getId());
        assertEquals(car.getYear()+1, savedCar.getYear());

        carController.delete(car.getId());
    }

}
