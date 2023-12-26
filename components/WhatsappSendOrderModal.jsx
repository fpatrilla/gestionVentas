import { useRouter } from "next/router";
import React, { useState } from "react";
import Modal from "react-modal";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";


export default function WhatsappSendOrderModal({
  isOpen,
  closeModal,
  companys,
  orden,
}) {
  const [mensaje, setMensaje] = useState(""); // Estado para almacenar el mensaje

  const handleEnviarMensaje = () => {
    const numeroWhatsApp = orden.number; // Número de WhatsApp al que deseas enviar el mensaje
    const saludo = `Saludos Sr(a)  ${orden.name} ${orden.lastname} su ${
      orden.type
    } ${orden.marca} ${orden.model} Orden N* ${
      orden.identifier
    } se encuentra en estado: *${orden.estado}*. Detalle: ${
      orden.comentOrden
    }. *Total a pagar: $${orden.otherPrice}*.\n
    *${companys.map((company) => company.companyname).join(", ")}* `;
    const mensajeCompleto = `${saludo}`; // Usar \n para el salto de línea

    // Codifica el mensaje completo para que sea seguro en una URL
    const mensajeWhatsApp = encodeURIComponent(mensajeCompleto);
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeWhatsApp}`;

    // Abre una nueva ventana o pestaña con WhatsApp y el mensaje listo para enviar
    window.open(urlWhatsApp, "_blank");
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
        WhatSapp
        <WhatsAppIcon
          style={{
            textDecoration: "none",
            color: "green",
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
          Saludos Sr(a) {orden.name} {orden.lastname} su {orden.type}{" "}
          {orden.marca} {orden.model} Orden N* {orden.identifier} se encuentra
          en estado {orden.estado}. Detalle : {orden.comentOrden}. Total a pagar
          ${orden.otherPrice}.{" "}
          {companys.map((company, index) => (
            <span>{company.companyname} </span>
          ))}
        </div>
        <div style={{ marginLeft: "40%", marginTop: "40px" }}>
          <button
            onClick={() => {
              handleEnviarMensaje();
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
