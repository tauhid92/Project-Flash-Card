import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom'
import { readDeck, updateDeck } from '../utils/api';

export default function EditDeck() {

	const history = useHistory();
	const {url} = useRouteMatch();
	const { deckId } = useParams();
	const [deck, setDeck] = useState({});

	
	const abortController = new AbortController();
	const signal = abortController.signal;

	useEffect(()=>{
		setDeck({});
		try{
			const getDeck = async () => {
				const res = await readDeck(deckId, signal);
				setDeck({...res});
			}
			getDeck();
		}
		catch(error){
			return (<div>{error}</div>);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

	const handleChange = ({target}) =>{
		setDeck({
			...deck,
			[target.name]:target.value,
		});
	}
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await updateDeck(deck);
		console.log(res);
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
          <li className="breadcrumb-item"><Link to={url}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit</li>
        </ol>
      </nav>  
			<h1>Edit Deck</h1>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
					<input
						className="form-control"
						id="name"
						type="text"
						name="name"
						placeholder={deck.name}
						onChange={handleChange}
						value={deck.name}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
					<textarea
						className="form-control"
						id="description"
						type="text"
						name="description"
						placeholder={deck.description}
						onChange={handleChange}
						value={deck.description}
					/>
				</div>
				<div className="d-flex justify-content-start">
					<button type="reset" value="reset" onClick={() =>history.push(`/decks/${deckId}`)} className="btn btn-secondary mr-2 ml-0">
						Cancel
        		</button>
					<button type="submit" value="submit" className="btn btn-primary ">
						Submit
        		</button>
				</div>
			</form>
		</div>
	)
}
