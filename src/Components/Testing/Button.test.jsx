import React from 'react';
import { fireEvent, getQueriesForElement } from '@testing-library/react';
import * as ReactDOM from "react-dom"
import Button from '../Button'

describe("rendering components", () => {
    test("Rendering Button", () => {
        const handleClick = jest.fn()
        const root = document.createElement("div")
        ReactDOM.render(<Button
            onClick={handleClick}
            type="submit"
            text="Click Me"
            state="enabled" 
        />, root)
        const { getByText } = getQueriesForElement(root)
        const button = getByText("Click Me")

        fireEvent.click(button)
        expect(handleClick).toHaveBeenCalledTimes(1)
    })
});