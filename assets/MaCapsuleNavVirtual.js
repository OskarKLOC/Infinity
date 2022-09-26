import React from 'react';

function MaCapsuleNavVirtual (props) {
    
    // On fait appel aux composants d'affichage à qui nous passons nos props, et qui se basent sur les conditions définies dans le présent composant
    return (
        <>
                        <div onClick={props.changeView} data-mode="text" className="dot d-flex align-items-center justify-content-center">
                            <img src="../../img/icones/Aa.svg" alt="texte" width="35" height="35"/>
                        </div>
                        <div onClick={props.changeView} data-mode="photo" className="dot d-flex align-items-center justify-content-center">
                            <img src="../../img/icones/photo.svg" alt="photo" width="35" height="35"/>
                        </div>
                        <div onClick={props.changeView} data-mode="audio" className="dot d-flex align-items-center justify-content-center">
                            <img src="../../img/icones/son.svg" alt="audio" width="35" height="35"/>
                        </div>
                        <div onClick={props.changeView} data-mode="video" className="dot d-flex align-items-center justify-content-center">
                            <img src="../../img/icones/video.svg" alt="video" width="35" height="35"/>
                        </div>
                        <div onClick={props.changeView} data-mode="library" className="dot d-flex align-items-center justify-content-center">
                            <img src="../../img/icones/bibliotheque.svg" alt="librairie" width="35" height="35"/>
                        </div>
        </>
    );
}

export default MaCapsuleNavVirtual;