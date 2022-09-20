import React from 'react';
import { useEffect, useState } from 'react';
import MaCapsuleAffichage from './MaCapsuleAffichage';


function MaCapsule () {
    
    // On récupère l'identifiant de la capsule
    let id = window.location.pathname.replace('/capsule/','');

    // On déclare toutes nos variables d'état
    const [capsule, setCapsule] = useState({});             // Contenant des paramètres généraux de la capsule
    const [contents, setContents] = useState([]);           // Contenant de la liste des contenus associés à la capsule
    const [selection, setSelection] = useState([]);         // Contenant des identifiants des contenus sélectionnés
    const [creationDate, setCreationDate] = useState('');   // Date de création
    const [sealDate, setSealDate] = useState('');           // Date de dernier scellé
    const [message, setMessage] = useState('');             // Message contextuel de succès ou d'échec de l'action
    const [messageClass, setMessageClass] = useState('');   // Classe l'affichage bootstrap de notre message
    const [recipients, setRecipients] = useState([0]);      // Contenant de l'ensemble de la liste des destinataires
    const [selectionRecipients, setSelectionRecipients] = useState([]);     // Contenant des identifiants des destinataires sélectionnés
    const [content, setContent] = useState({});             // Contenant des paramètres d'un contenu donné
    const [file, setFile] = useState(null);                 // Contenant des paramètres d'un fichier donné
    

    // Au chargement du module, on récupère via l'API les données de la capsule
    useEffect(() => {
        // On récupère les paramètres de base
        fetch('/capsule/api_get_capsule/' + id)
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
        fetch('/moncompte/api_get_selected_recipients/' + id)
        .then((headers) => {
            return headers.json();
        }).then((data) => {
            // On stocke l'objet dans la variable d'état (un JSON Parse est nécessaire pour l'objet correspondant à l'entité)
            setSelectionRecipients(data.selection);
        })

        // On récupère la liste de tous les destinataires
        fetch('/moncompte/api_get_all_recipients')
        .then((headers) => {
            return headers.json();
        }).then((data) => {
            // On stocke l'objet dans la variable d'état (un JSON Parse est nécessaire pour l'objet correspondant à l'entité)
            setRecipients(JSON.parse(data.recipients));
        })
    },[]);


    // On récupère via l'API tous les contenus associables à la capsule
    useEffect(() => {
        // Appel de notre API en l'identifiant de la capsule en paramètre GET
        fetch('/content/api_get_all_content/' + id)
        .then((headers) => {
            return headers.json();
        }).then((data) => {
            setContents(JSON.parse(data));
        })
    },[capsule]);

    // On définit la liste des contenus sélectionnés
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
        if (message != '') {
            setMessageClass('alert alert-primary');
        }
        // On lance une commande pour retirer l'affichage du message au bout de quelques secondes
        setTimeout(() => {
            setMessage('');
            setMessageClass('');
        }, 7000);
    },[message]);

    // On fait appel au composant d'affichage à qui nous passons nos props
    return (
        <>
            <MaCapsuleAffichage id={id} capsule={capsule} setCapsule={setCapsule} creationDate={creationDate} sealDate={sealDate} message={message} setMessage={setMessage} messageClass={messageClass} setMessageClass={setMessageClass} recipients={recipients} setRecipients={setRecipients} selectionRecipients={selectionRecipients} setSelectionRecipients={setSelectionRecipients} content={content} setContent={setContent} file={file} setFile={setFile} contents={contents} setContents={setContents} selection={selection} setSelection={setSelection}></MaCapsuleAffichage>
        </>
    );
}

export default MaCapsule;