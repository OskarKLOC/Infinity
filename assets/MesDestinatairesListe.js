import React from 'react';
import { useEffect, useState } from 'react';

function MesDestinatairesListe (props) {
    
    // On affiche la liste de l'ensemble des destinataires actifs pour l'utilisateur donné
    return (
        <>
        <h3>Mes destinataires</h3>
            <ul>
                {
                    props.recipients.length
                        ? (props.recipients[0] != 0
                            ? props.recipients.map((recipient, index) => {
                                return <li key={index} data-id={index} onClick={props.toggleEditMode}>Destinataire {recipient.firstname} {recipient.lastname}</li>
                            })
                            : ' ')
                        : 'Vous n\'avez pas encore créé de destinataire'
                }
            </ul>
            <button onClick={props.toggleAddMode}>Ajouter un nouveau destinataire</button>
        </>
    );
}

export default MesDestinatairesListe;