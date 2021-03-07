import React, { useState } from 'react'
import ConditionalButton from './ConditionalButton';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';


function CardViewer({deckId, cards}) {

  const history = useHistory();
  const {url} = useRouteMatch();
  const [flipped, setFlip] = useState(false); 
  const [index, setIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState(cards[index]);

  const switchCard = (e) => {
    if(index!==cards.length-1){
      setIndex(index+1);
      setSelectedCard(cards[index]);
      setFlip(!flipped);
    }
    else{
      if(window.confirm('Are you sure you want to delete?'))
        history.go(url);

    }

  }

  console.log(flipped);//testing only
  console.log('list of cards: ',cards);
  console.log('selected card: ', selectedCard);
  return (
    (cards.length>2)?
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Card {index+1} of {cards.length}</h5>
        {flipped ? <p className="card-text">{selectedCard.back}</p> : 
          <p className="card-text">{selectedCard.front}</p>}
        <div className="modal-footer justify-content-start pl-0">
          <button type="button" className="btn btn-secondary" onClick={()=>setFlip(!flipped)}>Flip</button>
          <ConditionalButton switchCard={switchCard} flipped={flipped}/>
        </div>
      </div>
    </div>:
    <div className="ml-3">
      <h2>Not Enough Cards</h2>
      <p>Need at least 3 cards</p>
      <Link to={`/decks/${deckId}/cards/new`}>
        <button type="button" className="btn btn-secondary">
          <i className="fa fa-plus" style={{ margin: '10px' }}></i>
            Create Card
        </button>
      </Link>
    </div>
  )
}

export default CardViewer;
