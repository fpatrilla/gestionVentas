import Image from "next/image";



const SaleTicket = ({sales, companys, image }) => {
    const formatDate = (date) => {
        const options = { 
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        };
        return new Date(date).toLocaleDateString('es-ES', options);
      };
  
    return (
      <div id="ticket-sale" style={{ width: '80mm', fontFamily: 'Arial', fontSize: '25px', margin: '10px',   display: 'none'  }}>
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
                        <strong>Fecha:</strong> {formatDate(sales.createdAt)}
                    </div>
                    <div>
                           <strong>Cliente:</strong> {sales.name} {sales.lastname}
                    </div>
                  
                    <div>
                        <strong>Producto</strong> {sales.product}
                    </div>
                  
                   

                    <div style={{marginTop:"12px"}}>
                        <strong>Precio:</strong> ${sales.price} 
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
  
  export default SaleTicket;
  