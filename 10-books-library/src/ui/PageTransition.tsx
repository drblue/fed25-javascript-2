import { motion } from "motion/react";
import { fadeIn } from "./transitions";

interface PageTransitionProps {
	children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
	return (
		<motion.main
			variants={fadeIn}
			initial="initial"
			animate="enter"
			exit="exit"
			// initial={{
			// 	opacity: 0,
			// 	x: "-50vw",
			// }}
			// animate={{
			// 	opacity: 1,
			// 	x: 0,
			// }}
			// exit={{
			// 	opacity: 0,
			// 	x: "-50vw",
			// }}
			transition={{
				duration: 1,
			}}
		>
			{children}
		</motion.main>
	)
}

export default PageTransition;
