import React from 'react';
import { useEffect, useState } from 'react';
import MesCapsules from './MesCapsules';

function MonCompteCapsule () {

    const [capsules, setCapsules] = useState([0]);
    const [affichage, setAffichage] = useState('');
    
    // Au chargement du module, on récupère la liste des capsules à afficher
    useEffect(() => {
        searchAllCapsules();
    },[]);

    // A chaque mise à jour de la liste des capsules
    useEffect(()=>{
        // Est-ce que la liste est vide ?
        if (!capsules.length) {
            setAffichage('Vous n\'avez pas encore créé votre première capsule...');
        // Sinon, le contenu est-il différent de la valeur par défaut de départ ?
        } else if (capsules[0] != 0) {
            setAffichage(<MesCapsules capsules={capsules}></MesCapsules>);
        }
    },[capsules])

    function searchAllCapsules () {
        // Appel de notre API en l'identifiant de la capsule en paramètre GET
        fetch('/moncompte/api_get_all_capsules/')
        .then((headers) => {
            return headers.json();
        }).then((data) => {
            // Il nous est nécessaire de parser le JSON pour récupérer l'objet
            let dataObject = JSON.parse(data);
            // On stocke l'objet dans la variable d'état
            setCapsules(dataObject);

        })
    }

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
            // console.log(data);
            // On lance une nouvelle recherche de toutes les capsules
            searchAllCapsules();
        })
    }
    
    return (
        <>
            <h3>Mes capsules</h3>
            <div>
                {affichage}
            </div>
            <button onClick={createNewCapsule}>Ajouter une nouvelle capsule</button>
        </>
    );
}

export default MonCompteCapsule;