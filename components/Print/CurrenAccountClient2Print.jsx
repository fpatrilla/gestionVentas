import Image from "next/image";
import { format } from 'date-fns';


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



const CurrenAccountClient2Print = ({ companys, image , filteredCurrentAccountClient2, totalPrice }) => {




 

  return (
    <div id="print-CurrenAccountClient2Print" style={{ display: 'none' }}>
          <div  style={{  marginTop:"10px"}} >
      <div className="container text-center">
        <div className="row">
          <div style={{width:"100", borderTop:"1px solid", borderBottom:"1px solid", textAlign:"center", fontSize:"20px", fontWeight:"bold"}}>
            COMPROBANTE - DOCUMENTO NO VALIDO COMO FACTURA

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
          <div style={{width:"100%"}}>
                            
          <div style={{width:"100%"}}>
                           <div style={{ marginLeft: "60%", fontSize: "25px", marginBottom: "8px" }}>
                                 {totalPrice < 0 ? (
                                     <strong>Saldo a favor: ${Math.abs(totalPrice)}</strong>
                                                            ) : (
                                      <strong>Saldo Pendiente: ${totalPrice}</strong>
                                         )}
                                </div>

                           </div>
                               
          </div>
          <div>

          <div style={{width:"100%"}}>
                  
                     <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid", textAlign: "left" }}>
                        <thead style={{ backgroundColor: "gray" }}>
                          <tr>
                           <th style={{ borderRight: "1px solid", padding: "10px" , borderBottom:"1px solid", width:"70px"}}> Fecha  <TodayIcon  width={18} height={18} style={{marginLeft:"6%"}} /></th>
                           
                            <th style={{ borderRight: "1px solid", padding: "10px" , borderBottom:"1px solid"}}>Producto  </th>
                            <th style={{ borderRight: "1px solid", padding: "10px" , borderBottom:"1px solid"}}>Observacion  </th>
                            
                            <th style={{ padding: "10px" , borderBottom:"1px solid", width:"70px"}}>Precio  <MonetizationOnIcon  width={18} height={18}  />  </th>
                          </tr>
                          
                      
                        </thead>
                        <thead>
                        {filteredCurrentAccountClient2.map((currentAccount, index) => (
              <tr key={currentAccount._id}>
               
                <td style={{ borderRight: "1px solid", padding: "10px", borderBottom:"1px solid" }}>{format(new Date(currentAccount.createdAt), 'dd/MM/yyyy')}</td>
                
             
                
                <td  style={{ borderRight: "1px solid", padding: "10px" , borderBottom:"1px solid"}}>{currentAccount.product}</td>
                <td  style={{ borderRight: "1px solid", padding: "10px" , borderBottom:"1px solid"}}>{currentAccount.observation}</td>
                <td  style={{ borderRight: "1px solid", padding: "10px" , borderBottom:"1px solid"}}>${currentAccount.price}</td>
                
              </tr>
            ))}</thead>

                        

                        
                       
                       
                        
                        <div>
                      
                        
                   
                        </div>
                    </table>
                   


                    
                  </div>
                              
          </div>

        
         
        
         

            </div>
            </div>
          </div>
    </div>
  );
};

export default CurrenAccountClient2Print;




