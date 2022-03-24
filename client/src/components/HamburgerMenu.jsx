import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr'
import { BiSearch } from 'react-icons/bi' 
import { motion, AnimatePresence } from 'framer-motion'

const HamburgerMenu = ({categories, setCategory, category, toggleSearchBar}) => {
  const [ isOpen, setIsOpen ] = useState(false)

  const variants ={
    open: { opacity: 1, scaleY: 1 },
    closed: { opacity: 0, scaleY: 0, originY: 0},
  }

  const handleOnClick = (event, menuItem) => {
    event.preventDefault()
    setCategory(menuItem)
    setIsOpen(false)
  }

  return (
      <div className='mobile-header'>
        <div className='mobile-menu-header'>
          <div>Phnom Penh</div>
          <div className='mobile-menu-btns'>
            <motion.div
              whileTap={{scale: 0.9}}
            >
              <BiSearch onClick={toggleSearchBar}/>
            </motion.div>
            <AnimatePresence exitBeforeEnter>
              {!isOpen && (
                  <motion.div
                    whileTap={{scale: 0.9}}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0}}
                    transition={{ duration: 0.2 }}
                    key={1}
                  >
                    <GiHamburgerMenu onClick={()=>setIsOpen(true)}/>
                  </motion.div>
              )}
              {isOpen && (
                  <motion.div
                    whileTap={{scale: 0.9}}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0}}
                    transition={{ duration: 0.2 }}
                    key={2}
                  >
                    <GrClose onClick={()=>setIsOpen(false)}/>
                  </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <AnimatePresence>
          {isOpen &&
            <motion.div 
              className='burger-menu'
              variants={variants}
              initial='closed'
              animate='open'
              exit='closed'
              transition={{ duration: 0.4 }}
            >
              {categories.map((menuItem, index) => {
              return(
                <motion.div 
                  key={index}
                  className={`burger ${category === menuItem ? 'selected' : ''}`}
                  onClick={(e)=>handleOnClick(e, menuItem)}
                  whileTap={{
                    color: '#fff',
                    backgroundColor: '#D3D3D3',
                  }}
                >
                  {menuItem}
                </motion.div>
              )
              })}
            </motion.div>
          }
        </AnimatePresence>
      </div>
  )
}

export default HamburgerMenu