import React from 'react';
import { Link } from 'react-router-dom';

function CapsuleNav (props) {
    return (
        <div>
            <Link to={'/capsule/' + props.id} className="btn btn-primary">Paramètres</Link>
            <Link to={'/capsule/' + props.id + '/texte'} className="btn btn-primary">Ajout d'un texte</Link>
            <Link to={'/capsule/' + props.id + '/photo'} className="btn btn-primary">Ajout d'une photo</Link>
            <Link to={'/capsule/' + props.id + '/audio'} className="btn btn-primary">Ajout d'un message audio</Link>
            <Link to={'/capsule/' + props.id + '/video'} className="btn btn-primary">Ajout d'une vidéo</Link>
            <Link to={'/capsule/' + props.id + '/librairie'} className="btn btn-primary">Sélectionner mes contenus</Link>
        </div>
    );
}

export default CapsuleNav;