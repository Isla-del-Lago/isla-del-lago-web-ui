import React from 'react';
import { fireEvent, getQueriesForElement } from '@testing-library/react';
import * as ReactDOM from "react-dom"
import Login from '../Login'

describe("rendering components", () => {
    test("Rendering Login Card", () => {
        const root = document.createElement("div")
        ReactDOM.render(<Login />, root)
        const { getByText, getByPlaceholderText } = getQueriesForElement(root)

        const cardTitle = getByText("Isla del lago")
        const cardSubtitle = getByText("Water Manager")
        const formTitle = getByText("Iniciar sesion")
        const emailInput = getByPlaceholderText('Escriba su correo electrónico')
        const passwordInput = getByPlaceholderText('Escriba su contraseña')
        const formButton = getByText("Iniciar Sesion")

        expect(cardTitle.className).toBe('customCard__titleContainer--title')
        expect(cardTitle.className).not.toBe('titleContainer--title')
        expect(cardSubtitle.className).toBe('customCard__titleContainer--subtitle')
        expect(cardSubtitle.className).not.toBe('titleContainer--subtitle')
        expect(formTitle.className).toBe('customForm--title')
        expect(formTitle.className).not.toBe('title')
        expect(emailInput.type).toBe('email')
        expect(emailInput.type).not.toBe('password')
        expect(passwordInput.type).toBe('password')
        expect(passwordInput.type).not.toBe('email')
        expect(formButton.className).toBe('customButton disabled')
        expect(formButton.className).not.toBe('enabled')

        fireEvent.change(emailInput, { target: { value: 'bruce@wayne.com' } })
        fireEvent.change(emailInput, { target: { value: '' } })
        expect(formButton.className).toBe('customButton disabled')
        fireEvent.change(emailInput, { target: { value: '' } })
        fireEvent.change(passwordInput, { target: { value: 'batman' } })
        expect(formButton.className).toBe('customButton disabled')
        fireEvent.change(emailInput, { target: { value: 'bruce@wayne.com' } })
        fireEvent.change(passwordInput, { target: { value: 'batman' } })
        expect(formButton.className).toBe('customButton enabled')
        fireEvent.click(formButton)
    })
});
