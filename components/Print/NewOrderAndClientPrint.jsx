import Image from "next/image";
import { useState } from 'react';

//materia icon

import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LanguageIcon from '@mui/icons-material/Language';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import ContentCutIcon from '@mui/icons-material/ContentCut';



const NewOrderAndClientPrint = ({ client, orden, companys, image, identifier  }) => {

  




  const currentDate = new Date();

  const day = String(currentDate.getDate()).padStart(2, '0');
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
const year = currentDate.getFullYear();

const formattedDate = `${day}/${month}/${year}`;



 

  return (
    <div id="print-content" style={{ display: 'none' }}>
          <div  style={{  marginTop:"10px"}} >
      <div className="container text-center">
        <div className="row">

  {/* //header */}
  
          <div style={{ display: "flex", alignItems: "center", width: "100%", height: "140px" }}>
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

          {/* Order */}


          <div style={{  width: "100%", marginTop:"8px"}}>
              <div style={{ width: "100%", fontSize:"18px"}}><span >Orden de Reparación: </span><span style={{fontSize:"30px", fontWeight:"bold" }}>{identifier}</span> 
                  <span style={{paddingLeft:"40%"}}>Fecha: {formattedDate}</span>
              </div>
   

    
              <hr/>
                  <div style={{ width: "100%", textAlign: "justify", display:"flex", marginBottom:"8px" }}>
                        <div style={{ paddingLeft:"1%",  fontSize:"16px",  paddingRight:"3px"}}><span style={{fontWeight:"bold"}}> Cliente:</span> {client.name} {client.lastname}</div>
                        <div style={{ paddingLeft:"2%"}}><LocalPhoneIcon style={{ width: "15px", height: "15px", paddingRight:"3px" }} /><span style={{fontWeight:"bold"}}> Telefono:</span> {client.number}</div>
                        <div style={{ paddingLeft:"2%"}}> <EmailIcon style={{ width: "15px", height: "15px" , paddingRight:"3px" }} /><span style={{fontWeight:"bold"}}> Email :</span> {client.email}</div>
                      
              </div>


              <div style={{   fontSize:"16px"}} >
              <div style={{  width: "100%", display:"flex", fontSize:"18px" , marginBottom:"3px" }}>
                <div style={{ paddingLeft:"3%", paddingRight:"3px"}}><span style={{fontWeight:"bold"}}>Tipo:</span> {orden.type}</div>
                <div style={{ paddingLeft:"12%" , paddingRight:"3px"}}><span style={{fontWeight:"bold"}}>Marca:</span> {orden.marca}</div>
                <div style={{ paddingLeft:"12%" , paddingRight:"3px"}}><span style={{fontWeight:"bold"}}>Modelo:</span> {orden.model} </div>
                
              </div>
              <div style={{width:"100%", display:"flex"}}>
                  <div style={{width:"60%"}}>
                     <div style={{width:"100%", paddingLeft:"3%", paddingRight:"3px"}}>
                          <span style={{fontWeight:"bold"}}> Contraseña:</span> {orden.password}          
                     </div>
                      <div style={{width:"100%", paddingLeft:"3%", paddingRight:"3px"}}>
                                <span style={{fontWeight:"bold"}}>  Aceptacion de cargos hasta :</span> <span style={{fontWeight:"bold"}}>${orden.price}</span>          
                      </div>

                      <div style={{width:"100%", paddingLeft:"3%", paddingRight:"3px"}}>
                          <span style={{fontWeight:"bold"}}>Falla o Requerimiento: </span>{orden.issue}         
                      </div>
                        
                              
                      <div style={{ marginTop: '10px', paddingLeft:"3%", }}>
                      <input type="checkbox" defaultChecked={orden.sim} disabled={true} /> SIM

                            <input type="checkbox" defaultChecked={orden.portaSim} disabled={true} /> Porta SIM
                            <input type="checkbox" defaultChecked={orden.tpu} disabled={true} style={{fontWeight:"bold"}} /> TPU
                            <input type="checkbox" defaultChecked={orden.sd} disabled={true} /> SD
                     
                      </div>

                      <div style={{width:"100%",paddingLeft:"3%", paddingRight:"3px"}}>
                           <span style={{fontWeight:"bold"}}> Otro:</span> {orden.other}    
                      </div>
                                        
                                
                      <div style={{width:"100%",paddingLeft:"3%", paddingRight:"3px", height:"25px"}}>
                           <span style={{fontWeight:"bold"}}> Comentario:</span>{orden.comentOrden}     
                      </div>

                


                  </div>
                  <div style={{width:"40%", marginTop:"1px", fontSize:"30px", fontWeight:"bold"}}>
                            <div style={{display:"flex"}}>
                               <div style={{marginLeft:"20px"}}>
                                  .
                               </div>
                               <div style={{marginLeft:"20px"}}>
                                  .
                               </div>
                               <div style={{marginLeft:"20px"}}>
                                  .
                               </div>
                               
                            </div>
                            <div style={{display:"flex"}}>
                               <div style={{marginLeft:"20px"}}>
                                  .
                               </div>
                               <div style={{marginLeft:"20px"}}>
                                  .
                               </div>
                               <div style={{marginLeft:"20px"}}>
                                  .
                               </div>
                               
                            </div>
                            <div style={{display:"flex"}}>
                               <div style={{marginLeft:"20px"}}>
                                  .
                               </div>
                               <div style={{marginLeft:"20px"}}>
                                  .
                               </div>
                               <div style={{marginLeft:"20px"}}>
                                  .
                               </div>
                               
                            </div>
                  </div>


              </div>
              
          </div>
          <div style={{width:"100%", textAlign:"end"}}>
              <div style={{display:"flex", width:"100%"}}>
                 <div style={{marginLeft:"55%" }}>Total:<span style={{fontWeight:"bold", fontSize:"20px", marginRight:"2px"}}>${orden.otherPrice}</span></div>
                    <div style={{ marginLeft:"auto" , fontSize:"13px", marginRight:"3%",}}>Firma Cliente
                    </div>
                 </div>
  
                <div style={{ marginRight:"3%", marginBottom:"5px",  marginLeft:"auto" , }}>{client.name} {client.lastname}
                </div>
              </div>

          </div>
        </div>

</div>
<hr></hr>
<div style={{ height:"55px", width:"100%", fontSize:"9px", paddingTop:"5px"}}>
 <p>La Garantía de reparación es de 90 días. El equipo permanecerá en la empresa por 90 días, pasado ese tiempo no se aceptara reclamo alguno y nos deslindamos de toda responsabilidad respecto a la conservación o perdida de datos del equipo del cliente. En algunos casos al intentar la reparación, el equipo corre riesgo de quedar sin encender. En caso de dejar el equipo con linea activada es por decisión del cliente y la empresa no se hace responsable.</p>
</div>
       
      </div>
      <div style={{display:"flex"}}>
           <div>
                <ContentCutIcon style={{width:"18px", height:"18px", }}/>
            </div>
            <div style={{width:"100%", borderBottom:"1px dotted #000"}}>
      
            </div>
       </div>     



     {/* //segunda parte de la orden */}
     <div  style={{  marginTop:"10px"}} >
      <div className="container text-center">
        <div className="row">

  {/* //header */}
  
          <div style={{ display: "flex", alignItems: "center", width: "100%", height: "140px" }}>
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
                          <div><LocationOnIcon style={{ width: "12px", height: "12px" , paddingRight:"3px",  }} /> {company.address} {company.city} </div>
                          </div>
                        </div>
                    </div>
                         ))}
              </div>
              <div style={{ width: "30%", height: "100%", float: "right", alignContent:"center" }}>
                  <Image src={image} alt="Company Logo" width={140} height={140} />
              </div>
          </div>

          {/* Order */}


          <div style={{  width: "100%", marginTop:"8px"}}>
              <div style={{ width: "100%", fontSize:"18px"}}><span >Orden de Reparación: </span><span style={{fontSize:"30px", fontWeight:"bold" }}>{identifier}</span> 
                  <span style={{paddingLeft:"40%"}}>Fecha: {formattedDate}</span>
              </div>
   

    
              <hr/>
                  <div style={{ width: "100%", textAlign: "justify", display:"flex", marginBottom:"8px" }}>
                        <div style={{ paddingLeft:"1%",  fontSize:"16px",  paddingRight:"3px"}}><span style={{fontWeight:"bold"}}> Cliente:</span> {client.name} {client.lastname}</div>
                        <div style={{ paddingLeft:"2%"}}><LocalPhoneIcon style={{ width: "15px", height: "15px", paddingRight:"3px" }} /><span style={{fontWeight:"bold"}}> Telefono:</span> {client.number}</div>
                        <div style={{ paddingLeft:"2%"}}> <EmailIcon style={{ width: "15px", height: "15px" , paddingRight:"3px" }} /><span style={{fontWeight:"bold"}}> Email :</span> {client.email}</div>
                      
              </div>


              <div style={{   fontSize:"16px"}} >
              <div style={{  width: "100%", display:"flex", fontSize:"18px" , marginBottom:"3px" }}>
                <div style={{ paddingLeft:"3%", paddingRight:"3px"}}><span style={{fontWeight:"bold"}}>Tipo:</span> {orden.type}</div>
                <div style={{ paddingLeft:"12%" , paddingRight:"3px"}}><span style={{fontWeight:"bold"}}>Marca:</span> {orden.marca}</div>
                <div style={{ paddingLeft:"12%" , paddingRight:"3px"}}><span style={{fontWeight:"bold"}}>Modelo:</span> {orden.model} </div>
                
              </div>
              <div style={{width:"100%", display:"flex"}}>
                  <div style={{width:"60%"}}>
                     <div style={{width:"100%", paddingLeft:"3%", paddingRight:"3px"}}>
                          <span style={{fontWeight:"bold"}}> Contraseña:</span> {orden.password}          
                     </div>
                      <div style={{width:"100%", paddingLeft:"3%", paddingRight:"3px"}}>
                                <span style={{fontWeight:"bold"}}>  Aceptacion de cargos hasta :</span> <span style={{fontWeight:"bold"}}>${orden.price}</span>          
                      </div>

                      <div style={{width:"100%", paddingLeft:"3%", paddingRight:"3px"}}>
                          <span style={{fontWeight:"bold"}}>Falla o Requerimiento: </span>{orden.issue}         
                      </div>
                        
                              
                      <div style={{ marginTop: '10px', paddingLeft:"3%", }}>
                            <input type="checkbox" defaultChecked={orden.sim} disabled={true}  /> SIM
                            <input type="checkbox" defaultChecked={orden.portaSim} disabled={true} /> Porta SIM
                            <input type="checkbox" defaultChecked={orden.tpu} disabled={true} style={{fontWeight:"bold"}} /> TPU
                            <input type="checkbox" defaultChecked={orden.sd} disabled={true} /> SD
                     
                      </div>

                      <div style={{width:"100%",paddingLeft:"3%", paddingRight:"3px"}}>
                           <span style={{fontWeight:"bold"}}> Otro:</span> {orden.other}    
                      </div>
                                        
                                
                      <div style={{width:"100%",paddingLeft:"3%", paddingRight:"3px", height:"25px"}}>
                           <span style={{fontWeight:"bold"}}> Comentario:</span>{orden.comentOrden}     
                      </div>

                


                  </div>
                  <div style={{width:"40%", marginTop:"1px", fontSize:"30px", fontWeight:"bold"}}>
                            <div style={{display:"flex"}}>
                               <div style={{marginLeft:"20px"}}>
                                  .
                               </div>
                               <div style={{marginLeft:"20px"}}>
                                  .
                               </div>
                               <div style={{marginLeft:"20px"}}>
                                  .
                               </div>
                               
                            </div>
                            <div style={{display:"flex"}}>
                               <div style={{marginLeft:"20px"}}>
                                  .
                               </div>
                               <div style={{marginLeft:"20px"}}>
                                  .
                               </div>
                               <div style={{marginLeft:"20px"}}>
                                  .
                               </div>
                               
                            </div>
                            <div style={{display:"flex"}}>
                               <div style={{marginLeft:"20px"}}>
                                  .
                               </div>
                               <div style={{marginLeft:"20px"}}>
                                  .
                               </div>
                               <div style={{marginLeft:"20px"}}>
                                  .
                               </div>
                               
                            </div>
                  </div>


              </div>
              
          </div>
          <div style={{width:"100%", textAlign:"end"}}>
              <div style={{display:"flex", width:"100%"}}>
                 <div style={{marginLeft:"55%" }}>Total:<span style={{fontWeight:"bold", fontSize:"20px", marginRight:"2px"}}>${orden.otherPrice}</span></div>
                    <div style={{ marginLeft:"auto" , fontSize:"13px", marginRight:"3%",}}>Firma Cliente
                    </div>
                 </div>
  
                <div style={{ marginRight:"3%", marginBottom:"5px",  marginLeft:"auto" , }}>{client.name} {client.lastname}
                </div>
              </div>

          </div>
        </div>

</div>
<hr></hr>
<div style={{ height:"60px", width:"100%", fontSize:"9px", paddingTop:"8px"}}>
 <p>La Garantía de reparación es de 90 días. El equipo permanecerá en la empresa por 90 días, pasado ese tiempo no se aceptara reclamo alguno y nos deslindamos de toda responsabilidad respecto a la conservación o perdida de datos del equipo del cliente. En algunos casos al intentar la reparación, el equipo corre riesgo de quedar sin encender. En caso de dejar el equipo con linea activada es por decisión del cliente y la empresa no se hace responsable.</p>
</div>
       
      </div>
              
    </div>
  );
};

export default NewOrderAndClientPrint;




