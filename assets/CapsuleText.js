import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useParams } from 'react-router-dom';


function CapsuleText () {
    
    // Variable pour nous permettre d'utiliser l'id passé en GET
    let params = useParams();

    // Vartiable nécessaire pour notre module TinyMCE
    const editorRef = useRef(null);

    // Variables d'état
    const [message, setMessage] = useState('');             // Message contextuel de succès ou d'échec de l'action
    const [messageClass, setMessageClass] = useState('');   // Classe l'affichage bootstrap de notre message
    const [content, setContent] = useState({});             // Objet contenant les informations à passer en POST

    // Au chargement du module, on initialise les premières données de l'objet qui sera retourné
    useEffect(() => {
        let contentParameters = new Object();
        contentParameters.capsuleId = params.id;
        contentParameters.type = 'texte';
        setContent(contentParameters);
        console.log(contentParameters);
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
    // Exception : la saisie TinyMCE est gérée directement par ce dernier
    function handleChange (e) {
        let target = e.currentTarget;   // Champ du formulaire à l'origine de l'appel de la fonction
        let input = {...content};       // Copie notre contenu pour pouvoir ajouter une valeur saisie

        // On met à jour uniquement la valeur qui a changé
        switch (target.name) {
            case 'capsule-text-title':
                input.name = target.value; 
                break;
            default:
                console.log('Champ non reconnu...');
                break;
        }
        
        // On met à jour l'objet contenant nos données
        setContent(input);
    }

     // A la validation du formulaire, se charge de faire appel à l'API pour la vérification de la saisie et l'enregistrement des données en BDD
     // Au préalable, récupération du contenu TinyMCE
     function handleSubmit (e) {
        // On bloque le comportement par défaut du formulaire
        e.preventDefault();

        // On copie notre contenu pour pouvoir ajouter une valeur
        let input = {...content};       
        
        // On récupère le message formaté de TinyMCE
        if (editorRef.current) {
            input.message = editorRef.current.getContent();
        }

        // On met à jour l'objet contenant nos données
        setContent(input);
        console.log(input);
        let formData = new FormData();
        formData.append('content', JSON.stringify(content));

        // On fait appel à notre API en POST en passant l'objet qui contient nos données
        fetch('/content/api_set_content/' + content.capsuleId, { method: 'POST', body: formData})
        .then((headers) => {
            return headers.json();
        }).then((data) => {
            // On récupère la réponse de l'API que nous allons afficher
            setMessage(data);
        })
    }

    return (
        <>
            <h2>Ajout d'un contenu texte à ma capsule</h2>
            <form onSubmit={handleSubmit} method="post">
                <div>
                    <label htmlFor="capsule-text-title">Titre général de votre texte : </label>
                    <input type="text" id="capsule-text-title" name="capsule-text-title" onChange={handleChange} />
                </div>
                <Editor
                    tinymceScriptSrc={'../../tinymce/tinymce.min.js'}
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue='<p>This is the initial content of the editor.</p>'
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                            ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
                <button type="submit">Enregistrer</button>
            </form>
        </>
    );
}

export default CapsuleText;