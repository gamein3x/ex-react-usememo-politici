import React, { useState, useEffect, useMemo } from 'react'
import './App.css'
import { preloadModule } from 'react-dom';

function PoliticianCard({name, image, position, biography}){
  console.log("Card");
  return <div className='card'>
              <h3>{name}</h3>
              <img src={image} alt={name} />
              <p>Position: {position}</p>
              <p>Bio: {biography}</p>
            </div>
}

const MemorizedPoliticianCard = React.memo(PoliticianCard);

function App() {
  
  const [ politicians, setPoliticians ] = useState([])
  const [ search, setSearch ] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3333/politicians`)
    .then(res => res.json())
    .then(data => setPoliticians(data))
    .catch(error => console.error(error))
    .finally(console.log("Fetch eseguita"));
  }, [])

  const filteredPoliticians = useMemo(() => {
    return politicians.filter(politician => {
    const isInName = politician.name.toLowerCase().includes(search.toLowerCase());
    const isInDescription = politician.biography.toLowerCase().includes(search.toLowerCase());
    return isInName || isInDescription;
  });
  }, [politicians, search])


  return (
    <>
      <h1>Lista Politici</h1>

      <input type="text" 
        placeholder='Cerca...'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      
      <div className='politicians-list'>
        {filteredPoliticians.map(politician => {
          return <MemorizedPoliticianCard key={politician.id} {...politician}/>
        })
        
        }
      </div>
    </>
  )
}

export default App
