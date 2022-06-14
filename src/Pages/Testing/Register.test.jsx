import React from 'react';
import * as ReactDOM from 'react-dom';
import { fireEvent, getQueriesForElement } from '@testing-library/react';
import Register from '../Register';
import { BrowserRouter } from 'react-router-dom';

var cardTitle;
var cardSubtitle;
var formTitle;
var nameInput;
var apartmentInput;
var emailInput;
var passwordInput;
var formButton;

describe('rendering components', () => {
    const root = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>,
        root
    );

    test('Rendering Register Card', () => {
        const { getByText, getByPlaceholderText } = getQueriesForElement(root);

        cardTitle = getByText('Isla del lago');
        cardSubtitle = getByText('Water Manager');
        formTitle = getByText('Registro');
        nameInput = getByPlaceholderText('Escriba su nombre');
        emailInput = getByPlaceholderText('Escriba su correo electronico');
        apartmentInput = getByPlaceholderText('¿Cual es su apartamento?');
        passwordInput = getByPlaceholderText('Escriba su contraseña');
        formButton = getByText('Registrarme');

        expect(cardTitle.className).toBe('customCard__titleContainer--title');
        expect(cardTitle.className).not.toBe('titleContainer--title');

        expect(cardSubtitle.className).toBe(
            'customCard__titleContainer--subtitle'
        );
        expect(cardSubtitle.className).not.toBe('titleContainer--subtitle');

        expect(formTitle.className).toBe('customForm--title');
        expect(formTitle.className).not.toBe('title');

        expect(nameInput.type).toBe('text');
        expect(nameInput.type).not.toBe('password');

        expect(emailInput.type).toBe('email');
        expect(emailInput.type).not.toBe('password');

        expect(passwordInput.type).toBe('password');
        expect(passwordInput.type).not.toBe('email');

        expect(formButton.className).toBe('customButton disabled');
        expect(formButton.className).not.toBe('disabled');

        fireEvent.change(nameInput, { target: { value: 'Bruce Wayne' } });
        fireEvent.change(emailInput, { target: { value: '' } });
        fireEvent.change(apartmentInput, { target: { value: '' } });
        fireEvent.change(passwordInput, { target: { value: '' } });
        expect(formButton.className).toBe('customButton disabled');

        fireEvent.change(nameInput, { target: { value: 'Bruce Wayne' } });
        fireEvent.change(emailInput, { target: { value: 'bruce@wayne.com' } });
        fireEvent.change(apartmentInput, { target: { value: '' } });
        fireEvent.change(passwordInput, { target: { value: '' } });
        expect(formButton.className).toBe('customButton disabled');

        fireEvent.change(nameInput, { target: { value: 'Bruce Wayne' } });
        fireEvent.change(emailInput, { target: { value: '' } });
        fireEvent.change(apartmentInput, { target: { value: '' } });
        fireEvent.change(passwordInput, { target: { value: 'batman' } });
        expect(formButton.className).toBe('customButton disabled');

        fireEvent.change(nameInput, { target: { value: '' } });
        fireEvent.change(emailInput, { target: { value: 'bruce@wayne.com' } });
        fireEvent.change(apartmentInput, { target: { value: '' } });
        fireEvent.change(passwordInput, { target: { value: '' } });
        expect(formButton.className).toBe('customButton disabled');

        fireEvent.change(nameInput, { target: { value: '' } });
        fireEvent.change(emailInput, { target: { value: 'bruce@wayne.com' } });
        fireEvent.change(apartmentInput, { target: { value: '' } });
        fireEvent.change(passwordInput, { target: { value: 'baman' } });
        expect(formButton.className).toBe('customButton disabled');

        fireEvent.change(nameInput, { target: { value: '' } });
        fireEvent.change(emailInput, { target: { value: '' } });
        fireEvent.change(apartmentInput, { target: { value: '' } });
        fireEvent.change(passwordInput, { target: { value: 'batman' } });
        expect(formButton.className).toBe('customButton disabled');

        fireEvent.change(nameInput, { target: { value: 'Bruce Wayne' } });
        fireEvent.change(emailInput, { target: { value: 'bruce@wayne.com' } });
        fireEvent.change(apartmentInput, {
            target: { value: 'Apartamento 201' },
        });
        fireEvent.change(passwordInput, { target: { value: 'batman' } });
        expect(formButton.className).toBe('customButton enabled');
        expect(formButton.disabled).toBe(false);
        fireEvent.click(formButton);
    });
});
