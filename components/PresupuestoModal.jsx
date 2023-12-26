import { useRouter } from "next/router";
import React, { useState } from "react";
import Modal from "react-modal";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import PresupuestoTicket from "./Print/PresupuestoTicket";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import BookOnlineIcon from "@mui/icons-material/BookOnline";


import PersonIcon from "@mui/icons-material/Person";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import SaveIcon from "@mui/icons-material/Save";

export default function PresupuestoModal({ isOpen, closeModal, companys }) {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [priceTarjet, setPriceTarjet] = useState("");
  const [observation, setObservation] = useState("");
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
        product: product,
        price: price,
        priceTarjet: priceTarjet,
        observation: observation,
        // ... otros campos requeridos según el modelo Sales
      };

      // Enviar el objeto ventaData correspondiente en la solicitud POST
      await postDataSale(form);

      setIsSaleComplete(true);
      router.push("/");
    } catch (error) {
      console.error("Failed to complete the presupuesto:", error);
    }
  };

  const postDataSale = async (form) => {
    try {
      const res = await fetch("/api/presupuesto", {
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
  const handlePrintTicket = () => {
    const printTicket = window.open("", "_blank");

    if (printTicket) {
      const ticketContentSale =
        document.getElementById("ticket-presupuesto").innerHTML;
      printTicket.document.open();
      printTicket.document.write(`
        ${ticketContentSale}
      `);
      printTicket.document.close();
      printTicket.print();

      // Llama a handleSubmit después de imprimir el ticket
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
        Presupuesto
        <BorderColorIcon
          style={{
            textDecoration: "none",
            color: "#0d6efd",
            height: "60px",
            width: "60px",
            marginLeft: "10px",
          }}
        />
      </h1>

      <div
        style={{
          margin: "auto",
          width: "50%",
          margintop: "25px",
          border: "1px solid",
          backgroundColor: "#f5f5f5",
          borderColor: "#f5f5f5",
          borderRadius: "30px",
        }}
      >
        <div style={{ display: "flex", marginTop: "15px", marginLeft: "10%" }}>
          <div style={{ marginRight: "3%" }}>
            <h5>
              <PersonIcon /> Nombre :
            </h5>
            <input
              type="text"
              maxLength="20"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <h5>
              <PersonIcon />
              Apellido:
            </h5>
            <input
              type="text"
              maxLength="20"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
        </div>
        <div style={{ marginTop: "15px", marginLeft: "12%" }}>
          <div>
            <h5>
              <AddShoppingCartIcon /> Producto:
            </h5>
            <input
              type="text"
              maxLength="200"
              name="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              style={{ height: "80px", width: "70%" }}
            />
          </div>
          <div style={{ marginTop: "15px", display: "flex" }}>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                marginRight: "3%",
              }}
            >
              <MonetizationOnIcon /> Precio Efectivo $:
            </div>
            <div>
              <input
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ width: "150px" }}
              />
            </div>
          </div>
          <div style={{ marginTop: "15px", display: "flex" }}>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                marginRight: "3%",
              }}
            >
              <CreditCardIcon /> Precio Tarjeta $:
            </div>
            <div>
              <input
                type="number"
                name="priceTarjet"
                value={priceTarjet}
                onChange={(e) => setPriceTarjet(e.target.value)}
                style={{ width: "150px" }}
              />
            </div>
          </div>

          <div style={{ marginTop: "15px" }}>
            <div>
              <h5>
                <AddShoppingCartIcon /> Observaciones:
              </h5>
              <input
                type="text"
                maxLength="200"
                name="observation"
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                style={{ height: "80px", width: "70%" }}
              />
            </div>
          </div>
          <div style={{ marginTop: "15px" }}>
            <div style={{}}>
              <div style={{ display: "flex", marginLeft: "18%" }}>
                <div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn bg-danger"
                    style={{ marginTop: "8px", color: "white" }}
                  >
                    Guardar <SaveIcon />
                  </button>
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn bg-secondary"
                    onClick={handlePrintTicket}
                    style={{
                      marginTop: "8px",
                      color: "white",
                      marginLeft: "8px",
                    }}
                  >
                    <BookOnlineIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>

      <PresupuestoTicket
        image="/logo.png"
        companys={companys}
        name={name}
        lastname={lastname}
        product={product}
        price={price}
        priceTarjet={priceTarjet}
      />
    </Modal>
  );
}
