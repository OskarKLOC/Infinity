import React from 'react';

function ConceptPhysique () {
    return (
        <>
            {/* <!-- DEBUT OPTION CAPSULE PHYSIQUE --> */}

            <section id="capsule-physique">
                <div className="row justify-content-center my-5">

                    <div className="col-3">
                        <div className="card card-formule-detail">
                            <div className="card-body d-flex flex-column justify-content-between">
                                <div>
                                    <h4 className="card-title text-center"> CAPSULE </h4>
                                    <img className="card-title w-100 h90-" src="../../img/capsule/Rectangle 315.png" alt="heroshot"/>
                                    <p className="card-title text-center mt-5"> Choississez votre formule. Avec notre concept, on s'occupe de tout à votre place. </p>
                                    <h4 className=" text-center my-5">8.99€ / mois</h4>
                                </div>

                                {/* <!-- Emplacement pour le bouton choisir --> */}
                                <div className="text-center">
                                    <a href="/inscription" className="btn btn-secondary">Choisir</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* <!-- FIN OPTION CAPSULE PHYSIQUE --> */}

            {/* <!-- DEBUT DES ETAPES --> */}

            <section className="etapes-capsule-physique">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col my-5 px-5">
                            <h3 className="text-uppercase text-center">
                                Les étapes
                            </h3>
                            <i className="deco deco-right"></i>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Section pour montrer les étapes, avec les petits ronds --> */}

            <section className="etapes-capsule-physique">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-8">

                            {/* <!-- ETAPE 1 --> */}
                            <div className="etape-capsule etape-right">
                                <div className="rond">
                                    <p>1</p>
                                </div>
                                <div className="espace-explications">
                                    <p>Remplissez votre capsule ! </p>
                                </div>
                            </div>

                            {/* <!-- TRAIT VERTICAL DE SEPARATION --> */}

                            {/* <!-- TRAIT VERTICAL DE SEPARATION --> */}

                            {/* <!-- ETAPE 2 --> */}
                            <div className="etape-capsule">
                                <div className="espace-explications">
                                    <p>Verrouillez la capsule à l'aide des rivets par simple pression </p>
                                </div>
                                <div className="rond">
                                    <p>2</p>
                                </div>
                                <div className="trait-separation"></div>
                            </div>

                            {/* <!-- TRAIT VERTICAL DE SEPARATION --> */}

                            {/* <!-- TRAIT VERTICAL DE SEPARATION --> */}

                            {/* <!-- ETAPE 3 --> */}
                            <div className="etape-capsule etape-right">
                                <div className="rond">
                                    <p>3</p>
                                </div>
                                <div className="espace-explications">
                                    <p>Sceller le tour du bouchon en passant sur les rivets avec la bande hermétique</p>
                                </div>
                                <div className="trait-separation"></div>
                            </div>

                            {/* <!-- TRAIT VERTICAL DE SEPARATION --> */}
                            <div className="trait-separation"></div>
                            {/* <!-- TRAIT VERTICAL DE SEPARATION --> */}

                            {/* <!-- ETAPE 4 --> */}
                            <div className="etape-capsule">
                                <div className="espace-explications">
                                    <p>Coller le sceau inviolable numéroté sur la jointure blanche de la bande</p>
                                </div>
                                <div className="rond">
                                    <p>4</p>
                                </div>
                                <div className="trait-separation"></div>
                            </div>

                            {/* <!-- TRAIT VERTICAL DE SEPARATION --> */}
                            <div className="trait-separation"></div>
                            {/* <!-- TRAIT VERTICAL DE SEPARATION --> */}

                            {/* <!-- ETAPE 5 --> */}
                            <div className="etape-capsule etape-right">
                                <div className="rond">
                                    <p>5</p>
                                </div>
                                <div className="espace-explications">
                                    <p>Inscrire au dos de votre capsule le prénom du bénéficiaire, sous le numéro de série </p>
                                </div>
                                <div className="trait-separation"></div>
                            </div>

                            {/* <!-- TRAIT VERTICAL DE SEPARATION --> */}
                            <div className="trait-separation"></div>
                            {/* <!-- TRAIT VERTICAL DE SEPARATION --> */}

                            {/* <!-- ETAPE 6 --> */}
                            <div className="etape-capsule">
                                <div className="espace-explications">
                                    <p> Retourner votre colis avec l'étiquette de transport prépayée. </p>
                                </div>
                                <div className="rond">
                                    <p>6</p>
                                </div>
                                <div className="trait-separation"></div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- FIN DES ETAPES --> */}
        </>
    );
}

export default ConceptPhysique;