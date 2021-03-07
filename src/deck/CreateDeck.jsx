import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createDeck } from '../utils/api';

const CreateDeck = () => {

	const history = useHistory();

	const initialFormState = {
		name: "",
		description: "",
	}

	const [formData, setFormData] = useState({ ...initialFormState });
	const handleChange = ({ target }) => {
		setFormData({
			...formData,
			[target.name]: target.value,
		});
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await createDeck(formData);
		history.push(`/decks/${res.id}`)
	}

	return (

		<div>
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					<li className="breadcrumb-item">
						<Link to="/">
							<i className="fa fa-home" style={{ marginRight: '10px' }}>
							</i>Home</Link>
					</li>
					<li className="breadcrumb-item active" aria-current="page">Create Deck</li>
				</ol>
			</nav>
			<h1>CreateDeck</h1>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
					<input
						className="form-control"
						id="name"
						type="text"
						name="name"
						placeholder="Name"
						onChange={handleChange}
						value={formData.name}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
					<textarea
						className="form-control"
						id="description"
						type="text"
						name="description"
						placeholder="Description"
						onChange={handleChange}
						value={formData.description}
					/>
				</div>
				<div className="d-flex justify-content-start">
					<button type="reset" value="reset" onClick={() => history.push('/')} className="btn btn-secondary mr-2 ml-0">
						Cancel
        		</button>
					<button type="submit" value="submit" className="btn btn-primary ">
						Submit
        		</button>
				</div>
			</form>
		</div>
	);
}

export default CreateDeck;
