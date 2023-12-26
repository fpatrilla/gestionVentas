import Image from "next/image";



const OrderTicketSale = ({ orden, companys, image, filteredSales, filtereSalesTarjets, filtereSalesCheqs, sumaTotal }) => {
    const currentDate = new Date();
  
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months start at 0
    const year = currentDate.getFullYear();
  
    const formattedDate = `${day}/${month}/${year}`;
  
    return (
      <div id="ticket-pay-order" style={{ width: '80mm', fontFamily: 'Arial', fontSize: '25px', margin: '10px',   display: 'none'  }}>
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
                    <div>Pagos Realizados </div>
                    <div> 
                        <strong>Orden:</strong> {orden.identifier}
                    </div>
                    <div>
                         <strong>Fecha:</strong> {formattedDate}
                    </div>
                    <div>
                            <strong>Cliente:</strong> {orden.name} {orden.lastname}
                    </div>
                  
                    <div>
                        <strong>Equipo:</strong> {orden.type} {orden.marca} {orden.model}
                    </div>
                    <div> 
                    <div style={{width: "280px", margin: "0 auto", textAlign: "center", borderBottom:"1px solid", marginBottom:"4px", marginTop:"4px"}}>
                    </div>
                    
                    <div style={{width: "280px", margin: "0 auto", textAlign: "center", marginBottom:"4px", marginTop:"4px"}}>
                               <strong>Pago Efectivo:</strong>
                               <div style={{width: "280px", margin: "0 auto", textAlign: "center", borderBottom:"1px solid", marginBottom:"4px", marginTop:"4px"}}>
                    </div>
                               <div>    
                               {filteredSales.map((sale, index) => (
                                        <div   key={sale._id}>
                                        <div tyle={{width: "280px", margin: "0 auto", textAlign: "center", marginBottom:"4px", marginTop:"4px"}}>    
                                               <div style={{display:"flex" , margin: "0 auto", textAlign: "center", marginBottom:"4px", marginTop:"4px"}}>
                                                <div style={{marginLeft:"100px", marginRight:"3px"}}>{index + 1}</div>
                                                
                                                
                                                <div> Pago: ${sale.price}</div>
                                                </div>
                                        </div>
                                            
                                        </div>
                                        ))}
                               
                               </div>
                    
                    
                       
                
                               <div style={{width: "280px", margin: "0 auto", textAlign: "center", borderBottom:"1px solid", marginBottom:"4px", marginTop:"4px"}}>
                    </div>
                    </div>  
                    <div style={{width: "280px", margin: "0 auto", textAlign: "center", marginBottom:"4px", marginTop:"4px"}}>
                              <strong>Pago Tarjeta:</strong> 
                              <div style={{width: "280px", margin: "0 auto", textAlign: "center", borderBottom:"1px solid", marginBottom:"4px", marginTop:"4px"}}>
                    </div>
                               <div  >    
                               {filtereSalesTarjets.map((salesTarjet, index) => (
                                        <div   key={salesTarjet._id}>
                                        <div tyle={{width: "280px", margin: "0 auto", textAlign: "center", marginBottom:"4px", marginTop:"4px"}}>    
                                               <div style={{display:"flex" , margin: "0 auto", textAlign: "center", marginBottom:"4px", marginTop:"4px"}}>
                                                <div style={{marginLeft:"100px", marginRight:"3px"}}>{index + 1}</div>
                                                
                                                
                                                <div> Pago: ${salesTarjet.price}</div>
                                                </div>
                                        </div>
                                            
                                        </div>
                                        ))}
                               
                               </div>
                    
                    
                       
                

                    </div>
                    <div style={{width: "280px", margin: "0 auto", textAlign: "center", marginBottom:"4px", marginTop:"4px"}}>
                               <strong>Pago Cheque:</strong>
                               <div  >    
                               <div style={{width: "280px", margin: "0 auto", textAlign: "center", borderBottom:"1px solid", marginBottom:"4px", marginTop:"4px"}}>
                    </div>
                               {filtereSalesCheqs.map((salesCheq, index) => (
                                        <div   key={salesCheq._id}>
                                        <div tyle={{width: "280px", margin: "0 auto", textAlign: "center", marginBottom:"4px", marginTop:"4px"}}>    
                                               <div style={{display:"flex" , margin: "0 auto", textAlign: "center", marginBottom:"4px", marginTop:"4px"}}>
                                                <div style={{marginLeft:"100px", marginRight:"3px"}}>{index + 1}</div>
                                                
                                                
                                                <div> <strong>Pago: ${salesCheq.price}</strong></div>
                                                </div>
                                        </div>
                                            
                                        </div>
                                        ))}
                               
                               </div>
                    
                    
                       
                

                    </div>
                        
                    </div>
                    <div style={{width: "280px", margin: "0 auto", textAlign: "center", borderBottom:"1px solid", marginBottom:"4px", marginTop:"4px"}}>
                    </div>
                   <div>
                                Total Pagado: ${sumaTotal}
                   </div>

                    
                    <div style={{width: "280px", margin: "0 auto", textAlign: "center", borderBottom:"1px solid", marginBottom:"4px", marginTop:"4px"}}>
                    </div>
                    <div style={{width: "280px", margin: "0 auto", textAlign: "center", fontSize:"10px"}}>
                        Para efectos de cambio o garantia debe presentar el comprobante de pago original
                    </div>
                    <div>
                        Gracias por confiar en nosotros
                    </div>
            </div>
              
              
       </div>
    );
  };
  
  export default OrderTicketSale;
  