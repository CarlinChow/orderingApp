import FoodsTable from '../components/FoodsTable'
import AddFoodForm from '../components/AddFoodForm'
import { MdExpandMore } from 'react-icons/md'
import { useState, useEffect } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { GrAdd } from 'react-icons/gr'
import { useFilterItems } from '../components/SearchBar'
import { useGetFoodsQuery } from '../features/api'
import { motion, AnimatePresence } from 'framer-motion'
import Search from '../components/Search'

const FoodsPage = () => {
  const foods = useGetFoodsQuery()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isSearchbarOpen, setIsSearchbarOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [query, setQuery] = useState('')
  const filteredItems = useFilterItems(query, foods.data)

  useEffect(()=> {
    if(!isSearchbarOpen){
      setQuery('')
    }
  }, [isSearchbarOpen])

  const handleSearchItem = () => {
    setIsSearchbarOpen(true)
    setIsDropdownOpen(false)
  }

  const handleAddItem = () => {
    setIsModalOpen(true)
    setIsDropdownOpen(false)
  }

  const handleCaretClick = () => {
    if(isSearchbarOpen){
      setIsSearchbarOpen(false)
      return
    }
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <div className="content">
      <div className='page-header'>
        <div>Foods</div>
        <MdExpandMore 
          className='icon' 
          onClick={handleCaretClick}
        />
      </div>
      <div className='foods-dropdown-menu-container'>
        <AnimatePresence exitBeforeEnter>
        {isDropdownOpen && 
          <motion.div 
            className='foods-dropdown-menu'
            key={0}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
          >
            <div 
              className='foods-dropdown-item'
              onClick={handleSearchItem}
            >
              <BiSearchAlt />
              <div>Search Item</div>
            </div>
            <div 
              className='foods-dropdown-item'
              onClick={handleAddItem}
            >
              <GrAdd />
              <div>Add Item</div>
            </div>
          </motion.div>
        }
        {isSearchbarOpen && 
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.1}}
          >
            <Search
              key={1}
              setQuery={setQuery}
              closeSearch={()=>setIsSearchbarOpen(false)} 
            />
          </motion.div>
        }
        </AnimatePresence>
      </div>
      <FoodsTable foods={query ? {...foods, data: filteredItems} : foods} />
      <AnimatePresence>
        {isModalOpen && <AddFoodForm closeModal={()=>setIsModalOpen(false)}/> }
      </AnimatePresence>
    </div>
  )
}

export default FoodsPage