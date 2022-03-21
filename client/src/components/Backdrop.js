import { motion } from "framer-motion"

const Backdrop = ({ children, onClick, addClass }) => {
  return (
    <motion.div 
      className={`backdrop ${addClass ? addClass : ''}`}
      onClick={ onClick }
      initial={{ opacity: 0,}}
      animate={{ opacity: 1, }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}

export default Backdrop