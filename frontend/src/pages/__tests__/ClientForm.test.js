// ClientForm.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter as Router } from 'react-router-dom';
import ClientForm from './ClientForm';
import { API_URL } from '../config';

// Create a mock instance of axios
const mock = new MockAdapter(axios);

const setup = (id = null) => {
  // Wrap ClientForm with Router and render
  return render(
    <Router>
      <ClientForm id={id} />
    </Router>
  );
};

describe('ClientForm', () => {
  afterEach(() => {
    mock.reset();
  });

  test('renders form for adding a new client', () => {
    setup();

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bank Account Number/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Client/i })).toBeInTheDocument();
  });

  test('renders form for editing an existing client', async () => {
    // Mock GET request to fetch client details
    mock.onGet(`${API_URL}/clients/1`).reply(200, {
      name: 'John Doe',
      address: '123 Main St',
      phonenumber: '1234567890',
      bankaccountnumber: '0987654321',
    });

    setup(1);

    // Wait for the data to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByLabelText(/Name/i)).toHaveValue('John Doe');
      expect(screen.getByLabelText(/Address/i)).toHaveValue('123 Main St');
      expect(screen.getByLabelText(/Phone Number/i)).toHaveValue('1234567890');
      expect(screen.getByLabelText(/Bank Account Number/i)).toHaveValue('0987654321');
    });

    expect(screen.getByRole('button', { name: /Update Client/i })).toBeInTheDocument();
  });

  test('handles input change', () => {
    setup();

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Jane Doe' } });
    expect(screen.getByLabelText(/Name/i)).toHaveValue('Jane Doe');
  });

  test('submits form to create a new client', async () => {
    mock.onPost(`${API_URL}/clients`).reply(200);

    setup();

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/Address/i), { target: { value: '456 Elm St' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '0987654321' } });
    fireEvent.change(screen.getByLabelText(/Bank Account Number/i), { target: { value: '1234567890' } });

    fireEvent.click(screen.getByRole('button', { name: /Create Client/i }));

    await waitFor(() => {
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].data).toContain('Jane Doe');
    });
  });

  test('submits form to update an existing client', async () => {
    mock.onPut(`${API_URL}/clients/1`).reply(200);

    setup(1);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/Address/i), { target: { value: '456 Elm St' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '0987654321' } });
    fireEvent.change(screen.getByLabelText(/Bank Account Number/i), { target: { value: '1234567890' } });

    fireEvent.click(screen.getByRole('button', { name: /Update Client/i }));

    await waitFor(() => {
      expect(mock.history.put.length).toBe(1);
      expect(mock.history.put[0].data).toContain('Jane Doe');
    });
  });

  test('shows loading spinner while submitting', () => {
    setup();

    fireEvent.click(screen.getByRole('button', { name: /Create Client/i }));

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
