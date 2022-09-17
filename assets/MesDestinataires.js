import React from 'react';
import { useEffect, useState } from 'react';

function MesDestinataires (props) {
    
    const [recipients, setRecipients] = useState([0]);
    const [addresses, setAddresses] = useState([]);

    // Au chargement du module, on récupère la liste des capsules à afficher
    useEffect(() => {
        searchAllRecipients();
    },[]);


    useEffect(() => {
        console.log(recipients);
        console.log(addresses);
    },[recipients, addresses]);


    function searchAllRecipients () {
        // Appel de notre API en l'identifiant de la capsule en paramètre GET
        fetch('/moncompte/api_get_all_recipients/')
        .then((headers) => {
            return headers.json();
        }).then((data) => {
            // On stocke les objets parsés dans les variables d'état correspondantes
            setRecipients(JSON.parse(data.recipients));
            setAddresses(JSON.parse(data.addresses));
        })
    }
    
    return (
        <>
        <h3>Mes destinataires</h3>
            <ul>
                {
                    recipients.length
                        ? (recipients[0] != 0
                            ? recipients.map((recipient, index) => {
                                return <li key={index} data-id={recipient.id} onClick={props.toggleEditMode}>Destinataire {recipient.firstname} {recipient.lastname}</li>
                            })
                            : ' ')
                        : 'Vous n\'avez pas encore créé de destinataire'
                }
            </ul>
            <button onClick={props.toggleAddMode}>Ajouter un nouveau destinataire</button>
        </>
        
        
    );
}

export default MesDestinataires;