import React from 'react';
import { useEffect, useState } from 'react';

function MesDestinatairesDetail (props) {

    // On définit nos variables d'état
    const [message, setMessage] = useState('');             // Message contextuel de succès ou d'échec de l'action
    const [messageClass, setMessageClass] = useState('');   // Classe l'affichage bootstrap de notre message

    // Si la variable d'état est alimentée d'un message à afficher
    useEffect(() => {
        // On fournit la classe bootstrap pour le style
        if (message != '') {
            setMessageClass('alert alert-primary');
        }
        // On lance une commande pour retirer l'affichage du message au bout de quelques secondes
        setTimeout(() => {
            setMessage('');
            setMessageClass('');
        }, 7000);
    },[message]);

    // Récupère chaque modification du formulaire et remplace la valeur dans la variable d'état
    function handleChange (e) {
        let target = e.currentTarget;           // Champ du formulaire à l'origine de l'appel de la fonction
        let input = {...props.recipient};       // Copie de notre destinataire pour pouvoir fournir la valeur saisie

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
                input.phoneNumber = target.value; 
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
        props.setRecipient(input);
    }

    // A la validation du formulaire, se charge de faire appel à l'API pour la vérification de la saisie et l'enregistrement des données en BDD
    function handleSubmit (e) {
        // On bloque le comportement par défaut du formulaire
        e.preventDefault();
        
        // Sommes-nous en mode d'ajout d'un nouveau destinaire ?
        if (props.mode == 'add') {
            // On fait appel à notre API en POST en passant l'objet qui contient nos données
            fetch('/moncompte/api_new_recipient', { method: 'POST', body: JSON.stringify(props.recipient)})
            .then((headers) => {
                return headers.json();
            }).then((data) => {
                if (data.success) {
                    // Si l'ajout est un succès, on revient à la liste
                    props.toggleMode();
                } else {
                    // Sinon, on affiche le message d'erreur
                    setMessage(data.message);
                }
            })
        }

        // Sommes-nous en mode d'édition d'un destinaire existant ?
        if (props.mode == 'edit') {
            // On fait appel à notre API en POST en passant l'objet qui contient nos données
            fetch('/moncompte/api_set_user/' + props.recipient.id, { method: 'POST', body: JSON.stringify(props.recipient)})
            .then((headers) => {
                return headers.json();
            }).then((data) => {
                if (data.success) {
                    // Si l'édition est un succès, on revient à la liste
                    props.toggleMode();
                } else {
                    // Sinon, on affiche le message d'erreur
                    setMessage(data.message);
                }
            })
        }
    }
    
    // On affiche le formulaire de saisie, prérempli en mode d'édition
    return (
        <>
            <h3>Mon destinataire</h3>
            <div className={messageClass}>{message}</div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="recipient-firstname">Prénom : </label>
                    <input type="text" id="recipient-firstname" name="recipient-firstname" value={props.recipient.firstname} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="recipient-lastname">NOM : </label>
                    <input type="text" id="recipient-lastname" name="recipient-lastname" value={props.recipient.lastname} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="recipient-email">Email : </label>
                    <input type="text" id="recipient-email" name="recipient-email" value={props.recipient.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="recipient-phone">Téléphone : </label>
                    <input type="text" id="recipient-phone" name="recipient-phone" value={props.recipient.phoneNumber} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="recipient-address">Adresse : </label>
                    <input type="text" id="recipient-address" name="recipient-address" value={props.recipient.address} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="recipient-zipcode">Code postal : </label>
                    <input type="text" id="recipient-zipcode" name="recipient-zipcode" value={props.recipient.zipcode} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="recipient-city">Ville : </label>
                    <input type="text" id="recipient-city" name="recipient-city" value={props.recipient.city} onChange={handleChange} />
                </div>
                {
                    props.mode == 'add'
                        ? <button type="submit">Ajouter ce nouveau destinataire</button>
                        : <button type="submit">Editer ce destinataire</button>
                }
            </form>
            <button onClick={props.toggleMode}>Revenir à mes destinataires</button>
        </>
    );
}

export default MesDestinatairesDetail;