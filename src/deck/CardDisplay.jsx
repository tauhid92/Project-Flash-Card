import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { deleteCard } from '../utils/api';

function CardDisplay({deckId, cardId, front, back}) {
  const history = useHistory();
  
  const handleDelete = async (e) => {
    const res = window.confirm('Are you sure you want to delete');
		if (res) {
			await deleteCard(cardId).catch(err=><div>{err}</div>);
			history.push('/');
		}
  }
  return (
    <div className="b-2">
      <div className="card-body">
        <div className="row">
          <p className="card-text col-6">{front}</p>
          <p className="card-text col-6">{back}</p>
        </div>
        <div className="d-flex justify-content-end mt-2">
          <Link to={`/decks/${deckId}/cards/${cardId}/edit`} className="btn btn-secondary mr-2">
							<i className="fa fa-edit mr-3" ></i>
                Edit
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
						<i className="fa fa-trash"></i>
					</button>
        </div>
      </div>
    </div>
  )
}

export default CardDisplay;
