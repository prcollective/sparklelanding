// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Page from './Page'; // Adjust the import path if necessary

// Render the Page component into the root div
ReactDOM.render(
    <React.StrictMode>
        <Page />
    </React.StrictMode>,
    document.getElementById('root') // Ensure there's a div with id 'root' in your index.html
);