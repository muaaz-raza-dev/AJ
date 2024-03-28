import { motion } from "framer-motion";
import LoginForm from "./LoginForm";
import "@/Style/LoginBGAnimation.css"
export default function LoginFile() {
  return (



      <div className="w-screen backdrop-blur-md h-screen bg-gradient-to-tl center  to-[var(--dark)] from-[var(--secondary)]">
        <div className="lg:w-[70%] max-lg:w-[80%] max-md:w-[90%] max-sm:w-[95%] gap-y-8   flex flex-col items-center p-12 rounded-md">
          <motion.div
            animate={{ scale: 1 }}
            drag
            whileDrag={{ scale: 1 }}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            transition={{ type: "spring" }}
            whileTap={{ scale: 1.2 }}
            initial={{ scale: 0.5 }}
          >
            <div
              className="w-32 cursor-pointer border-[var(--light)] border-2 text-white shadow-md aspect-square rounded-full center text-5xl font-black 
        bg-[var(--dark)]"
            >
              AJ
            </div>
          </motion.div>
          <LoginForm />
        </div>
        {/* Animation */}
        <div className="area">
			<ul className="circles">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>
      </div>
  
  );
}
