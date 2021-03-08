import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { readCard, readDeck, updateCard } from '../utils/api';
import CardForm from './CardForm';

const EditCard = () => {

  const history = useHistory();

  const { deckId, cardId } = useParams();
  const [card, setCard] = useState({});
  const [deck, setDeck] = useState({});

  const abortController = new AbortController();
  const signal = abortController.signal;

  useEffect(() => {
    // setDeck({});
    // setCard({});

    try {

      const getDeck = async () => {
        const res = await readDeck(deckId, signal);
        setDeck(res);
      }
      const getCard = async () => {
        const res = await readCard(cardId, signal);
        setCard(res);
      }
      getDeck();
      getCard();

    } catch (e) {
      return (<div>{e.message}</div>);
    }

    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardId]);

  const handleChange = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateCard(card).then(console.log).catch(console.log);
    history.push(`/decks/${deckId}`);
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
          <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
        </ol>
      </nav>
      <CardForm titleHeader="Edit Card"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleCancel={handleCancel}
        frontValue={card.front}
        backValue={card.back}
        frontPlaceholder="Front Side of the Card"
        backPlaceholder="Back Side of the Card"
        cancelButtonTitle="Cancel"
      />
    </div>
  )
}

export default EditCard;
