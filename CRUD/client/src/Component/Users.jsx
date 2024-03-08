import React from 'react'
import Axios from "axios";
import {  useState } from 'react';
import { Link } from 'react-router-dom';
import { VscSearch } from "react-icons/vsc";

function Users({users, api}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [serachByEmail, setSearchByEmail] = useState('');
  const [searchByName, setSearchByName] = useState('');

  // CREATE USER
  const createUser = (e)=>{
    if(name && age && email){
      Axios.post(`${api}/createUser`, {name: name, age: age, email: email})
      .then(res=> res.data)
    }else{
      setMessage("The fields cannot be empty");
      e.preventDefault()
    }
  }

  // SEARCH USER BY NAME
  const nameSearch = (name)=>{
    Axios.get(`${api}/users`)
      .then((res)=> setSearchByName(res.data.filter(itm=> itm.name === name)))
      .catch(err=> console.error("There's an error while searching by name: ", err));
  }

  return (
    <div>
      {/* FORM OF ADDING USERS */}
      <h1 className='text-4xl text-blue-500 drop-shadow-lg flex justify-center my-6'>Manage Users</h1>
      <form className='flex flex-col items-center'>
        <input type="text" placeholder='Name' onChange={e=> setName(e.target.value)} className='border focus:bg-blue-50 h-12 p-5 rounded-lg mb-6 w-96' />
        <input type="number" placeholder='Age' onChange={e=> setAge(e.target.value)} className='border focus:bg-blue-50 h-12 p-5 rounded-lg mb-6 w-96' />
        <input type="mail" placeholder='Email' onChange={e=> setEmail(e.target.value)} className='border focus:bg-blue-50 h-12 p-5 rounded-lg mb-6 w-96' />
        
        <p className='text-red-600 font-bold text-lg'>{message}</p>

        <button onClick={createUser} className='bg-blue-600 h-12 rounded text-gray-100 hover:bg-blue-900 mb-6 w-96 font-bold'>Submit</button>
      </form>

      {/* SEARCHING USER */}
      <div className="flex justify-center">
        <input type="email" name='searchByEmail' value={serachByEmail} onChange={(e)=> setSearchByEmail(e.target.value)} placeholder='Searching by Email' className='border focus:bg-blue-50 h-12 p-5 rounded-lg mb-6 w-96' /> 
        <button className='ms-5 text-2xl border rounded-full h-12 w-16 flex items-center justify-center transition-colors duration-300 hover:bg-blue-300 hover:text-white'><VscSearch /></button>
      </div>
      <div className="flex justify-center">
        <input type="text" name='searchByName' value={searchByName} onChange={(e)=> setSearchByName(e.target.value)} placeholder='Searching by Name' className='border focus:bg-blue-50 h-12 p-5 rounded-lg mb-6 w-96' /> 
        <button onClick={nameSearch} className='ms-5 text-2xl border rounded-full h-12 w-16 flex items-center justify-center transition-colors duration-300 hover:bg-blue-300 hover:text-white'><VscSearch /></button>
      </div>

      {/* VIEW USERS WHO HAVE ADDED */}
      <div className='grid grid-cols-4 justify-center'>
        {users.map( ({_id, name})=>{
          return(
            <Link to={`/${_id}`} key={_id} className=''>
              <h3 className='mt-3 mx-14 h-10 grid justify-center items-center text-gray-500 border-blue-900 rounded bg-blue-200 transition-colors duration-300 hover:bg-blue-300 hover:text-gray-200'>
                {name}
              </h3>
            </Link>
          )
        })}
      </div>
    </div>
  );
}

export default Users