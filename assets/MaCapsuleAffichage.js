import React, { useEffect } from 'react';
import { useState } from 'react';
import MaCapsuleAccueil from './MaCapsuleAccueil';
import MaCapsuleFichier from './MaCapsuleFichier';
import MaCapsuleLibrary from './MaCapsuleLibrary';
import MaCapsuleNavVirtual from './MaCapsuleNavVirtual';
import MaCapsuleParams from './MaCapsuleParams';
import MaCapsuleSuivi from './MaCapsuleSuivi';
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
        if (event) {
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
                    case 'suivi':
                        setMode('suivi');
                        break;     
                    default:
                        setMode('');
                        break;
                }
            }
        } else {
            setMode('library');
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
            <div className="flex-container">
                
                <div className="col-2 offset-1 bulle-icones col-2">
                    <div onClick={changeView} data-mode="params" className="dot d-flex align-items-center justify-content-center">
                        <img src="../../img/icones/select.svg" alt="paramètres" width="35" height="35"/>
                    </div>
                    {
                        isVirtual
                            ? <MaCapsuleNavVirtual changeView={changeView}></MaCapsuleNavVirtual>
                            : <div onClick={changeView} data-mode="suivi" className="dot d-flex align-items-center justify-content-center">
                                <img src="../../img/icones/suivi.png" alt="suivi" width="35" height="35"/>
                                </div>
                    }
                </div>
                
                <div>
                    {
                        mode == ''
                            ? <MaCapsuleAccueil isSealed={isSealed}></MaCapsuleAccueil>
                            : mode == 'params'
                                ? <MaCapsuleParams id={props.id} capsule={props.capsule} setCapsule={props.setCapsule} recipients={props.recipients} setRecipients={props.setRecipients} selectionRecipients={props.selectionRecipients} setSelectionRecipients={props.setSelectionRecipients} creationDate={props.creationDate} sealDate={props.sealDate} message={props.message} setMessage={props.setMessage} messageclassName={props.messageClass}></MaCapsuleParams>
                                : mode == 'text'
                                    ? <MaCapsuleText id={props.id} content={props.content} setContent={props.setContent} message={props.message} setMessage={props.setMessage} messageclassName={props.messageClass} reload={reload} changeView={changeView}></MaCapsuleText>
                                    : mode == 'photo'
                                        ? <MaCapsuleFichier type={mode} id={props.id} content={props.content} setContent={props.setContent} file={props.file} setFile={props.setFile} message={props.message} setMessage={props.setMessage} messageclassName={props.messageClass} reload={reload} changeView={changeView}></MaCapsuleFichier>
                                        : mode == 'audio'
                                            ? <MaCapsuleFichier type={mode} id={props.id} content={props.content} setContent={props.setContent} file={props.file} setFile={props.setFile} message={props.message} setMessage={props.setMessage} messageclassName={props.messageClass} reload={reload} changeView={changeView}></MaCapsuleFichier>
                                            : mode == 'vidéo'
                                                ? <MaCapsuleFichier type={mode} id={props.id} content={props.content} setContent={props.setContent} file={props.file} setFile={props.setFile} message={props.message} setMessage={props.setMessage} messageclassName={props.messageClass} reload={reload} changeView={changeView}></MaCapsuleFichier>
                                                : mode == 'library'
                                                    ? <MaCapsuleLibrary id={props.id} contents={props.contents} selection={props.selection} setSelection={props.setSelection} message={props.message} setMessage={props.setMessage} messageclassName={props.messageClass} reload={reload} content={props.content} file={props.file} getAllContents={props.getAllContents}></MaCapsuleLibrary>
                                                    : mode == 'suivi'
                                                        ? <MaCapsuleSuivi></MaCapsuleSuivi>
                                                        :''
                    }

                    <div className="text-center">
                        {
                            isSealed == undefined
                            ? ''
                            : isSealed
                                ? <div onClick={toggleSeal} className="btn btn-secondary">Déverrouiller ma capsule</div>
                                : <div onClick={toggleSeal} className="btn btn-secondary">Verrouiller ma capsule</div>
                        }
                        <div>
                            <a href="/moncompte" className="btn2 btn-dark">Revenir à mon compte</a>
                        </div>
                    </div>

                </div>
                
            </div>
            
            
 
        </>
    );
}

export default MaCapsuleAffichage;