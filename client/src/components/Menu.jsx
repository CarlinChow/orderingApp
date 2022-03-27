import { useGetFoodsQuery } from '../features/api'
import { useState, useEffect, Fragment } from 'react'
import LoadingSpinner from './LoadingSpinner'
import MenuItemCard from './MenuItemCard'
import MenuItemModal from './MenuItemModal'
import { motion, AnimatePresence } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
import HamburgerMenu from './HamburgerMenu'
import SearchBar ,{ useFilterItems } from './SearchBar' 

const Menu = ({order}) => {
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
  const [ searchQuery, setSearchQuery ] = useState('')
  const filteredSearchItems = useFilterItems(searchQuery, data)
  const isMobile = useMediaQuery({ maxWidth: 992})

  useEffect(() => {
    // refetches every 3 mins
    setInterval(refetch, 180000)
  },[refetch])

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
        <div className='mobile-header'>
          <div className='mobile-title'>Phnom Penh</div>
          <div className='mobile-menu-header'>
            <SearchBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              items={data ? data : null}
            />
            <HamburgerMenu 
              categories={categories}
              setCategory={setCategory}
              category={category}
            />
          </div>
        </div>
      }
      <div className={`menu-items ${isMobile && order.numOfItems > 0 ? 'footer-active' : ''}`}>
        <div className='menu-category'>
          {searchQuery ? 'Search Results' : category}
        </div>

        {isLoading 
        ? <LoadingSpinner />
        : isError 
        ? error.message
        : (searchQuery && filteredSearchItems.length === 0)
        ? <div>Sorry, no items were found.</div> 
        : searchQuery
        ? filteredSearchItems
            .map((filteredMenuItem, index) => (
              <Fragment key={index}> 
                <MenuItemCard 
                  menuItem={filteredMenuItem}
                  showItemModalObjId={showItemModalObjId}
                  setShowItemModalObjId={setShowItemModalObjId} 
                />
                <AnimatePresence key={index}>
                  {showItemModalObjId === filteredMenuItem._id && 
                    <MenuItemModal
                      menuItem={filteredMenuItem} 
                      closeModal={()=>setShowItemModalObjId(null)} 
                    />
                  }
                </AnimatePresence>           
              </Fragment>
            )) 
        : data
            .filter((menuItem) => menuItem.category === category)
            .map((filteredMenuItem, index) => (
              <Fragment key={index}> 
                <MenuItemCard 
                  menuItem={filteredMenuItem}
                  showItemModalObjId={showItemModalObjId}
                  setShowItemModalObjId={setShowItemModalObjId} 
                />
                <AnimatePresence key={index}>
                  {showItemModalObjId === filteredMenuItem._id && 
                    <MenuItemModal
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
