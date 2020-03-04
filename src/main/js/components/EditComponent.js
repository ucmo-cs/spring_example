import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ApiService from "../services/ApiService";

class EditComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            make: '',
            model: '',
            year: '',
        }
        this.saveCar = this.saveCar.bind(this);
        this.loadCar = this.loadCar.bind(this);
    }

    componentDidMount() {
        this.loadCar();
    }

    loadCar() {
        ApiService.fetchCarById(window.localStorage.getItem("carId"))
            .then((res) => {
                let car = res.data;
                this.setState({
                    id: car.id,
                    make: car.make,
                    model: car.model,
                    year: car.year,
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveCar = (e) => {
        e.preventDefault();
        let car = {id: this.state.id, make: this.state.make, model: this.state.model, year: this.state.year};
        ApiService.editCar(car)
            .then(res => {
                this.setState({message : 'Car added successfully.'});
                this.props.history.push('/');
            });
    }

    cancel= (e) => {
        this.props.history.push('/');
    }

    validate() {
        return this.state.year >= 1900 && this.state.year <=2020;
    }

    render() {
        return (
            <Modal.Dialog keyboard={true}>
                <Modal.Header>Edit Car</Modal.Header>
                <Modal.Body>
                <Form>

                    <Form.Group>
                        <Form.Label>Make:</Form.Label>
                        <Form.Control placeholder="Make" name="make" value={this.state.make} onChange={this.onChange}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Model:</Form.Label>
                        <Form.Control placeholder="Model" name="model" value={this.state.model} onChange={this.onChange}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Year:</Form.Label>
                        <Form.Control placeholder="Year" name="year" value={this.state.year} onChange={this.onChange}/>
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

export default EditComponent;