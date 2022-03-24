import { motion } from 'framer-motion'

export const useFilterItems = (searchQuery, items) => {
  if(!items){
    return
  }
  if(!searchQuery){
    return items
  }
  return items.filter((food) => {
    const foodItem = food.name.toLowerCase()
    return foodItem.includes(searchQuery)
  })
}

const SearchBar = ({searchQuery, setSearchQuery}) => {

  const handleChange = (event) => {
    setSearchQuery(event.target.value)
  }

  return (
    <motion.div 
      className='searchbar-container'
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{duration: 0.2}}
    >
      <input 
        type='text' 
        value={searchQuery}
        onChange={handleChange} 
        placeholder='search for an item here...'
      />
    </motion.div>
  )
}

export default SearchBar