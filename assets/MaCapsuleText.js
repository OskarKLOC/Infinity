import React, { useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';


function MaCapsuleText (props) {
    
    // Vartiable nécessaire pour notre module TinyMCE
    const editorRef = useRef(null);

    // Au chargement/rechargement du module, on initialise les premières données de l'objet qui sera retourné
    useEffect(() => {
        let contentParameters = new Object();
        contentParameters.capsuleId = props.id;
        contentParameters.type = 'texte';
        contentParameters.name = '';
        contentParameters.message = '';
        props.setContent(contentParameters);
    },[, props.reload]);

    // Récupère chaque modification du formulaire et remplace la valeur dans la variable d'état
    // Exception : la saisie TinyMCE est gérée directement par ce dernier
    function handleChange (e) {
        let target = e.currentTarget;   // Champ du formulaire à l'origine de l'appel de la fonction
        let input = {...props.content};       // Copie notre contenu pour pouvoir ajouter une valeur saisie

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
        props.setContent(input);
    }

     // A la validation du formulaire, se charge de faire appel à l'API pour la vérification de la saisie et l'enregistrement des données en BDD
     // Au préalable, récupération du contenu TinyMCE
     function handleSubmit (e) {
        // On bloque le comportement par défaut du formulaire
        e.preventDefault();

        // On copie notre contenu pour pouvoir ajouter une valeur
        let input = {...props.content};       
        
        // On récupère le message formaté de TinyMCE
        if (editorRef.current) {
            input.message = editorRef.current.getContent();
        }

        // On met à jour l'objet contenant nos données
        props.setContent(input);
        
        // La suite du code d'appel à l'API est gérée ci-dessous dans un useEffect à l'écoute du changement de la variable d'état "content"
    }

    // Au changement de la variable d'état "content"
    useEffect(() => {
        // Le message de fin a-t-il été ajouté ?
        if (props.content.message) {
            let formData = new FormData();
            formData.append('content', JSON.stringify(props.content));

            // On fait appel à notre API en POST en passant l'objet qui contient nos données
            fetch('/content/api_set_content/' + props.id, { method: 'POST', body: formData})
            .then((headers) => {
                return headers.json();
            }).then((data) => {
                // On récupère la réponse de l'API que nous allons afficher
                props.setMessage(data);
            })
        }
    },[props.content]);

    // On affiche le rendu
    return (
        <>
            <h2>Ajout d'un contenu texte à ma capsule</h2>
            <div className={props.messageClass}>{props.message}</div>
            <form onSubmit={handleSubmit} method="post">
                <div>
                    <label htmlFor="capsule-text-title">Titre général de votre texte : </label>
                    <input type="text" id="capsule-text-title" name="capsule-text-title" value={props.content.name} onChange={handleChange} />
                </div>
                <Editor
                    tinymceScriptSrc={'../../tinymce/tinymce.min.js'}
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue='<p>Laissez votre message personnalisé ici...</p>'
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

export default MaCapsuleText;