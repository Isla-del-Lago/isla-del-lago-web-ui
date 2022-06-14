import { render } from '@testing-library/react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

// 👇️ must wrap your component in <Router>

test('renders react component', async () => {
    render(
        <Router>
            <App />,
        </Router>
    );
});
