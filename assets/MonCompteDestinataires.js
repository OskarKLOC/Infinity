import React from 'react';
import { useEffect, useState } from 'react';
import MesDestinataires from './MesDestinataires';
import MonDestinataire from './MonDestinataire';

function MonCompteDestinataire () {

    const [recipient, setRecipient] = useState({});
    const [affichageMode, setAffichageMode] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    
    

    // A chaque mise à jour de la liste des capsules
    useEffect(()=>{
        if (isEditMode) {
            setAffichageMode(<MonDestinataire recipient={recipient} handleChange={handleChange} handleSubmit={handleSubmit}></MonDestinataire>);
        // Sinon, le contenu est-il différent de la valeur par défaut de départ ?
        } else {
            setAffichageMode(<MesDestinataires editRecipient={editRecipient}></MesDestinataires>);
        }
    },[isEditMode])



    // Au clic sur le bouton dédié, on crée un nouveau destinataire
    function editRecipient (event) {
        // On bloque le comportement par défaut du formulaire
        event.preventDefault();
        setIsEditMode(true);
        console.log('Un destinataire...');
        console.log(event.currentTarget.id);
    }
    

    // Récupère chaque modification du formulaire et remplace la valeur dans la variable d'état
    function handleChange (e) {
        let target = e.currentTarget;   // Champ du formulaire à l'origine de l'appel de la fonction
        let input = {...recipient};       // Copie de notre destinataire pour pouvoir fournir la valeur saisie

        // On met à jour uniquement la valeur qui a changé
        switch (target.name) {
            case 'recipient-firstname':
                input.firstname = target.value; 
                break;
            case 'recipient-lastname':
                input.lastname = target.value;
                break;
            case 'recipient-email':
                input.email = target.value;
                break;
            case 'recipient-phone':
                input.phone = target.value; 
                break;
            case 'recipient-address':
                input.address = target.value;
                break;
            case 'recipient-zipcode':
                input.zipcode = target.value;
                break;
            case 'recipient-city':
                input.city = target.value;
                break;
            default:
                console.log('Champ non reconnu...');
                break;
        }
        
        // On met à jour l'objet contenant nos données
        setRecipient(input);
        console.log(recipient);
    }

    // A la validation du formulaire, se charge de faire appel à l'API pour la vérification de la saisie et l'enregistrement des données en BDD
    function handleSubmit (e) {
        // On bloque le comportement par défaut du formulaire
        e.preventDefault();
        console.log(recipient);
        // On fait appel à notre API en POST en passant l'objet qui contient nos données
        fetch('/moncompte/api_set_recipient/' + recipient.id, { method: 'POST', body: JSON.stringify(recipient)})
        .then((headers) => {
            return headers.json();
        }).then((data) => {
            // On récupère la réponse de l'API que nous allons afficher
            setMessage(data);
        })
        setIsEditMode(false);
    }

    return (
        <>
                {affichageMode}
        </>
    );
}

export default MonCompteDestinataire;