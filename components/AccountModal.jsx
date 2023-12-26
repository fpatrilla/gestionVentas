import { useRouter } from "next/router";
import React, { useState } from "react";
import Modal from "react-modal";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import NewAccountTicket from "./Print/NewAccountTicket";

import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import InventoryIcon from "@mui/icons-material/Inventory";

import PersonIcon from "@mui/icons-material/Person";

import SaveIcon from "@mui/icons-material/Save";

export default function AccountModal({ isOpen, closeModal, companys }) {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [gmail, setGmail] = useState("");
  const [gmailpass, setGmailpass] = useState("");
  const [facebook, setFacebook] = useState("");
  const [facebookpass, setFacebookpass] = useState("");
  const [icloud, setIcloud] = useState("");
  const [icloudpass, setIcloudpass] = useState("");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaleComplete, setIsSaleComplete] = useState(false);

  const contentType = "application/json";

  const handleSubmit = async () => {
    try {
      // Crear un objeto ventaData único para cada artículo
      const form = {
        name: name,
        lastname: lastname,
        gmail: gmail,
        gmailpass: gmailpass,
        facebook: facebook,
        facebookpass: facebookpass,
        icloud: icloud,
        icloudpass: icloudpass,
        // ... otros campos requeridos según el modelo Sales
      };

      await postDataSale(form);

      setIsSaleComplete(true);
      router.push("/account");
    } catch (error) {
      console.error("Failed to complete the presupuesto:", error);
    }
  };

  const postDataSale = async (form) => {
    try {
      const res = await fetch("/api/account", {
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
  const handlePrintTicket = () => {
    const printTicket = window.open("", "_blank");

    if (printTicket) {
      const ticketContentSale = document.getElementById(
        "ticket-NewAccountTicket"
      ).innerHTML;
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
      <h1>
        Nueva Cuenta
        <InventoryIcon
          style={{
            textDecoration: "none",
            color: "#6c757d",
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
        <div style={{ display: "flex", marginTop: "15px", marginLeft: "10%" }}>
          <div style={{ marginRight: "3%" }}>
            <h5>
              <PersonIcon /> Nombre :
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
              <PersonIcon /> Apellido :
            </h5>
            <input
              type="text"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
        </div>
        <div style={{ display: "flex", marginTop: "15px", marginLeft: "10%" }}>
          <div style={{ marginRight: "3%" }}>
            <h5>
              <EmailIcon /> Gmail :
            </h5>
            <input
              type="text"
              name="gmail"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
            />
          </div>
          <div style={{ marginRight: "3%" }}>
            <h5>
              <PasswordIcon /> Password :
            </h5>
            <input
              type="text"
              name="gmailpass"
              value={gmailpass}
              onChange={(e) => setGmailpass(e.target.value)}
            />
          </div>
        </div>
        <div style={{ display: "flex", marginTop: "15px", marginLeft: "10%" }}>
          <div style={{ marginRight: "3%" }}>
            <h5>
              <FacebookIcon /> Facebook :
            </h5>
            <input
              type="text"
              name="facebook"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
            />
          </div>
          <div style={{ marginRight: "3%" }}>
            <h5>
              <PasswordIcon /> Password :
            </h5>
            <input
              type="text"
              name="facebookpass"
              value={facebookpass}
              onChange={(e) => setFacebookpass(e.target.value)}
            />
          </div>
        </div>
        <div style={{ display: "flex", marginTop: "15px", marginLeft: "10%" }}>
          <div style={{ marginRight: "3%" }}>
            <h5>
              <AppleIcon /> icloud :
            </h5>
            <input
              type="text"
              name="icloud"
              value={icloud}
              onChange={(e) => setIcloud(e.target.value)}
            />
          </div>
          <div style={{ marginRight: "3%" }}>
            <h5>
              <PasswordIcon /> Password :
            </h5>
            <input
              type="text"
              name="icloudpass"
              value={icloudpass}
              onChange={(e) => setIcloudpass(e.target.value)}
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
          <div>
            <button
              type="submit"
              className="btn bg-secondary"
              onClick={handlePrintTicket}
              style={{ color: "white", marginLeft: "40%" }}
            >
              <BookOnlineIcon />
            </button>
          </div>
        </div>
      </div>

      <div></div>

      <NewAccountTicket
        image="/logo.png"
        {...companys}
        name={name}
        lastname={lastname}
        gmail={gmail}
        gmailpass={gmailpass}
        facebook={facebook}
        facebookpass={facebookpass}
        icloud={icloud}
        icloudpass={icloudpass}
      />
    </Modal>
  );
}
