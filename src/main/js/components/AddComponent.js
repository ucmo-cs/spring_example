import React from 'react'
import ApiService from "../services/ApiService";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function AddComponent(props) {

    const [make,setMake] = useState('');
    const [model,setModel] = useState('');
    const [year,setYear] = useState('');
    const [message,setMessage] = useState('');
    const navigate = useNavigate();

    const saveCar = (e) => {
        e.preventDefault();
        let saveCar = {make: make, model: model, year: year};
        ApiService.addCar(saveCar)
            .then(res => {
                setMessage('Car added successfully.');
                navigate('/');
            });
    }

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

    return(
        <div>
            <h2 className="text-center">Add Car</h2>
            <form>
                <div className="form-group">
                    <label>Make:</label>
                    <input type="text" placeholder="Make" name="make" className="form-control" value={make} onChange={onChangeMake} required/>
                </div>

                <div className="form-group">
                    <label>Model:</label>
                    <input placeholder="Model" name="model" className="form-control" value={model} onChange={onChangeModel} required/>
                </div>

                <div className="form-group">
                    <label>Year:</label>
                    <input placeholder="1999" name="year" className="form-control" value={year} onChange={onChangeYear} required/>
                    <font color="red">{!validate() ? 'Year Error: Year must be >= 1900 and <=2020' : ""}</font>
                </div>

                <button className="btn btn-success" disabled={!validate()} onClick={saveCar}>Save</button>
            </form>
        </div>
    );
}

export default AddComponent;
