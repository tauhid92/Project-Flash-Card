import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom';
import { deleteDeck, readDeck } from '../utils/api';
import CardDisplay from './CardDisplay';

export default function Deck() {

  const history = useHistory();

  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  //call the deck 
  const abortController = new AbortController();
  const signal = abortController.signal;

  useEffect(() => {

    setDeck({});
    setCards([]);

    try {
      const getDeck = async () => {
        const res = await readDeck(deckId, signal);
        setDeck(res);
        setCards(res.cards);
      }

      getDeck();

    } catch (err) {
      return (<div>{err}</div>);
    }

    return () => abortController.abort();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteHandler = async (e) => {

    const res = window.confirm('Are you sure you want to delete');
    if (res) {
      await deleteDeck(deckId).catch(err => <div>{err}</div>);
      history.push('/');
    }
  }

  return (
    (deck) ?
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="fa fa-home mr-3">
                </i>Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
          </ol>
        </nav>
        <div className="card-body">
          <h3 className="card-title">{deck.name}</h3>
          <p className="card-text">{deck.description}</p>
          <div className="d-flex justify-content-between">
            <div>
              <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary mr-2">
                <i className="fa fa-edit mr-3" ></i>
                Edit
            </Link>
              <Link to={`/decks/${deckId}/study`} className="btn btn-primary mr-2">
                <i className="fa fa-book mr-3"></i>
              	Study
            </Link>
              <Link to={`/decks/${deckId}/cards/new`}>
                <button type="button" className="btn btn-secondary">
                  <i className="fa fa-plus mr-3" ></i>
            		Add Cards
        			</button>
              </Link>
            </div>
            <button onClick={deleteHandler} className="btn btn-danger">
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </div>
        <div className="ml-3 mt-4">
          <h3>Cards</h3>
          {cards.map(({ id, front, back }) => <CardDisplay key={id}
            deckId={deckId}
            cardId={id}
            front={front}
            back={back}
          />)}

        </div>
      </div> :
      <h1>Loading</h1>
  )
}
