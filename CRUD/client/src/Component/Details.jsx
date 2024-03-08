import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';

function Details({ api }) {
  const { _id } = useParams();
  const [chosenUser, setChosenUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ name: '', age: '', email: '' });
  const navigate = useNavigate();

  // SHOW THE DETAILS
  useEffect(() => {
    Axios.get(`${api}/users/${_id}`)
      .then((res) => {
        setChosenUser(res.data);
        setEditedUser(res.data);
      })
      .catch((error) => console.error("Error fetching user details:", error));
  }, [_id]);

  // DELETE USER
  const deleteUser = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");

    if (confirmDelete) {
      Axios.delete(`${api}/users/${_id}`)
        .then((res) => {
          console.log(res.data.message);
          navigate('/');
        })
        .catch((error) => console.error("There is an error while deleting: ", error));
    }
  };

  // MODIFY USER
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const saveChanges = () => {
    // Send a request to update the user with the editedUser data
    Axios.put(`${api}/users/${_id}`, editedUser)
      .then((res) => {
        console.log(res.data.message);
        setIsEditing(false);
        setChosenUser(editedUser); // Update the chosenUser state with the edited data
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  return (
    <div className=''>
      {chosenUser && (
        <div className=''>
          <h1 className='text-3xl text-blue-500 drop-shadow-lg text-center mt-5'>{chosenUser.name}'s data:</h1>

          <div className='min-h-80 flex items-center justify-center'>
            {isEditing ? (
              <form className='inline-grid'>
                <label>Name</label>
                <input type='text' name='name' value={editedUser.name} onChange={handleInputChange} className='border focus:bg-blue-50 h-12 p-5 rounded-lg mb-6 w-96'/>

                <label>Age</label>
                <input type='number' name='age' value={editedUser.age} onChange={handleInputChange} className='border focus:bg-blue-50 h-12 p-5 rounded-lg mb-6 w-96'/>

                <label>Email</label>
                <input type='text' name='email' value={editedUser.email} onChange={handleInputChange} className='border focus:bg-blue-50 h-12 p-5 rounded-lg mb-6 w-96'/>
              </form>
            ) : (
              <ul className=''>
                <li><b>Name:</b> {chosenUser.name} </li>
                <li><b>Age:</b> {chosenUser.age} </li>
                <li><b>E-mail:</b> {chosenUser.email} </li>
              </ul>
            )}
          </div>

          <div className="flex justify-center">
            <button onClick={deleteUser} className='px-8 h-10 ms-5 bg-red-400 text-white rounded transition-colors duration-300 hover:bg-red-600'>
              Delete
            </button>
            <button onClick={toggleEdit} className='px-8 h-10 ms-5 bg-orange-400 text-white rounded transition-colors duration-300 hover:bg-orange-600'>
              {isEditing ? 'Cancel' : 'Modify'}
            </button>

            {isEditing && (
              <button onClick={saveChanges} className='px-8 h-10 ms-5 bg-green-400 text-white rounded transition-colors duration-300 hover:bg-green-600'>
                Save Changes
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
