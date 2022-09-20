import React from 'react';

function MaCapsuleNavVirtual (props) {
    
    // On fait appel aux composants d'affichage à qui nous passons nos props, et qui se basent sur les conditions définies dans le présent composant
    return (
        <>
                        <div onClick={props.changeView} data-mode="text">Texte</div>
                        <div onClick={props.changeView} data-mode="photo">Photo</div>
                        <div onClick={props.changeView} data-mode="audio">Audio</div>
                        <div onClick={props.changeView} data-mode="video">Vidéo</div>
                        <div onClick={props.changeView} data-mode="library">Librairie</div>
        </>
    );
}

export default MaCapsuleNavVirtual;