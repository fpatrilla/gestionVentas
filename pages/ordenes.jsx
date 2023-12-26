import React, { useState, useEffect } from "react";
import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Orden from "../models/Orden";
import Cookies from "js-cookie";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import GetAppIcon from "@mui/icons-material/GetApp";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function ordenes({ ordens }) {
  const [filteredOrdens, setFilteredOrdens] = useState(ordens);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEstado, setSelectedEstado] = useState("");
  const [showEstadoButtons, setShowEstadoButtons] = useState(false);

  useEffect(() => {
    const filtered = ordens.filter(
      (orden) =>
        orden.identifier.toString().includes(searchTerm) ||
        orden.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        orden.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        orden.estado.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort the filtered data by identifier in descending order
    const sortedFiltered = filtered.sort((a, b) => {
      const identifierA = parseInt(a.identifier);
      const identifierB = parseInt(b.identifier);
      return identifierB - identifierA;
    });

    setFilteredOrdens(sortedFiltered);
  }, [searchTerm, ordens]);

  useEffect(() => {
    const filteredByEstado = ordens.filter(
      (currentAccount) => currentAccount.estado === selectedEstado
    );

    setFilteredOrdens(selectedEstado === "" ? ordens : filteredByEstado);
  }, [ordens, selectedEstado]);

  const handleEstadoFilter = (estado) => {
    setSelectedEstado(estado);

    // Filtrar según el estado seleccionado
    const filteredByEstado = filteredOrdens.filter(
      (orden) => orden.estado === estado
    );

    setFilteredOrdens(estado === "" ? ordens : filteredByEstado);
  };

  const toggleEstadoButtons = () => {
    setShowEstadoButtons(!showEstadoButtons); // Cambiar el estado para mostrar u ocultar los botones
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div>
          <h1>
            Ordenes{" "}
            <img
              src="../order.png"
              alt="Descripción de la imagen"
              width={50}
              style={{ marginLeft: "15px", marginRight: "5px" }}
            ></img>{" "}
          </h1>
        </div>

        <div style={{ marginLeft: "auto" }}>
          <Link href="/clientsOrden" style={{ textDecoration: "none" }}>
            <button className="btn btn-dark" style={{ marginRight: "8px" }}>
              <FiberNewIcon />
              <PersonSearchIcon />
            </button>
          </Link>
          <Link href="/newClientOrden" style={{ textDecoration: "none" }}>
            <button className="btn btn-danger">
              <FiberNewIcon />
              <PersonAddIcon />
            </button>
          </Link>
        </div>
      </div>

      <hr></hr>

      <div className="container text-center">
        <div className="row">
          <div className="col-12">
            <br></br>

            <div style={{ width: "90%", textAlign: "center", display: "flex" }}>
              <div>
                <button
                  onClick={toggleEstadoButtons}
                  class="btn btn-light"
                  style={{ border: "1px solid", color:"gray" }}
                >
                  <FilterListIcon />
                </button>
              </div>
              <div
                style={{ width: "60%", margin: "0 auto", textAlign: "center" }}
              >
                <input
                  type="text"
                  placeholder="Buscar"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div style={{ marginTop: "5px", marginBottom: "5px" }}>
                {showEstadoButtons && (
                  <>
                    
                    <button
                      className={`btn ${
                        selectedEstado === "Pendiente"
                          ? "boton-rojo"
                          : "btn-danger"
                      }`}
                      onClick={() => handleEstadoFilter("Pendiente")}
                      style={{ marginRight: "1%" }}
                    >
                      Pendiente
                    </button>
                    <button
                      className={`btn ${
                        selectedEstado === "Reparando"
                          ? "boton-reparando1"
                          : "boton-reparando"
                      }`}
                      onClick={() => handleEstadoFilter("Reparando")}
                      style={{ marginRight: "1%" }}
                    >
                      Reparando
                    </button>
                    <button
                      className={`btn ${
                        selectedEstado === "Repuesto"
                          ? "boton-repuesto"
                          : "btn-primary"
                      }`}
                      onClick={() => handleEstadoFilter("Repuesto")}
                      style={{ marginRight: "1%" }}
                    >
                      Repuesto
                    </button>
                    <button
                      className={`btn ${
                        selectedEstado === "Reparado"
                          ? "boton-reparado"
                          : "btn-success"
                      }`}
                      onClick={() => handleEstadoFilter("Reparado")}
                      style={{ marginRight: "1%" }}
                    >
                      Reparado
                    </button>
                    <button
                      className={`btn ${
                        selectedEstado === "Presupuesto"
                          ? "boton-presupuesto"
                          : "btn-warning"
                      }`}
                      onClick={() => handleEstadoFilter("Presupuesto")}
                      style={{ marginRight: "1%", color: "white" }}
                    >
                      Presupuesto
                    </button>

                    <button
                      className={`btn ${
                        selectedEstado === "Entregado"
                          ? "boton-entregados"
                          : "btn-secondary"
                      }`}
                      onClick={() => handleEstadoFilter("Entregado")}
                      style={{ marginRight: "1%" }}
                    >
                      Entregado
                    </button>
                    <button
                      className={`btn ${
                        selectedEstado === "" ? "boton-negro" : "btn-dark"
                      }`}
                      onClick={() => handleEstadoFilter("")}
                      style={{ marginRight: "1%" }}
                    >
                      Todos
                    </button>
                   
                  </>
                )}
              </div>
            </div>

            <table className="table table-striped" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th className="col-1"></th>
                  <th className="col-1">N* Orden</th>
                  <th className="col-2">Nombre y Apellido</th>
                  <th className="col-2">Equipo</th>
                  <th className="col-3">
                    <GetAppIcon /> Fecha <LogoutIcon />
                  </th>
                  <th className="col-1">Precio</th>
                  <th className="col-1">Estado</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrdens.map((orden, index) => {
                  const exitAt = orden.exitAt
                    ? new Date(orden.exitAt).toLocaleDateString()
                    : "";
                  return (
                    <tr key={orden._id}>
                      <td>
                        {orden.otherPrice === 0 && (
                          <CheckCircleOutlineIcon
                            style={{
                              color: "green",
                              marginTop: "4px",
                              height: "32px",
                              width: "32px",
                            }}
                          />
                        )}
                      </td>
                      <td>{orden.identifier}</td>
                      <td>
                        {orden.name} {orden.lastname}
                      </td>
                      <td>
                        {orden.type} {orden.marca} {orden.model}
                      </td>
                      <td>
                        {orden.createdAt}{" "}
                        <span style={{ fontWeight: "bold" }}>-</span> {exitAt}
                      </td>
                      <td>${orden.otherPrice} </td>
                      <td style={{ padding: "13px" }}>
                        <div
                          className={`estado ${orden.estado}`}
                          style={{ borderRadius: "10px", padding: "3px" }}
                        >
                          {orden.estado}
                        </div>
                      </td>
                      <td>
                        <Link
                          href="/[id]/orden"
                          as={`/${orden._id}/orden`}
                          legacyBehavior
                        >
                          <button
                            className="btn btn-success"
                            style={{ margin: "3px" }}
                          >
                            <ArrowForwardIcon />
                          </button>
                        </Link>
                      </td>
                      <td>{/* Add actions or content here */}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </div>
  );
}

/* Retrieves client(s) data from mongodb database */

export async function getServerSideProps() {
  await dbConnect();

  const result = await Orden.find({});
  const ordens = result.map((doc) => {
    const orden = doc.toObject();
    orden._id = orden._id.toString();

    const createdAt = new Date(orden.createdAt);
    const year = createdAt.getFullYear();
    const month = createdAt.getMonth() + 1;
    const day = createdAt.getDate();

    if (orden.exitAt) {
      orden.exitAt = new Date(orden.exitAt).toISOString();
    }

    orden.createdAt = `${day}-${month}-${year}`;

    return orden;
  });

  // Ordenar las órdenes por identificador en orden descendente
  ordens.sort((a, b) => {
    const identifierA = parseInt(a.identifier);
    const identifierB = parseInt(b.identifier);
    return identifierB - identifierA;
  });

  return { props: { ordens } };
}
