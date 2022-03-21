import { useGetFoodsQuery } from '../features/api'
import { useState, useEffect, Fragment } from 'react'
import LoadingSpinner from './LoadingSpinner'
import MenuItemCard from './MenuItemCard'
import MenuItemModal from './MenuItemModal'
import { motion, AnimatePresence } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
import HamburgerMenu from './HamburgerMenu'
import { GiHamburgerMenu } from 'react-icons/gi'
import Backdrop from './Backdrop'
 
const Menu = () => {
  const categories = [
    'Kitchen Suggestions',
    'Noodles(Cambodian Style)',
    'Rice',
    'Soups',
    'Vietnamese Dishes',
    'Beverages',
    'Moo Moo Shake'
  ]

  const { data, refetch, isError, error, isLoading } = useGetFoodsQuery()
  const [ category, setCategory ] = useState('Kitchen Suggestions')
  const [ showItemModalObjId, setShowItemModalObjId ] = useState(null)
  const [ isOpen, setIsOpen ] = useState(false)
  const isMobile = useMediaQuery({ maxWidth: 768})

  useEffect(() => {
    // refetches every 3 mins
    setInterval(refetch, 180000)
  },[])
  
  return (
    <div className='menu'>
      {!isMobile && 
        <div className='menu-header'>
          {categories.map((item, index) => (
            <motion.div 
              key={index}
              className={`menu-header-item ${category === item ? 'selected' : ''}`}
              onClick={()=>setCategory(item)}
              whileTap={{scale: 0.9}}
              whileHover={{
                backgroundColor: '#808080',
                color: '#FFFFFF',
          
              }}
            > 
              {item}
            </motion.div>
          ))}
        </div>
      }
      {isMobile && 
        <HamburgerMenu 
          categories={categories}
          setCategory={setCategory}
          category={category}
        />
      }
      <div className='menu-items'>
        {isLoading 
        ? <LoadingSpinner />
        : isError 
        ? error.message
        : data
            .filter((menuItem) => menuItem.category === category)
            .map((filteredMenuItem, index) => (
              <Fragment key={index}> 
                <MenuItemCard 
                  key={index} 
                  menuItem={filteredMenuItem}
                  showItemModalObjId={showItemModalObjId}
                  setShowItemModalObjId={setShowItemModalObjId} 
                />
                <AnimatePresence key={index}>
                  {showItemModalObjId === filteredMenuItem._id && 
                    <MenuItemModal
                      key={index} 
                      menuItem={filteredMenuItem} 
                      closeModal={()=>setShowItemModalObjId(null)} 
                    />
                  }
                </AnimatePresence>           
              </Fragment>
          ))
        }
      </div>
    </div>
  )
}

export default Menu
