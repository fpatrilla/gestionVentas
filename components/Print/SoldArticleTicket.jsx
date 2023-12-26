import Image from "next/image";

const SoldArticleTicket = ({
  companys,
  image,
  selectedArticleList,
  cantidadArticulos,
  metodoPago,
  totalPrecio,
  dataFromModal,
}) => {
  const currentDate = new Date();

  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Los meses comienzan en 0
  const year = currentDate.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return (
    <div
      id="ticket-SoldArticleTicket"
      style={{
        width: "80mm",
        fontFamily: "Arial",
        fontSize: "25px",
        margin: "10px",
        display: "none",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Image src={image} alt="Company Logo" width={120} height={120} />
      </div>
      <div style={{ textAlign: "center", marginBottom: "5px" }}>
        {companys.map((company, index) => (
          <div key={company._id}>
            <strong>{company.companyname}</strong>
            <div style={{ fontSize: "12px" }}>
              {company.companyType} Cuit: {company.cuit}
            </div>
            <div style={{ fontSize: "12px" }}>
              {company.telephone1} / {company.telephone2}
            </div>
            <div style={{ fontSize: "12px" }}>
              {company.celphone1} / {company.celphone2}
            </div>
            <div style={{ fontSize: "12px" }}>{company.web}</div>
            <div style={{ fontSize: "12px" }}>{company.email}</div>
            <div style={{ fontSize: "12px" }}>
              {company.address} {company.city}
            </div>
          </div>
        ))}
        <div
          style={{
            width: "280px",
            margin: "0 auto",
            textAlign: "center",
            borderBottom: "1px solid",
            marginBottom: "4px",
            marginTop: "4px",
          }}
        ></div>
        <div>Recibo de Pago</div>

        <div>
          <strong>Fecha:</strong> {formattedDate}
        </div>
        <div>
          <strong>Cantidad de atriculos: {cantidadArticulos}</strong>
        </div>
        <div
          style={{
            width: "280px",
            margin: "0 auto",
            textAlign: "center",
            borderBottom: "1px solid",
            marginBottom: "4px",
            marginTop: "4px",
          }}
        ></div>

        {selectedArticleList.map((article, index) => (
          <div key={article._id}>
            <div>
              <strong>Codigo:</strong> {article.code}
            </div>

            <div>
              <strong>Producto</strong> {article.name}
            </div>

            <div>
              <strong>Precio:</strong> $ {article.price}
            </div>
            <div
              style={{
                width: "280px",
                margin: "0 auto",
                textAlign: "center",
                borderBottom: "1px solid",
                marginBottom: "4px",
                marginTop: "4px",
              }}
            ></div>
          </div>
        ))}
        <div>
          <div>
            {dataFromModal && dataFromModal.name && (
              <div>
                <strong>Producto:</strong> {dataFromModal.name}
              </div>
            )}
          </div>
        </div>
        <div>
          {dataFromModal && dataFromModal.price && (
            <div>
              <strong>Precio:</strong> ${dataFromModal.price}
            </div>
          )}
        </div>
        <div>
          <div
            style={{
              width: "280px",
              margin: "0 auto",
              textAlign: "center",
              borderBottom: "1px solid",
              marginBottom: "4px",
              marginTop: "4px",
            }}
          ></div>
          <div>
            <strong>Metodo de Pago: {metodoPago}</strong>
          </div>

          <p style={{ fontWeight: "bold", fontSize: "20px" }}>Total:</p>
          {metodoPago === "Tarjeta" ? (
            <p style={{ fontWeight: "bold", fontSize: "28px" }}>
              {" "}
              $ {totalPrecio * 1.3}
            </p>
          ) : (
            <p style={{ fontWeight: "bold", fontSize: "28px" }}>
              {" "}
              $ {totalPrecio}
            </p>
          )}
        </div>
        <div
          style={{
            width: "280px",
            margin: "0 auto",
            textAlign: "center",
            borderBottom: "1px solid",
            marginBottom: "4px",
            marginTop: "4px",
          }}
        ></div>
        <div
          style={{
            width: "280px",
            margin: "0 auto",
            textAlign: "center",
            fontSize: "10px",
          }}
        >
          <strong>COMPROBANTE - DOCUMENTO NO VALIDO COMO FACTURA</strong>
        </div>
        <div
          style={{
            width: "280px",
            margin: "0 auto",
            textAlign: "center",
            borderBottom: "1px solid",
            marginBottom: "4px",
            marginTop: "4px",
          }}
        ></div>
        <div
          style={{
            width: "280px",
            margin: "0 auto",
            textAlign: "center",
            fontSize: "10px",
          }}
        >
          Para efectos de cambio o garantia debe presentar el comprobante de
          pago original
        </div>
        <div>Gracias por confiar en nosotros</div>
      </div>
    </div>
  );
};

export default SoldArticleTicket;
