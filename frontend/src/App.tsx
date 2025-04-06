import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleChange2 = (event2) => {
    setInputValue2(event2.target.value);
  }
  const handleChange3 = (event3) => {
    setInputValue3(event3.target.value);
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
      <form>
      <label htmlFor="my-text-input">Enter food:</label>
      <input
        type="text"
        id="my-text-input"
        value={inputValue}
        onChange={handleChange}
      />
      <p>You entered: {inputValue}</p>
    </form>
    <form>
      <label htmlFor="my-text-input">Enter expiration date:</label>
      <input
        type="text"
        id="my-text-input"
        value={inputValue2}
        onChange={handleChange2}
      />
      <p>You entered: {inputValue2}</p>
    </form>
    <form>
      <label htmlFor="my-text-input">Enter id:</label>
      <input
        type="text"
        id="my-text-input"
        value={inputValue3}
        onChange={handleChange3}
      />
      <p>You entered: {inputValue3}</p>
    </form>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
