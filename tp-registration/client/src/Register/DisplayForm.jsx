import React from 'react'
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';


function DisplayForm() {
  const location = useLocation();
  const fromData = location.state;

  return (
    <div className='container displayForm'>
      <h2 className='text-light'>From Data</h2>
      <p className='text-light'>Indentifiant: <b>{fromData.indentifiant}</b></p>
      <p className='text-light'>Date de naissance: <b>{fromData.naissence}</b></p>
      <p className='text-light'>Ville: <b>{fromData.ville}</b></p>
      <p className='text-light'>Genre: <b>{fromData.genre}</b></p>
      <p className='text-light'>Loisir: <b>{fromData.loisir}</b></p>
      <p className='text-light'>
        Photo: 
        <br /> <br />
        {fromData.preview && (
          <img src={fromData.preview} alt={fromData.indentifiant} />
        )}
      </p>
    </div>
  )
}

export default DisplayForm