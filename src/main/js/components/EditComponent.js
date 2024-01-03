import React from 'react'
import ApiService from "../services/ApiService";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function EditComponent(props) {

    const [id,setId] = useState('');
    const [make,setMake] = useState('');
    const [model,setModel] = useState('');
    const [year,setYear] = useState('');
    const navigate = useNavigate();

    const loadCar = () => {
        ApiService.fetchCarById(window.localStorage.getItem("carId"))
            .then((res) => {
                let car = res.data;
                setId(car.id);
                setMake(car.make);
                setModel(car.model);
                setYear(car.year);
            });
    }

    useEffect(loadCar,[]);

    const onChangeMake = (e) => {
        setMake(e.target.value);
    }

    const onChangeModel = (e) => {
        setModel(e.target.value);
    }

    const onChangeYear = (e) => {
        setYear(e.target.value);
    }

    const validate = () => {
        return year >= 1900 && year <=2020;
    }

    const saveCar = (e) => {
        e.preventDefault();
        let car = {id: id, make: make, model: model, year: year};
        ApiService.editCar(car)
            .then(res => {
                navigate('/');
            });
    }

    return (
        <div>
            <h2 className="text-center">Edit Car</h2>
            <form>

                <div className="form-group">
                    <label>Make:</label>
                    <input placeholder="Make" name="make" className="form-control" value={make} onChange={onChangeMake}/>
                </div>

                <div className="form-group">
                    <label>Model:</label>
                    <input placeholder="Model" name="model" className="form-control" value={model} onChange={onChangeModel}/>
                </div>

                <div className="form-group">
                    <label>Year:</label>
                    <input placeholder="Year" name="year" className="form-control" value={year} onChange={onChangeYear}/>
                    <font color="red">{!validate() ? 'Year Error: Year must be >= 1900 and <=2020' : ""}</font>
                </div>

                <button className="btn btn-success" disabled={!validate()} onClick={saveCar}>Save</button>
            </form>
        </div>
    );
}

export default EditComponent;
