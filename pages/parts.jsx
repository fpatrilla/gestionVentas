// import Company from '../models/Company';
import PartsModal from "../components/PartsModal";
import Part from "../models/Part";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/router";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Swal from "sweetalert2";
import BuildIcon from "@mui/icons-material/Build";

import InventoryIcon from "@mui/icons-material/Inventory";
import { format } from "date-fns";

export default function Parts({ parts }) {
  const [filteredParts, setFilteredParts] = useState(parts);
  const [searchTerm, setSearchTerm] = useState("");
  const [PartsModalIsOpen, setPartstModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { id } = router.query;
  // Open Parts Modal
  const openPartsModal = () => {
    setPartstModalIsOpen(true);
  };

  // Close Parts Modal
  const closePartsModal = () => {
    setPartstModalIsOpen(false);
  };

  // Handle filtering and sorting of parts
  useEffect(() => {
    const filtered = parts.filter((part) =>
      part.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedFiltered = filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA; // Sort in descending order
    });

    setFilteredParts(sortedFiltered);
  }, [searchTerm, parts]);

 

  const handleDelete = async (partId) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro de que deseas eliminar el repuesto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        const res = await fetch(`/api/parts/${partId}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Network response was not ok");
          
        }

        Swal.fire(
          "¡Eliminado!",
          "El repuesto se elimino  exitosamente",
          "success"

        );
        window.location.reload();
      }
    } catch (error) {
      setErrorMessage("Error al eliminar el repuesto");
    }
  };

  return (
    <div>
      <h1>
        Repuestos
        <BuildIcon
          style={{
            textDecoration: "none",
            color: "#6c757d",
            height: "60px",
            width: "60px",
            marginLeft: "10px",
          }}
        />
      </h1>
      <hr />
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
            <div className="btn btn-primary" style={{ margin: "1%" }}>
              <FiberNewIcon
                onClick={openPartsModal}
                style={{
                  textDecoration: "none",
                  color: "white",
                  height: "30px",
                  width: "30px",
                }}
              />
            </div>
          </div>
          <div className="col-12">
            <br />
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col-1">#</th>
                  <th scope="col-2">Repuesto</th>
                  <th scope="col-2">Observacion</th>
                  <th scope="col-2">Fecha</th>
                  <th scope="col-1">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredParts.map((part, index) => (
                  <tr key={part._id}>
                    <td>{index + 1}</td>
                    <td>{part.name}</td>
                    <td>{part.observation}</td>
                    <td>{part.createdAt} </td>
                    <td>
                      <button
                        onClick={() => handleDelete(part._id)}
                        className="btn btn-danger"
                      >
                        <DeleteForeverIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <PartsModal isOpen={PartsModalIsOpen} closeModal={closePartsModal} />
    </div>
  );
}

// Retrieves parts data from MongoDB database
export async function getServerSideProps() {
  await dbConnect();

  const result = await Part.find({}).sort({ createdAt: -1 });

  const parts = result.map((doc) => {
    const part = doc.toObject();
    part._id = part._id.toString();
    part.createdAt = format(new Date(part.createdAt), "dd-MM-yyyy");
    return part;
  });

  return { props: { parts } };
}
