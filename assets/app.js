// any CSS you import will output into a single css file (app.css in this case)
// import './styles/app.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CapsuleParams from './CapsuleParams';

const capsuleRoot = ReactDOM.createRoot(document.getElementById('capsule-root'));
capsuleRoot.render(
    <BrowserRouter>
        <Routes>
            <Route path='/capsule/:id' element={<CapsuleParams></CapsuleParams>}></Route>
        </Routes>
    </BrowserRouter>
);
