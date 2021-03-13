// Test variables to make sure that API has been called and with the input
// values we expect.
export let listCount = 0;
export let getCount = 0;
export let deleteCount = 0;
export let addCount = 0;
export let editCount = 0;
export let addInput = undefined;
export let editInput = undefined;

class ApiService {
    fetchCars() {
        listCount += 1;
        const carList = {
                data:
                    [
                        { id:1, make:"Ford",  model:"Mustang", year:1998 },
                        { id:2, make:"Honda", model:"CRV",     year:2018 }
                    ]
        };
        return new Promise((resolve) => { resolve(carList) });
    }

    fetchCarById(carId) {
        getCount += 1;
        const getList = {
                data: {id: carId, make: "Ford", model: "Mustang", year: 1998}
        };
        return new Promise((resolve) => { resolve(getList) });
    }

    deleteCar(carId) {
        deleteCount += 1;
        const deleteList = {
                data: {id: 1, make: "Ford", model: "Mustang", year: 1998}
        };
        return new Promise((resolve) => { resolve(deleteList) });
    }

    addCar(car) {
        addCount += 1;
        addInput = car;
        const addList = {
                data:  car
        };
        return new Promise((resolve) => { resolve(addList) });
    }

    editCar(car) {
        editCount += 1;
        editInput = car;
        const editList = {
                data:  car
        };
        return new Promise((resolve) => { resolve(editList) });
    }

 }

export default new ApiService();