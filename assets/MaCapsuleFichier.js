import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MaCapsuleFichier (props) {
    
    // On définit les types de fichiers acceptés
    let accept = '';
    if (props.type == 'photo') {accept='image/*';}
    if (props.type == 'audio') {accept='audio/*';}
    if (props.type == 'vidéo') {accept='video/*';}
    
    // Au chargement du module, on initialise les premières données de l'objet qui sera retourné
    useEffect(() => {
        let contentParameters = new Object();
        contentParameters.capsuleId = props.id;
        contentParameters.type = props.type;
        contentParameters.name = '';
        contentParameters.message = '';
        props.setContent(contentParameters);
    },[,props.reload]);

    // A chaque saisie dans le formulaire, on garde une trace de la saisie active
    function handleChange (e) {
        let target = e.currentTarget;       // Champ du formulaire à l'origine de l'appel de la fonction
        let input = {...props.content};     // Copie de notre capsule pour pouvoir fournir la valeur saisie

        // On met à jour uniquement la valeur qui a changé
        switch (target.name) {
            case 'capsule-fichier-title':
                input.name = target.value; 
                break;
            case 'capsule-fichier':
                props.setFile(target.files[0]);
                break;
            case 'capsule-fichier-text':
                input.message = target.value;
                break;
            default:
                console.log('Champ non reconnu...');
                break;
        }
        
        // On met à jour l'objet contenant nos données
        props.setContent(input);
    }

     // A la validation du formulaire, se charge de faire appel à l'API pour la vérification de la saisie et l'enregistrement des données en BDD
     function handleSubmit (e) {
        // On bloque le comportement par défaut du formulaire
        e.preventDefault();

        // On déclare un objet FormData qui nous sera nécessaire pour envoyer l'ensemble du contenu avec le fichier
        let formData = new FormData();
        formData.append('content', JSON.stringify(props.content));
        formData.append('file', props.file);

        // On fait appel à notre API en POST en passant l'objet qui contient nos données
        fetch('/content/api_set_content/' + props.id, { method: 'POST', body: formData})
        .then((headers) => {
            return headers.json();
        }).then((data) => {
            if (data.success) {
                // Si l'édition est un succès, on affiche la librairie des contenus
                // props.toggleMode();
            } else {
                // Sinon, on affiche le message d'erreur
                props.setMessage(data.message);
            }
        })
    }

    // On affiche le rendu résultant
    return (
        <>
            <h2>Ajout d'un message {props.type} à ma capsule</h2>
            <div className={props.messageClass}>{props.message}</div>
            <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
                <div>
                    <label htmlFor="capsule-fichier-title">Titre de votre {props.type} : </label>
                    <input type="text" id="capsule-fichier-title" name="capsule-fichier-title" value={props.content.name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="capsule-fichier">Chargement de votre {props.type} : </label>
                    <input type="file" accept={accept} capture="user" id="capsule-fichier" name="capsule-fichier" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="capsule-fichier-text">Commentaire sur votre {props.type} : </label>
                    <textarea name="capsule-fichier-text" id="capsule-fichier-text" value={props.content.message} onChange={handleChange}></textarea>
                </div>
                <button type="submit">Enregistrer</button>
            </form>
        </>
    );
}

export default MaCapsuleFichier;