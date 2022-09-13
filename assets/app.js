// any CSS you import will output into a single css file (app.css in this case)
// import './styles/app.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import MaCapsule from './MaCapsule';
import MonCompteCapsule from './MonCompteCapsule';

let root = document.getElementById('capsule-root');
if (root) {
    const capsuleRoot = ReactDOM.createRoot(document.getElementById('capsule-root'));
    capsuleRoot.render(
        <BrowserRouter>
            <MaCapsule></MaCapsule>
        </BrowserRouter>
    );
}

root = document.getElementById('compte-root');
if (root) {
    const compteRoot = ReactDOM.createRoot(document.getElementById('compte-root'));
    compteRoot.render(
            <MonCompteCapsule></MonCompteCapsule>
    );
}
