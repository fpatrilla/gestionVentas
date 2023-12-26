import React, { useState, useEffect } from "react";
import Company from "../models/Company";
import dbConnect from "../lib/dbConnect";
import SoldArticlePrint from "../components/Print/SoldArticlePrint";
import Image from "next/image";
import SoldArticleTicket from "../components/Print/SoldArticleTicket";
import RegisterModal from "../components/RegisterModal";

import Link from "next/link";
import { useRouter } from "next/router";

//material icons

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

import StoreIcon from "@mui/icons-material/Store";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import PostAddIcon from "@mui/icons-material/PostAdd";

export default function NewSale({ companys }) {
  const [name, setName] = useState("");
  const [codigoAutorizacion, setCodigoAutorizacion] = useState("");
  const router = useRouter();
  const { articles: selectedArticles } = router.query;
  const [selectedArticleList, setSelectedArticleList] = useState([]);
  const [isSaleComplete, setIsSaleComplete] = useState(false);
  const [metodoPago, setMetodoPago] = useState("");
  const [cantidadArticulos, setCantidadArticulos] = useState(0);
  const [totalPrecio, setTotalPrecio] = useState(0);
  const [tipoTarjeta, setTipoTarjeta] = useState("");
  const [cutoas, setCutoas] = useState("");

  const [CantCuotas, setCantidadCuotas] = useState("");
  const [nombre, setNombre] = useState("");
  const [bank, setbank] = useState("");
  const [NumCheq, setNumCheq] = useState("");
  const [tenedor, settenedor] = useState("");
  const [observation, setobservation] = useState("");
  const [FechDep, setFechDep] = useState("");
  const [dador, setdador] = useState("");
  const [cuote, setcuotes] = useState("");
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);
  const [dataFromModal, setDataFromModal] = useState(null);

  const openRegisterModal = () => {
    setRegisterModalIsOpen(true);
  };

  const closeRegisterModal = () => {
    setRegisterModalIsOpen(false);
  };

  const sendDataFromModalToNewSale = (data) => {
    console.log("Data received in NewSale:", data);
    // Guardar los datos recibidos en el estado
    setDataFromModal(data);
  };

  const handleAddArticle = () => {
    if (selectedArticles) {
      const articles = JSON.parse(selectedArticles);
      setSelectedArticleList(articles);
      router.push("/newSaleArticle");
    }
  };

  const handleRealizarVenta = async () => {
    if (metodoPago === "Efectivo") {
      try {
        for (const article of selectedArticleList) {
          try {
            await fetch(`/api/sales/updateStock/${article.articleId}`, {
              method: "PUT",
            });

            console.log(`Artículo vendido: ${article.name}`);
            console.log("Descuento de stock realizado");

            const ventaData = {
              product: article.name,
              price: article.price,
            };

            // Enviar el objeto ventaData correspondiente en la solicitud POST
            await postData(ventaData);
          } catch (error) {
            console.error("Failed to update the stock:", error);
          }
        }

        setIsSaleComplete(true);
        router.push("/ventas");
      } catch (error) {
        console.error("Failed to complete the sale:", error);
      }
    }
    if (metodoPago === "Efectivo") {
      try {
        const ventaDataModal = {
          product: dataFromModal.name,
          price: dataFromModal.price,
        };

        // Enviar el objeto ventaData correspondiente en la solicitud POST
        await postData(ventaDataModal);
      } catch (error) {
        console.error("Failed to update the stock:", error);
      }

      setIsSaleComplete(true);
    }
    if (metodoPago === "Tarjeta") {
      try {
        for (const article of selectedArticleList) {
          try {
            await fetch(`/api/sales/updateStock/${article.articleId}`, {
              method: "PUT",
            });

            console.log(`Artículo vendido: ${article.name}`);
            console.log("Descuento de stock realizado");

            const price = article.price * 1.3;

            const ventaData = {
              product: article.name,
              price: article.price,
              name: name,
              codigoAutorizacion: codigoAutorizacion,
              formaPago: tipoTarjeta,
              cuotas: CantCuotas,
              cuote: cuote,
            };

            await postDataTarjet(ventaData);
          } catch (error) {
            console.error("Failed to update the stock:", error);
          }
        }

        setIsSaleComplete(true);
        router.push("/saleTarjeta");
      } catch (error) {
        console.error("Failed to complete the sale:", error);
      }
    }
    if (metodoPago === "Tarjeta") {
      try {
        const price = dataFromModal.price * 1.3;

        const ventaDataModal = {
          product: dataFromModal.name,
          price: dataFromModal.price,
          name: name,
          codigoAutorizacion: codigoAutorizacion,
          formaPago: tipoTarjeta,
          cuotas: CantCuotas,
          cuote: cuote,
        };

        await postDataTarjet(ventaDataModal);
      } catch (error) {
        console.error("Failed to update the stock:", error);
      }

      setIsSaleComplete(true);
    }
    if (metodoPago === "Debito") {
      try {
        for (const article of selectedArticleList) {
          try {
            await fetch(`/api/sales/updateStock/${article.articleId}`, {
              method: "PUT",
            });

            console.log(`Artículo vendido: ${article.name}`);
            console.log("Descuento de stock realizado");

            const ventaData = {
              product: article.name,
              price: article.price,
              name: name,
              codigoAutorizacion: codigoAutorizacion,
              formaPago: metodoPago,
            };

            await postDataDebit(ventaData);
          } catch (error) {
            console.error("Failed to update the stock:", error);
          }
        }

        setIsSaleComplete(true);
        router.push("/saleTarjeta");
      } catch (error) {
        console.error("Failed to complete the sale:", error);
      }
    }
    if (metodoPago === "Debito") {
      try {
        const ventaDataModal = {
          product: dataFromModal.name,
          price: dataFromModal.price,
          name: name,
          codigoAutorizacion: codigoAutorizacion,
          formaPago: metodoPago,
        };

        await postDataDebit(ventaDataModal);
      } catch (error) {
        console.error("Failed to update the stock:", error);
      }

      setIsSaleComplete(true);
    }
    if (metodoPago === "Transferencia") {
      try {
        for (const article of selectedArticleList) {
          try {
            await fetch(`/api/sales/updateStock/${article.articleId}`, {
              method: "PUT",
            });

            console.log(`Artículo vendido: ${article.name}`);
            console.log("Descuento de stock realizado");

            const ventaData = {
              product: article.name,
              price: article.price,
              name: name,
              codigoAutorizacion: codigoAutorizacion,
              formaPago: metodoPago,
            };

            await postDataDebit(ventaData);
          } catch (error) {
            console.error("Failed to update the stock:", error);
          }
        }

        setIsSaleComplete(true);
        router.push("/saleTarjeta");
      } catch (error) {
        console.error("Failed to complete the sale:", error);
      }
    }
    if (metodoPago === "Transferencia") {
      try {
        const ventaDataModal = {
          product: dataFromModal.name,
          price: dataFromModal.price,
          name: name,
          codigoAutorizacion: codigoAutorizacion,
          formaPago: metodoPago,
        };

        await postDataDebit(ventaDataModal);
      } catch (error) {
        console.error("Failed to update the stock:", error);
      }

      setIsSaleComplete(true);
    }
    if (metodoPago === "Cheq") {
      try {
        for (const article of selectedArticleList) {
          try {
            await fetch(`/api/sales/updateStock/${article.articleId}`, {
              method: "PUT",
            });

            console.log(`Artículo vendido: ${article.name}`);
            console.log("Descuento de stock realizado");

            const ventaData = {
              product: article.name,
              price: article.price,
              nombre: nombre,
              bank: bank,
              dador: dador,
              NumCheq: NumCheq,
              FechDep: FechDep,
              tenedor: tenedor,
              observation: observation,
            };

            await postDataCheq(ventaData);
          } catch (error) {
            console.error("Failed to update the stock:", error);
          }
        }

        setIsSaleComplete(true);
        router.push("/saleCheq");
      } catch (error) {
        console.error("Failed to complete the sale:", error);
      }
    }
    if (metodoPago === "Cheq") {
      try {
        const ventaDataModal = {
          product: dataFromModal.name,
          price: dataFromModal.price,
          nombre: nombre,
          bank: bank,
          dador: dador,
          NumCheq: NumCheq,
          FechDep: FechDep,
          tenedor: tenedor,
          observation: observation,
        };

        await postDataCheq(ventaDataModal);
      } catch (error) {
        console.error("Failed to update the stock:", error);
      }

      setIsSaleComplete(true);
    } else {
      console.log("Método de pago inválido");
    }
  };
  useEffect(() => {
    if (selectedArticles) {
      const articles = JSON.parse(selectedArticles);
      setSelectedArticleList(articles);

      let totalCantidad = articles.length;
      let totalPrecio = articles.reduce(
        (acc, article) => acc + parseFloat(article.price),
        0
      );

      if (dataFromModal) {
        totalCantidad += 1;
        totalPrecio += parseFloat(dataFromModal.price);
      }

      setCantidadArticulos(totalCantidad);
      setTotalPrecio(totalPrecio);
    }
  }, [selectedArticles, dataFromModal]);

  const postData = async (ventaData) => {
    try {
      console.log("Venta Data:", ventaData);

      const res = await fetch("/api/sales", {
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

  const postDataTarjet = async (ventaData) => {
    try {
      console.log("Venta Data:", ventaData);

      const res = await fetch("/api/sales/tarjet", {
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

  const postDataDebit = async (ventaData) => {
    try {
      console.log("Venta Data:", ventaData);

      const res = await fetch("/api/sales/debit", {
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
  const handleDeleteArticle = (index) => {
    const updatedList = selectedArticleList.filter((_, i) => i !== index);
    setSelectedArticleList(updatedList);

    let totalCantidad = 0;
    let totalPrecio = 0;

    for (const article of updatedList) {
      totalCantidad += 1;
      totalPrecio += article.price;
    }

    setCantidadArticulos(totalCantidad);
    setTotalPrecio(totalPrecio);
  };

  //function print

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");

    if (printWindow) {
      const printContent = document.getElementById(
        "print-SoldArticlePrint"
      ).innerHTML;
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

  const handleDeleteRegister = () => {
    window.location.reload();
  };

  const handlePrintTicket = () => {
    const printTicket = window.open("", "_blank");

    if (printTicket) {
      const ticketContent = document.getElementById(
        "ticket-SoldArticleTicket"
      ).innerHTML;
      printTicket.document.open();
      printTicket.document.write(`
   
      ${ticketContent}
  
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

  console.log(selectedArticleList);

  return (
    <div style={{ padding: "1%" }}>
      <div>
        <h1>
          Nueva Venta Articulos
          <StoreIcon
            style={{
              textDecoration: "none",
              color: "red",
              height: "60px",
              width: "60px",
              marginLeft: "10px",
            }}
          />
        </h1>

        <div
          className="btn btn-danger float-end"
          style={{ textDecoration: "none", color: "white", marginTop: "-50px" }}
        >
          <Link
            href="/newSaleArticle"
            style={{ textDecoration: "none", color: "white" }}
          >
            <ShoppingCartCheckoutIcon
              style={{
                textDecoration: "none",
                color: "white",
                height: "35px",
                width: "35px",
              }}
            />
          </Link>
        </div>
      </div>

      {selectedArticleList.length > 0 && (
        <div>
          <hr />
          <button className="btn btn-secondary float-start">
            <Link
              href="/newSaleArticle"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ArrowBackIcon />
            </Link>
          </button>
          <div>
            <button
              onClick={openRegisterModal}
              className="btn btn-success float-end"
            >
              <PostAddIcon />{" "}
            </button>
          </div>

          <div
            style={{
              padding: "30px",
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2>Artículos seleccionados: {cantidadArticulos}</h2>
            </div>
            <div>
              {metodoPago === "Tarjeta" ? (
                <p className="btn btn-danger " style={{ fontSize: "24px" }}>
                  {" "}
                  <MonetizationOnIcon /> : {totalPrecio * 1.3}
                </p>
              ) : (
                <p className="btn btn-danger" style={{ fontSize: "24px" }}>
                  {" "}
                  <MonetizationOnIcon /> : {totalPrecio}
                </p>
              )}
            </div>
            <div>
              <button
                className="btn btn-success"
                style={{ width: "100px" }}
                type="submit"
                form="clientForm"
                onClick={handlePrint}
              >
                <LocalPrintshopIcon />
              </button>
              <button
                className="btn btn-secondary"
                type="submit"
                form="clientForm"
                onClick={handlePrintTicket}
                style={{ marginLeft: "8px" }}
              >
                <BookOnlineIcon />
              </button>
            </div>
            <div></div>
          </div>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Código</th>
                <th scope="col">Artículo</th>
                <th scope="col">Precio $</th>
              </tr>
            </thead>
            <tbody>
              {selectedArticleList.map((article, index) => (
                <tr key={`${article.articleId}-${index}`}>
                  <td>{article.code}</td>
                  <td>{article.name}</td>
                  <td>
                    {metodoPago === "Tarjeta" ? (
                      <p>${article.price * 1.3}</p>
                    ) : (
                      <p>${article.price}</p>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger ml-2"
                      onClick={() => handleDeleteArticle(index)}
                    >
                      <DeleteForeverIcon />
                    </button>
                  </td>
                </tr>
              ))}
              {dataFromModal && (
                <tr>
                  <td></td>
                  <td>{dataFromModal.name}</td>
                  <td>
                    {metodoPago === "Tarjeta" ? (
                      <p>${dataFromModal.price * 1.3}</p>
                    ) : (
                      <p>${dataFromModal.price}</p>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger ml-2"
                      onClick={() => handleDeleteRegister()}
                    >
                      <DeleteForeverIcon />
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {selectedArticleList.length > 0 && !isSaleComplete && (
        <div style={{ width: "50%", margin: "30px" }}>
          <h5>¿Cómo realizará la compra? Efectivo o Tarjeta</h5>
          <select
            class="form-select"
            aria-label="Default select example"
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
          >
            <option value="">Seleccione un método de pago</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Debito">Débito</option>
            <option value="Transferencia">Transferencia</option>
            <option value="Tarjeta">Tarjeta</option>
            <option value="Cheq">Cheque</option>
          </select>
          { (metodoPago === "Debito" || metodoPago === "Transferencia") && (
            <div>
              <div className="container text-center" style={{ margin: "30px" }}>
                <div className="row">
                  <div className="col">
                    <h5>Nombre:</h5>
                    <input
                      type="text"
                      placeholder="Nombre y Apellido"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <h5>Cod. Autorizacion</h5>
                    <input
                      type="text"
                      placeholder="Código de Autorización"
                      value={codigoAutorizacion}
                      onChange={(e) => setCodigoAutorizacion(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {metodoPago === "Tarjeta" && (
            <div>
              <div className="container text-center" style={{ margin: "30px" }}>
                <div className="row">
                  <div className="col">
                    <h5>Nombre:</h5>
                    <input
                      type="text"
                      placeholder="Nombre y Apellido"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <h5>Cod. Autorizacion</h5>
                    <input
                      type="text"
                      placeholder="Código de Autorización"
                      value={codigoAutorizacion}
                      onChange={(e) => setCodigoAutorizacion(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <h5>Seleccione el tipo de tarjeta:</h5>
              <select
                class="form-select"
                aria-label="Default select example"
                value={tipoTarjeta}
                onChange={(e) => setTipoTarjeta(e.target.value)}
              >
                <option value="">Seleccione el tipo de tarjeta</option>

                <option value="Credito">Crédito</option>
                <option value="MercadoPago">Mercado Pago</option>
              </select>
            </div>
          )}
          {tipoTarjeta === "Credito" && (
            <div style={{ width: "150px", margin: "20px" }}>
              <h5>Cuotas:</h5>
              <input
                type="number"
                placeholder="cuotas"
                value={cuote}
                onChange={(e) => setcuotes(e.target.value)}
              />
            </div>
          )}
          {metodoPago === "Cheq" && (
            <div>
              <div className="container" style={{ padding: "1%" }}>
                <div className="row">
                  <div className="col">
                    <h5>Nombre Titular:</h5>
                    <input
                      type="text"
                      placeholder="Nombre titular"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>

                  <div className="col">
                    <h5>Banco:</h5>
                    <input
                      type="text"
                      placeholder="Banco emisor"
                      value={bank}
                      onChange={(e) => setbank(e.target.value)}
                    />
                  </div>
                  <div className="row">
                    <div className="col">
                      <h5>Dador:</h5>
                      <input
                        type="text"
                        placeholder="dador"
                        value={dador}
                        onChange={(e) => setdador(e.target.value)}
                      />
                    </div>
                    <div className="col">
                      <h5>Tenedor:</h5>
                      <input
                        type="text"
                        placeholder="tenedor"
                        value={tenedor}
                        onChange={(e) => settenedor(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <h5>N. Cheque:</h5>
                      <input
                        type="text"
                        placeholder="Nomero de Cheque"
                        value={NumCheq}
                        onChange={(e) => setNumCheq(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <h5>Fecha de Cobro</h5>
                      <input
                        type="text"
                        placeholder="Fecha Deposito"
                        value={FechDep}
                        onChange={(e) => setFechDep(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <h5>Observaciones</h5>
                    <input
                      type="text"
                      placeholder="observacion"
                      value={observation}
                      onChange={(e) => setobservation(e.target.value)}
                      style={{ height: "100px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="float-end">
        {/* <button className="btn btn-danger" style={{ margin: '20px' }} onClick={handleRealizarVenta}>
          Realizar Venta<MonetizationOnIcon /><ArrowCircleRightIcon/>
        </button> */}
        <button
          className="btn btn-success"
          style={{ width: "100px" }}
          type="submit"
          form="clientForm"
          onClick={handlePrint}
        >
          <LocalPrintshopIcon />
        </button>
        <button
          className="btn btn-secondary"
          type="submit"
          form="clientForm"
          onClick={handlePrintTicket}
          style={{ marginLeft: "8px" }}
        >
          <BookOnlineIcon />
        </button>
      </div>

      {isSaleComplete && (
        <div>
          <p>
            Venta realizada. El stock de los artículos seleccionados ha sido
            actualizado.
          </p>
        </div>
      )}
      <RegisterModal
        isOpen={registerModalIsOpen}
        closeModal={closeRegisterModal}
        sendDataToNewSale={sendDataFromModalToNewSale}
      />

      <SoldArticlePrint
        companys={companys}
        selectedArticleList={selectedArticleList}
        cantidadArticulos={cantidadArticulos}
        metodoPago={metodoPago}
        totalPrecio={totalPrecio}
        image="/logo.png"
        dataFromModal={dataFromModal}
      />

      <SoldArticleTicket
        companys={companys}
        selectedArticleList={selectedArticleList}
        cantidadArticulos={cantidadArticulos}
        metodoPago={metodoPago}
        totalPrecio={totalPrecio}
        image="/logo.png"
        dataFromModal={dataFromModal}
      />
    </div>
  );
}

export async function getServerSideProps() {
  await dbConnect();

  const result = await Company.find({});
  const companys = result.map((doc) => {
    const company = doc.toObject();
    company._id = company._id.toString();
    return company;
  });

  return { props: { companys } };
}
