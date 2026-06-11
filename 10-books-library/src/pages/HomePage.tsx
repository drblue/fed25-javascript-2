import { motion } from "motion/react";
import Image from "react-bootstrap/Image";
import imgIpadFrozen from "../assets/images/ipad-frozen.jpg";

const HomePage = () => {
	return (
		<>
			<title>Books Library</title>
			<motion.h1
				initial={{ y: -100, scale: 0 }}
				animate={{
					y: 0,
					scale: 1,
					rotateY: 360,
					transition: {
						duration: 1,
					},
				}}
			>Books Library</motion.h1>

			<motion.div
				initial={{ opacity: 0, scale: 0 }}
				animate={{
					scale: 1,
					opacity: 1,
					transition: {
						duration: 0.5,
						type: "spring",
						mass: 0.4,
						damping: 8,
					},
				}}
			>
				<Image
					src={imgIpadFrozen}
					alt="Cartoon drawing with a child holding up a book to a parent and saying 'This iPad is frozen'"
					title="This iPad is frozen"
					fluid
				/>
			</motion.div>
		</>
	)
}

export default HomePage
