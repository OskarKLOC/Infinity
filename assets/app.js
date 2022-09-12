// any CSS you import will output into a single css file (app.css in this case)
// import './styles/app.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import MaCapsule from './MaCapsule';

const capsuleRoot = ReactDOM.createRoot(document.getElementById('capsule-root'));
capsuleRoot.render(
    <BrowserRouter>
        <MaCapsule></MaCapsule>
    </BrowserRouter>
);
