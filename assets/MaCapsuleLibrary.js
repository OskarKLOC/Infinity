import React from 'react';
import { useEffect } from 'react';

function MaCapsuleLibrary (props) {

    // En cas de switch sur cette page, on vérifie s'il faut réinitialiser la liste d'affichage des contenus
    useEffect(() => {
        if (Object.keys(props.content).length || Object.keys(props.file).length) {
            props.getAllContents();
        }
    },[props.reload]);
    
    // A chaque sélection / déselection, on garde une trace de la saisie active
    function handleChange (e) {
        // On récupère la sélection actuelle et la valeur qui fait l'objet d'une nouvelle sélection/déselection
        let listIds = [...props.selection];
        let id = parseInt(e.currentTarget.value);

        // La nouvelle valeur a-t-elle été sélectionnée ?
        if (e.currentTarget.checked) {
            // La nouvelle valeur est-elle absente de la sélection ?
            if (!listIds.includes(id)) {
                // Si oui, on ajoute la nouvelle valeur
                listIds.push(id);
            }
        // Sinon la nouvelle valeur est déselectionnée
        } else {
            // La nouvelle valeur est-elle présente de la sélection ?
            if (listIds.includes(id)) {
                // Si oui, on retire la nouvelle valeur de la sélection
                let idIndex = listIds.indexOf(id);
                listIds.splice(idIndex,1);
            }
        }

        // On met à jour la liste des éléments sélectionnés
        props.setSelection(listIds);
    }

    // A la validation du formulation, on fait appel à notre API en POST pour passer notre sélection
    function handleSubmit (e) {
        // On bloque le comportement par défaut du formulaire
        e.preventDefault();
        // On fait appel à notre API en POST en passant l'objet qui contient nos données
        fetch('/content/api_set_selection/' + props.id, { method: 'POST', body: JSON.stringify(props.selection)})
        .then((headers) => {
            return headers.json();
        }).then((data) => {
            // On récupère la réponse de l'API que nous allons afficher
            props.setMessage(data);
        })
    }
    
    // On génère le rendu final
    return (
        <>
            <div className="zone-gestion text-center">
                <h3>Librairie de ma capsule</h3>
                <div className={props.messageClass}>{props.message}</div>
                <form onSubmit={handleSubmit} className="col-1 bloc-librairie text-center mt-5">
                    <div className="scroller">
                        <h4 className="text-center pt-4">Sélectionner vos contenus</h4>
                        <div className="zone-librairie">
                            {
                                props.contents.map((content, index) => {
                                    return <div key={content.id} className="element-librairie">
                                        <div className="bloc-element">
                                            <label htmlFor={'content-' + content.id} className="form-check-label">
                                                <div>
                                                    <img src={'../../img/espace-capsule/' + content.contentType + '.png'} alt={content.contentType} width="149" height="124"/>
                                                    <span>{content.contentName}</span>
                                                </div>
                                            </label>
                                            <input type="checkbox" id={'content-' + content.id} name={'content-' + content.id} value={content.id} defaultChecked={content.contenusStatus === "ADDED"} onChange={handleChange} className="form-check-input"></input>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <button type="submit" className="btn2 btn-dark mx-3">Enregistrer</button>
                    <a href={'/capsule/reception/' + props.id} target="_blank" className="btn2 btn-dark mx-3">Aperçu de ma capsule</a>
                </form>
            </div>
            
            

           
                       {/*          <div className="bloc-image-div d-flex justify-content-between align-items-center"> */}


        </>
    )
}

export default MaCapsuleLibrary;

