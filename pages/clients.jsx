import React, { useState, useEffect, } from 'react'
import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Client from '../models/Client'
import Cookies from 'js-cookie';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import EditIcon from '@mui/icons-material/Edit';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';

import { useRequireAuth } from '../lib/auth';

export default function user({ clients }) {
  const [filteredClients, setFilteredClients] = useState(clients);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filtered = clients.filter(
      (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase())||
      (client.company && client.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
        client.lastname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort the filtered data by identifier in descending order
    const sortedFiltered = filtered.sort((a, b) => b.identifier - a.identifier);

    setFilteredClients(sortedFiltered);
  }, [searchTerm, clients]);

  return (
    <div>
        <div>
        <h1>Clientes
        <PersonIcon className="iconhead" />
        </h1>
      <hr></hr>
      <div className="container text-center">
        <div className="row">
          <div style={{ display: 'flex' }}>
            <div style={{ width: '70%', margin:"auto" }}>
              <input
                type="text"
                placeholder="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div style={{ width: '10%' }}>
              <Link href="/newClient">
                <button className="btn btn bg-primary float-end" style={{ color: 'white' }}>
                  <PersonAddIcon />
                </button>
              </Link>
            </div>
          </div>
          <div className="col-12">
            <br></br>
            <table className="table table-striped">
              <thead>
                <tr>
                <th scope="col-1">Codigo</th>
                  <th scope="col-2">Nombre</th>
                  <th scope="col-2">Apellido</th>
                  <th scope="col-2">Celular</th>
                  <th scope="col-2">Empresa</th>
                  <th scope="col-5">Acciones</th>
                </tr>
              </thead>
              <tbody>
              {filteredClients.map((client, index) => (
                  <tr key={client._id}>
                    <td>
                      <img
                        src="./user.png"
                        alt="Descripción de la imagen"
                        width={30}
                      />{' '}
                      {index}
                    </td>
                    <td>{client.name}</td>
                    <td>{client.lastname}</td>
                    <td>{client.number}</td>
                    <td>{client.company}</td>
                    <td>
                      <Link href="/[id]/editClient" as={`/${client._id}/editClient`} legacyBehavior>
                        <button className="btn btn-warning" style={{ margin: '3px', color:'white'}}>
                        <ModeEditOutlineIcon/>
                        </button>
                      </Link>
                      <Link href="/[id]/client" as={`/${client._id}/client`} legacyBehavior>
                        <button className="btn btn-success" style={{ margin: '3px' }}>
                        <ArrowForwardIcon />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    </div>
     
    </div>
  )
}

/* Retrieves client(s


/* Retrieves client(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const result = await Client.find({})
  const clients = result.map((doc) => {
    const client = doc.toObject()
    client._id = client._id.toString()
    return client
  })

  return { props: { clients } }
}
