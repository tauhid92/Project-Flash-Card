import React from 'react'

function CardForm({titleHeader, handleSubmit, frontValue, backValue, handleChange,frontPlaceholder, backPlaceholder,cancelButtonTitle, handleCancel}) {
	return (
		<div>
			<h1>{titleHeader}</h1>
			<form onSubmit={()=>handleSubmit}>
				<div className="mb-3">
					<label htmlFor="exampleFormControlTextarea1" className="form-label">Front</label>
					<textarea
						className="form-control"
						id="front"
						type="textarea"
						name="front"
						placeholder={frontPlaceholder}
						onChange={()=>handleChange}
						value={frontValue}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleFormControlTextarea1" className="form-label">Back</label>
					<textarea
						className="form-control"
						id="back"
						type="textarea"
						name="back"
						placeholder={backPlaceholder}
						onChange={() =>handleChange}
						value={backValue}
					/>
				</div>
				<div className="d-flex justify-content-start">
					<button type="reset" value="reset" onClick={() => handleCancel} className="btn btn-secondary mr-2 ml-0">
						{cancelButtonTitle}
        		</button>
					<button type="submit" value="submit" className="btn btn-primary ">
						Save
        		</button>
				</div>
			</form>
		</div>
	)
}

export default CardForm;
