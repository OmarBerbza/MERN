import './App.css';
import Header from './HeaderFooter/Header';
import Form from './Register/Form';
import 'bootstrap/dist/css/bootstrap.css';
import Footer from './HeaderFooter/Footer';
import Home from './Component/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DisplayForm from './Register/DisplayForm';
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const api = process.env.REACT_APP_API_KEY;
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    axios.get(`${api}/registred`)
      .then(res=>{
        setUsers(res.data)
      })
  }, [users])

  return (
    <BrowserRouter>
        <Header/>

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/register' element={<Form api={api} users={users} />} />
          <Route path='/display' element={<DisplayForm/>} />
        </Routes>
        
        <Footer/>
    </BrowserRouter>
  );
}

export default App;
