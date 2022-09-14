import React from 'react';

function MonDestinataire (props) {
    return (
        <>
        <h3>Mon destinataire</h3>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <label htmlFor="recipient-firstname">Prénom : </label>
                    <input type="text" id="recipient-firstname" name="recipient-firstname" value={props.recipient.firstname} onChange={props.handleChange} />
                </div>
                <div>
                    <label htmlFor="recipient-lastname">NOM : </label>
                    <input type="text" id="recipient-lastname" name="recipient-lastname" value={props.recipient.lastname} onChange={props.handleChange} />
                </div>
                <div>
                    <label htmlFor="recipient-email">Email : </label>
                    <input type="text" id="recipient-email" name="recipient-email" value={props.recipient.email} onChange={props.handleChange} />
                </div>
                <div>
                    <label htmlFor="recipient-phone">Téléphone : </label>
                    <input type="text" id="recipient-phone" name="recipient-phone" value={props.recipient.phone} onChange={props.handleChange} />
                </div>
                <div>
                    <label htmlFor="recipient-address">Adresse : </label>
                    <input type="text" id="recipient-address" name="recipient-address" value={props.recipient.address} onChange={props.handleChange} />
                </div>
                <div>
                    <label htmlFor="recipient-zipcode">Code postal : </label>
                    <input type="text" id="recipient-zipcode" name="recipient-zipcode" value={props.recipient.zipcode} onChange={props.handleChange} />
                </div>
                <div>
                    <label htmlFor="recipient-city">Ville : </label>
                    <input type="text" id="recipient-city" name="recipient-city" value={props.recipient.city} onChange={props.handleChange} />
                </div>
                <button type="submit">Enregistrer les coordonnées</button>
            </form>
        </>
    );
}

export default MonDestinataire;