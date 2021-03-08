import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { createCard, readDeck } from '../utils/api';
import CardForm from './CardForm';

export default function AddCard() {

  const history = useHistory();

  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

  const initialState = {

    front: "",
    back: "",
  }

  const [card, setCard] = useState({ ...initialState });

  const abortController = new AbortController();
  const signal = abortController.signal;

  useEffect(() => {

    try {
      const getDeck = async () => {
        const res = await readDeck(deckId, signal);
        setDeck(res);
      }
      getDeck();
    } catch (e) {
      return (<div>{e.message}</div>);
    }

    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckId]);

  const handleChange = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCard(Number(deckId), card).catch(console.log);
    history.go('/');
  }

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <i className="fa fa-home mr-3">
              </i>Home</Link>
          </li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Add Card</li>
        </ol>
      </nav>

      <CardForm titleHeader={`${deck.name}: Add Card`}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleCancel={handleCancel}
        frontValue={card.front}
        backValue={card.back}
        frontPlaceholder="Front Side of the Card"
        backPlaceholder="Back Side of the Card"
        cancelButtonTitle="Done"
      />
    </div>
  )
}
