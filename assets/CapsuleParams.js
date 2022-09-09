import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CapsuleParams () {
    
    // Variable pour nous permettre d'utiliser l'id passé en GET
    let params = useParams();

    // Variables d'état
    const [capsule, setCapsule] = useState({});             // Objet récupéré et renvoyé
    const [creationDate, setCreationDate] = useState('');   // Date de création
    const [sealDate, setSealDate] = useState('');           // Date de dernier scellé

    // Au chargement, récupère via l'API les données de la capsule
    useEffect(() => {
        fetch('/capsule/api_get_capsule/' + params.id)
        .then((headers) => {
            return headers.json();
        }).then((data) => {
            let dataObject = JSON.parse(data);
            setCapsule(dataObject);
            setCreationDate(new Date(dataObject.creationDate.timestamp * 1000).toLocaleDateString());
            setSealDate(new Date(dataObject.sealDate.timestamp * 1000).toLocaleDateString());
        })
    },[]);
    
    // Récupère la valeur du champ de saisie du nom et remplace la valeur dans la variable d'état
    function handleChange (e) {
        let target = e.currentTarget;
        let input = {...capsule};

        switch (target.name) {
            case 'capsule-name':
                input.name = target.value; 
                break;
            case 'capsule-status':
                input.capsuleStatus = target.value;
                break;
            case 'capsule-type':
                input.format = target.value;
                break;
            default:
                console.log('Champ non reconnu...');
                break;
        }
        
        setCapsule(input);
        console.log(capsule);
    }

    function handleSubmit (e) {
        e.preventDefault();
        console.log(capsule);
        fetch('/capsule/api_set_capsule/1', { method: 'POST', body: JSON.stringify(capsule)})
        .then((headers) => {
            return headers.json();
        }).then((data) => {
            console.log(data);
        })
    }

    // <a href="{{ path('app_capsule_list') }}">Revenir à ma liste de capsules</a>

    // {{ include('capsule/_delete_form.html.twig') }}

    // Affichage du formulaire
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="capsule-name">Nom de ma capsule : </label>
                <input type="text" id="capsule-name" name="capsule-name" value={capsule.name} onChange={handleChange} />
            </div>
            <div>
                <p>Date de création : {creationDate}</p>
            </div>
            <div>
                <p>Verrouillage de ma capsule</p>
                <input type="radio" name="capsule-status" value="SEALED" id="SEALED" onChange={handleChange}/>
                <label htmlFor="SEALED">Scellée</label>
                <input type="radio" name="capsule-status" value="UNSEALED" id="UNSEALED" onChange={handleChange}/>
                <label htmlFor="UNSEALED">Descellée</label>
                <p>Date de dernier verrouillage: {sealDate}</p>
            </div>
            <div>
                <p>Format de ma capsule</p>
                <input type="radio" name="capsule-type" value="VIRTUAL" id="VIRTUAL" onChange={handleChange}/>
                <label htmlFor="VIRTUAL">Numérique</label>
                <input type="radio" name="capsule-type" value="SOLID" id="SOLID" onChange={handleChange}/>
                <label htmlFor="SOLID">Physique</label>
            </div>
            <button type="submit">Enregistrer</button>
            <p> </p>
        </form>
    );
}

export default CapsuleParams;