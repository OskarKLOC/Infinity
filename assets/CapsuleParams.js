import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CapsuleParams () {

    // Variable pour nous permettre d'utiliser l'id passé en GET
    let params = useParams();

    // Variables d'état
    const [capsule, setCapsule] = useState({});             // Objet récupéré et renvoyé
    const [creationDate, setCreationDate] = useState('');   // Date de création
    const [sealDate, setSealDate] = useState('');           // Date de dernier scellé
    const [message, setMessage] = useState('');             // Message contextuel de succès ou d'échec de l'action
    const [messageClass, setMessageClass] = useState('');   // Classe l'affichage bootstrap de notre message
    const [recipients, setRecipients] = useState([0]);
    const [selectionRecipients, setSelectionRecipients] = useState([]);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        console.log(recipients);
        console.log(selectionRecipients);
        setIsReady(true);
    },[recipients, selectionRecipients]);

    // Au chargement du module, on récupère via l'API les données de la capsule
    useEffect(() => {
        // On récupère les paramètres de base
        fetch('/capsule/api_get_capsule/' + params.id)
        .then((headers) => {
            return headers.json();
        }).then((data) => {
            // Il nous est nécessaire de parser le JSON pour récupérer l'objet
            let dataObject = JSON.parse(data);
            // On stocke l'objet dans la variable d'état
            setCapsule(dataObject);
            // On récupère immédiatement les dates à afficher au bon format (si elle existe)
            setCreationDate(new Date(dataObject.creationDate.timestamp * 1000).toLocaleDateString());
            if (dataObject.sealDate) {
                setSealDate(new Date(dataObject.sealDate.timestamp * 1000).toLocaleDateString());
            }
            else {
                setSealDate('Votre capsule n\'a pas encore été verrouillée une première fois');
            }
        })

        // On récupère la liste de tous les destinataires
        fetch('/moncompte/api_get_all_recipients')
        .then((headers) => {
            return headers.json();
        }).then((data) => {
            // On stocke l'objet dans la variable d'état (un JSON Parse est nécessaire pour l'objet correspondant à l'entité)
            setRecipients(JSON.parse(data.recipients));
        })

        // On récupère la liste de tous les destinataires
        fetch('/moncompte/api_get_selected_recipients/' + params.id)
        .then((headers) => {
            return headers.json();
        }).then((data) => {
            // On stocke l'objet dans la variable d'état (un JSON Parse est nécessaire pour l'objet correspondant à l'entité)
            setSelectionRecipients(data.selection);
        })

    },[]);

    // Si la variable d'état est alimentée d'un message à afficher
    useEffect(() => {
        // On fournit la classe bootstrap pour le style
        setMessageClass('alert alert-primary');
        // On lance une commande pour retirer l'affichage du message au bout de quelques secondes
        setTimeout(() => {
            setMessage('');
            setMessageClass('');
        }, 7000);
    },[message]);
    
    // Récupère chaque modification du formulaire et remplace la valeur dans la variable d'état
    function handleChange (e) {
        let target = e.currentTarget;   // Champ du formulaire à l'origine de l'appel de la fonction
        let input = {...capsule};       // Copie de notre capsule pour pouvoir fournir la valeur saisie

        if (target.type == 'checkbox') {
            let listIds = [...selectionRecipients];
            let id = parseInt(target.value);
            if (target.checked) {
                if (!listIds.includes(id)) {
                    listIds.push(id);
                }
            } else {
                if (listIds.includes(id)) {
                    let idIndex = listIds.indexOf(id);
                    listIds.splice(idIndex,1);
                }
            }
            setSelectionRecipients(listIds);
            input.recipientsSelection = listIds;
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
        setCapsule(input);
    }

    // A la validation du formulaire, se charge de faire appel à l'API pour la vérification de la saisie et l'enregistrement des données en BDD
    function handleSubmit (e) {
        // On bloque le comportement par défaut du formulaire
        e.preventDefault();

        console.log(capsule);

        // On fait appel à notre API en POST en passant l'objet qui contient nos données
        fetch('/capsule/api_set_capsule/' + capsule.id, { method: 'POST', body: JSON.stringify(capsule)})
        .then((headers) => {
            return headers.json();
        }).then((data) => {
            // On récupère la réponse de l'API que nous allons afficher
            setMessage(data);
        })
    }

    // Affichage du formulaire avec les données déjà présentes en BDD pour cette capsule
    return (
        <>
            <h2>Paramètres de ma capsule</h2>
            <div className={messageClass}>{message}</div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="capsule-name">Nom de ma capsule : </label>
                    <input type="text" id="capsule-name" name="capsule-name" value={capsule.name} onChange={handleChange} />
                </div>
                <div>
                    <p>Date de création : {creationDate}</p>
                </div>
                <div>
                    <p>Verrouillage de ma capsule</p>
                    <input type="radio" name="capsule-status" value="SEALED" id="SEALED" checked={capsule.capsuleStatus === "SEALED"} onChange={handleChange}/>
                    <label htmlFor="SEALED">Scellée</label>
                    <input type="radio" name="capsule-status" value="UNSEALED" id="UNSEALED" checked={capsule.capsuleStatus === "UNSEALED"} onChange={handleChange}/>
                    <label htmlFor="UNSEALED">Descellée</label>
                    <p>Date de dernier verrouillage: {sealDate}</p>
                </div>
                <div>
                    <p>Format de ma capsule</p>
                    <input type="radio" name="capsule-type" value="VIRTUAL" id="VIRTUAL" checked={capsule.format === "VIRTUAL"} onChange={handleChange}/>
                    <label htmlFor="VIRTUAL">Numérique</label>
                    <input type="radio" name="capsule-type" value="SOLID" id="SOLID" checked={capsule.format === "SOLID"} onChange={handleChange}/>
                    <label htmlFor="SOLID">Physique</label>
                </div>
                <div>
                    <p>Destinataires de ma capsule</p>
                </div>

                {
                    recipients.length
                        ? (recipients[0] != 0
                            ? recipients.map((recipient, index) => {
                                return <div key={recipient.id}>
                                    <input type="checkbox" id={'recipient-' + recipient.id} name={'recipient-' + recipient.id} value={recipient.id} defaultChecked={selectionRecipients.includes(recipient.id)} onChange={handleChange}></input>
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

export default CapsuleParams;