import { useState, useEffect, useMemo } from 'react'
import './App.css'
import { preloadModule } from 'react-dom';

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
          return <div className='card' key={politician.id}>
              <h3>{politician.name}</h3>
              <img src={politician.image} alt={politician.name} />
              <p>Position: {politician.position}</p>
              <p>Bio: {politician.biography}</p>
            </div>
        })
        
        }
      </div>
    </>
  )
}

export default App
