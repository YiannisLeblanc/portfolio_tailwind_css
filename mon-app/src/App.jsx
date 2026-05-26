import './App.css'
import pexelsImage from './assets/pexels-artem-beliaikin-1832323-removebg-preview.png'

function App() {
  return (
    <>
      <div className="container">
        <h1>Hello, my name is Madelyn Torff</h1>
        <h2>Short text with details about you, what you do or your professional career.</h2>
      </div>
      <img src={pexelsImage} className="pexels-image" alt="Profile" />
    </>
  )
}

export default App
