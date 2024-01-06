import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as router from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import React from 'react'
import EditComponent from '../../main/js/components/EditComponent'
import { ApiService, editCount, editInput } from '../../main/js/services/ApiService';
import 'regenerator-runtime/runtime'

jest.mock('../../main/js/services/ApiService');

describe('Edit Component Test Suite', () => { 

    const navigate = jest.fn();
    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    })

    it('Edit Component Test', async () => {
        window.localStorage.setItem("carId", 1);
        // Render the component with React Test Library, passing our history
        // prop, so that we can capture the route it pushes to history
        render(<Router> <EditComponent history={history}/> </Router>);
        // Wait for it to retrieve the car to edit from the Server
        await waitFor(() => expect(screen.getByDisplayValue("Ford")).toBeInTheDocument);
        // Do the events to fill in the blanks for the new car and click Save
        fireEvent.change(screen.getByDisplayValue("Ford"), { target: { value: 'Porsche' } })
        fireEvent.change(screen.getByDisplayValue("Mustang"), { target: { value: 'Boxter' } })
        fireEvent.change(screen.getByDisplayValue("1998"), { target: { value: '2005' } })
        fireEvent.click(screen.getByText('Save'));
        // Wait for the mocked API call to finish
        await waitFor(() => expect(editCount).toBe(1));
        // Define the object we the component should call the API with
        const input = { id: "1", make : "Porsche", model : "Boxter", year : "2005"};
        // Check that it called the API with what we expect
        expect(editInput).toStrictEqual(input);
        // Verify that the component called navigate with what we expected.
        expect(navigate).toHaveBeenCalledWith('/');
    });
});

