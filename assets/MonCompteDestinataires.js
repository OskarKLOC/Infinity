import React from 'react';
import { useEffect, useState } from 'react';
import MesCapsules from './MesCapsules';

function MonCompteDestinataire () {

    const [destinataires, setCapsules] = useState([0]);
    const [affichage, setAffichage] = useState('');
    
    // Au chargement du module, on récupère la liste des capsules à afficher
    useEffect(() => {
        // searchAllCapsules();
        setAffichage('Vous n\'avez pas encore créé de destinataires...');
    },[]);

    // A chaque mise à jour de la liste des capsules
    useEffect(()=>{
        // Est-ce que la liste est vide ?
        if (!destinataires.length) {
            setAffichage('Vous n\'avez pas encore créé de destinataires...');
        // Sinon, le contenu est-il différent de la valeur par défaut de départ ?
        } else if (destinataires[0] != 0) {
            setAffichage(<MesCapsules capsules={capsules}></MesCapsules>);
        }
    },[destinataires])

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

    // Au clic sur le bouton dédié, on crée une nouvelle capsule
    function createNewRecipient (e) {
        // On bloque le comportement par défaut du formulaire
        e.preventDefault();
        console.log('test');
    }
    
    return (
        <>
            <button onClick={createNewRecipient}>Ajouter un nouveau destinataire</button>

            <h3>Vos destinataires</h3>
            <div>
                {affichage}
            </div>
        </>
    );
}

export default MonCompteDestinataire;