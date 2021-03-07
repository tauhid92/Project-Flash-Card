import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { createCard, readDeck } from '../utils/api';

export default function AddCard() {

  const history = useHistory();

  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

  const initialState = {
   
    front:"",
    back:"",
  }

  const [card, setCard] = useState({...initialState});

  const abortController = new AbortController();
  const signal = abortController.signal;

  useEffect(()=>{

    try{
      const getDeck = async () => {
        const res = await readDeck(deckId, signal);
        setDeck(res);
      }
      getDeck();
    }catch(e){
      return(<div>{e.message}</div>);
    }

    return () => abortController.abort();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[deckId] );

  const handleChange = ({target}) => {
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

  return (
    <div><nav aria-label="breadcrumb">
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
      <h1>{deck.name}: Add Card</h1>
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
						Done
        		</button>
					<button type="submit" value="submit" className="btn btn-primary ">
						Save
        		</button>
				</div>
			</form>
    </div>
  )
}
