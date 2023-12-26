import { useRouter } from "next/router";
import React, { useState } from "react";
import Modal from "react-modal";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import InfoIcon from "@mui/icons-material/Info";

export default function WhatsappInfoClientModal({
  isOpen,
  closeModal,
  companys,
  client,
}) {
  const [mensaje, setMensaje] = useState(""); // Estado para almacenar el mensaje

  const handleEnviarMensaje = () => {
    const numeroWhatsApp = client.number; // Número de WhatsApp al que deseas enviar el mensaje
    const saludo = `Saludos Sr(a)  ${client.name} ${
      client.lastname
    } somos de *${companys.map((company) => company.companyname).join(", ")}* `;
    const mensajeCompleto = `${saludo}\n${mensaje}`; // Usar \n para el salto de línea

    // Codifica el mensaje completo para que sea seguro en una URL
    const mensajeWhatsApp = encodeURIComponent(mensajeCompleto);
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeWhatsApp}`;

    // Abre una nueva ventana o pestaña con WhatsApp y el mensaje listo para enviar
    window.open(urlWhatsApp, "_blank");
  };
  const handleOpenOutlook = () => {
    const email = client.email; // Cambia por tu dirección de correo electrónico
    const subject = `Info ${companys.map((company) => company.companyname).join(", ")}`; // Cambia por el asunto deseado
    const body = `Saludos Sr(a)  ${client.name} ${
        client.lastname
      } somos de ${companys
        .map((company) => company.companyname)
        .join(", ")} 
    ${mensaje}

   Saludos Cordiales
   ${companys.map((company) => company.companyname).join(", ")}
   ${companys.map((company) => company.companyType).join(", ")}
   Direccion: ${companys.map((company) => company.address).join(", ")}
   Web: ${companys.map((company) => company.web).join(", ")} 
   Localidad: ${companys.map((company) => company.city).join(", ")}
   Telefono: ${companys.map((company) => company.telephone1).join(", ")}
   Celular: ${companys.map((company) => company.celphone1).join(", ")}   `; // Usar el contenido de comentOrden como cuerpo del correo

    const outlookURL = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = outlookURL;
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Mi Modal">
      <div style={{ float: "right" }} className="btn btn bg-danger">
        <DisabledByDefaultIcon
          style={{ color: "white" }}
          onClick={closeModal}
        />
      </div>
      <h1>
        Email
        <InfoIcon
          style={{
            textDecoration: "none",
            color: "black",
            height: "60px",
            width: "60px",
            marginLeft: "10px",
          }}
        />
        <ForwardToInboxIcon
          style={{
            textDecoration: "none",
            color: "#dc3545",
            height: "60px",
            width: "60px",
            marginLeft: "10px",
          }}
        />
      </h1>
      <div
        style={{
          width: "60%",
          margin: "auto",
          marginTop: "40px",
          border: "1px solid",
          borderRadius: "30px",
          borderBlockColor: "#adb5bd",
          backgroundColor: "#e9ecef",
          padding: "30px",
        }}
      >
        <div>
          Saludos Sr(a) {client.name} {client.lastname} somos de{" "}
          {companys.map((company, index) => (
            <span>{company.companyname} </span>
          ))}
          <div style={{ marginTop: "40px", height: "120px" }}>
            <textarea
              placeholder="Escribe tu mensaje aquí"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              style={{ height: "120px" }}
            ></textarea>
          </div>
        </div>
        <div style={{ marginLeft: "40%", marginTop: "40px" }}>
          <button
            onClick={() => {
                handleOpenOutlook();
              closeModal();
            }}
            className="btn btn-success"
          >
            Enviar
          </button>
        </div>
      </div>
    </Modal>
  );
}
