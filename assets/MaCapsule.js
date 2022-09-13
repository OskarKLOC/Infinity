import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CapsuleNav from './CapsuleNav';
import CapsuleParams from './CapsuleParams';
import CapsuleFichier from './CapsuleFichier';
import CapsuleLibrary from './CapsuleLibrary';
import CapsuleText from './CapsuleText';

function MaCapsule () {
    
    let id = window.location.pathname.replace('/capsule/','');

    return (
        <>
            <CapsuleNav id={id}></CapsuleNav>
            <Routes>
                <Route path='/capsule/:id' element={<CapsuleParams></CapsuleParams>}></Route>
                <Route path='/capsule/:id/texte' element={<CapsuleText></CapsuleText>}></Route>
                <Route path='/capsule/:id/photo' element={<CapsuleFichier type="photo"></CapsuleFichier>}></Route>
                <Route path='/capsule/:id/audio' element={<CapsuleFichier type="audio"></CapsuleFichier>}></Route>
                <Route path='/capsule/:id/video' element={<CapsuleFichier type="vidéo"></CapsuleFichier>}></Route>
                <Route path='/capsule/:id/librairie' element={<CapsuleLibrary></CapsuleLibrary>}></Route>
            </Routes>
            <p></p>
            <p></p>
        </>
    );
}

export default MaCapsule;