import React, { useState, useEffect } from "react";
import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Presupuesto from "../models/Presupuesto";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { format } from "date-fns";

export default function presupuestos({ presupuestos }) {
  const [filteredPresupuestos, setFilteredPresupuestos] = useState(presupuestos);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
  const filtered = presupuestos.filter(
    (presupuesto) =>
      presupuesto.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      presupuesto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

// Sort the filtered data by createdAt in descending order
const sortedFiltered = filtered.sort((a, b) => {
  const dateA = new Date(a.createdAt);
  
 
const dateB = new Date(b.createdAt);
  return dateB - dateA; // Sort in ascending order
});

  setFilteredPresupuestos(sortedFiltered);
}, [searchTerm, presupuestos]);


  return (
    <div>
      <h1>
        Presupuestos
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
      <hr></hr>
      <div className="container text-center">
        <div className="row">
          <div style={{ display: "flex" }}>
            <div>
              <button
                className="btn btn-secondary float-start"
                style={{ marginRight: "5%", marginTop: "1px" }}
              >
                <Link
                  href="/varios"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <ArrowBackIcon />
                </Link>
              </button>
            </div>
            <div style={{ width: "70%", margin: "auto" }}>
              <input
                type="text"
                placeholder="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12">
            <br></br>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col-1">#</th>
                  <th scope="col-2">Nombre</th>
                  <th scope="col-2">Apellido</th>
                  <th scope="col-2">Fecha y Hora</th> {/* Updated header */}
                  <th scope="col-2">Producto</th>
                  <th scope="col-2">Precio Efectivo $</th>
                  <th scope="col-2">Precio Tarjeta $</th>
                </tr>
              </thead>
              <tbody>
                {filteredPresupuestos.map((presupuesto, index) => (
                  <tr key={presupuesto._id}>
                    <td>{index}</td>
                    <td>{presupuesto.name}</td>
                    <td>{presupuesto.lastname}</td>
                    <td>{presupuesto.createdAt}</td> {/* Display date and time */}
                    <td>{presupuesto.product}</td>
                    <td>${presupuesto.price}</td>
                    <td>${presupuesto.priceTarjet}</td>
                    <td>
                      <Link
                        href="/[id]/presupuesto"
                        as={`/${presupuesto._id}/presupuesto`}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Retrieves Presupuestos data from MongoDB database */
export async function getServerSideProps() {
  await dbConnect();

  /* Find all the data in our database and sort it by createdAt in descending order */
  const result = await Presupuesto.find({}).sort({ createdAt: -1 });
  const presupuestos = result.map((doc) => {
    const presupuesto = doc.toObject();
    presupuesto._id = presupuesto._id.toString();
    
    presupuesto.createdAt = format(new Date(presupuesto.createdAt), 'dd-MM-yyyy HH:mm');

    return presupuesto;
  });

  return { props: { presupuestos } };
}
