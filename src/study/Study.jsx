import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { readDeck } from '../utils/api';
import CardViewer from './CardViewer';

const Study = () => {

  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const abortController= new AbortController();
  const signal=abortController.signal;

  useEffect(() =>{

    setDeck({});
    readDeck(deckId, signal)
      .then(setDeck).catch(error =><div>{error}</div>);

    return () => abortController.abort();

  },[]);
  //after calling api start passing the data to state properties
  //console.log(deck.cards)
  return (
    (deck.cards)?
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <i className="fa fa-home mr-3" >
              </i>Home</Link>
          </li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}/study`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Study</li>
        </ol>
      </nav>     
      <h1 className="ml-3">Study: {deck.name}</h1>
      <CardViewer deckId={deckId} cards={deck.cards}/>
    </div> : <h1>Loading...</h1>
    
  );
}

export default Study;
