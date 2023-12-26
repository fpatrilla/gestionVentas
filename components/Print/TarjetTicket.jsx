import Image from "next/image";



const TarjetTicket = ({companys, image, saleTarjets }) => {
    const currentDate = new Date();
  
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months start at 0
    const year = currentDate.getFullYear();
  
    const formattedDate = `${day}/${month}/${year}`;
  
    return (
      <div id="ticket-tarjet" style={{ width: '80mm', fontFamily: 'Arial', fontSize: '25px', margin: '10px',   display: 'none'  }}>
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
                    <div>Recibo de Pago</div>
                   
                    <div>
                         <strong>Fecha:</strong> {saleTarjets.createdAt}
                    </div>
                    <div>
                           <strong>Cliente:</strong> {saleTarjets.name} {saleTarjets.lastname}
                    </div>
                    <div>
                           <strong>F. de Pago :</strong> {saleTarjets.formaPago}
                    </div>
                    <div>
                           <strong>Cuotas:</strong> {saleTarjets.cuote}
                    </div>
                    <div>
                           <strong>Cod Auto.:</strong> {saleTarjets.codigoAutorizacion}
                    </div>
                  
                    <div>
                        <strong>Producto</strong> {saleTarjets.product}
                    </div>
                  
                   

                    <div style={{marginTop:"12px"}}>
                        <strong>Precio:</strong> ${saleTarjets.price} 
                    </div>
                    <div style={{width: "280px", margin: "0 auto", textAlign: "center", borderBottom:"1px solid", marginBottom:"4px", marginTop:"4px"}}>
                    </div>
                    <div style={{width: "280px", margin: "0 auto", textAlign: "center", fontSize:"10px"}}>
                       <strong>COMPROBANTE - DOCUMENTO NO VALIDO COMO FACTURA</strong> 
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
  
  export default TarjetTicket;
  




