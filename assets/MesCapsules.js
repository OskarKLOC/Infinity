import React from 'react';

function MesCapsules (props) {
    return (
        props.capsules.map((capsule, index) => {
            return  <div key={index}>
                <a href={'../capsule/' + capsule.id}>Capsule n°{capsule.id}</a>
            </div>
        })
    );
}

export default MesCapsules;