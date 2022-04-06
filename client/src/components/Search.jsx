import { useState } from 'react'

const Search = ({className, setQuery, closeSearch}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const handlePress = (event) => {
    if(event.key === 'Enter'){
      setQuery(searchQuery)
    }
  }

  return (
    <div className='foods-searchbar'>
      <label>
        Search:
      </label>
      <input 
        type='search' 
        value={searchQuery}
        placeholder='Search for an item...'
        className={className}
        onChange={(e)=>setSearchQuery(e.target.value)}
        onKeyPress={handlePress}
      />
    </div>
  )
}

export default Search