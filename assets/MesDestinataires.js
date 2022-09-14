import React from 'react';
import { useEffect, useState } from 'react';

function MesDestinataires (props) {
    
    const [recipients, setRecipients] = useState([0]);
    const [affichage, setAffichage] = useState('');

    // Au chargement du module, on récupère la liste des capsules à afficher
    useEffect(() => {
        searchAllRecipients();
    },[]);

    // A chaque mise à jour de la liste des capsules
    useEffect(()=>{
        console.log('Liste des destinataires');
        console.log(recipients);
        // Est-ce que la liste est vide ?
        if (!recipients.length) {
            setAffichage('Vous n\'avez pas encore créé de destinataires...');
        // Sinon, le contenu est-il différent de la valeur par défaut de départ ?
        } else if (recipients[0] != 0) {
            setAffichage(<MesDestinataires createNewRecipient={createNewRecipient}></MesDestinataires>);
        }
    },[recipients])


    function searchAllRecipients () {
        // Appel de notre API en l'identifiant de la capsule en paramètre GET
        fetch('/moncompte/api_get_all_recipients/')
        .then((headers) => {
            return headers.json();
        }).then((data) => {
            // Il nous est nécessaire de parser le JSON pour récupérer l'objet
            let dataObject = JSON.parse(data);
            // On stocke l'objet dans la variable d'état
            setRecipients(dataObject);
        })
    }

    // Au clic sur le bouton dédié, on crée un nouveau destinataire
    function createNewRecipient (e) {
        // On bloque le comportement par défaut du formulaire
        e.preventDefault();
        // On fait appel à notre API en POST en passant l'objet qui contient nos données
        fetch('/moncompte/api_new_recipient')
        .then((headers) => {
            return headers.json();
        }).then((data) => {
            // On récupère la réponse de l'API que nous allons afficher
            // console.log(data);
            // On lance une nouvelle recherche de toutes les capsules
            searchAllRecipients();
        })
    }
    
    return (
        <>
        <h3>Mes destinataires</h3>
            <ul>
                {
                    recipients.map((recipient, index) => {
                        return <li key={index} data-id={recipient.id} onClick={props.editRecipient}>Destinataire {recipient.firstname} {recipient.lastname}</li>
                    })
                }
            </ul>
            <button onClick={props.createNewRecipient}>Ajouter un nouveau destinataire</button>
        </>
        
        
    );
}

export default MesDestinataires;