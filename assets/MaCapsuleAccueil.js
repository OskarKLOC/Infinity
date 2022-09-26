import React from 'react';
import { useEffect, useState } from 'react';
import MaCapsuleAffichage from './MaCapsuleAffichage';


function MaCapsuleAccueil (props) {
    
    // On définit la variable d'état dédiée à la gestion de l'affichage
    const[affichage, setAffichage] = useState('');

    // Si la variable d'état de verrouillage évolue, on applique l'affichage correspondant
    useEffect (() => {
        props.isSealed == undefined
                        ? setAffichage('')
                        : props.isSealed
                            ? setAffichage(<p>Votre capsule est actuellement verrouillée. Déverouillez-la pour commencer à la configurer et y ajouter vos souvenirs.</p>)
                            : setAffichage(<div><p>Votre capsule est déverouillée. Vous pouvez naviguer dans le menu de gauche pour accéder aux outils de configuration et d'ajout de souvenirs.</p>
                                    <p>Important : Votre capsule ne pourra être envoyée que si vous la verrouillez après avoir remplie. Rassurez-vous, vous pourrez y revenir autant de fois que vous le désirerez pour ajouter de nouveaux souvenirs.</p>
                                </div>)
    }, [props.isSealed])

    // On applique l'affichage désiré
    return (
        <>
            <div className="zone-gestion text-center">
                <h3>Bienvenue dans votre capsule</h3>
                {affichage}
            </div>
        </>
    );
}

export default MaCapsuleAccueil;