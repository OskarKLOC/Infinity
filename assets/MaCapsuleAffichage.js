import React, { useEffect } from 'react';
import { useState } from 'react';
import MaCapsuleAccueil from './MaCapsuleAccueil';
import MaCapsuleFichier from './MaCapsuleFichier';
import MaCapsuleLibrary from './MaCapsuleLibrary';
import MaCapsuleNavVirtual from './MaCapsuleNavVirtual';
import MaCapsuleParams from './MaCapsuleParams';
import MaCapsuleText from './MaCapsuleText';

function MaCapsuleAffichage (props) {
    
    // On déclare les variables d'état propres au composant
    const [mode, setMode] = useState('');
    const [isVirtual, setIsVirtual] = useState(false);
    const [reload, setReload] = useState(true);
    const [isSealed, setIsSealed] = useState(undefined);

    // On récupère le format de la capsule pour conditionner une partie de l'affichage
    useEffect(() => {
        if (props.capsule.format == 'VIRTUAL') {
            setIsVirtual(true);
        }
    }, [props.capsule]);

    // On vérifie le statut scellé ou descellé de la capsule
    useEffect (() => {
        // On affecte simplement la valeur correspondante pour orienter certains choix et options d'affichage
        if (isSealed == undefined) {
            if (props.capsule.capsuleStatus == 'SEALED') {
                setIsSealed(true)
            } else if (props.capsule.capsuleStatus == 'UNSEALED') {
                setIsSealed(false);
            }
        }
    }, [props.capsule]);

    // On gère le changement de vue
    function changeView (event) {
        // La capsule est-elle déverrouillée ? Dans le cas contraire, on ne fera rien
        if (!isSealed) {
            // On récupère la vue souhaitée
            let mode = event.currentTarget.dataset.mode;

            // On demande le rechargement de certains composants
            setReload(!reload);

            // On applique le choix de vue souhaitée
            switch (mode) {
                case 'params':
                    setMode('params');
                    break;
                case 'text':
                    setMode('text');
                    break;
                case 'photo':
                    setMode('photo');
                    break;
                case 'audio':
                    setMode('audio');
                    break;
                case 'video':
                    setMode('vidéo');
                    break;
                case 'library':
                    setMode('library');
                    break;    
                default:
                    setMode('');
                    break;
            }
        }
    }
    
    // Au clic sur le bouton de gestion du verrouillage, on lance les actions attendues
    function toggleSeal () {
        // On fait appel à notre API pour ajuster le statut
        fetch('/capsule/api_set_seal/' + props.id)
        .then((headers) => {
            return headers.json();
        }).then((data) => {
            // On récupère la réponse de l'API que nous allons afficher
            props.setMessage(data);
            // On change le statut de la capsule chargée sans faire appel à l'API de nouveau
            let input = {...props.capsule};
            if (input.capsuleStatus == 'SEALED') {
                input.capsuleStatus = 'UNSEALED'
                setIsSealed(false)
            } else if (input.capsuleStatus == 'UNSEALED') {
                input.capsuleStatus = 'SEALED';
                setIsSealed(true);
                setMode('');
            }
            props.setCapsule(input);
        })
    }

    // On fait appel aux composants d'affichage à qui nous passons nos props, et qui se basent sur les conditions définies dans le présent composant
    return (
        <>
            <div>
                <div onClick={changeView} data-mode="params">Paramètres</div>
                {
                    isVirtual
                        ? <MaCapsuleNavVirtual changeView={changeView}></MaCapsuleNavVirtual>
                        : ''
                }
                
            </div>

            {
                mode == ''
                    ? <MaCapsuleAccueil isSealed={isSealed}></MaCapsuleAccueil>
                    : mode == 'params'
                        ? <MaCapsuleParams id={props.id} capsule={props.capsule} setCapsule={props.setCapsule} recipients={props.recipients} setRecipients={props.setRecipients} selectionRecipients={props.selectionRecipients} setSelectionRecipients={props.setSelectionRecipients} message={props.message} setMessage={props.setMessage} messageClass={props.messageClass}></MaCapsuleParams>
                        : mode == 'text'
                            ? <MaCapsuleText id={props.id} content={props.content} setContent={props.setContent} message={props.message} setMessage={props.setMessage} messageClass={props.messageClass} reload={reload}></MaCapsuleText>
                            : mode == 'photo'
                                ? <MaCapsuleFichier type={mode} id={props.id} content={props.content} setContent={props.setContent} file={props.file} setFile={props.setFile} message={props.message} setMessage={props.setMessage} messageClass={props.messageClass} reload={reload}></MaCapsuleFichier>
                                : mode == 'audio'
                                    ? <MaCapsuleFichier type={mode} id={props.id} content={props.content} setContent={props.setContent} file={props.file} setFile={props.setFile} message={props.message} setMessage={props.setMessage} messageClass={props.messageClass} reload={reload}></MaCapsuleFichier>
                                    : mode == 'vidéo'
                                        ? <MaCapsuleFichier type={mode} id={props.id} content={props.content} setContent={props.setContent} file={props.file} setFile={props.setFile} message={props.message} setMessage={props.setMessage} messageClass={props.messageClass} reload={reload}></MaCapsuleFichier>
                                        : mode == 'library'
                                            ? <MaCapsuleLibrary id={props.id} contents={props.contents} selection={props.selection} setSelection={props.setSelection} message={props.message} setMessage={props.setMessage} messageClass={props.messageClass}></MaCapsuleLibrary>
                                            : ''
            
            }

            {
                isSealed == undefined
                ? ''
                : isSealed
                    ? <div onClick={toggleSeal}>Déverrouiller ma capsule</div>
                    : <div onClick={toggleSeal}>Verrouiller ma capsule</div>
            }
            
        </>
    );
}

export default MaCapsuleAffichage;