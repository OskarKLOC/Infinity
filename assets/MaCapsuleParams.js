import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MaCapsuleParams (props) {

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
                case 'capsule-status':
                    input.capsuleStatus = target.value;
                    break;
                case 'capsule-type':
                    input.format = target.value;
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
            <h2>Paramètres de ma capsule</h2>
            <div className={props.messageClass}>{props.message}</div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="capsule-name">Nom de ma capsule : </label>
                    <input type="text" id="capsule-name" name="capsule-name" value={props.capsule.name} onChange={handleChange} />
                </div>
                <div>
                    <p>Date de création : {props.creationDate}</p>
                </div>
                <div>
                    <p>Verrouillage de ma capsule</p>
                    <input type="radio" name="capsule-status" value="SEALED" id="SEALED" checked={props.capsule.capsuleStatus === "SEALED"} onChange={handleChange}/>
                    <label htmlFor="SEALED">Scellée</label>
                    <input type="radio" name="capsule-status" value="UNSEALED" id="UNSEALED" checked={props.capsule.capsuleStatus === "UNSEALED"} onChange={handleChange}/>
                    <label htmlFor="UNSEALED">Descellée</label>
                    <p>Date de dernier verrouillage: {props.sealDate}</p>
                </div>
                <div>
                    <p>Format de ma capsule</p>
                    <input type="radio" name="capsule-type" value="VIRTUAL" id="VIRTUAL" checked={props.capsule.format === "VIRTUAL"} onChange={handleChange}/>
                    <label htmlFor="VIRTUAL">Numérique</label>
                    <input type="radio" name="capsule-type" value="SOLID" id="SOLID" checked={props.capsule.format === "SOLID"} onChange={handleChange}/>
                    <label htmlFor="SOLID">Physique</label>
                </div>
                <div>
                    <p>Destinataires de ma capsule</p>
                </div>

                {
                    props.recipients.length
                        ? (props.recipients[0] != 0
                            ? props.recipients.map((recipient, index) => {
                                return <div key={recipient.id}>
                                    <input type="checkbox" id={'recipient-' + recipient.id} name={'recipient-' + recipient.id} value={recipient.id} defaultChecked={props.selectionRecipients.includes(recipient.id)} onChange={handleChange}></input>
                                    <label htmlFor={'recipient-' + recipient.id}>
                                            <p>{recipient.firstname} {recipient.lastname}</p>
                                    </label>
                                </div>
                            })
                            : ' ')
                        : 'Vous n\'avez pas encore créé de destinataire depuis votre compte'

                }
                <button type="submit">Enregistrer</button>
            </form>
        </>
    );
}

export default MaCapsuleParams;