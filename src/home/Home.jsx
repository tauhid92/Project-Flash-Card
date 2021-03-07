import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HomeDeckCard from './HomeDeckCard'
import { listDecks } from '../utils/api/index';

export default function Home() {
  const [deckList, setDeckList] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    try{
      const getDeckList = async ()=>{
        await listDecks(signal).then(setDeckList);
      }
      getDeckList();
    }catch(e){
      return(
      <div>{e}</div>
      );
    }

    return () => {
      abortController.abort();
    }

  }, []);

  return (
    (deckList)?
    <div className="column">
      <Link to='/decks/new'>
        <button type="button" className="btn btn-secondary">
          <i className="fa fa-plus" style={{ margin: '10px' }}></i>
            Create Deck
        </button>
      </Link>
      <div>
        {deckList.map(({ id, name, description, cards }) =>
          <HomeDeckCard key={id} deckId={id} name={name} description={description} lengthOfCards={cards.length} />)
        }
      </div>
    </div>:
    <h1>Loading...</h1>
  )
}
