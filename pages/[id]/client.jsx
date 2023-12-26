import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../lib/dbConnect'
import Client from '../../models/Client'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import WhatsappInfoClientModal from '../../components/WhatsappInfoClientModal'
import EmailInfoClientModal from '../../components/EmailInfoClientModal'
import Company from '../../models/Company'

import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";



/* Allows you to view client card info and delete client card*/
const ClientPage = ({ client, companys }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const clientID = router.query.id
  
    try {
      await fetch(`/api/client/${clientID}`, {
        method: 'Delete',
      })
     
  
      Swal.fire({
        title: 'Estas seguro que desea eliminarlo?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!'
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/clients')
          Swal.fire(
            'Eliminado!',
            'El cliente se ah eliminado.',
            'Exitoso'
          )
        }
      })
    } catch (error) {
      setMessage('Failed to delete the client.')
    }
  }

  const [WhatsappInfoModalIsOpen, setWhatsappInfoModalIsOpen] = useState(false);
  const openWhatsappInfoModal = () => {
    setWhatsappInfoModalIsOpen(true);
  };

  const closeWhatsappInfoModal = () => {
    setWhatsappInfoModalIsOpen(false);
  };
  const [EmailInfoModalIsOpen, setEmailInfoModalIsOpen] = useState(false);
  const openEmailInfoModal = () => {
    setEmailInfoModalIsOpen(true);
  };

  const closeEmailInfoModal = () => {
    setEmailInfoModalIsOpen(false);
  };
  

  return (  
    <div>
      <div>
         <div style={{display:"flex"}}>
            <div>
              <h1>Cliente: {client.name} {client.lastname}</h1>
            </div>
            <div>
            

            </div>
           
         </div>
         <hr></hr>
         <div style={{display:"flex"}}>
         <div>
                  <button className="btn btn-secondary float-start">
                      <Link href="/clients" style={{ textDecoration: 'none', color: 'white' }}>
                        <ArrowBackIcon />
                      </Link>
                  </button>
         

            </div>
            <div style={{marginLeft:"auto"}}>
         <button type="button" class="btn btn-success flat-end"  onClick={openWhatsappInfoModal}>
                                <SendToMobileIcon style={{color:"white"}}/>
                              <WhatsAppIcon style={{color:"white"}}/>
                      

           </button>
           <button
                  type="button"
                  class="btn btn-light"
                  onClick={openEmailInfoModal}
                  style={{ marginLeft: "10px", border: "1px solid" }}
                >
                  <ForwardToInboxIcon
                    style={{
                      color: "#dc3545",
                      height: "27px",
                      paddingTop: "5px",
                      marginTop: "-12px",
                    }}
                  />
                </button>
         </div>

            
         </div>
        
         
         <div style={{width:"30%", margin:"auto", border:"1px solid",borderRadius:"30px", borderBlockColor:"#e9ecef", backgroundColor:"#e9ecef", padding:"30px",}}>
        <div>
     
                <h5 htmlFor="name">Nombre:</h5>
                  <div style={{marginLeft:"20px", width:"90%", backgroundColor:"white", paddingLeft:"20px", borderRadius:"30px 30px 30px 30px"}}>{client.name}</div> 
                    

                <h5 htmlFor="lastname">Apellido:</h5>
                <div style={{marginLeft:"20px", width:"90%", backgroundColor:"white", paddingLeft:"20px", borderRadius:"30px 30px 30px 30px"}}>{client.lastname}</div> 

                <h5 htmlFor="city">Localidad:</h5>
                   <div style={{marginLeft:"20px", width:"90%", backgroundColor:"white", paddingLeft:"20px", borderRadius:"30px 30px 30px 30px"}}>{client.city}</div> 
               

                <h5 htmlFor="number">Numero de contacto:</h5>
                  <div style={{marginLeft:"20px", width:"90%", backgroundColor:"white", paddingLeft:"20px", borderRadius:"30px 30px 30px 30px"}}>{client.number}</div> 
              
                <h5 htmlFor="dni">Dni/Cuit:</h5>

                <div style={{marginLeft:"20px", width:"90%", backgroundColor:"white", paddingLeft:"20px", borderRadius:"30px 30px 30px 30px"}}>{client.dni}</div> 
              
                <h5 htmlFor="email">Correo electrónico:</h5>

                <div style={{marginLeft:"20px", width:"90%", backgroundColor:"white", paddingLeft:"20px", borderRadius:"30px 30px 30px 30px"}}>{client.email}</div> 
                
                <h5 htmlFor="company">Empresa:</h5>

<div style={{marginLeft:"20px", width:"90%", backgroundColor:"white", paddingLeft:"20px", borderRadius:"30px 30px 30px 30px"}}>{client.company}</div> 
      
                <h5 htmlFor="coment">Comentario:</h5>
                <div style={{marginLeft:"20px", width:"90%", backgroundColor:"white", paddingLeft:"20px", borderRadius:"30px 30px 30px 30px", height:"100px"}}>{client.coment}</div> 
              

              <div style={{marginLeft:"30%", marginTop:"15px"}}>
              <Link href="/[id]/editClient" as={`/${client._id}/editClient`} legacyBehavior>
              <button size="small"  className="btn btn-warning" style={{marginRight:"8px", color:"white"}} ><EditIcon/></button></Link>
              <button size="small" className="btn btn-danger" onClick={handleDelete} > <DeleteForeverIcon/> </button>
               
              {message && <p>{message}</p>}
              </div>
         
        

      </div>
      </div>
      </div>
                      
   
    
      <WhatsappInfoClientModal isOpen={WhatsappInfoModalIsOpen} closeModal={closeWhatsappInfoModal} client={client} companys={companys} />
      <EmailInfoClientModal
        isOpen={EmailInfoModalIsOpen}
        closeModal={closeEmailInfoModal}
        client={client} companys={companys}/>

    </div>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()
  await dbConnect();
  const result = await Company.find({});
  const companys = result.map((doc) => {
    const company = doc.toObject();
    company._id = company._id.toString();
    return company;
  });

  const client = await Client.findById(params.id).lean()
  client._id = client._id.toString()

  return { props: { client, companys } }
}

export default ClientPage
