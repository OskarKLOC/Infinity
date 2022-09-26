import React from 'react';

function MesCapsules (props) {
    return (
        props.capsules.map((capsule, index) => {
            return <div className="card-liste mb-5" key={index}>
                        <div className="card-liste-beneficiaires d-flex justify-content-between">
                            <a className="capsule-url" href={'../capsule/' + capsule.id}>Capsule <strong>{capsule.name}</strong></a>
                            <div className="card-list-div">
                                <img className="card-liste-icone"src="../../img/icones/paramètres.svg" alt="paramètres"/>
                                <img className="card-liste-icone"src="../../img/icones/iconmonstr-trash-can-thin (1).svg" alt="poubelle"/>
                            </div>
                        </div>
                    </div>
        })
    );
}

export default MesCapsules;