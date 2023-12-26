import Image from "next/image";


const OrderPrintTicket = ({ orden, companys, image }) => {
    const currentDate = new Date();
  
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months start at 0
    const year = currentDate.getFullYear();
  
    const formattedDate = `${day}/${month}/${year}`;
  
    return (
      <div id="ticket-content" style={{ width: '80mm', fontFamily: 'Arial', fontSize: '25px', margin: '10px',   display: 'none'  }}>
            <div style={{ textAlign: 'center' }}>
                      <Image src={image} alt="Company Logo" width={120} height={120} />
             </div>
            <div style={{ textAlign: 'center', marginBottom: '5px' }}>
                 {companys.map((company, index) => (
                    <div key={company._id}><strong>{company.companyname}</strong>
                    </div>
                    ))}
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
                          <strong>Tel:</strong> {orden.number}
                    </div>
                    <div>
                        <strong>Equipo:</strong> {orden.type} {orden.marca} {orden.model}
                    </div>
                    <div style={{width: "280px", margin: "0 auto", textAlign: "center"}}>
                        <strong>Falla:</strong> {orden.issue}
                        </div>

                    <div>
                        <strong>Precio:</strong> ${orden.otherPrice}
                    </div>
            </div>
              
              
       </div>
    );
  };
  
  export default OrderPrintTicket;
  