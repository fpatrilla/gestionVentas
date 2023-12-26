import React, { useState } from "react";
import Modal from "react-modal";
import { useRouter } from "next/router";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import NewCheqSalePrint from "./Print/NewCheqSalePrint";
import NewCheqSaleTicket from "./Print/NewCheqSaleTicket";

import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import BookOnlineIcon from "@mui/icons-material/BookOnline";

const CheqModal = ({ isOpen, closeModal, companys }) => {
  const [nombre, setNombre] = useState("");
  const [bank, setBank] = useState("");
  const [dador, setDador] = useState("");
  const [NumCheq, setNumCheq] = useState("");
  const [FechDep, setFechDep] = useState("");
  const [tenedor, setTenedor] = useState("");
  const [observation, setObservation] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [isSaleComplete, setIsSaleComplete] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const ventaData = {
      product: product,
      price: price,
      nombre: nombre,
      bank: bank,
      dador: dador,
      NumCheq: NumCheq,
      FechDep: FechDep,
      tenedor: tenedor,
      observation: observation,
      product: product,
    };

    try {
      await postDataCheq(ventaData);
      setIsSaleComplete(true);
      router.push("/saleCheq");
    } catch (error) {
      console.error("Failed to complete the sale:", error);
    }
  };

  const postDataCheq = async (ventaData) => {
    try {
      console.log("Venta Data:", ventaData);

      const res = await fetch("/api/sales/cheq", {
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
      <h2>
        Registro Cheque
        <SubtitlesIcon
          className="iconhead"
          style={{
            color: "#212529",
          }}
        />
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="container" style={{ padding: "1%" }}>
          <div className="row">
            <div className="col">
              <h5>Nombre Titular:</h5>
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                style={{ width: "400px" }}
              />
            </div>
            <div className="col">
              <h5>Banco:</h5>
              <input
                type="text"
                placeholder="Banco emisor"
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                style={{ width: "400px" }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h5>Dador:</h5>
              <input
                type="text"
                placeholder="Dador"
                value={dador}
                onChange={(e) => setDador(e.target.value)}
                style={{ width: "400px" }}
              />
            </div>
            <div className="col">
              <h5>Tenedor:</h5>
              <input
                type="text"
                placeholder="Tenedor"
                value={tenedor}
                onChange={(e) => setTenedor(e.target.value)}
                style={{ width: "400px" }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h5>N. Cheque:</h5>
              <input
                type="text"
                placeholder="Numero de Cheque"
                value={NumCheq}
                onChange={(e) => setNumCheq(e.target.value)}
                style={{ width: "400px" }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h5>Fecha de Cobro:</h5>

              <input
                type="text"
                placeholder="Fecha Deposito"
                value={FechDep}
                onChange={(e) => setFechDep(e.target.value)}
                style={{ width: "200px" }}
              />
            </div>
            <div className="col">
              <h5>Producto:</h5>
              <input
                type="text"
                placeholder="Producto"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                style={{ width: "500px", height: "50px" }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h5>Precio $:</h5>
              <input
                type="number"
                placeholder="Precio"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ width: "200px" }}
              />
            </div>
          </div>
          <div className="row">
            <div style={{ display: "flex" }}>
              <div style={{ width: "40%" }}>
                <h5>Observaciones:</h5>
                <input
                  type="text"
                  placeholder="observacion"
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                  style={{ height: "60px" }}
                />
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
                    onClick={handleSubmit}
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
        <div>
          <NewCheqSaleTicket
            image="/logo.png"
            companys={companys}
            nombre={nombre}
            bank={bank}
            dador={dador}
            NumCheq={NumCheq}
            FechDep={FechDep}
            tenedor={tenedor}
            observation={observation}
            product={product}
            price={price}
          />
          <NewCheqSalePrint
            image="/logo.png"
            companys={companys}
            nombre={nombre}
            bank={bank}
            dador={dador}
            NumCheq={NumCheq}
            FechDep={FechDep}
            tenedor={tenedor}
            observation={observation}
            product={product}
            price={price}
          />
        </div>
      </form>
    </Modal>
  );
};

export default CheqModal;
