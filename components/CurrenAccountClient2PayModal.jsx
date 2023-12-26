import React, { useState } from "react";
import Modal from "react-modal";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useRouter } from "next/router";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";

export default function CurrenAccountClient2PayModal({
  isOpen,
  closeModal,
  totalPrice,
  currentAccountClient2s,
}) {
  const router = useRouter();
  const [pago, setPago] = useState("");
  const [paymentSaved, setPaymentSaved] = useState(false);

  const [formaDePago, setFormaDePago] = useState("Efectivo"); // Agregamos un estado para la forma de pago
  const [typeTarjet, setTypeTajet] = useState("Tarjeta");
  const [codigoAutorizacion, setCodigoAutorizacion] = useState("");
  const [CantCuotas, setCantidadCuotas] = useState(null);
  const [nombre, setNombre] = useState("");
  const [bank, setBank] = useState("");
  const [dador, setDador] = useState("");
  const [NumCheq, setNumCheq] = useState("");
  const [FechDep, setFechDep] = useState("");
  const [tenedor, setTenedor] = useState("");
  const [observation, setObservation] = useState("");

  const handlePagoChange = (e) => {
    setPago(e.target.value);
  };

  const debe = pago !== "" ? totalPrice - parseFloat(pago) : "";

  const handleGuardarClick = async () => {
    try {
      // Create a request object
      const request = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parseFloat(pago)), // Solo envía el número 'pago' como el cuerpo de la solicitud
      };

      // Make the PUT request using fetch
      console.log(request);
      const response = await fetch("/api/currentAccount/client2/rest", request);

      // Check if the request was successful (status code 200)
      if (response.ok) {
        // Set the paymentSaved state to true to indicate success
        setPaymentSaved(true);
      } else {
        // Handle errors here, such as displaying an error message
        console.error("Error saving payment:", response.statusText);
      }
      closeModal(); // Close the modal
      router.reload(); // Reload the layout
    } catch (error) {
      // Handle any other errors here
      console.error("Error saving payment:", error);
    }
  };

  const handleFormaDePagoChange = (e) => {
    const selectedFormaDePago = e.target.value;
    setFormaDePago(selectedFormaDePago);
  };

  const handleTypeTarjetChange = (e) => {
    const selectedTypeTarjet = e.target.value;
    setTypeTajet(selectedTypeTarjet);
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      if (formaDePago === "Efectivo") {
        const request = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parseFloat(pago)), // Solo envía el número 'pago' como el cuerpo de la solicitud
        };

        // Make the PUT request using fetch

        const response = await fetch(
          "/api/currentAccount/client2/rest",
          request
        );

        // Check if the request was successful (status code 200)
        if (response.ok) {
          // Set the paymentSaved state to true to indicate success
          setPaymentSaved(true);
        } else {
          // Handle errors here, such as displaying an error message
          console.error("Error saving payment:", response.statusText);
        }

        const saleResponse = await fetch("/api/sales", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "Alvaro",
            lastname: "Gonzalez",
            product: "CC",

            price: parseFloat(pago),
          }),
        });

        if (!saleResponse.ok) {
          console.error("Error creating the sale:", saleResponse.statusText);
          return;
        }
      }

      if (formaDePago === "Tarjeta") {
        const request = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parseFloat(pago)), // Solo envía el número 'pago' como el cuerpo de la solicitud
        };

        // Make the PUT request using fetch

        const response = await fetch(
          "/api/currentAccount/client2/rest",
          request
        );

        // Check if the request was successful (status code 200)
        if (response.ok) {
          // Set the paymentSaved state to true to indicate success
          setPaymentSaved(true);
        } else {
          // Handle errors here, such as displaying an error message
          console.error("Error saving payment:", response.statusText);
        }

        const res = await fetch("/api/sales/tarjet/order", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "Alvaro",
            lastname: "Gonzalez",
            product: `CC`,
            price: parseFloat(pago),
            formaPago: typeTarjet,
            cuote: CantCuotas,
            codigoAutorizacion: codigoAutorizacion,
          }),
        });
        if (!res.ok) {
          throw new Error(res.status);
        }
      }

      if (formaDePago === "Transferencia") {
        const request = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parseFloat(pago)), // Solo envía el número 'pago' como el cuerpo de la solicitud
        };

        // Make the PUT request using fetch

        const response = await fetch(
          "/api/currentAccount/client2/rest",
          request
        );

        // Check if the request was successful (status code 200)
        if (response.ok) {
          // Set the paymentSaved state to true to indicate success
          setPaymentSaved(true);
        } else {
          // Handle errors here, such as displaying an error message
          console.error("Error saving payment:", response.statusText);
        }
        const res = await fetch("/api/sales/tarjet/order", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "Alvaro",
            lastname: "Gonzalez",
            product: `CC`,
            price: parseFloat(pago),
            formaPago: formaDePago,
            codigoAutorizacion: codigoAutorizacion,
          }),
        });
        if (!res.ok) {
          throw new Error(res.status);
        }
      }
      if (formaDePago === "Cheque") {
        const request = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parseFloat(pago)), // Solo envía el número 'pago' como el cuerpo de la solicitud
        };

        // Make the PUT request using fetch

        const response = await fetch(
          "/api/currentAccount/client2/rest",
          request
        );

        // Check if the request was successful (status code 200)
        if (response.ok) {
          // Set the paymentSaved state to true to indicate success
          setPaymentSaved(true);
        } else {
          // Handle errors here, such as displaying an error message
          console.error("Error saving payment:", response.statusText);
        }

        const res = await fetch("/api/sales/cheq", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: nombre,
            bank: bank,
            product: `CC`,
            price: parseFloat(pago),
            formaPago: formaDePago,
            dador: dador,
            tenedor: tenedor,
            NumCheq: NumCheq,
            FechDep: FechDep,
            observation: observation,
          }),
        });
        if (!res.ok) {
          throw new Error(res.status);
        }
      }

      closeModal();
      window.location.reload();
    } catch (error) {
      console.error("Error updating the order and creating the sale:", error);
    }
  };

  const handleOrdenChange = (e) => {
    const { name, value } = e.target;
    setOrdenForm({ ...ordenForm, [name]: value });
  };

  const postData = async (form) => {
    orden.otherPrice = form.price;
    orden.name = form.name;
    orden.lastname = form.lastname;
    orden.identifier = form.identifier;
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
    } catch (error) {
      setMessage("Error al agregar la venta");
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Mi Modal"
      >
        <div style={{ float: "right" }} className="btn btn bg-danger">
          <DisabledByDefaultIcon
            style={{ color: "white" }}
            onClick={closeModal}
          />
        </div>
        <div>
          <h1>Registro de Pago</h1>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              border: "1px solid",
              borderRadius: "30px",
              backgroundColor: "#e9ecef",
              padding: "20px",
            }}
          >
            <div style={{ width: "30%" }}>
              <div>
                <div style={{ display: "fex" }}>
                  <div>
                    <h5>
                      <MonetizationOnIcon /> Importe: ${totalPrice}{" "}
                    </h5>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "30px",
                      marginBottom: "30px",
                    }}
                  >
                    <div style={{ marginRight: "3%", fontSize: "20px" }}>
                      <MonetizationOnIcon /> Ingrese el pago: $
                    </div>
                    <div>
                      <input
                        type="number"
                        maxLength="40"
                        name="pago"
                        value={pago}
                        onChange={handlePagoChange}
                        style={{ width: "110px" }}
                      />
                    </div>
                    <div>
                      <ModeEditOutlineIcon style={{ marginLeft: "3px" }} />
                    </div>
                  </div>
                  <div>
                    <h5>
                      <MonetizationOnIcon /> Debe: $<span>{debe}</span>{" "}
                      <span style={{ marginLeft: "1%" }}>
                        {debe === 0 && (
                          <CheckCircleOutlineIcon style={{ color: "green" }} />
                        )}
                      </span>{" "}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "48%" }}>
              <div>
                <div>
                  <h5>Forma de Pago:</h5>

                  <select
                    className="form-select"
                    aria-label="Default"
                    style={{ borderRadius: "60px", width: "180px" }}
                    name="formPay"
                    onChange={handleFormaDePagoChange}
                    value={formaDePago}
                  >
                    <option value="Efectivo">Efectivo</option>
                    <option value="Tarjeta">Tarjeta</option>

                    <option value="Transferencia">Transferencia</option>
                    <option value="Cheque">Cheque</option>
                  </select>
                </div>
                <div>
                  {formaDePago === "Tarjeta" && (
                    <div>
                      <h5>Tipo de Tarjeta:</h5>
                      <select
                        className="form-select"
                        aria-label="Default"
                        style={{ borderRadius: "60px", width: "180px" }}
                        name="typeTarjet"
                        onChange={handleTypeTarjetChange}
                        value={typeTarjet}
                      >
                        <option>Elegi la tarjeta</option>
                        <option value="Debito">Débito</option>
                        <option value="MercadoPago">MercadoPago</option>
                        <option value="Credito">Crédito</option>
                      </select>
                    </div>
                  )}
                </div>
                <div>
                  {(formaDePago === "Tarjeta" ||
                    formaDePago === "Transferencia") && (
                    <div>
                      <h5>Codigo de autorizacion:</h5>
                      <input
                        type="number"
                        placeholder="codigoAutorizacion"
                        value={codigoAutorizacion}
                        onChange={(e) => setCodigoAutorizacion(e.target.value)}
                        style={{ width: "180px" }}
                      />
                    </div>
                  )}
                </div>
                <div>
                  {(typeTarjet === "Credito" ||
                    typeTarjet === "MercadoPago") && (
                    <div>
                      <h5>Cuotas</h5>
                      <input
                        type="number"
                        placeholder="cuotas"
                        value={CantCuotas}
                        onChange={(e) => setCantidadCuotas(e.target.value)}
                        style={{ width: "120px" }}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <div>
                    {formaDePago === "Cheque" && (
                      <div>
                        <div style={{ display: "flex" }}>
                          <div style={{ width: "40%" }}>
                            <h5>Nombre Titular:</h5>
                            <input
                              type="text"
                              placeholder="Nombre"
                              value={nombre}
                              onChange={(e) => setNombre(e.target.value)}
                            />
                          </div>
                          <div>
                            <h5>Banco:</h5>
                            <input
                              type="text"
                              placeholder="Banco emisor"
                              value={bank}
                              onChange={(e) => setBank(e.target.value)}
                            />
                          </div>
                        </div>
                        <div style={{ display: "flex" }}>
                          <div style={{ width: "40%" }}>
                            <h5>Dador:</h5>
                            <input
                              type="text"
                              placeholder="Dador"
                              value={dador}
                              onChange={(e) => setDador(e.target.value)}
                            />
                          </div>
                          <div>
                            <h5>Tenedor:</h5>
                            <input
                              type="text"
                              placeholder="Tenedor"
                              value={tenedor}
                              onChange={(e) => setTenedor(e.target.value)}
                            />
                          </div>
                        </div>
                        <div style={{ display: "flex" }}>
                          <div style={{ width: "60%" }}>
                            <h5>N. Cheque:</h5>
                            <input
                              type="text"
                              placeholder="Numero de Cheque"
                              value={NumCheq}
                              onChange={(e) => setNumCheq(e.target.value)}
                            />
                          </div>
                          <div>
                            <h5>Fecha de Cobro:</h5>

                            <input
                              type="text"
                              placeholder="Fecha Deposito"
                              value={FechDep}
                              onChange={(e) => setFechDep(e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <h5>Observaciones:</h5>
                          <input
                            type="text"
                            placeholder="observacion"
                            value={observation}
                            onChange={(e) => setObservation(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <h4>
                  Confirmación{" "}
                  <CheckCircleOutlineIcon
                    style={{
                      color: "green",
                      width: "50px",
                      height: "50px",
                      marginLeft: "4px",
                    }}
                  />
                </h4>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <button
                  className="btn btn-success"
                  onClick={handleSubmit}
                  style={{ width: "40%" }}
                >
                  <PointOfSaleIcon />
                </button>
              </div>
              <div></div>
            </div>
          </div>
        </div>

        {/* save button */}
        <div style={{ width: "25%" }}></div>
      </Modal>
    </div>
  );
}
