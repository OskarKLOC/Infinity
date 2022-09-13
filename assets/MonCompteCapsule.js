import React from 'react';
import { useEffect, useState } from 'react';

function MonCompteCapsule () {

    const [capsules, setCapsules] = useState([]);

    // Au chargement du module, on récupère la liste des capsules à afficher
    useEffect(() => {
        // Appel de notre API en l'identifiant de la capsule en paramètre GET
        fetch('/moncompte/api_get_all_capsules/')
        .then((headers) => {
            return headers.json();
        }).then((data) => {
            // Il nous est nécessaire de parser le JSON pour récupérer l'objet
            let dataObject = JSON.parse(data);
            console.log(dataObject);
            // On stocke l'objet dans la variable d'état
            setCapsules(dataObject);
        })
    },[]);

    // Au clic sur le bouton dédié, on crée une nouvelle capsule
    function createNewCapsule (e) {
        // On bloque le comportement par défaut du formulaire
        e.preventDefault();
        // On fait appel à notre API en POST en passant l'objet qui contient nos données
        fetch('/moncompte/api_new_capsule')
        .then((headers) => {
            return headers.json();
        }).then((data) => {
            // On récupère la réponse de l'API que nous allons afficher
            console.log(data);
        })
    }
    
    return (
        <>
            <button onClick={createNewCapsule}>Ajouter une nouvelle capsule</button>

            {
                capsules.map((capsule, index) => {
                    return  <div key={index}>
                                <a href={'../capsule/' + capsule.capsule.id}>Capsule n°{capsule.capsule.id}</a>
                            </div>
                })
            }

            <a href={'/capsule/1'}>Accéder à la capsule 1</a>
        </>
    );
}

export default MonCompteCapsule;