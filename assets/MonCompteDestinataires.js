import React from 'react';
import { useEffect, useState } from 'react';
import MesDestinataires from './MesDestinataires';
import MonDestinataire from './MonDestinataire';

function MonCompteDestinataire () {

    const [affichageMode, setAffichageMode] = useState(<MesDestinataires toggleEditMode={toggleEditMode} toggleAddMode={toggleAddMode}></MesDestinataires>);
    const [isEditMode, setIsEditMode] = useState('0');
    const [isAddMode, setIsAddMode] = useState(false);

    // A chaque mise à jour de la liste des conditions d'affichage
    useEffect(()=>{
        // Devons-nous afficher le mode édition ?
        if (isEditMode != '0') {
            setAffichageMode(<MonDestinataire toggleMode={toggleEditMode} mode="edit" id={isEditMode}></MonDestinataire>);
        // Sinon, devons-nous afficher le mode d'ajout
        } else if (isAddMode) {
            setAffichageMode(<MonDestinataire toggleMode={toggleAddMode} mode="add"></MonDestinataire>);
        // Sinon, on affiche le contenu par défaut
        } else {
            setAffichageMode(<MesDestinataires toggleEditMode={toggleEditMode} toggleAddMode={toggleAddMode}></MesDestinataires>);
        }
    },[isEditMode, isAddMode])


    // Au clic sur le bouton dédié, on bascule en mode édition ou on revient
    function toggleEditMode (event) {
        // On bloque le comportement par défaut si existant
        if (event) {
            event.preventDefault();
        }

        // On affecte soit la valeur de l'id du destinataire soit une valeur nulle pour switcher
        if (isEditMode != '0') {
            setIsEditMode('0');
        } else {
            setIsEditMode(event.currentTarget.dataset.id);
        } 
    }

    // Au clic sur le bouton dédié, on bascule en mode ajout ou on revient
    function toggleAddMode (event) {
        // On bloque le comportement par défaut si existant
        if (event) {
            event.preventDefault();
        }

        // On switche d'un état à l'autre
        setIsAddMode(!isAddMode);
    }

    return (
        <>
            {affichageMode}
        </>
    );
}

export default MonCompteDestinataire;