import { useState, Fragment } from 'react'
import ReadOnlyRow from './ReadOnlyRow'
import EditRow from './EditRow'
import LoadingSpinner from './LoadingSpinner'

const FoodsTable = ({foods}) => {
  const [ editRowObjectID, setEditRowObjectID ] = useState(null)
  const { data, isLoading, isError, error } = foods

  if(isLoading){
    return <LoadingSpinner />
  }
  if(isError){
    return <p>{error.message}</p>
  }
  return (
    <div className='foods-table'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price_Md</th>
              <th>Price_Lg</th>
              <th>Desc</th>
              <th>Category</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? <tr><td>loading...</td></tr>
            : data.map((foodItem, index) => (
                <Fragment key={index}>
                  { 
                    foodItem._id === editRowObjectID ? 
                    <EditRow foodItem={foodItem} index={index} setEditRowObjectID={setEditRowObjectID}/>
                    : <ReadOnlyRow foodItem={foodItem} index={index} setEditRowObjectID={setEditRowObjectID}/>
                  }
                </Fragment>
            ))}
          </tbody>
      </table>
    </div>
  )
}

export default FoodsTable