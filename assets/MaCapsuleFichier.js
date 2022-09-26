import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FileUploader } from "react-drag-drop-files";

function MaCapsuleFichier (props) {
    
    // On définit les paramètres personnalisés de la zone drag & drop suivant le type de fichier
    let fileTypes = [];
    let maxSize = 5;

    if (props.type == 'photo') {
        fileTypes = ["JPG", "PNG", "GIF"];
        maxSize = 5;
    }
    if (props.type == 'audio') {
        fileTypes = ["M4A", "WAV"];
        maxSize = 5;
    }
    if (props.type == 'vidéo') {
        fileTypes = ["MP4", "AVI", "MPG"];
        maxSize = 30;
    }

    // Au chargement du module, on initialise les premières données de l'objet qui sera retourné
    useEffect(() => {
        let contentParameters = new Object();
        contentParameters.capsuleId = props.id;
        contentParameters.type = props.type;
        contentParameters.name = '';
        contentParameters.message = '';
        props.setContent(contentParameters);
        props.setFile({});
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

    // A chaque utilisation de la fonctionnalité de drag&drop, conserve le dernier fichier chargé
    function handleChangeFile (newFile) {
        props.setFile(newFile);
    }

    useEffect(() => {
        console.log(props.file);
    }, [props.file]);


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
                props.changeView();
            } else {
                // Sinon, on affiche le message d'erreur
                props.setMessage(data.message);
            }
        })
    }

    // On affiche le rendu résultant
    return (
        <>
            <div className="zone-gestion text-center">
                <h3>Ajout d'un message {props.type}</h3>
                <div className={props.messageClass}>{props.message}</div>
                <form onSubmit={handleSubmit} method="post" encType="multipart/form-data" className="col-1 bloc-fichier mt-5">
                    <div>
                        <label htmlFor="capsule-fichier" className="titre-photo">Chargement de votre {props.type}</label>
                        {/* Documentation de l'élément Drag & Drop : */}
                        {/* https://www.npmjs.com/package/react-drag-drop-files */}
                        <FileUploader
                                handleChange={handleChangeFile}
                                name="newFile"
                                types={fileTypes}
                                label="Recherchez ou déposez votre fichier ici" 
                                hoverTitle="Déposez votre fichier ici"
                                maxSize={maxSize}
                                classes="upload-items"
                        />
                    </div>
                    <div className="bloc">
                        <div className="form-group m-4">
                            <label htmlFor="capsule-fichier-title" className="titre-photo">Titre de votre {props.type}</label>
                            <i className="ligne"></i>
                        </div>
                        <div className="bloc-titre px-5 mb-5">
                            <input type="text" id="capsule-fichier-title" name="capsule-fichier-title" value={props.content.name} onChange={handleChange} className="form-control" placeholder="Votre titre"/>
                        </div>

                        <div className="form-group m-4">
                            <label htmlFor="capsule-fichier-text" className="titre-photo" >Commentaire sur votre {props.type}</label>
                        </div>
                        <div className="bloc-commentaire px-5">
                            <textarea name="capsule-fichier-text" id="capsule-fichier-text" value={props.content.message} onChange={handleChange} className="form-control">Votre commentaire</textarea>
                        </div>
                            
                        <div className="text-center mt-5">
                            <button type="submit" className="btn2 btn-dark">Enregistrer</button>
                        </div>
                    </div>
                </form>
            </div>
                
            
        </>
    );
}

export default MaCapsuleFichier;