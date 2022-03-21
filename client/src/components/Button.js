import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const Button = ({onClick, color, text}) => {
  return (
    <motion.button 
      className='btn'
      style={{backgroundColor: color}}
      onClick={onClick}
      whileHover={{scale: 1.1}}
      whileTap={{scale: 0.9}}
    >
      {text}
    </motion.button>
  )
}

Button.defaultProps = {
  color: 'white'
}

Button.propTypes ={
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button