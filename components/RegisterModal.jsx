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
import SaveIcon from '@mui/icons-material/Save';

export default function RegisterModal({
  isOpen,
  closeModal,
  sendDataToNewSale,
}) {
  const [name, setName] = useState(""); // Ejemplo de estado para product
  const [price, setPrice] = useState(0); // Ejemplo de estado para price

  const handleClickPriceCheck = () => {
    // Aquí puedes acceder a product y price desde el estado del componente
    sendDataToNewSale({ name, price });
    closeModal(); // Cierras el modal después de enviar la información
  };

  const contentType = "application/json";

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Mi Modal">
      <div style={{ float: "right" }} className="btn btn bg-danger">
        <DisabledByDefaultIcon
          style={{ color: "white" }}
          onClick={closeModal}
        />
      </div>
      <h1>
        Agregar a la venta
        <CurrencyExchangeIcon
          className="iconhead"
          style={{
            color: "#0d6efd",
          }}
        />
      </h1>

      <div className="boxmodal">
        <div style={{ display: "flex", marginTop: "15px" }}></div>
        <div style={{ marginTop: "15px", marginLeft: "10%" }}>
          <div>
            <h5>
              <AddShoppingCartIcon /> Producto:
            </h5>
            <textarea
              type="text"
              name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            style={{ display: "flex", marginTop: "15px", marginLeft: "30%" }}
          >
            <div style={{ marginRight: "0%" }}>
              <button
                type="submit"
                onClick={() => handleClickPriceCheck(name, price)}
                className="btn bg-danger"
                style={{ marginTop: "7%", color: "white", width:"80px" }}
              >
                <SaveIcon />
              </button>
            </div>

            <div></div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
