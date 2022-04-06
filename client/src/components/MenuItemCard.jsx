import { motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'

const MenuItemCard = ({menuItem, setShowItemModalObjId}) => {
  const isMobile = useMediaQuery({ maxWidth: 992 })
  if(!menuItem.availability){
    return(
      <div className='menu-item-card unavailable'>
        <div className='menu-item-card-header'> 
          {menuItem.name}
        </div>
        {menuItem.desc &&
          <div className='menu-item-card-body'> 
            {menuItem.desc}
          </div>
        }
        <div className='menu-item-card-footer'>
          Currently Unavailable
        </div>
      </div>
    )
  }
  return (
    <motion.div 
      className='menu-item-card' 
      onClick={()=>setShowItemModalObjId(menuItem._id)}
      whileTap={!isMobile ? {scale: 0.9} : null}
    >
      <div className='menu-item-card-header'> 
        {menuItem.name}
      </div>
      {menuItem.desc && 
        <div className='menu-item-card-body'> 
          {menuItem.desc}
        </div>
      }
      <div className='menu-item-card-footer'>
        ${menuItem.price_md.toFixed(2)} {menuItem.price_lg && `- $${menuItem.price_lg.toFixed(2)}`}
      </div>
    </motion.div>
  )
}

export default MenuItemCard