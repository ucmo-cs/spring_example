import ApiService from "../services/ApiService";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
const React = require('react');

class ListComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            cars: [],
            message: null
        }
        this.deleteCar = this.deleteCar.bind(this);
        this.editCar = this.editCar.bind(this);
        this.addCar = this.addCar.bind(this);
        this.reloadCarList = this.reloadCarList.bind(this);
    }

    componentDidMount() {
        ApiService.fetchCars()
            .then(res => {
                const cars = res.data;
                this.setState({ cars: cars });
            })
    }

    reloadCarList() {
        ApiService.fetchCars()
            .then((res) => {
                this.setState({cars: res.data.result})
            });
    }

    deleteCar(carId) {
        ApiService.deleteCar(carId)
            .then(res => {
                this.setState({message : 'Car deleted successfully.'});
                this.setState({cars: this.state.cars.filter(car => car.id !== carId)});
            })

    }

    editCar(id) {
        window.localStorage.setItem("carId", id);
        this.props.history.push('/edit');
    }

    addCar() {
        window.localStorage.removeItem("carId");
        this.props.history.push('/add');
    }
// Another comment
    
    render() {
        return (
            <div>
                <h2 className="text-center">Car Details</h2>
                <Button variant="danger" onClick={() => this.addCar()}> Add Car</Button>
                <Table striped bordered hover>
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
                        this.state.cars.map(
                            car =>
                                <tr key={car.id}>
                                    <td>{car.id}</td>
                                    <td>{car.make}</td>
                                    <td>{car.model}</td>
                                    <td>{car.year}</td>
                                    <td>
                                        <Button variant="success" onClick={() => this.deleteCar(car.id)}> Delete</Button>
                                        <Button variant="success" onClick={() => this.editCar(car.id)}> Edit</Button>
                                    </td>
                                </tr> )
                    }
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default ListComponent;