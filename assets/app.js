// any CSS you import will output into a single css file (app.css in this case)
// import './styles/app.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import MaCapsule from './MaCapsule';
import MesDestinataires from './MesDestinataires';
import MonCompteCapsule from './MonCompteCapsule';

// Gestion des paramètres et du contenu de la capsule
let root = document.getElementById('capsule-root');
if (root) {
    const capsuleRoot = ReactDOM.createRoot(root);
    capsuleRoot.render(
            <MaCapsule></MaCapsule>
    );
}

// Gestion des destinataires (liste et coordonnées)
root = document.getElementById('compte-destinataires-root');
if (root) {
    const compteRoot = ReactDOM.createRoot(root);
    compteRoot.render(
            <MesDestinataires></MesDestinataires>
    );
}

// Gestion des capsules (liste)
root = document.getElementById('compte-capsules-root');
if (root) {
    const compteRoot = ReactDOM.createRoot(root);
    compteRoot.render(
            <MonCompteCapsule></MonCompteCapsule>
    );
}
