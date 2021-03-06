import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ListComponent from '../../main/js/components/ListComponent'
import { ApiService, listCount, deleteCount } from '../../main/js/services/ApiService';
import 'regenerator-runtime/runtime'

jest.mock('../../main/js/services/ApiService');

describe('Example test suite', () => {
    it('`true` should be `true`', () => {
        expect(true).toBe(true); 
    });
    it('`false` should be `false`', () => { 
        expect(false).toBe(false);
    }); 
});

describe('List Component Test Suite', () => { 
    it('List Component Display Test', async () => {
        // Render the component with React Test Library,
        render(<ListComponent/>);
        // Wait for the mocked API call to finish
        await waitFor(() => expect(listCount).toBe(1));
        // Make sure the two cars we expect to be in the table are there.
        expect(screen.getByText("Ford")).toBeInTheDocument;
        expect(screen.getByText("Mustang")).toBeInTheDocument;
        expect(screen.getByText("1998")).toBeInTheDocument;
        expect(screen.getByText("Honda")).toBeInTheDocument;
        expect(screen.getByText("CRV")).toBeInTheDocument;
        expect(screen.getByText("2018")).toBeInTheDocument;
    });
    it('List Component Delete Test', async () => {
        // Render the component with React Test Library,
        render(<ListComponent/>);
        // Wait for the mocked API call to finish
        await waitFor(() => expect(listCount).toBe(2));
        // Click the delete button for the first row.
        fireEvent.click(screen.getAllByText('Delete')[0])
        // Wait for the mocked API call to finish
        await waitFor(() => expect(deleteCount).toBe(1));
        // Make sure the first car was deleted and the second car is still there
        expect(screen.queryAllByText("Ford")).toStrictEqual([]);
        expect(screen.queryAllByText("Mustang")).toStrictEqual([]);
        expect(screen.queryAllByText("1998")).toStrictEqual([]);
        expect(screen.getByText("Honda")).toBeInTheDocument;
        expect(screen.getByText("CRV")).toBeInTheDocument;
        expect(screen.getByText("2018")).toBeInTheDocument;
    });
    it('List Component Edit Test', async () => {
        // Define a history object that we can pass to the component under
        // test, since there React Router is not doing this for us in
        // unit test.
        let pushStr = undefined;
        let history = {
            push: (str) => {pushStr = str}
        }
        // Render the component with React Test Library,
        render(<ListComponent  history={history}/>);
        // Wait for the mocked API call to finish
        await waitFor(() => expect(listCount).toBe(3));
        fireEvent.click(screen.getAllByText('Edit')[0])
        expect(window.localStorage.getItem("carId")).toBe("1");
        expect(pushStr).toBe('/edit');
    });
    it('List Component Add Test', async () => {
        // Define a history object that we can pass to the component under
        // test, since there React Router is not doing this for us in
        // unit test.
        let pushStr = undefined;
        let history = {
            push: (str) => {pushStr = str}
        }
        // Render the component with React Test Library,
        render(<ListComponent  history={history}/>);
        // Wait for the mocked API call to finish
        await waitFor(() => expect(listCount).toBe(4));
        fireEvent.click(screen.getByText('Add Car'));
        expect(pushStr).toBe('/add');
    });
});

