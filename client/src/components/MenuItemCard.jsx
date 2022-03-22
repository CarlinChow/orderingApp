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
        <div className='menu-item-card-body'> 
          {menuItem.desc && <p>{menuItem.desc}</p>}
        </div>
        <div className='menu-item-card-footer'>
          <p>Currently Unavailable</p>
        </div>
      </div>
    )
  }
  return (
    <motion.div 
      className='menu-item-card' 
      onClick={()=>setShowItemModalObjId(menuItem._id)}
      whileHover={!isMobile ? {scale: 1.1} : null}
      whileTap={{scale: 0.9}}
    >
      <div className='menu-item-card-header'> 
        {menuItem.name}
      </div>
      <div className='menu-item-card-body'> 
        {menuItem.desc && <p>{menuItem.desc}</p>}
      </div>
      <div className='menu-item-card-footer'>
        <p>${menuItem.price_md.toFixed(2)} {menuItem.price_lg && `$${menuItem.price_lg.toFixed(2)}`}</p>
      </div>
    </motion.div>
  )
}

export default MenuItemCard