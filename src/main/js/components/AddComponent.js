import React, { Component } from 'react'
import ApiService from "../services/ApiService";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from "react-bootstrap/Modal";

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

    cancel= (e) => {
        this.props.history.push('/');
    }

    validate() {
        return this.state.year >= 1900 && this.state.year <=2020;
    }

    render() {
        return(
            <Modal.Dialog keyboard={true}>
                <Modal.Header>Add Car</Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group>
                    <Form.Label>Make:</Form.Label>
                        <Form.Control type="text" placeholder="Make" name="make" value={this.state.make} onChange={this.onChange} required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Model:</Form.Label>
                        <Form.Control placeholder="Model" name="model" value={this.state.model} onChange={this.onChange} required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Year:</Form.Label>
                        <Form.Control placeholder="1999" name="year" value={this.state.year} onChange={this.onChange} required/>
                        <font color="red">{!this.validate() ? 'Year Error: Year must be >= 1900 and <=2020' : ""}</font>
                    </Form.Group>

                    <Button variant="primary" disabled={!this.validate()} onClick={this.saveCar}>Save</Button>
                    <Button variant="dark" onClick={this.cancel}>Cancel</Button>
                </Form>
                </Modal.Body>
            </Modal.Dialog>
        );
    }
}

export default AddComponent;