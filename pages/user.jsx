import React, { useState } from 'react'
import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import User from '../models/User'
import PersonAddIcon from '@mui/icons-material/PersonAdd';




//material icones

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';


export default function user({ users }) {
 




  const [previousUsers, setPreviousUsers] = useState(users)





  const filteredUsers =  previousUsers

  return (
    <div>
      <h1>Usuarios
      <SupervisedUserCircleIcon
          style={{
            textDecoration: 'none',
            color: '#212529',
            height: '60px',
            width: '60px',
            marginLeft: '10px',
          }} />
      
      
      </h1>
      <hr></hr>
      <div className="container text-center">
      <div>
          <button className="btn btn-secondary float-start">
            <a href="/administracion" style={{ textDecoration: 'none', color: 'white' }}>
              <ArrowBackIcon />
            </a>
          </button>
        </div>
        <div style={{marginLeft:"auto"}}>
        <Link href="/register">
                <button className="btn btn bg-primary float-end" style={{ color: 'white' }}>
                  <PersonAddIcon />
                </button>
              </Link>
        </div>
        <div className="row">
        
          <div className="col-12">
          
            <br></br>
            <table className="table table-striped">
              <thead>
                <tr>
                <th scope="col-1">#</th>
                  <th scope="col-1">Usuario</th>
                  <th scope="col-2">Rol</th>
            
                  <th scope="col-5">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user._id}>
                    <td>
                      <img
                        src="./user.png"
                        alt="Descripción de la imagen"
                        width={30}
                      />{' '}
                      {index}
                    </td>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                    
                    <td>
                    
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
         
        </div>
      </div>
    </div>
  )
}

/* Retrieves user(s


/* Retrieves user(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const result = await User.find({})
  const users = result.map((doc) => {
    const user = doc.toObject()
    user._id = user._id.toString()
    return user
  })

  return { props: { users } }
}
