import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react'
import EditComponent from '../../main/js/components/EditComponent'
import { ApiService, editCount, editInput } from '../../main/js/services/ApiService';
import 'regenerator-runtime/runtime'

jest.mock('../../main/js/services/ApiService');

describe('Edit Component Test Suite', () => { 
    it('Edit Component Test', async () => {
        // Define a history object that we can pass to the component under
        // test, since there React Router is not doing this for us in
        // unit test.
        let pushStr = undefined;
        let history = {
            push: (str) => {pushStr = str}
        }
        window.localStorage.setItem("carId", 1);
        // Render the component with React Test Library, passing our history
        // prop, so that we can capture the route it pushes to history
        render(<EditComponent history={history}/>);
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
        // Verify that the component called history.push with what we expected.
        expect(pushStr).toBe('/');
    });
});

