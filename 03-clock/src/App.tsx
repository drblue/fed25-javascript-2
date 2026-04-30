import { useEffect, useState } from "react";
import "./assets/scss/App.scss";

function App() {
	const [time, setTime] = useState(() => {
		console.log("🔋 Initializing flux capacitor...");
		return new Date().toLocaleTimeString();
	});

	useEffect(() => {
		console.log("🔫 Starting clock...");
		setInterval(() => {
			const now = new Date().toLocaleTimeString();
			setTime(now);
			console.log("🕰️ Tick...", now);
		}, 1000);
	}, []);

	console.log("App is rendering...");

	return (
		<div className="container">
			<div className="display-1 font-monospace text-center">
				{time}
			</div>
		</div>
	);
}

export default App;
