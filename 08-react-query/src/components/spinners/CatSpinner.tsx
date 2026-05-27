const CatSpinner = () => {
	return (
		<div id="cat-spinner-wrapper">
			<div id="cat-spinner">
				<span className="cat" role="img" aria-label="cat">🐱</span>
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	)
}

export default CatSpinner;
