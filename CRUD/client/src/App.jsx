import { Route, Routes } from 'react-router-dom';
import './App.css';
import Users from './Component/Users';
import Details from './Component/Details';
import { useEffect, useState } from 'react';
import Axios from "axios";


function App() {
  const [users, setUsers] = useState([]);
  const api = process.env.REACT_APP_API_KEY;

  useEffect(()=>{
    Axios.get(`${api}/users`)
    .then(res=>{
      setUsers(res.data)
    })
  }, [users])

  return (
    <div className="">
      <Routes>
        <Route path='/' element={<Users users={users} api={api} />} />
        <Route path='/:_id' element={<Details users={users} api={api} />} />
      </Routes>
    </div>
  );
}

export default App;
