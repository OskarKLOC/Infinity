import React from 'react';
import { useEffect, useState } from 'react';

function MonDestinataire (props) {
    
    const [recipient, setRecipient] = useState({});

    // Au chargement du module, on récupère la liste des capsules à afficher
    useEffect(() => {
        if (props.mode == 'edit') {
            console.log(parseInt(props.id));
            // On fait appel à notre API en POST en passant l'objet qui contient nos données
            fetch('/moncompte/api_get_user/' + parseInt(props.id))
            .then((headers) => {
                return headers.json();
            }).then((data) => {
                // On récupère la réponse de l'API que nous allons afficher
                setRecipient(JSON.parse(data));
            })
        }
    },[]);

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
        
        if (props.mode == 'add') {
            // On fait appel à notre API en POST en passant l'objet qui contient nos données
            fetch('/moncompte/api_new_recipient', { method: 'POST', body: JSON.stringify(recipient)})
            .then((headers) => {
                return headers.json();
            }).then((data) => {
                // On récupère la réponse de l'API que nous allons afficher
                // console.log(data);
                // On lance une nouvelle recherche de toutes les capsules
                //searchAllRecipients();
                console.log(data);
                props.toggleMode();
            })
        }

        if (props.mode == 'edit') {
            // On fait appel à notre API en POST en passant l'objet qui contient nos données
            fetch('/moncompte/api_set_user/' + recipient.id, { method: 'POST', body: JSON.stringify(recipient)})
            .then((headers) => {
                return headers.json();
            }).then((data) => {
                // On récupère la réponse de l'API que nous allons afficher
                console.log(data);
                props.toggleMode();
            })
        }
        
        
        
        // setIsEditMode(false);
    }
    
    return (
        <>
        <h3>Mon destinataire</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="recipient-firstname">Prénom : </label>
                    <input type="text" id="recipient-firstname" name="recipient-firstname" value={recipient.firstname} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="recipient-lastname">NOM : </label>
                    <input type="text" id="recipient-lastname" name="recipient-lastname" value={recipient.lastname} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="recipient-email">Email : </label>
                    <input type="text" id="recipient-email" name="recipient-email" value={recipient.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="recipient-phone">Téléphone : </label>
                    <input type="text" id="recipient-phone" name="recipient-phone" value={recipient.phone} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="recipient-address">Adresse : </label>
                    <input type="text" id="recipient-address" name="recipient-address" value={recipient.address} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="recipient-zipcode">Code postal : </label>
                    <input type="text" id="recipient-zipcode" name="recipient-zipcode" value={recipient.zipcode} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="recipient-city">Ville : </label>
                    <input type="text" id="recipient-city" name="recipient-city" value={recipient.city} onChange={handleChange} />
                </div>
                {
                    props.mode == 'add'
                        ? <button type="submit">Ajouter ce nouveau destinataire</button>
                        : <button type="submit">Editer ce destinataire</button>
                }
            </form>
            {
                props.mode == 'add'
                    ? <button onClick={props.toggleAddMode}>Revenir à mes destinataires</button>
                    : <button onClick={props.toggleEditMode}>Revenir à mes destinataires</button>
            }
        </>
    );
}

export default MonDestinataire;