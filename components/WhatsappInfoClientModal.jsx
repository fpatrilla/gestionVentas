import { useRouter } from "next/router";
import React, { useState } from "react";
import Modal from "react-modal";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
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
        <InfoIcon
          style={{
            textDecoration: "none",
            color: "black",
            height: "60px",
            width: "60px",
            marginLeft: "10px",
          }}
        />
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
