import { useRouter } from "next/router";
import React, { useState } from "react";
import Modal from "react-modal";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import TechnicalreportModalPrint from "./Print/TechnicalreportModalPrint";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import NoteAltIcon from "@mui/icons-material/NoteAlt";

import PersonIcon from "@mui/icons-material/Person";

import SaveIcon from "@mui/icons-material/Save";

export default function TechnicalreportModal({ isOpen, closeModal, companys }) {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [report, setReport] = useState("");
  const [price, setPrice] = useState("");

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaleComplete, setIsSaleComplete] = useState(false);

  const contentType = "application/json";

  const handleSubmit = async () => {
    try {
      // Crear un objeto ventaData único para cada artículo
      const form = {
        name: name,
        lastname: lastname,
        report: report,
        price: price,
        // ... otros campos requeridos según el modelo Sales
      };

      await postDataSale(form);

      setIsSaleComplete(true);
      router.push("/technicalreport");
    } catch (error) {
      console.error("Failed to complete the presupuesto:", error);
    }
  };

  const postDataSale = async (form) => {
    try {
      const res = await fetch("/api/technicalreport", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push("/");
    } catch (error) {
      setErrorMessage("Error al agregar currentAccount");
    }
  };
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");

    if (printWindow) {
      const printContent = document.getElementById(
        "print-TechnicalreportModalPrint"
      ).innerHTML;
      printWindow.document.open();
      printWindow.document.write(`
       
          ${printContent}
      
      `);
      printWindow.document.close();
      printWindow.print();

      handleSubmit();
    } else {
      alert(
        "¡El bloqueo de ventanas emergentes puede estar activado en tu navegador!"
      );
    }
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
        Nueva Informe
        <NoteAltIcon
          style={{
            textDecoration: "none",
            color: "black",
            height: "60px",
            width: "60px",
            marginLeft: "10px",
          }}
        />
      </h1>

      <div
        style={{
          margin: "auto",
          width: "40%",
          margintop: "25px",
          border: "1px solid",
          backgroundColor: "#f5f5f5",
          borderColor: "#f5f5f5",
          borderRadius: "30px",
          marginLeft: "30%",
        }}
      >
        <div style={{ display: "flex", marginTop: "15px", marginLeft: "10%" }}>
          <div style={{ marginRight: "3%" }}>
            <h5>
              <PersonIcon /> Nombre :
            </h5>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{ marginRight: "3%" }}>
            <h5>
              <PersonIcon /> Apellido :
            </h5>
            <input
              type="text"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
        </div>
        <div style={{ marginRight: "3%", margin: "15px" }}></div>
        <div>
          <textarea
            placeholder="Escribe tu mensaje aquí"
            value={report}
            onChange={(e) => setReport(e.target.value)}
            style={{ height: "120px" }}
          ></textarea>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ marginLeft: "5%" }}>
            <strong>
              <MonetizationOnIcon /> Precio :
            </strong>
          </div>
          <div style={{ marginLeft: "15px" }}>
            <input
              type="text"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginLeft: "200px",
            marginTop: "13px",
            marginBottom: "10px",
          }}
        >
          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn bg-danger"
              style={{ color: "white" }}
            >
              Guardar <SaveIcon />
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="btn bg-success"
              onClick={handlePrint}
              style={{ color: "white", marginLeft: "40%" }}
            >
              <LocalPrintshopIcon />
            </button>
          </div>
        </div>
      </div>

      <div></div>

      <TechnicalreportModalPrint
        image="/logo.png"
        firma="/firma.png"
        companys={companys}
        name={name}
        lastname={lastname}
        report={report}
        price={price}
      />
    </Modal>
  );
}
