import React from 'react';
import { useState } from 'react';
import ConceptNumerique from './ConceptNumerique';
import ConceptPhysique from './ConceptPhysique';

function Concept () {
    
    // Variable d'état nous permettant la sélection de la vue à afficher en fonction de l'état du bouton de switche
    const [view, setView] = useState('numérique');

    // Fonction permettant de switcher l'état entre les 2 vues
    function toggleView (event) {
        event.currentTarget.value == 'numérique'
            ? setView('physique')
            : setView('numérique');
    }
    
    return (
        <>
            
            {/* <!-- DEBUT HEADER --> */}
            <header>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col text-center">
                            <h1>LA CAPSULE</h1>
                        </div>
                    </div>
                </div>
            </header>
            {/* <!-- FIN HEADER --> */}

            <main className="bg-light-darker">

                <section id="optioncapsule">

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col my-5 px-5">
                                <h3 className="text-uppercase text-center">
                                    Plus qu'une option, choississez un concept.
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-3">
                                <form action="">
                                    <div className="toggle-container">
                                        <input type="checkbox" name="toggle-numerique" id="toggle-numerique" className="toggle" value={view} onClick={toggleView}/>
                                        <label htmlFor="toggle-numerique"></label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </section>
                
                {
                    view == 'numérique'
                        ? <ConceptNumerique></ConceptNumerique>
                        : <ConceptPhysique></ConceptPhysique>
                }

            </main>
            
        </>
    );
}

export default Concept;