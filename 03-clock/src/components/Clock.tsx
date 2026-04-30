import { useEffect, useState } from "react";

const Clock = () => {
	const [time, setTime] = useState(() => {
		console.log("🔋 Initializing flux capacitor...");
		return new Date().toLocaleTimeString();
	});

	// Start clock when component has been mounted
	useEffect(() => {
		console.log("🔫 Starting clock...");
		setInterval(() => {
			const now = new Date().toLocaleTimeString();
			setTime(now);
			console.log("🕰️ Tick...", now);
		}, 1000);
	}, []);

	// Update page title with current time
	// but ONLY if the time has changed since last render
	// N.B.! We would use the `<title>` element nowadays
	useEffect(() => {
		console.log("⏰ Time has changed, updating page title");
		document.title = time;
	}, [time]);

	return (
		<div className="display-1 font-monospace text-center">
			{time}
		</div>
	)
}

export default Clock;
