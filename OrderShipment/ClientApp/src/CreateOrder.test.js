import React from 'react';
import { shallow} from "enzyme";
import CreateOrder from './components/CreateOrder';
import { render, fireEvent, waitFor } from '@testing-library/react';

it('renders without crashing', async () => {
    shallow(<CreateOrder />);
});

describe('<CreateOrder /> Form input', () => {

    it('should have and be able to change Form field : OrderDescription', () => {       
        const { getByTestId } = render(<CreateOrder />);
        const orderDescInput = getByTestId('orderDescription');

        fireEvent.change(orderDescInput, { target: { value: 'Frukt' } });

        expect(orderDescInput.getAttribute('value')).toBe('Frukt');
    });

    it('should show todays date for field Shipment Date', () => {       
        const { getByTestId } = render(<CreateOrder />);
        const orderDate = getByTestId('orderDate');
        var today  = new Date().toLocaleDateString("en-US");

        expect(orderDate.getAttribute('value')).toBe(today);
    });

    it('should have and be able to change Form field : itemDescription', () => {       
        const { getByTestId } = render(<CreateOrder />);
        const itemInput = getByTestId('itemDescription');

        fireEvent.change(itemInput, { target: { value: 'Apple' } });

        expect(itemInput.getAttribute('value')).toBe('Apple');
    });

    it('Press button when form is blank should alert error : order description missing', async () => {       
        const { getByText } = render(<CreateOrder />);
        const orderButton = getByText('Add Order');        
        window.alert = jest.fn();
        fireEvent.click(orderButton);
        expect(window.alert).toBeCalledWith('order description missing');
        
    });

    it('Press button when only description has value should alert error : you must add at least 1 item', async () => {       
        const { getByTestId, getByText } = render(<CreateOrder />);
        const orderDescInput = getByTestId('orderDescription');

        fireEvent.change(orderDescInput, { target: { value: 'Frukt' } });

        expect(orderDescInput.getAttribute('value')).toBe('Frukt');

        const orderButton = getByText('Add Order');        
        window.alert = jest.fn();
        fireEvent.click(orderButton);
        expect(window.alert).toBeCalledWith('you must add at least 1 item');
        
    });

    
});

