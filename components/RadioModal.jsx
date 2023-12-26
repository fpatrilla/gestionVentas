import { useRouter } from "next/router";
import React, { useState } from "react";
import Modal from "react-modal";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

import RadioIcon from '@mui/icons-material/Radio';




import SaveIcon from "@mui/icons-material/Save";

export default function PartsModal({ isOpen, closeModal,  }) {
  const [name, setName] = useState("");
  const [frecuencias, setFrecuencias] = useState("");

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaleComplete, setIsPartsomplete] = useState(false);

  const contentType = "application/json";

  const handleSubmit = async () => {
    try {
      
      const form = {
        name: name,
        frecuencias: frecuencias,

      };

      await postDataFrecuencias(form);
      closeModal();
      window.location.reload();
     
    } catch (error) {
      console.error("Failed to complete the Frecuencias:", error);
    }
  };

  const postDataFrecuencias = async (form) => {
    try {
      const res = await fetch("/api/radio", {
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

      router.push("/radio");
    } catch (error) {
      setErrorMessage("Error al agregar parts");
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
        Nueva Frecuencia
        <RadioIcon
          style={{
            textDecoration: "none",
            color: "#198754ad",
            height: "60px",
            width: "60px",
            marginLeft: "10px",
          }}
        />
      </h1>

      <div
        style={{
          margin: "auto",
          width: "40%",
          margintop: "25px",
          border: "1px solid",
          backgroundColor: "#f5f5f5",
          borderColor: "#f5f5f5",
          borderRadius: "30px",
          marginLeft: "30%",
        }}
      >
        <div style={{  marginTop: "15px", marginLeft: "10%" }}>
          <div style={{ marginRight: "3%" }}>
            <h5>
             Nueva Frecuencia:
            </h5>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{ marginRight: "3%" }}>
            <h5>
              Frecuencia :
            </h5>
            <textarea
              type="text"
              name="frecuencia"
              value={frecuencias}
              onChange={(e) => setFrecuencias(e.target.value)}
              style={{height:"150px"}}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginLeft: "200px",
            marginTop: "13px",
            marginBottom: "10px",
          }}
        >
          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn bg-danger"
              style={{ color: "white" }}
            >
              Guardar <SaveIcon />
            </button>
          </div>
         
        </div>
      </div>

      <div></div>

      
    </Modal>
  );
}
