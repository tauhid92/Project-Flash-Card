import React from 'react'

function ConditionalButton({flipped, switchCard}) {
    return (
        flipped &&
        <button type="button" className="btn btn-primary" onClick={switchCard}>Next</button>
    )
}

export default ConditionalButton
