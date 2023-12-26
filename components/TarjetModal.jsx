import React, { useState } from "react";
import Modal from "react-modal";
import { useRouter } from "next/router";
import NewTarjetSalePrint from "../components/Print/NewTarjetSalePrint";
import NewTarjetSaleTicket from "../components/Print/NewTarjetSaleTicket";

import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import BookOnlineIcon from "@mui/icons-material/BookOnline";

const TarjettModal = ({ isOpen, closeModal, companys }) => {
  const [name, setName] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [codigoAutorizacion, setCodigoAutorizacion] = useState("");
  const [tipoTarjeta, setTipoTarjeta] = useState("");
  const [cuote, setcuotes] = useState("");
  const [lastname, setLastname] = useState("");

  const [CantCuotas, setCantidadCuotas] = useState(null);
  const [isSaleComplete, setIsSaleComplete] = useState(false);
  const router = useRouter();

  const handleRealizarVenta = async () => {
    try {
      const ventaData = {
        name: name,
        lastname: lastname,
        product: product,
        price: price,
        codigoAutorizacion: codigoAutorizacion,
        formaPago: tipoTarjeta,
        cuotas: CantCuotas,
        cuote: cuote,
      };

      await postDataTarjeta(ventaData);

      setIsSaleComplete(true);
      router.push("/saleTarjeta");
    } catch (error) {
      console.error("Failed to complete the sale:", error);
    }
  };

  const postDataTarjeta = async (ventaData) => {
    try {
      console.log("Venta Data:", ventaData);

      const res = await fetch("/api/sales/tarjet/tarjet1", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ventaData),
      });

      if (!res.ok) {
        throw new Error(res.status);
      }

      const data = await res.json();
      console.log("Venta agregada:", data);
    } catch (error) {
      console.error("Failed to add the sale:", error);
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

      handleRealizarVenta();
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

      handleRealizarVenta();
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
      <div className="custom-modal">
        <h1>
          Registro tarjeta
          <CreditCardIcon
            className="iconhead"
            style={{
              color: "#6c757d",
            }}
          />
        </h1>

        <div>
          <div className="container" style={{ padding: "1%" }}>
            <div className="row">
              <div className="col">
                <h5>Nombre</h5>
                <input
                  className="form-label"
                  type="text"
                  placeholder="Nombre "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col">
                <h5>Apellido</h5>
                <input
                  className="form-label"
                  type="text"
                  placeholder="Apellido"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>

              <div className="col">
                <h5>Precio $:</h5>
                <input
                  type="number"
                  placeholder="Precio"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h5>Codigo Autorizacion</h5>
                <input
                  type="text"
                  placeholder="Código de Autorización"
                  value={codigoAutorizacion}
                  onChange={(e) => setCodigoAutorizacion(e.target.value)}
                  style={{ width: "200px" }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h5>Producto</h5>
                <input
                  type="text"
                  placeholder="Producto"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div style={{ display: "flex", margin: "3%" }}>
                <div style={{ width: "40%" }}>
                  <div>
                    <h5>Seleccione el tipo de tarjeta:</h5>
                    <select
                      value={tipoTarjeta}
                      onChange={(e) => setTipoTarjeta(e.target.value)}
                      className="form-select"
                      style={{ width: "200px" }}
                    >
                      <option value="">Seleccione el tipo de tarjeta</option>
                      <option value="Debito">Débito</option>
                      <option value="Credito">Crédito</option>
                      <option value="MercadoPago">Mercado Pago</option>
                      <option value="Transferencia">Transferencia </option>
                    </select>
                  </div>
                  <div>
                    {tipoTarjeta === "Credito" ||
                    tipoTarjeta === "MercadoPago" ? (
                      <div>
                        <h5 style={{ marginTop: "1%" }}>Cuotas:</h5>
                        <input
                          type="number"
                          placeholder="cuotas"
                          value={cuote}
                          onChange={(e) => setcuotes(e.target.value)}
                          style={{ width: "100px", textAlign: "center" }}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "15px",
                    marginLeft: "12%",
                  }}
                >
                  <div style={{ marginRight: "3%" }}>
                    <button
                      type="submit"
                      onClick={handleRealizarVenta}
                      className="btn bg-danger"
                      style={{
                        marginTop: "7%",
                        color: "white",
                        marginLeft: "40%",
                      }}
                    >
                      <PriceCheckIcon />
                    </button>
                  </div>
                  <div style={{ marginRight: "3%" }}>
                    <button
                      type="submit"
                      className="btn bg-success"
                      onClick={handlePrint}
                      style={{
                        marginTop: "7%",
                        color: "white",
                        marginLeft: "40%",
                      }}
                    >
                      <LocalPrintshopIcon />
                    </button>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn bg-secondary"
                      onClick={handlePrintTicket}
                      style={{
                        marginTop: "7%",
                        color: "white",
                        marginLeft: "40%",
                      }}
                    >
                      <BookOnlineIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <NewTarjetSalePrint
            image="/logo.png"
            companys={companys}
            name={name}
            lastname={lastname}
            product={product}
            price={price}
            codigoAutorizacion={codigoAutorizacion}
            tipoTarjeta={tipoTarjeta}
            cuote={cuote}
          />
          <NewTarjetSaleTicket
            image="/logo.png"
            companys={companys}
            name={name}
            lastname={lastname}
            product={product}
            price={price}
            codigoAutorizacion={codigoAutorizacion}
            tipoTarjeta={tipoTarjeta}
            cuote={cuote}
          />
        </div>
      </div>
    </Modal>
  );
};

export default TarjettModal;
