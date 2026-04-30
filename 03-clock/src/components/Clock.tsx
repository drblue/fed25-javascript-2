import { useEffect, useState } from "react";

const Clock = () => {
	const [time, setTime] = useState(() => {
		console.log("🔋 Initializing flux capacitor...");
		return new Date().toLocaleTimeString();
	});

	// Start clock when component has been mounted
	useEffect(() => {
		console.log("🔫 Starting clock...");
		const intervalId = setInterval(() => {
			const now = new Date().toLocaleTimeString();
			setTime(now);
			console.log("🕰️ Tick...", now);
		}, 1000);

		return () => {
			// This clean-up function will be executed when
			// the component is about to be unmounted
			console.log("💣💥 Clock is being unmounted 😰 Stopping timer to prevent paradoxes 🤯");
			clearInterval(intervalId);
		}
	}, []);

	// Update page title with current time
	// but ONLY if the time has changed since last render
	// N.B.! We would use the `<title>` element nowadays
	useEffect(() => {
		console.log("⏰ Time has changed, updating page title");
		document.title = time;
	}, [time]);

	const now = new Date();

	return (
		<div className="display-1 font-monospace text-center">
			{time}
			{now.getMonth() === 3 && now.getDate() === 30 && (now.getHours() > 12 || (now.getHours() === 12 && now.getMinutes() >= 5)) && " 🔥"}
		</div>
	)
}

export default Clock;
