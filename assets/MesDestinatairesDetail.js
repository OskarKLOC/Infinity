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
            {/* <!-- DEBUT INFORMATIONS SUR LE BENEFICIAIRE --> */}
            
            <div className="text-center">
                <h4>Mon destinataire</h4>
            </div>

            <div className={messageClass}>{message}</div>

            <form className="container-fluid" onSubmit={handleSubmit}>
                
                <div className="row">
                    <div className="col-3 offset-2">
                        <div className="form-group">
                            <label htmlFor="recipient-firstname">Prénom : </label>
                            <input type="text" className="form-control" id="recipient-firstname" name="recipient-firstname" placeholder="Prénom" value={props.recipient.firstname} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="col-3 offset-2">
                        <div className="form-group">
                            <label htmlFor="recipient-lastname">NOM : </label>
                            <input type="text" className="form-control" id="recipient-lastname" name="recipient-lastname" placeholder="Nom" value={props.recipient.lastname} onChange={handleChange} /> 
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4 offset-2">
                        <div className="form-group">
                            <label htmlFor="recipient-email">Adresse e-mail : </label>
                            <input type="text" className="form-control" id="recipient-email" name="recipient-email" placeholder="Adresse e-mail" value={props.recipient.email} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="col-3 offset-1">
                        <div className="form-group">
                            <label htmlFor="recipient-phone">Téléphone : </label>
                            <input type="text" className="form-control" id="recipient-phone" name="recipient-phone" placeholder="Téléphone" value={props.recipient.phoneNumber} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-8 offset-2">
                        <div className="form-group">
                            <label htmlFor="recipient-address">Adresse postale : </label>
                            <input type="text" className="form-control" id="recipient-address" name="recipient-address" placeholder="Adresse Postale" value={props.recipient.address} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-3 offset-2">
                        <div className="form-group">
                            <label htmlFor="recipient-zipcode">Code postal : </label>
                            <input type="text" className="form-control" id="recipient-zipcode" name="recipient-zipcode" placeholder="Code postal" value={props.recipient.zipcode} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="col-3 offset-2">
                        <div className="form-group">
                            <label htmlFor="recipient-city">Ville : </label>
                            <input type="text" className="form-control" id="recipient-city" name="recipient-city" placeholder="Ville" value={props.recipient.city} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                {
                    props.mode == 'add'
                        ? <div className="text-center">
                                <button type="submit" className="btn btn-secondary">Ajouter ce nouveau destinataire</button>
                            </div>
                        : <div className="text-center">
                                <button type="submit" className="btn btn-secondary">Editer ce destinataire</button>
                            </div>
                }
            </form>

            <div className="text-center">
                <a href="#" className="btn btn-secondary" onClick={props.toggleMode}>Revenir à mes destinataires</a>
            </div>

            {/* <!-- FIN INFORMATIONS SUR LE BENEFICIAIRE --> */}

        </>
    );
}

export default MesDestinatairesDetail;