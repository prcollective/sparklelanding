import React from 'react';
import { createRoot } from 'react-dom/client';
import Page from './Page'; // Adjust the path based on your project structure

const container = document.getElementById('root'); // Ensure there's a div with id 'root' in your index.html
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Page />
    </React.StrictMode>
);