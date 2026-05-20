import './App.css'
import pexelsImg from './assets/pexels-artem-beliaikin-1832323-removebg-preview.png'

function App() {
  return (
    <div className="container">
      <h1>Hello, my name is Madelyn Torff</h1>
      <h2>Short text with details about you, what you do or your professional career.</h2>
      <img src={pexelsImg} alt="Portrait" className="portrait" />
    </div>
  )
}

export default App
