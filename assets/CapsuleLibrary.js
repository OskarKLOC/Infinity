import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CapsuleLibrary () {
    
    let params = useParams();
    
    const [contents, setContents] = useState([]);
    const [selection, setSelection] = useState([]);
    const [message, setMessage] = useState('');             // Message contextuel de succès ou d'échec de l'action
    const [messageClass, setMessageClass] = useState('');   // Classe l'affichage bootstrap de notre message

    // Au chargement du module, on récupère via l'API les données de la capsule
    useEffect(() => {
        // Appel de notre API en l'identifiant de la capsule en paramètre GET
        fetch('/content/api_get_all_content/' + params.id)
        .then((headers) => {
            return headers.json();
        }).then((data) => {
            console.log(JSON.parse(data));
            setContents(JSON.parse(data));
            // Il nous est nécessaire de parser le JSON pour récupérer l'objet
            // let dataObject = JSON.parse(data);
            // On stocke l'objet dans la variable d'état
            // setContents(dataObject);
        })
    },[]);

    useEffect(() => {
        let listIds = [...selection];
        contents.forEach((content) => {
            if (content.contenusStatus == 'ADDED') {
                listIds.push(content.id);
            }
        });
        setSelection(listIds);
    },[contents]);

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
        let listIds = [...selection];
        let id = parseInt(e.currentTarget.value);

        if (e.currentTarget.checked) {
            if (!listIds.includes(id)) {
                listIds.push(id);
            }
        } else {
            if (listIds.includes(id)) {
                let idIndex = listIds.indexOf(id);
                listIds.splice(idIndex,1);
            }
        }

        setSelection(listIds);
        console.log(listIds);
    }

    function handleSubmit (e) {
        // On bloque le comportement par défaut du formulaire
        e.preventDefault();
        // On fait appel à notre API en POST en passant l'objet qui contient nos données
        fetch('/content/api_set_selection/1', { method: 'POST', body: JSON.stringify(selection)})
        .then((headers) => {
            return headers.json();
        }).then((data) => {
            // On récupère la réponse de l'API que nous allons afficher
            setMessage(data);
        })
    }

    

    return (
        <>
            <h2>Librairie de ma capsule</h2>
            <div className={messageClass}>{message}</div>
            <form onSubmit={handleSubmit}>
                {
                    contents.map((content, index) => {
                        return <div key={content.id}>
                            <label htmlFor={'content-' + content.id}>
                                <div>
                                    <p>{content.contentType}</p>
                                    <p>{content.contentName}</p>
                                </div>
                            </label>
                            <input type="checkbox" id={'content-' + content.id} name={'content-' + content.id} value={content.id} defaultChecked={content.contenusStatus === "ADDED"} onChange={handleChange}></input>
                        </div>
                    })
                }
                <button type="submit">Enregistrer</button>
            </form>
        </>
    )
}

export default CapsuleLibrary;

