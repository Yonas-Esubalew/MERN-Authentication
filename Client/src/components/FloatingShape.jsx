
import {motion} from 'framer-motion'
const FloatingShape = ({color,size,top,delay,left}) => {
  return (
    <motion.div
    className={`absolute ${color} ${size} rounded-full opacity-20 blur-xl`}
    style={{top, left}}
    animate={{
      y: ["0%", "100%", "0%"],
      x: ["0%", "100%", "0%"],
      rotate: [0, 360],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "linear",
      delay,
    }}
    aria-hidden="true"
    ></motion.div>
  )
}
export default FloatingShape