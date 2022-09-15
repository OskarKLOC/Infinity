// any CSS you import will output into a single css file (app.css in this case)
// import './styles/app.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import MaCapsule from './MaCapsule';
import MonCompteCapsule from './MonCompteCapsule';
import MonCompteDestinataire from './MonCompteDestinataires';

let root = document.getElementById('capsule-root');
if (root) {
    const capsuleRoot = ReactDOM.createRoot(root);
    capsuleRoot.render(
        <BrowserRouter>
            <MaCapsule></MaCapsule>
        </BrowserRouter>
    );
}

root = document.getElementById('compte-destinataires-root');
if (root) {
    const compteRoot = ReactDOM.createRoot(root);
    compteRoot.render(
            <MonCompteDestinataire></MonCompteDestinataire>
    );
}

root = document.getElementById('compte-capsules-root');
if (root) {
    const compteRoot = ReactDOM.createRoot(root);
    compteRoot.render(
            <MonCompteCapsule></MonCompteCapsule>
    );
}
