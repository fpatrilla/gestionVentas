import Image from "next/image";
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import BookOnlineIcon from '@mui/icons-material/BookOnline';




const NewAccountTicket = ({ image, name, lastname, gmail, gmailpass, facebook, facebookpass, icloud, icloudpass, companys  }) => {

  const currentDate = new Date();

  const day = String(currentDate.getDate()).padStart(2, '0');
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
const year = currentDate.getFullYear();

const formattedDate = `${day}/${month}/${year}`;



  
    return (
      <div id="ticket-NewAccountTicket" style={{ width: '80mm', fontFamily: 'Arial', fontSize: '25px', margin: '10px',   display: 'none'  }}>
            <div style={{ textAlign: 'center' }}>
                      <Image src={image} alt="Company Logo" width={120} height={120} />
             </div>
             
            <div style={{ textAlign: 'center', marginBottom: '5px', }}>
                  {companys.map((company, index) => (
                    <div key={company._id}><strong>{company.companyname}</strong>
                        <div style={{fontSize:"12px"}}>{company.companyType} Cuit: {company.cuit}</div>
                        <div style={{fontSize:"12px"}}>{company.telephone1} / {company.telephone2}</div>
                        <div style={{fontSize:"12px"}}>{company.celphone1} / {company.celphone2}</div>
                        <div style={{fontSize:"12px"}}>{company.web}</div>
                        <div style={{fontSize:"12px"}}>{company.email}</div>
                        <div style={{fontSize:"12px"}}>{company.address} {company.city}</div>
                    </div>

                    ))}
                    <div style={{width: "280px", margin: "0 auto", textAlign: "center", borderBottom:"1px solid", marginBottom:"4px", marginTop:"4px"}}>
                    </div>
                    <div>Cuentas:</div>
                   
                    <div>
                        <strong>Fecha:</strong> {formattedDate}
                    </div>
                    <div>
                      <strong>{name} {lastname}</strong>
                    </div>
                    <div style={{width: "280px", margin: "0 auto", textAlign: "center", borderBottom:"1px solid", marginBottom:"4px", marginTop:"4px"}}>
                    </div>

                   

                                 
                               
                    <div>
                           <strong><EmailIcon style={{width:"15px", height:"15px" , marginTop:"5px"}}/> Gmail:</strong> {gmail}
                    </div>
                  
                    <div>
                        <strong><PasswordIcon style={{width:"15px", height:"15px" , marginTop:"5px"}}/> Contraseña</strong> {gmailpass}
                    </div>
                   
                  
                   

                   
                    <div style={{width: "280px", margin: "0 auto", textAlign: "center", borderBottom:"1px solid", marginBottom:"4px", marginTop:"4px"}}>
                    </div>
                    <div>
                           <strong><FacebookIcon style={{width:"15px", height:"15px" , marginTop:"5px"}}/> Facebook:</strong> {facebook}
                    </div>
                  
                    <div>
                        <strong><PasswordIcon style={{width:"15px", height:"15px" , marginTop:"5px"}}/> Contraseña</strong> {facebookpass}
                    </div>
                    <div style={{width: "280px", margin: "0 auto", textAlign: "center", borderBottom:"1px solid", marginBottom:"4px", marginTop:"4px"}}>
                    </div>
                    <div>
                           <strong><AppleIcon style={{width:"15px", height:"15px" , marginTop:"5px"}}/> icloud:</strong> {icloud}
                    </div>
                  
                    <div>
                        <strong><PasswordIcon style={{width:"15px", height:"15px" , marginTop:"5px"}}/> Contraseña</strong> {icloudpass}
                    </div>

                    </div>
                           
                    
                    <div style={{width: "280px", margin: "0 auto", textAlign: "center", borderBottom:"1px solid", marginBottom:"4px", marginTop:"4px"}}>
                    </div>
                    <div style={{width: "280px", margin: "0 auto", textAlign: "center", fontSize:"15px"}}>
                       <strong> Gracias por confiar en nosotros</strong> 
                    </div>
                    
            </div>
              
              
       
    );
  };
  
  export default NewAccountTicket;
  