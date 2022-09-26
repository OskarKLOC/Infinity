import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MaCapsuleParams (props) {

    // On choisit le message à afficher en fonction du statut de la capsule
    let sealStatus = '';
    if (props.capsule.capsuleStatus === "SEALED") {
        sealStatus = 'Verrouillée';
    }
    if (props.capsule.capsuleStatus === "UNSEALED") {
        sealStatus = 'Déverrouillée';
    }

    let format = '';
    if (props.capsule.format === "SOLID") {
        format = 'Physique';
    }
    if (props.capsule.format === "VIRTUAL") {
        format = 'Numérique';
    }

    // On charge par défaut la sélection des destinataires au cas où il n'y aurait pas de modifications qui y soient apportées
    useEffect(() => {
        let input = {...props.capsule};
        let listIds = [...props.selectionRecipients];
        input.recipientsSelection = listIds;
        props.setCapsule(input);
    }, [])

    // Récupère chaque modification du formulaire et remplace la valeur dans la variable d'état
    function handleChange (e) {
        let target = e.currentTarget;       // Champ du formulaire à l'origine de l'appel de la fonction
        let input = {...props.capsule};     // Copie de notre capsule pour pouvoir fournir la valeur saisie

        // La fonction est-elle lancée depuis un input de type checkbox ?
        if (target.type == 'checkbox') {
            // On récupère la liste actuelle et la valeur qui fait l'objet d'une sélection/déselection
            let listIds = [...props.selectionRecipients];
            let id = parseInt(target.value);
            // La valeur est-elle sélectionnée ?
            if (target.checked) {
                // La valeur est-elle absente de la liste ?
                if (!listIds.includes(id)) {
                    // On rajoute la valeur dans la liste
                    listIds.push(id);
                }
            // Sinon si la valeur est déselectionnée
            } else {
                // La valeur est-elle incluse dans la liste ?
                if (listIds.includes(id)) {
                    // On retire la valeur de la liste
                    let idIndex = listIds.indexOf(id);
                    listIds.splice(idIndex,1);
                }
            }
            // On met à jour l'affichage de la sélection et on prépare l'objet à envoyer en BDD
            props.setSelectionRecipients(listIds);
            input.recipientsSelection = listIds;
        // Sinon, de quel champ de saisie s'agit-il ?
        } else {
            // On met à jour uniquement la valeur qui a changé
            switch (target.name) {
                case 'capsule-name':
                    input.name = target.value; 
                    break;
                default:
                    console.log('Champ non reconnu...');
                    break;
            }
        }

        // On met à jour l'objet contenant nos données
        props.setCapsule(input);
    }

    // A la validation du formulaire, se charge de faire appel à l'API pour la vérification de la saisie et l'enregistrement des données en BDD
    function handleSubmit (e) {
        // On bloque le comportement par défaut du formulaire
        e.preventDefault();

        // On fait appel à notre API en POST en passant l'objet qui contient nos données
        fetch('/capsule/api_set_capsule/' + props.id, { method: 'POST', body: JSON.stringify(props.capsule)})
        .then((headers) => {
            return headers.json();
        }).then((data) => {
            // On récupère la réponse de l'API que nous allons afficher
            props.setMessage(data);
        })
    }

    // Affichage du formulaire avec les données déjà présentes en BDD pour cette capsule
    return (
        <>
            <div className="zone-gestion text-center">
                <h3>Paramètres de ma capsule</h3>
                <div className={props.messageClass}>{props.message}</div>
                <form onSubmit={handleSubmit}>
                    <div className="form-param">
                        <div className="zone-info">
                            <div>
                                <label htmlFor="capsule-name" className="titre-photo">Nom de ma capsule</label>
                                <input type="text" id="capsule-name" name="capsule-name" value={props.capsule.name} onChange={handleChange} className="form-control"/>
                            </div>
                            <div>
                                <span className="info-capsule">Date de création : {props.creationDate}</span>
                                <span className="info-capsule">Statut de ma capsule : {sealStatus}</span>
                                <span className="info-capsule">Date de dernier verrouillage: {props.sealDate}</span>
                                <span className="info-capsule">Format de ma capsule : {format} </span>
                            </div>
                        </div>
                        <div>
                            <p>Sélectionnez vos destinataires</p>
                            {
                                props.recipients.length
                                    ? (props.recipients[0] != 0
                                        ? props.recipients.map((recipient, index) => {
                                            return <div key={recipient.id} className="card-liste mb-5">
                                                <input type="checkbox" id={'recipient-' + recipient.id} name={'recipient-' + recipient.id} value={recipient.id} defaultChecked={props.selectionRecipients.includes(recipient.id)} onChange={handleChange} className="checkbox-recipient btn-check"></input>
                                                <label htmlFor={'recipient-' + recipient.id} className="card-liste-beneficiaires d-flex justify-content-between">
                                                        <p>{recipient.firstname} {recipient.lastname}</p>
                                                </label>
                                            </div>
                                        })
                                        : ' ')
                                    : 'Vous n\'avez pas encore créé de destinataire depuis votre compte'

                            }
                        </div>
                    </div>
                    <div className="text-center mt-5">
                        <button type="submit" className="btn2 btn-dark">Enregistrer</button>
                    </div>
                </form>
            </div>
            
            
        </>
    );
}

export default MaCapsuleParams;