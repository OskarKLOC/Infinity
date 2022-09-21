import React from 'react';
import { useEffect, useState } from 'react';

function MesDestinatairesListe (props) {
    
    // On affiche la liste de l'ensemble des destinataires actifs pour l'utilisateur donné
    return (
        <>
            {/* <!-- DEBUT DE LA LISTE DES BENEFICIAIRES --> */}
            <section className="listebeneficiaires">

                <div className="text-center">
                    <h4> Mes destinataires </h4>
                </div>
                
                {
                    props.recipients.length
                        ? (props.recipients[0] != 0
                            ? props.recipients.map((recipient, index) => {
                                return <div className="card-liste mb-5" key={index} data-id={index} onClick={props.toggleEditMode}>
                                            <div className="card-liste-beneficiaires d-flex justify-content-between">
                                                <p> {recipient.firstname} {recipient.lastname} </p>
                                                <div className="card-list-div">
                                                    <img className="card-liste-icone"src="../../img/icones/paramètres.svg" alt="paramètres"/>
                                                    <img className="card-liste-icone"src="../../img/icones/iconmonstr-trash-can-thin (1).svg" alt="poubelle"/>
                                                </div>
                                            </div>
                                        </div>
                            })
                            : ' ')
                        : 'Vous n\'avez pas encore créé de destinataire'
                }

                <div className="text-center">
                    <button className="btn btn-secondary" onClick={props.toggleAddMode}>Ajouter un nouveau destinataire</button>
                </div>

            </section>
            {/* <!-- FIN DE LA LISTE DES BENEFICIAIRES --></div> */}

        </>
    );
}

export default MesDestinatairesListe;