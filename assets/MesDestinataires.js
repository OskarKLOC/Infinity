import React from 'react';
import { useEffect, useState } from 'react';
import MesDestinatairesAffichage from './MesDestinatairesAffichage';

function MesDestinataires () {
    
    // On définit nos variables d'état
    const [recipients, setRecipients] = useState([0]);      // Contient l'ensemble des destinataires
    const [addresses, setAddresses] = useState([]);         // Contient l'ensemble des adresses associées aux destinataires

    // Au chargement du module, on récupère la liste des capsules à afficher
    useEffect(() => {
        searchAllRecipients();
    },[]);

    // Fonction de mise à jour de la liste de tous les destinataires
    function searchAllRecipients () {
        // Appel de notre API - La récupération des destinataires se base sur l'utilisateur connecté
        fetch('/moncompte/api_get_all_recipients/')
        .then((headers) => {
            return headers.json();
        }).then((data) => {
            // On stocke les objets parsés dans les variables d'état correspondantes
            setRecipients(JSON.parse(data.recipients));
            setAddresses(JSON.parse(data.addresses));
        })
    }
    
    // On appelle le composant de gestion de l'affichage
    return (
        <>
            <MesDestinatairesAffichage recipients={recipients} addresses={addresses} searchAllRecipients={searchAllRecipients}></MesDestinatairesAffichage>
        </>
    );
}

export default MesDestinataires;