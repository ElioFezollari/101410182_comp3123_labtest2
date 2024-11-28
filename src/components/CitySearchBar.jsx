import React from 'react'

function CitySearchBar({city,setCity}) {
  return (
    <div>
        <label htmlFor="city">Search City: </label><input id='city' name='city' className='search-city' type="text"  value={city} onChange={(e)=>setCity(e.target.value)} />
    </div>
  )
}

export default CitySearchBar