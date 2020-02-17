import React, { Component } from 'react'
import ApiService from "../services/ApiService";

class AddComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            make: '',
            model: '',
            year: '',
            message: null
        }
        this.saveCar = this.saveCar.bind(this);
    }

    saveCar = (e) => {
        e.preventDefault();
        let car = {make: this.state.make, model: this.state.model, year: this.state.year};
        ApiService.addCar(car)
            .then(res => {
                this.setState({message : 'Car added successfully.'});
                this.props.history.push('/');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <h2 className="text-center">Add Car</h2>
                <form>
                    <div className="form-group">
                        <label>Make:</label>
                        <input type="text" placeholder="Make" name="make" className="form-control" value={this.state.make} onChange={this.onChange} required/>
                    </div>

                    <div className="form-group">
                        <label>Model:</label>
                        <input placeholder="Model" name="model" className="form-control" value={this.state.model} onChange={this.onChange} required/>
                    </div>

                    <div className="form-group">
                        <label>Year:</label>
                        <input placeholder="1999" name="year" className="form-control" value={this.state.year} onChange={this.onChange} required/>
                    </div>

                    <button className="btn btn-success" onClick={this.saveCar}>Save</button>
                </form>
            </div>
        );
    }
}

export default AddComponent;