import { useState, useEffect } from 'react'
import './App.css'
import { preloadModule } from 'react-dom';

function App() {
  
  const [ politicians, setPoliticians ] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3333/politicians`)
    .then(res => res.json())
    .then(data => setPoliticians(data))
    .catch(error => console.error(error))
    .finally(console.log("Fetch eseguita"));
  }, [])


  return (
    <>
      <h1>Lista Politici</h1>
      
      <div className='politicians-list'>
        {politicians.map(politician => {
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
