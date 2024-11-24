
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {

const [users, setUsers] = useState([]) ;

useEffect(() => {
  fetch('http://localhost:5000/users')
  .then(res => res.json())
  .then(data => setUsers(data))
} , [])

const handleSubmit = e => {
  e.preventDefault() ;
  const form = e.target ;
  const name = form.name.value ;
  const email = form.email.value ;
  const user = { name, email} ;
  console.log(user) ;

  fetch('http://localhost:5000/users', {
    method: "POST",
    headers: {
      "content-type" : "application/json" 
    } ,
    body: JSON.stringify(user)
  })
  .then(res => res.json())
  .then(data => {
    console.log(data) ;
    const newUsers = [...users, data] ;
    setUsers(newUsers)
    form.reset() ;
    
  })
}

  return (
    <>
     
      <h1>Users Management System</h1>
    <h2>Total users : {users.length}</h2>

<form onSubmit={handleSubmit}>
  <input type="text" name="name" placeholder='name' id="" /> <br />
  <input type="email" name="email" placeholder='email' id="" /> <br />
  <input type="submit" value="Add user" />
</form>

{
  users.map(user =><p key={user.id}>{user.id} : {user.name} : {user.email}</p>)
}

    </>
  )
}

export default App
