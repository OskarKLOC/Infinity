import React from 'react';
import { useEffect, useState } from 'react';
import MesCapsules from './MesCapsules';

function MonCompteCapsule () {

    const [offer, setOffer] = useState({});
    const [capsules, setCapsules] = useState([0]);
    const [affichage, setAffichage] = useState('');
    const [message, setMessage] = useState('');             // Message contextuel de succès ou d'échec de l'action
    const [messageClass, setMessageClass] = useState('');   // Classe l'affichage bootstrap de notre message
    
    // Au chargement du module, on récupère la liste des capsules à afficher ainsi que l'offre de l'utilisateur
    useEffect(() => {
        searchAllCapsules();
        searchUserOffer();
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

    // Fonction de recherche de l'ensemble des capsules rattachées à l'utilisateur
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

    function searchUserOffer () {
        // Appel de notre API en l'identifiant de la capsule en paramètre GET
        fetch('/moncompte/api_get_offer')
        .then((headers) => {
            return headers.json();
        }).then((data) => {
            // Il nous est nécessaire de parser le JSON pour récupérer l'objet
            let dataObject = JSON.parse(data);
            // On stocke l'objet dans la variable d'état
            setOffer(dataObject);
        })
    }

    // Au clic sur le bouton dédié, on crée une nouvelle capsule
    function createNewCapsule (event) {
        // On bloque le comportement par défaut du formulaire
        event.preventDefault();
        
        let type = event.currentTarget.dataset.type;

        // On fait appel à notre API en POST en passant l'objet qui contient nos données
        fetch('/moncompte/api_new_capsule/' + type)
        .then((headers) => {
            return headers.json();
        }).then((data) => {           
            // L'ajout d'une nouvelle capsule a-t-il été réalisé ?
            if (data.success) {
                // Si oui, on lance une nouvelle recherche de toutes les capsules
                searchAllCapsules();
            } else {
                // Sinon, on affiche le message d'erreur
                setMessage(data.message);
            }
        })
    }

    // Si la variable d'état est alimentée d'un message à afficher
    useEffect(() => {
        // On fournit la classe bootstrap pour le style
        if (message != '') {
            setMessageClass('alert alert-primary');
        }
        // On lance une commande pour retirer l'affichage du message au bout de quelques secondes
        setTimeout(() => {
            setMessage('');
            setMessageClass('');
        }, 7000);
    },[message]);
    
    return (
        <>
            <h3>Mes capsules</h3>
            <div className={messageClass}>{message}</div>
            <div>
                {affichage}
            </div>
            {
                offer.solidMax
                    ? <button onClick={createNewCapsule} data-type='solid'>Ajouter une nouvelle capsule physique</button>
                    : ''
            }
            {
                offer.virtualMax
                    ? <button onClick={createNewCapsule} data-type='virtual'>Ajouter une nouvelle capsule numérique</button>
                    : ''
            }
        </>
    );
}

export default MonCompteCapsule;