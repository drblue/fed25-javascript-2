const HomePage = () => {
	return (
		<>
			<title>Welcome to Supabase Todos!</title>
			<h1>👾 Welcome to Supabase Todos 🕹️</h1>

			<div className="py-5">
				<picture className="d-flex justify-content-center mb-3">
					<source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f6f8/512.webp" type="image/webp" />
					<img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f6f8/512.gif" alt="🛸" width="320" height="320" />
				</picture>

				{/* <p>Because when your life is on fire 🔥, you need a todo list.</p> */}
				<blockquote className="display-6 text-center">
					<p>Because all your (supa)base are belong to us.</p>
					<footer className="small text-muted text-end">
						{" "}
						— General CATS Engrish
					</footer>
				</blockquote>
			</div>
		</>
	)
}

export default HomePage;
