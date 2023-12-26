import Image from "next/image";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';


const PresupuestosTicket = ({presupuestos, companys, image }) => {
    const currentDate = new Date();

    const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
  const year = currentDate.getFullYear();
  
  const formattedDate = `${day}/${month}/${year}`;
  
  
    return (
      <div id="ticket-presupuestos" style={{ width: '80mm', fontFamily: 'Arial', fontSize: '25px', margin: '10px',   display: 'none'  }}>
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
                    <div>Presupuesto</div>
                   
                    <div>
                        <strong>Fecha:</strong> {formattedDate}
                    </div>
                    <div>
                           <strong>Cliente:</strong> {presupuestos.name} {presupuestos.lastname}
                    </div>
                  
                    <div>
                        <strong>Producto</strong> {presupuestos.product}
                    </div>
                  
                   

                    <div style={{marginTop:"12px"}}>
                    
                        <strong><MonetizationOnIcon style={{width:"15px", height:"15px"}}/> Precio Efectivo:</strong> ${presupuestos.price} 
                    </div>
                    <div style={{marginTop:"12px"}}>
                        <strong><CreditCardIcon style={{width:"15px", height:"15px"}}/> Precio Tarjeta:</strong> ${presupuestos.priceTarjet} 
                    </div>
                    <div style={{width: "280px", margin: "0 auto", textAlign: "center", borderBottom:"1px solid", marginBottom:"4px", marginTop:"4px"}}>
                    </div>
                    <div style={{width: "280px", margin: "0 auto", textAlign: "center", fontSize:"10px"}}>
                       <strong>El Presupuesto tiene validéz por 24hs</strong> 
                    </div>
                    <div style={{width: "280px", margin: "0 auto", textAlign: "center", borderBottom:"1px solid", marginBottom:"4px", marginTop:"4px"}}>
                    </div>
                    <div style={{width: "280px", margin: "0 auto", textAlign: "center", fontSize:"10px"}}>
                        Para confirmar el presupuesto necesitamos el 50% de la reparación en concepto de seña
                    </div>
                    <div>
                        Gracias por confiar en nosotros
                    </div>
            </div>
              
              
       </div>
    );
  };
  
  export default PresupuestosTicket;
  