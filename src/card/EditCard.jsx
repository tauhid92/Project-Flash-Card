import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { readCard, readDeck, updateCard } from '../utils/api';

const EditCard = () => {

  const history = useHistory();

  const { deckId, cardId } = useParams();
  const [card, setCard] = useState({});
  const [deck, setDeck] = useState({});

  const abortController = new AbortController();
  const signal = abortController.signal;

  useEffect(()=>{
    setDeck({});
    setCard({});

    try{

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

    }catch(e){
      return(<div>{e.message}</div>);
    }

    return () => abortController.abort();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[cardId] );

  const handleChange = ({target}) => {
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

  return (
    <div><nav aria-label="breadcrumb">
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
      <h1>Edit Card</h1>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="exampleFormControlTextarea1" className="form-label">Front</label>
					<textarea
						className="form-control"
						id="front"
						type="textarea"
						name="front"
						placeholder="Front Side of the Card"
						onChange={handleChange}
						value={card.front}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleFormControlTextarea1" className="form-label">Back</label>
					<textarea
						className="form-control"
						id="back"
						type="textarea"
						name="back"
						placeholder="Back side of the Card"
						onChange={handleChange}
						value={card.back}
					/>
				</div>
				<div className="d-flex justify-content-start">
          <button type="reset" value="reset" onClick={() => history.push(`/decks/${deckId}`)} className="btn btn-secondary mr-2 ml-0">
            Cancel
        		</button>
					<button type="submit" value="submit" className="btn btn-primary ">
						Save
        		</button>
				</div>
			</form>
    </div>
  )
}

export default EditCard;
