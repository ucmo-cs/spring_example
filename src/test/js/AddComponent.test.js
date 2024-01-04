import React from 'react'
import * as router from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddComponent from '../../main/js/components/AddComponent'
import { ApiService, addCount, addInput } from '../../main/js/services/ApiService';
import 'regenerator-runtime/runtime'

jest.mock('../../main/js/services/ApiService');

describe('Add Component Test Suite', () => { 

    const navigate = jest.fn();
    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    })

    it('Add Component Test', async () => {
        // Render the component with React Test Library, passing our history
        // prop, so that we can capture the route it pushes to history
        render(<Router> <AddComponent history={history}/> </Router>);
        // Do the events to fill in the blanks for the new car and click Save
        fireEvent.change(screen.getByPlaceholderText("Make"), { target: { value: 'Chevy' } })
        fireEvent.change(screen.getByPlaceholderText("Model"), { target: { value: 'Camero' } })
        fireEvent.change(screen.getByPlaceholderText("1999"), { target: { value: '1977' } })
        fireEvent.click(screen.getByText('Save'));
        // Wait for the mocked API call to finish
        await waitFor(() => expect(addCount).toBe(1));
        // Define the object we the component should call the API with
        const input = { make : "Chevy", model : "Camero", year : "1977"};
        // Check that it called the API with what we expect
        expect(addInput).toStrictEqual(input);
        // Verify that the component called navigate with what we expected.
        expect(navigate).toHaveBeenCalledWith('/');
    });
});

