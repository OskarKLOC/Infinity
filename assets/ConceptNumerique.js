import React from 'react';

function ConceptNumerique () {
    return (
        <>
            {/* <!-- DEBUT OPTION CAPSULE NUMERIQUE --> */}
            <section>
                <div className="row">
                    <div className="col my-5 px-5">
                        <h4 className="text-uppercase text-center">
                            Votre capsule numérique
                        </h4>
                        <i className="deco deco-left"></i>
                    </div>
                </div>

                <div className="row justify-content-center my-5">

                    <div className="col-lg-3">
                        <div className="card card-formule-detail">
                            <div className="card-body d-flex flex-column justify-content-between">
                                <div>
                                    <h4 className="card-title text-center">Basic</h4>
                                    <ul className="my-5">
                                        <li><img src="../../img/icones/beneficiaires.svg" alt=""/>2 bénéficaires</li>
                                        <li><img src="../../img/icones/cloudupload.svg" alt=""/>Importer vos photos / vidéos / écrits</li>
                                        <li><img src="../../img/icones/stockage.svg"/> 2 000 Go de d'espace de stockage sécurisé</li>
                                    </ul>
                                    <h4 className=" text-center my-5">99€</h4>
                                </div>
                                <div className="text-center">
                                    <a href="#" className="btn btn-secondary">Choisir</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <div className="card card-formule-detail">
                            <div className="card-body d-flex flex-column justify-content-between">
                                <div>
                                    <h4 className="card-title text-center">Premium</h4>
                                    <ul className="my-5">
                                        <li><img src="../../img/icones/beneficiaires.svg" alt=""/> 5 à 7 bénéficiaires</li>
                                        <li><img src="../../img/icones/cloudupload.svg" alt=""/> 3 000 Go d'espace de stockage sécurisé</li>
                                        <li><img src="../../img/icones/stockage.svg"/> Importer vos photos / vidéos / écrits</li>
                                        <li><img src="../../img/icones/telephone.svg" alt=""/> Bénéficiez d'une assistance prioritaire par mail</li>
                                        <li><img src="../../img/icones/clock.svg" alt=""/> Possibilité de stocker des données pendant X temps.</li>
                                    </ul>
                                    <h4 className=" text-center my-5">199€</h4>
                                </div>
                                <div className="text-center">
                                    <a href="#" className="btn btn-secondary">Choisir</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <div className="card card-formule-detail">
                            <div className="card-body d-flex flex-column justify-content-between">
                                <div>
                                    <h4 className="card-title text-center">Ultimate</h4>
                                    <ul className="my-5">
                                        <li><img src="../../img/icones/beneficiaires.svg" alt=""/> Bénéficiaires illimités</li>
                                        <li><img src="../../img/icones/cloudupload.svg" alt=""/> 10 000 Go d'espace de stockage sécurisé</li>
                                        <li><img src="../../img/icones/stockage.svg" alt=""/> Importer vos photos / vidéos / écrits </li>
                                        <li><img src="../../img/icones/telephone.svg" alt=""/> Bénéficiez d'une assistance prioritaire par mail</li>
                                        <li><img src="../../img/icones/clock.svg" alt=""/> Possibilité de stocker les données pendant X temps </li>
                                        <li><img src="../../img/icones/plus.svg" alt=""/> Possibilité de choisir la capsule numérique et physique</li>
                                    </ul>
                                    <h4 className=" text-center my-5">299€</h4>
                                </div>
                                <div className="text-center">
                                    <a href="#" className="btn btn-secondary">Choisir</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </section>
            {/* <!-- FIN OPTION CAPSULE NUMERIQUE --> */}
        </>
    );
}

export default ConceptNumerique;