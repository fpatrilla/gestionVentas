import { useRouter } from "next/router";
import React, { useState } from "react";
import Modal from "react-modal";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import NewSalePrint from "./../components/Print/NewSalePrint";
import NewSaleTicket from "./Print/NewSaleTicket";

import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

import PersonIcon from "@mui/icons-material/Person";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import BookOnlineIcon from "@mui/icons-material/BookOnline";

export default function SalesModal({ isOpen, closeModal, companys }) {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [product, setProduct] = useState("");
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
        product: product,
        price: price,
        // ... otros campos requeridos según el modelo Sales
      };

      // Enviar el objeto ventaData correspondiente en la solicitud POST
      await postDataSale(form);

      setIsSaleComplete(true);
      router.push("/ventas");
    } catch (error) {
      console.error("Failed to complete the sale:", error);
    }
  };

  const postDataSale = async (form) => {
    try {
      const res = await fetch("/api/sales", {
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

      router.push("/ventas");
    } catch (error) {
      setErrorMessage("Error al agregar la venta");
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");

    if (printWindow) {
      const printContent = document.getElementById("print-NewSale").innerHTML;
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

  const handlePrintTicket = () => {
    const printTicket = window.open("", "_blank");

    if (printTicket) {
      const ticketContentSale =
        document.getElementById("ticket-sale").innerHTML;
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
  // console.log(companys)
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Mi Modal">
      <div style={{ float: "right" }} className="btn btn bg-danger">
        <DisabledByDefaultIcon
          style={{ color: "white" }}
          onClick={closeModal}
        />
      </div>
      <h1>
        Registro de Movimiento Caja
        <CurrencyExchangeIcon
          className="iconhead"
          style={{
            color: "#0d6efd",
          }}
        />
      </h1>

      <div className="boxmodal">
        <div style={{ display: "flex", marginTop: "15px"}}>
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
        <div style={{ marginTop: "15px", marginLeft: "10%" }}>
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
              style={{ height: "130px", width: "70%" }}
            />
          </div>
          <div
            style={{ marginTop: "15px", display: "flex", marginLeft: "12%" }}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                marginRight: "3%",
              }}
            >
              <MonetizationOnIcon /> Precio $:
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
          <div
            style={{ display: "flex", marginTop: "15px", marginLeft: "12%" }}
          >
            <div style={{ marginRight: "3%" }}>
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn bg-danger"
                style={{ marginTop: "7%", color: "white", marginLeft: "40%" }}
              >
                <PriceCheckIcon />
              </button>
            </div>
            <div style={{ marginRight: "3%" }}>
              <button
                type="submit"
                className="btn bg-success"
                onClick={handlePrint}
                style={{ marginTop: "7%", color: "white", marginLeft: "40%" }}
              >
                <LocalPrintshopIcon />
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="btn bg-secondary"
                onClick={handlePrintTicket}
                style={{ marginTop: "7%", color: "white", marginLeft: "40%" }}
              >
                <BookOnlineIcon />
              </button>
            </div>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
      </div>

      <div>
        <NewSalePrint
          image="/logo.png"
          companys={companys}
          name={name}
          lastname={lastname}
          product={product}
          price={price}
        />
        <NewSaleTicket
          image="/logo.png"
          companys={companys}
          name={name}
          lastname={lastname}
          product={product}
          price={price}
        />
      </div>
    </Modal>
  );
}
