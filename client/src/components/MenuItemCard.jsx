import { motion } from 'framer-motion'

const MenuItemCard = ({menuItem, setShowItemModalObjId}) => {

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
      whileHover={{scale: 1.1}}
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