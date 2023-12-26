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
;

import PersonIcon from '@mui/icons-material/Person';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TodayIcon from '@mui/icons-material/Today';



const TechnicalreportModalPrint = ({ companys, image , report, price, firma, lastname, name }) => {


  const currentDate = new Date();

  const day = String(currentDate.getDate()).padStart(2, '0');
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
const year = currentDate.getFullYear();

const formattedDate = `${day}/${month}/${year}`;



 

  return (
    <div id="print-TechnicalreportModalPrint" style={{ display: 'none' }}>
          <div  style={{  marginTop:"10px"}} >
      <div className="container text-center">
        <div className="row">
          <div style={{width:"100", borderTop:"1px solid", borderBottom:"1px solid", textAlign:"center", fontSize:"20px", fontWeight:"bold"}}>
            INFORME TÉCNICO

          </div>
  {/* //header */}
  
          <div style={{ display: "flex", alignItems: "center", width: "100%", height: "140px", marginTop:"16px" }}>
                        <div style={{ width: "70%", height: "100%" }}>
                            {companys.map((company, index) => (
                            <div key={company._id}>
                                        <div style={{ textAlign: "center" }}>        
                                                <div style={{fontSize:"25px", fontWeight:"bold"}}>{company.companyname}  </div>                                          
                                                <div style={{fontSize:"13px", color:"gray"}}>                             
                                                <div><BuildCircleIcon style={{ width: "12px", height: "12px" , paddingRight:"3px",  }} />{company.companyType} Cuit: {company.cuit}</div>
                                                <div><PhoneForwardedIcon style={{ width: "12px", height: "12px" , paddingRight:"3px",  }} /> {company.telephone1} / {company.telephone2}</div>
                                                <div><WhatsAppIcon style={{ width: "12px", height: "12px" , paddingRight:"3px",  }} /> {company.celphone1} / {company.celphone2} </div>
                                                <div><LanguageIcon style={{ width: "12px", height: "12px" , paddingRight:"3px",  }} />{company.web}</div>
                                                <div><EmailIcon style={{ width: "12px", height: "12px" , paddingRight:"3px"}} />{company.email}</div>                       
                                                <div><LocationOnIcon style={{ width: "12px", height: "12px" , paddingRight:"3px",  }} /> {company.address} {company.city}</div>
                                                </div>
                                                </div>
                                            </div>
                                    ))}
                        </div>
          <div style={{ width: "30%", height: "100%", float: "right", alignContent:"center" }}>
                 <Image src={image} alt="Company Logo" width={140} height={140} />
          </div>
          </div>
          <div style={{width:"100%", borderBottom:"1px solid", marginTop:"15px", marginBottom:"15px"}}>

          </div>
          <div style={{width:"100%", textAlign:"right"}}>
                                <h2><TodayIcon  width={22} height={22} />  Fecha: {formattedDate}
                                </h2>

          </div>
          <div>
            <h1><PersonIcon  width={25} height={25}/>  SR(a) {name} {lastname} </h1>
          </div>
          <div style={{width:"80%", marginTop:"30px", textAlign:"justify", marginLeft:"8%"}}>
               <h3>
                      {report}              
                </h3>

          </div>
          <div style={{width:"80%", marginTop:"70px", textAlign:"right"}}>
                <h2>
                Presupuesto de reparación: <MonetizationOnIcon  width={22} height={22} /> {price}
                </h2>

          </div>
          <div style={{textAlign:"right", marginTop:"180px"}}>

          <Image src={firma} alt="firma" width={300} height={140} />

          </div>

   
         


                    
                  </div>
                              
          </div>

        
         
        
         

            </div>
           
        
    </div>
  );
};

export default TechnicalreportModalPrint;




