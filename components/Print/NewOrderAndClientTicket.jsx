





import Image from "next/image";


//materia icon

import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LanguageIcon from '@mui/icons-material/Language';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import ContentCutIcon from '@mui/icons-material/ContentCut';



const NewOrderAndClientTicket = ({ client, orden, companys, image, identifier  }) => {
  const currentDate = new Date();

  const day = String(currentDate.getDate()).padStart(2, '0');
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
const year = currentDate.getFullYear();

const formattedDate = `${day}/${month}/${year}`;



 

  return (
    <div id="ticket-content" style={{ display: 'none',  width: '80mm', fontFamily: 'Arial', fontSize: '25px', margin: '10px', height:"100px" }}>

<div style={{ textAlign: 'center' }}>
           <Image src={image} alt="Company Logo" width={80} height={80} />
         </div>
         <div style={{ textAlign: 'center', marginBottom: '5px' }}>
           {companys.map((company, index) => (
          <div key={company._id}>{company.companyname}</div>
           ))}
          <div> <strong>Orden:</strong>{identifier}</div>
          <div> <strong>Fecha:</strong> {formattedDate}</div>
          <div>
           <strong>Cliente:</strong> {client.name} {client.lastname}
         </div>
         <div>
           <strong>Tel:</strong> {client.number}
         </div>
         <div>
           <strong>Tipo:</strong> {orden.type} {orden.marca} {orden.model}
         </div>
         <div>
           <strong>Detalle:</strong> {orden.issue}
         </div>
         <div>
           <strong>Precio:</strong>${orden.otherPrice}
         </div>
         </div>
       
        
        
       
         
</div>


       
     
  );
};

export default NewOrderAndClientTicket;



















