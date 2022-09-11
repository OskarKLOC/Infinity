import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CapsulePhoto () {
    // Variable pour nous permettre d'utiliser l'id passé en GET
    let params = useParams();
    
    const [message, setMessage] = useState('');             // Message contextuel de succès ou d'échec de l'action
    const [messageClass, setMessageClass] = useState('');   // Classe l'affichage bootstrap de notre message
    const [content, setContent] = useState({});             // Objet contenant les informations à passer en POST
    const [file, setFile] = useState(null);                 // Objet contenant le fichier à passer en POST

    // Au chargement du module, on initialise les premières données de l'objet qui sera retourné
    useEffect(() => {
        let contentParameters = new Object();
        contentParameters.capsuleId = params.id;
        contentParameters.type = 'Photo';
        setContent(contentParameters);
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

    function handleChange (e) {
        let target = e.currentTarget;   // Champ du formulaire à l'origine de l'appel de la fonction
        let input = {...content};       // Copie de notre capsule pour pouvoir fournir la valeur saisie

        // On met à jour uniquement la valeur qui a changé
        switch (target.name) {
            case 'capsule-photo-name':
                input.name = target.value; 
                break;
            case 'capsule-photo':
                setFile(target.files[0]);
                break;
            case 'capsule-photo-text':
                input.description = target.value;
                break;
            default:
                console.log('Champ non reconnu...');
                break;
        }
        
        // On met à jour l'objet contenant nos données
        setContent(input);
    }

     // A la validation du formulaire, se charge de faire appel à l'API pour la vérification de la saisie et l'enregistrement des données en BDD
     function handleSubmit (e) {
        // On bloque le comportement par défaut du formulaire
        e.preventDefault();
        console.log(content);

        let formData = new FormData();
        // formData.append('capsuleId', params.id);
        // formData.append('type', 'Photo');
        // formData.append('name', content.name);
        // formData.append('description', content.description);
        formData.append('content', JSON.stringify(content));
        formData.append('file', file);

        // On fait appel à notre API en POST en passant l'objet qui contient nos données
        //fetch('/content/api_set_content/1', { method: 'POST', headers: {'content-type': 'multipart/form-data'}, body: JSON.stringify(content)})
        fetch('/content/api_set_content/1', { method: 'POST', body: formData})
        .then((headers) => {
            return headers.json();
        }).then((data) => {
            // On récupère la réponse de l'API que nous allons afficher
            setMessage(data);
        })
    }


    return (
        <>
            <h2>Ajout d'une photo à ma capsule</h2>
            <div className={messageClass}>{message}</div>
            <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
                <div>
                    <label htmlFor="capsule-photo-name">Titre de votre photo : </label>
                    <input type="text" id="capsule-photo-name" name="capsule-photo-name" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="capsule-photo">Photo à charger : </label>
                    <input type="file" accept="image/png, image/jpeg, capture" capture="user" id="capsule-photo" name="capsule-photo" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="capsule-photo-text">Commentaire sur votre photo : </label>
                    <textarea name="capsule-photo-text" id="capsule-photo-text" onChange={handleChange}></textarea>
                </div>
                <button type="submit">Enregistrer</button>
                <p> </p>
            </form>
        </>
    );
}

export default CapsulePhoto;