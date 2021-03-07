import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { deleteDeck } from '../utils/api';

function HomeDeckCard({ deckId, name, description, lengthOfCards }) {
  const history = useHistory();

  const deleteHandler = (e) => {
    console.log(`delete called on ${deckId}`)
    const res = window.confirm('Are you sure you want to delete');
    if(res){
      console.log(`delete called on ${deckId}`)
      deleteDeck(deckId).catch(err => <div>{err}</div>);
    }
    history.go('/');
    console.log('history call done too.');
  }


  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{lengthOfCards} cards</p>
        </div>
        <p className="card-text">{description}</p>
        <div className="d-flex justify-content-between">
          <div className="btn-group">
            <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary" style={{ marginRight: '10px' }}>
              <i className="fa fa-edit" style={{ marginRight: '10px' }}></i>
                Edit
            </Link>
            <Link to={`/decks/${deckId}`} className="btn btn-secondary" style={{ marginRight: '10px' }}>
              <i className="fa fa-eye" style={{ marginRight: '10px' }}></i>
                View
              </Link>
            <Link to={`/decks/${deckId}/study`} className="btn btn-primary" style={{ marginRight: '10px' }}>
              <i className="fa fa-book" style={{ marginRight: '10px' }}></i>
              	Study
            </Link>
          </div>
          <button onClick={deleteHandler} className="btn btn-danger" style={{ marginRight: '0px' }}>
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomeDeckCard
