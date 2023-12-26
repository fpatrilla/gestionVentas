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

import PersonIcon from '@mui/icons-material/Person';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TodayIcon from '@mui/icons-material/Today';



const StockOrdersPrint = ({ companys, image, filteredArticles, countArticlesWithStock0Or1}) => {


  const currentDate = new Date();

  const day = String(currentDate.getDate()).padStart(2, '0');
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
const year = currentDate.getFullYear();

const formattedDate = `${day}/${month}/${year}`;



 

  return (
    <div id="print-StockOrdersPrint" style={{ display: 'none' }}>
          <div  style={{  marginTop:"10px"}} >
      <div className="container text-center">
        <div className="row">
          <div style={{width:"100", borderTop:"1px solid", borderBottom:"1px solid", textAlign:"center", fontSize:"20px", fontWeight:"bold"}}>
            PEDIDO

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
          <div style={{width:"100%", borderBottom:"1px solid", marginTop:"15px", marginBottom:"10px"}}>

          </div>
          <div style={{width:"100%", display:"flex"}}>
          <div style={{width:"50%"}}>
           <h3><TodayIcon  width={18} height={18} style={{marginLeft:"6%"}} />  Fecha: {formattedDate}</h3> 
          </div>
                            
                                  <div style={{marginLeft:"auto", marginRight:"20px"}}>
                                  Cantidad de Articulos: <span style={{fontSize:"30px", fontWeight:"bold"}}>{countArticlesWithStock0Or1}</span>
                                  
                                  </div>
                               
          </div>
          <div>

          <div style={{width:"100%"}}>
                  
                     <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid", textAlign: "left" }}>
                        <thead style={{ backgroundColor: "gray" }}>
                          <tr>
                           
                            <th style={{ borderRight: "1px solid", padding: "10px" , borderBottom:"1px solid"}}> Codigo </th>
                            <th style={{ borderRight: "1px solid", padding: "10px" , borderBottom:"1px solid"}}>Producto  </th>

                          </tr>
                          
                      
                        </thead>
                        <thead>
                            <tr>
                              {filteredArticles.map((article, index) => (
                                <tr key={article._id}>
                                  
                                  <td style={{ borderRight: "1px solid", padding: "10px" , borderBottom:"1px solid"}}>{article.code}</td>
                                  <td style={{ borderRight: "1px solid", padding: "10px" , borderBottom:"1px solid"}}>{article.name}</td>
     

                                 
                                </tr>
                              ))}
                             
                              <td></td>
                              <td></td>
                            </tr>
                          </thead>

                        
                       
                       
                        
                        <div>
                      
                        
                        
                        </div>
                    </table>
                           <div style={{ position: "absolute", bottom: 0, width: "100%", marginLeft:"3%", borderTop:"1px solid", paddingTop:"15px" }}>
                              {companys.map((company, index) => (
                                <div key={company._id} style={{ display: "flex" }}>
                                  <div style={{marginRight:"5%", marginLeft:"5%"}}>{company.companyname}</div>
                                  <div style={{marginRight:"5%"}}>{company.owner}</div>
                                  <div style={{fontSize:"11px", marginRight:"5%"}}>{company.web}</div>
                                  <div style={{fontSize:"11px"}}>{company.email}</div>
                                </div>
                              ))} 
                            </div>


                    
                  </div>
                              
          </div>

        
         
        
         

            </div>
            </div>
          </div>
    </div>
  );
};

export default StockOrdersPrint;




