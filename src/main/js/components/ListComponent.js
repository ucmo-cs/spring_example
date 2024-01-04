import ApiService from "../services/ApiService";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const React = require('react');

function ListComponent(props) {

    const [cars,setCars] = useState([]);
    const [message,setMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        ApiService.fetchCars()
            .then(res => {
                const initCars = res.data;
                setCars(initCars);
            })
    },[]);

    const deleteCar = (carId) => {
        ApiService.deleteCar(carId)
            .then(res => {
                setMessage('Car deleted successfully.');
                setCars(cars.filter(car => car.id !== carId));
            })

    }

    const editCar = (id) => {
        window.localStorage.setItem("carId", id);
        navigate('/edit');
    }

    const addCar = () => {
        window.localStorage.removeItem("carId");
        navigate('/add');
    }
    
    return (
        <div>
            <h2 className="text-center">Car Details</h2>
            <button className="btn btn-danger" onClick={() => addCar()}> Add Car</button>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Year</th>
                </tr>
                </thead>
                <tbody>
                {
                    cars.map(
                        car =>
                            <tr key={car.id}>
                                <td>{car.id}</td>
                                <td>{car.make}</td>
                                <td>{car.model}</td>
                                <td>{car.year}</td>
                                <td>
                                    <button className="btn btn-success" onClick={() => deleteCar(car.id)}> Delete</button>
                                    <button className="btn btn-success" onClick={() => editCar(car.id)}> Edit</button>
                                </td>
                            </tr> )
                }
                </tbody>
            </table>
        </div>
    )
}

export default ListComponent;
