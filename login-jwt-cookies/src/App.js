import './App.css';
import { Routes, Route, Navigate } from "react-router-dom"
import Login from './Login';
import { useCookies } from "react-cookie";
import { useEffect, useState } from 'react';


function App() {



  return (
    <div className="App">
      {/* не забудь изменить index.js !!! */}
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="login" element={ <Login/> } />
        <Route path="*" element={<Navigate to="/" replace />}/> 
        {/* это для потеряшек */}
      </Routes>
    </div>
  );
}


function Home() {
  const [cookies, setCookie] = useCookies(["JWT", "Session"]); // как я понял, указываем интересующие нас куки (?)
  const [redirect, setRedirect] = useState(false);

  // useEffect is optional. Should use, when you restrict access to guest users.
  useEffect(() => {
    if (cookies.JWT == null || cookies.Session == null) {
      setRedirect(true);
    }
  }, [cookies.JWT, cookies.Session])

  function handleExit() {
    document.cookie = "JWT=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "Session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  return(
    <div className='App'>
      {redirect && <Navigate replace to="/login" />}
      {cookies.JWT && <h1>Ваш JWT: {cookies.JWT.slice(0, 10)}...{cookies.JWT.slice(cookies.JWT.length - 10, cookies.JWT.length)}</h1>}
      {cookies.JWT && <h1>Ваш Session: {cookies.Session.slice(0, 10)}...{cookies.Session.slice(cookies.Session.length - 10, cookies.Session.length)}</h1>}
      <button onClick={() => handleExit()}>Выйти</button>
    </div>
  )
}

export default App;
