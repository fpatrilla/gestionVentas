import { useRouter } from "next/router";
import React, { useState } from "react";
import Modal from "react-modal";

//materia icons

import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import PersonIcon from "@mui/icons-material/Person";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SaveIcon from "@mui/icons-material/Save";

export default function CurrentAccountModal({ isOpen, closeModal, companys }) {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [observation, setObservation] = useState("");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaleComplete, setIsSaleComplete] = useState(false);

  const contentType = "application/json";

  const handleSubmit = async () => {
    try {
      const form = {
        name: name,
        lastname: lastname,
        product: product,
        price: price,
        observation: observation,
      };

      await postDataSale(form);

      setIsSaleComplete(true);
      router.push("/");
    } catch (error) {
      console.error("Failed to complete the currentAccount:", error);
    }
  };

  const postDataSale = async (form) => {
    try {
      const res = await fetch("/api/currentAccount", {
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

      router.push("/");
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
        Cuenta Corriente
        <EditNoteIcon
          className="iconhead"
          style={{
            color: "#0dcaf0",
          }}
        />
      </h1>

      <div className="boxmodal">
        <div style={{ display: "flex", marginTop: "15px", marginLeft: "10%" }}>
          <div style={{ marginRight: "3%" }}>
            <h5>
              <PersonIcon /> Nombre :
            </h5>
            <input
              type="text"
              maxLength="20"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <h5>
              <PersonIcon />
              Apellido:
            </h5>
            <input
              type="text"
              maxLength="20"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
        </div>
        <div style={{ marginTop: "15px", marginLeft: "12%" }}>
          <div>
            <h5>
              <AddShoppingCartIcon /> Producto:
            </h5>
            <input
              type="text"
              maxLength="200"
              name="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              style={{ height: "80px", width: "70%" }}
            />
          </div>
          <div style={{ marginTop: "15px", display: "flex" }}>
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

          <div style={{ marginTop: "15px" }}>
            <div>
              <h5>
                <AddShoppingCartIcon /> Observaciones:
              </h5>
              <input
                type="text"
                maxLength="200"
                name="observation"
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                style={{ height: "80px", width: "70%" }}
              />
            </div>
          </div>
          <div style={{ marginTop: "15px", margin: "auto" }}>
            <div style={{ marginRight: "3%" }}>
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn bg-danger"
                style={{ marginTop: "7%", color: "white", marginLeft: "40%" }}
              >
                Guardar <SaveIcon />
              </button>
            </div>
          </div>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </Modal>
  );
}
