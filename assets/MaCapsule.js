import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CapsuleParams from './CapsuleParams';
import CapsulePhoto from './CapsulePhoto';

function MaCapsule () {
    
    return (
        <Routes>
            <Route path='/capsule/:id' element={<CapsuleParams></CapsuleParams>}></Route>
            <Route path='/capsule/:id/photo' element={<CapsulePhoto></CapsulePhoto>}></Route>
        </Routes>
    );
}

export default MaCapsule;