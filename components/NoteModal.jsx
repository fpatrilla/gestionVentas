import { useRouter } from "next/router";
import React, { useState } from "react";
import Modal from "react-modal";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

import PostAddIcon from "@mui/icons-material/PostAdd";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import SaveIcon from "@mui/icons-material/Save";

export default function PresupuestoModal({ isOpen, closeModal }) {
  const [note, setNote] = useState("");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaleComplete, setIsSaleComplete] = useState(false);

  const contentType = "application/json";

  const handleSubmit = async () => {
    try {
      // Crear un objeto ventaData único para cada artículo
      const form = {
        note: note,
        // ... otros campos requeridos según el modelo Sales
      };

      // Enviar el objeto ventaData correspondiente en la solicitud POST
      await postDataNote(form);

      setIsSaleComplete(true);
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error("", error);
    }
  };

  const postDataNote = async (form) => {
    try {
      const res = await fetch("/api/note", {
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

      router.push("/varios");
    } catch (error) {
      setErrorMessage("Error al agregar currentAccount");
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
        Notas
        <PostAddIcon
          style={{
            textDecoration: "none",
            color: "#198754",
            height: "60px",
            width: "60px",
            marginLeft: "10px",
          }}
        />
      </h1>

      <div
        style={{
          margin: "auto",
          width: "50%",
          margintop: "25px",
          border: "1px solid",
          backgroundColor: "#f5f5f5",
          borderColor: "#f5f5f5",
          borderRadius: "30px",
        }}
      >
        <div style={{ marginTop: "15px", marginLeft: "12%" }}>
          <div style={{ marginTop: "15px" }}>
            <div>
              <h5>
                <NoteAltIcon /> Nueva Nota:
              </h5>
              <textarea
                type="text"
                maxLength="200"
                name="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                style={{ height: "180px", width: "70%" }}
              />
            </div>
          </div>
          <div style={{ marginTop: "15px" }}>
            <div style={{}}>
              <div style={{ display: "flex", marginLeft: "18%" }}>
                <div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn bg-danger"
                    style={{ marginTop: "8px", color: "white" }}
                  >
                    Guardar <SaveIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </Modal>
  );
}
