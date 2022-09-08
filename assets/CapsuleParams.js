import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CapsuleParams () {
    
    let params = useParams();

    // const [capsule, setCapsule] = useState({});

    useEffect(() => {
        fetch('/capsule/api/' + params.id)
        .then((headers) => {
            return headers.json();
        }). then((data) => {
            console.log(data);
        })
    },[]);
    
    return (
        <form>
            <div>
                <label htmlFor="capsule-name">Nom de ma capsule :</label>
                <input type="text" id="capsule-name" name="capsule-name"/>
            </div>
            <div>
                <p>Date de création : ###</p>
            </div>
            <div>
                <p>Verrouillage de ma capsule</p>
                <input type="radio" name="capsule-status" value="SEALED" id="SEALED"/>
                <label htmlFor="SEALED">Scellée</label>
                <input type="radio" name="capsule-status" value="UNSEALED" id="UNSEALED"/>
                <label htmlFor="UNSEALED">Descellée</label>
                <p>Date de dernier verrouillage: ###</p>
            </div>
            <div>
                <p>Format de ma capsule</p>
                <input type="radio" name="capsule-type" value="VIRTUAL" id="VIRTUAL"/>
                <label htmlFor="VIRTUAL">Numérique</label>
                <input type="radio" name="capsule-type" value="SOLID" id="SOLID"/>
                <label htmlFor="SOLID">Physique</label>
            </div>
            <button type="submit">Enregistrer</button>
            <p> </p>
        </form>
    );
}

export default CapsuleParams;