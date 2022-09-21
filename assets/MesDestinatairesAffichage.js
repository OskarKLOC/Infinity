import React from 'react';
import { useEffect, useState } from 'react';
import MesDestinatairesDetail from './MesDestinatairesDetail';
import MesDestinatairesListe from './MesDestinatairesListe';


function MesDestinatairesAffichage (props) {
    
    // On définit nos variables d'état
    const [affichageMode, setAffichageMode] = useState('list');     // Définit le mode d'affichage à appliquer
    const [isEditMode, setIsEditMode] = useState(false);            // Booléen permettant d'entrée et sortir du mode d'édition
    const [isAddMode, setIsAddMode] = useState(false);              // Booléen permettant d'entrée et sortir du mode d'ajout
    const [recipient, setRecipient] = useState({});                 // Contient le destinataire sélectionné dans le mode d'édition
    const [address, setAddress] = useState({});                     // Contient l'adresse du destinataire sélectionné dans le mode d'édition

    // En cas de retour en mode liste, on réinitialise le contenu du destinataire sélectionné
    useEffect(() => {
        // Sommes-nous repassés en mode d'affichage liste
        if (affichageMode == 'list') {
            // Si oui, on réinitialise le destinataire à afficher
            setRecipient({});
        }
    }, [affichageMode]);

    // Au clic sur le bouton dédié, on bascule en mode édition ou on revient
    function toggleEditMode (event) {
        // On bloque le comportement par défaut si existant
        if (event) {
            event.preventDefault();
        }

        // Sommes-nous en mode d'édition ?
        if (isEditMode) {
            // Sortons-nous du mode d'édition après validation ?
            if (!event) {
                // Si oui, on recharge la liste de l'ensemble des destinataires
                props.searchAllRecipients();
            }
            // On repasse en mode liste
            setIsEditMode(!isEditMode);
            setAffichageMode('list')
        } else {
            console.log(props.addresses[event.currentTarget.dataset.id][0]);
            // Sinon, on isole les données du destinataire qui nous intéresse
            let input = props.recipients[event.currentTarget.dataset.id];
            if (props.addresses[event.currentTarget.dataset.id][0] === undefined) {
                input.address = '';
                input.zipcode = '';
                input.city = '';
            } else {
                input.address = props.addresses[event.currentTarget.dataset.id][0].road;
                input.zipcode = props.addresses[event.currentTarget.dataset.id][0].postcode;
                input.city = props.addresses[event.currentTarget.dataset.id][0].city;
            }
            setRecipient(input);
            // Et on switche dans le mode d'édition
            setIsEditMode(!isEditMode);
            setAffichageMode('edit')
        } 
    }

    // Au clic sur le bouton dédié, on bascule en mode ajout ou on revient
    function toggleAddMode (event) {
        // On bloque le comportement par défaut si existant
        if (event) {
            event.preventDefault();
        }

        // Sommes-nous en mode d'ajout ?
        if (isAddMode) {
            // Sortons-nous du mode d'ajout après validation ?
            if (!event) {
                // Si oui, on recharge la liste de l'ensemble des destinataires
                props.searchAllRecipients();
            }
            // On repasse en mode liste
            setIsAddMode(!isAddMode);
            setAffichageMode('list')
        } else {
            // Sinon, on switche dans le mode d'ajout
            setIsAddMode(!isAddMode);
            setAffichageMode('add')
        } 
    }
    
    // On fait appel aux différents composants d'affichage conditionnés suivant le mode déterminé
    return (
        <>
            <section className="informations-bénéficiaire">

            <div className="container-fluid">
                <div className="row text-center">
                    <div className="col text-center m-5">
                        <h3> Ma liste des destinataires </h3>
                        <i className="deco deco-right"></i>
                    </div>
                </div>
            </div>

            {
                affichageMode == 'list'
                    ? <MesDestinatairesListe recipients={props.recipients} toggleEditMode={toggleEditMode} toggleAddMode={toggleAddMode}></MesDestinatairesListe>
                    : affichageMode == 'add'
                        ? <MesDestinatairesDetail recipient={recipient} setRecipient={setRecipient} address={address} setAddress={setAddress} toggleMode={toggleAddMode} mode="add"></MesDestinatairesDetail>
                        : affichageMode == 'edit'
                            ? <MesDestinatairesDetail recipient={recipient} setRecipient={setRecipient} address={address} setAddress={setAddress} toggleMode={toggleEditMode} mode="edit"></MesDestinatairesDetail>
                            : <MesDestinatairesListe recipients={props.recipients} toggleEditMode={toggleEditMode} toggleAddMode={toggleAddMode}></MesDestinatairesListe>
            }
            
            </section>
        </>
    );
}

export default MesDestinatairesAffichage;