
import SignUpForm from './components/SignUpForm';
import Authenticate from './components/Authenticate';
import { useState } from 'react';
import './App.css';

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <SignUpForm getToken={setToken}/>
      <Authenticate token={token} />
    </>
  )
}

export default App
