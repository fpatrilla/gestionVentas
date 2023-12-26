import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import NewOrderAndClientPrint from "../Print/NewOrderAndClientPrint";
import { Checkbox, FormControlLabel } from "@mui/material";
import NewOrderAndClientTicket from "../Print/NewOrderAndClientTicket";

//material icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SettingsCellIcon from "@mui/icons-material/SettingsCell";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import PinIcon from "@mui/icons-material/Pin";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BookOnlineIcon from "@mui/icons-material/BookOnline";

const NewClientAndOrdenForm = ({ companys }) => {
  const [portaSimChecked, setPortaSimChecked] = useState(false);
  const [simChecked, setSimChecked] = useState(false);
  const [sdChecked, setSdChecked] = useState(false);
  const [tpuChecked, setTpuChecked] = useState(false);

  const router = useRouter();
  const contentType = "application/json";

  // Cliente form state
  const [clientForm, setClientForm] = useState({
    name: "",
    lastname: "",
    city: "",
    number: "",
    dni: "",
    email: "",
    coment: "",
  });
  const [clientErrors, setClientErrors] = useState({});
  const [clientMessage, setClientMessage] = useState("");

  // Orden form state
  const [ordenForm, setOrdenForm] = useState({
    type: "",
    marca: "",
    model: "",
    issue: "",
    price: "",
    password: "",
    serialNumber: "",
    comentOrden: "",
    estado: "Pendiente",
    otherPrice: "",
    comentInt: "",
    other: "",
    portaSim: false,
    sim: false,
    sd: false,
    tpu: false,
  });
  const [ordenErrors, setOrdenErrors] = useState({});
  const [ordenMessage, setOrdenMessage] = useState("");

  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setClientForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleOrdenChange = (e) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === 'checkbox' ? checked : value; 
      type === "checkbox" ? checked : value === "on" ? true : value; // Handle checkbox values

    setOrdenForm((prevForm) => ({
      ...prevForm,
      [name]: newValue,
    }));
  };
  const clientFormValidate = () => {
    let errors = {};
    if (!clientForm.name) errors.name = "* Nombre es requerido";
    if (!clientForm.lastname) errors.lastname = "* Apellido es requerido";
    if (!clientForm.city) errors.city = "* Ciudad es requerido";
    // Agregar validaciones para otros campos si es necesario

    return errors;
  };

  const ordenFormValidate = () => {
    let errors = {};
    if (!ordenForm.type) errors.type = "* Tipo es requerido";
    if (!ordenForm.marca) errors.marca = "* Marca es requerido";
    if (!ordenForm.model) errors.model = "* Modelo es requerido";
    // Agregar validaciones para otros campos si es necesario

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar los formularios
    const clientErrors = clientFormValidate();
    const ordenErrors = ordenFormValidate();

    if (
      Object.keys(clientErrors).length === 0 &&
      Object.keys(ordenErrors).length === 0
    ) {
      try {
        // Guardar el cliente
        const clientRes = await fetch("/api/client", {
          method: "POST",
          headers: {
            Accept: contentType,
            "Content-Type": contentType,
          },
          body: JSON.stringify(clientForm),
        });

        if (!clientRes.ok) {
          throw new Error(clientRes.status);
        }

        // Obtener el ID del cliente creado
        const { clientId } = await clientRes.json();

        // Actualizar el formulario de la orden con el ID del cliente
        const updatedOrdenForm = {
          ...ordenForm,
          client: clientId,
        };

        // Guardar la orden
        const requestData = {
          clientForm,
          ordenForm: {
            ...updatedOrdenForm,
            portaSim: portaSimChecked,
            sim: simChecked,
            sd: sdChecked,
            tpu: tpuChecked,
          },
        };

        const ordenRes = await fetch("/api/ordenes/orden", {
          method: "POST",
          headers: {
            Accept: contentType,
            "Content-Type": contentType,
          },
          body: JSON.stringify(requestData),
        });

        if (!ordenRes.ok) {
          throw new Error(ordenRes.status);
        }

        router.push("/ordenes");
      } catch (error) {
        setClientMessage("Failed to add client and orden");
        setOrdenMessage("Failed to add client and orden");
      }
    } else {
      setClientErrors(clientErrors);
      setOrdenErrors(ordenErrors);
    }
  };

  const [selectedPrice, setSelectedPrice] = useState("");

  const handlePriceChange = (price) => {
    setSelectedPrice(price);
    setOrdenForm((prevForm) => ({
      ...prevForm,
      price: price,
    }));
  };

  const validateClientForm = () => {
    const clientErrors = clientFormValidate();
    setClientErrors(clientErrors);
    return Object.keys(clientErrors).length === 0;
  };

  const validateOrdenForm = () => {
    const ordenErrors = ordenFormValidate();
    setOrdenErrors(ordenErrors);
    return Object.keys(ordenErrors).length === 0;
  };

  //function print

  const handlePrint = async () => {
    // Validate the client and order forms
    const isClientFormValid = validateClientForm();
    const isOrdenFormValid = validateOrdenForm();

    if (isClientFormValid && isOrdenFormValid) {
      try {
        // Realiza una solicitud GET para obtener el identifier
        const ordenRes = await fetch("/api/ordenes/orden/identifier", {
          method: "GET",
          headers: {
            Accept: contentType,
            "Content-Type": contentType,
          },
        });

        if (!ordenRes.ok) {
          throw new Error(ordenRes.status);
        }

        const { identifier } = await ordenRes.json();

        // Ahora, identifier está disponible
        const printWindow = window.open("", "_blank");

        if (printWindow) {
          const printContent =
            document.getElementById("print-content").innerHTML;
          printWindow.document.open();
          printWindow.document.write(`
            ${printContent}
          `);
          router.push("/ordenes");
          printWindow.document.close();
          printWindow.print();
        } else {
          alert(
            "¡El bloqueo de ventanas emergentes puede estar activado en tu navegador!"
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handlePrintTicket = () => {
    // Validate the client and order forms
    const isClientFormValid = validateClientForm();
    const isOrdenFormValid = validateOrdenForm();

    if (isClientFormValid && isOrdenFormValid) {
      // Proceed with printing the ticket
      const printTicket = window.open("", "_blank");

      if (printTicket) {
        const ticketContent =
          document.getElementById("ticket-content").innerHTML;
        printTicket.document.open();
        printTicket.document.write(`
        ${ticketContent}
      `);
        router.push("/ordenes");
        printTicket.document.close();
        printTicket.print();
      } else {
        alert(
          "¡El bloqueo de ventanas emergentes puede estar activado en tu navegador!"
        );
      }
    }
  };

  const handlePortaSimChange = () => {
    setPortaSimChecked(!portaSimChecked);
    setOrdenForm((prevForm) => ({
      ...prevForm,
      portaSim: !portaSimChecked,
    }));
  };
  const handleSimChange = () => {
    setSimChecked(!simChecked);
    setOrdenForm((prevForm) => ({
      ...prevForm,
      sim: !simChecked,
    }));
  };

  const handleSdChange = () => {
    setSdChecked(!sdChecked);
    setOrdenForm((prevForm) => ({
      ...prevForm,
      sd: !sdChecked,
    }));
  };

  const handleTpuChange = () => {
    setTpuChecked(!tpuChecked);
    setOrdenForm((prevForm) => ({
      ...prevForm,
      tpu: !tpuChecked,
    }));
  };

  const [identifier, setIdentifier] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordenRes = await fetch("/api/ordenes/orden/identifier");
        if (ordenRes.ok) {
          const { identifier } = await ordenRes.json();
          setIdentifier(identifier);
        } else {
          console.error("Error al obtener el identificador");
        }
      } catch (error) {
        console.error("Error en la llamada a la API", error);
      }
    };

    fetchData().then(() => {
      setPortaSimChecked(ordenForm.portaSim);
      setSimChecked(ordenForm.sim);
      setSdChecked(ordenForm.sd);
      setTpuChecked(ordenForm.tpu);
    });
  }, []);

  return (
    <>
      <div>
        <h1>
          Nuevo Cliente y Orden
          <PersonAddIcon
            className="iconhead"
            style={{
              color: "#dc3545",
            }}
          />
        </h1>
      </div>
      <hr />
      <div style={{ display: "flex", width: "100%" }}>
        <div>
          <button
            className="btn btn-secondary float-start"
            style={{ marginRight: "5%", marginTop: "1px" }}
          >
            <Link
              href="/newOrden"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ArrowBackIcon />
            </Link>
          </button>
        </div>
        <div style={{ width: "40%", marginLeft: "1%" }}>
          <div>
            <h3>
              <img
                src="../user.png"
                alt="Descripción de la imagen"
                width={35}
              />
              <span style={{ marginLeft: "20px" }}>Nuevo Cliente</span>
            </h3>
          </div>

          {/* Star client form */}

          <div className="boxorder">
            <form id="clientForm" onSubmit={handleSubmit}>
              <div>
                <div>
                  <label htmlFor="name">
                    <h6>
                      <PersonIcon /> Nombre:{" "}
                    </h6>
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    name="name"
                    value={clientForm.name}
                    onChange={handleClientChange}
                    required
                  />
                  {clientErrors.name && <p>{clientErrors.name}</p>}
                </div>
                <div>
                  <div>
                    <label htmlFor="lastname">
                      <h6>
                        <PersonIcon /> Apellido:{" "}
                      </h6>
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastname"
                      value={clientForm.lastname}
                      onChange={handleClientChange}
                      required
                    />
                    {clientErrors.lastname && <p>{clientErrors.lastname}</p>}
                  </div>
                </div>
                <div>
                  <div>
                    <label htmlFor="city">
                      <h6>
                        <LocationOnIcon /> Localidad:{" "}
                      </h6>
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      maxLength="30"
                      name="city"
                      value={clientForm.city}
                      onChange={handleClientChange}
                    />
                    {clientErrors.city && <p>{clientErrors.city}</p>}
                  </div>
                  <div>
                    <label htmlFor="number">
                      <h6>
                        <PhoneForwardedIcon /> Numero de contacto:{" "}
                      </h6>
                    </label>
                  </div>
                  <div>
                    <input
                      type="number"
                      name="number"
                      value={clientForm.number}
                      onChange={handleClientChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="dni">
                      <h6>
                        <AssignmentIndIcon /> Dni/Cuit:{" "}
                      </h6>
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="dni"
                      value={clientForm.dni}
                      onChange={handleClientChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">
                      <h6>
                        <EmailIcon /> Correo electrónico:{" "}
                      </h6>
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="email"
                      value={clientForm.email}
                      onChange={handleClientChange}
                    />
                  </div>
                </div>
              </div>
            </form>
            {clientMessage && <p>{clientMessage}</p>}
          </div>
        </div>

        {/* end client form */}
        {/* star order form */}

        <div style={{ width: "50%", marginLeft: "1%" }}>
          <div>
            <h3>
              <img
                src="../order.png"
                alt="Descripción de la imagen"
                width={35}
              ></img>
              <span style={{ marginLeft: "20px" }}>Orden</span>
              <span style={{ marginLeft: "30%" }}>
                <button
                  className="btn btn-success"
                  style={{ width: "100px", marginRight: "2%" }}
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
                >
                  <BookOnlineIcon />
                </button>
              </span>{" "}
            </h3>
          </div>
          <form id="ordenForm" onSubmit={handleSubmit}>
            <div className="boxorder">
              <div>
                <div>
                  {/* form orden */}

                  {/* Inputs y errores del formulario de la orden */}

                  {ordenMessage && <p>{ordenMessage}</p>}

                  {/* End form Orden */}
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "8%" }}>
                  <label htmlFor="type">
                    <h6>
                      Tipo: <SettingsCellIcon />
                    </h6>
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={ordenForm.type}
                    onChange={handleOrdenChange}
                    required
                  />
                  {ordenErrors.type && <p>{ordenErrors.type}</p>}
                </div>
                <div>
                  <label htmlFor="marca">
                    <h6>
                      Marca: <SettingsCellIcon />
                    </h6>
                  </label>
                  <input
                    type="text"
                    name="marca"
                    value={ordenForm.marca}
                    onChange={handleOrdenChange}
                    required
                  />
                  {ordenErrors.marca && <p>{ordenErrors.marca}</p>}
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "8%" }}>
                  <label htmlFor="model">
                    <h6>
                      Modelo: <SettingsCellIcon />
                    </h6>
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={ordenForm.model}
                    onChange={handleOrdenChange}
                    required
                  />
                  {ordenErrors.model && <p>{ordenErrors.model}</p>}
                </div>
                <div>
                  <label htmlFor="password">
                    <h6>
                      Contraseña: <VpnKeyIcon />
                    </h6>
                  </label>
                  <input
                    type="text"
                    name="password"
                    value={ordenForm.password}
                    onChange={handleOrdenChange}
                  />
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "8%" }}>
                  <label htmlFor="serialNumber">
                    <h6>
                      Numero de serie: <PinIcon />
                    </h6>
                  </label>
                  <input
                    type="text"
                    name="serialNumber"
                    value={ordenForm.serialNumber}
                    onChange={handleOrdenChange}
                  />
                </div>
                <div>
                  <label htmlFor="issue">
                    <h6>
                      Falla o requerimiento: <WarningAmberIcon />
                    </h6>
                  </label>
                  <textarea
                    type="text"
                    name="issue"
                    value={ordenForm.issue}
                    onChange={handleOrdenChange}
                    cols="10" // Ajusta el número de columnas aquí
                    rows="50"
                  />
                </div>
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={portaSimChecked}
                      onChange={handlePortaSimChange}
                      value="portaSim"
                    />
                  }
                  label="PortaSim"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={simChecked}
                      onChange={handleSimChange}
                      value="sim"
                    />
                  }
                  label="Sim"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={sdChecked}
                      onChange={handleSdChange}
                      value="sd"
                    />
                  }
                  label="SD"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={tpuChecked}
                      onChange={handleTpuChange}
                      value="tpu"
                    />
                  }
                  label="Tpu"
                />
              </div>

              <div style={{ marginRight: "8%", width: "90%", display: "flex" }}>
                <label htmlFor="other">
                  <h6> Otro: </h6>
                </label>
                <input
                  type="string"
                  name="other"
                  value={ordenForm.other}
                  onChange={handleOrdenChange}
                />
              </div>

              <div>
                <label htmlFor="comentOrden">
                  <h6>
                    Comentarios: <ManageAccountsIcon />
                  </h6>
                </label>
                <textarea
                  name="comentOrden"
                  value={ordenForm.comentOrden}
                  onChange={handleOrdenChange}
                  cols="80"
                  rows="4"
                />
              </div>
              <div>
                <h6>
                  Acepta cargos hasta: <MonetizationOnIcon />
                </h6>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedPrice === "5000"}
                      onChange={() => handlePriceChange("5000")}
                      value="5000"
                    />
                  }
                  label="$5000"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedPrice === "7000"}
                      onChange={() => handlePriceChange("7000")}
                      value="7000"
                    />
                  }
                  label="$7000"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedPrice === "10000"}
                      onChange={() => handlePriceChange("10000")}
                      value="10000"
                    />
                  }
                  label="$10000"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedPrice === "12000"}
                      onChange={() => handlePriceChange("12000")}
                      value="12000"
                    />
                  }
                  label="$12000"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedPrice === "15000"}
                      onChange={() => handlePriceChange("15000")}
                      value="15000"
                    />
                  }
                  label="$15000"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedPrice === "20000"}
                      onChange={() => handlePriceChange("20000")}
                      value="20000"
                    />
                  }
                  label="$20000"
                />
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "8%", width: "25%" }}>
                  <label htmlFor="otherPrice">
                    <h6>
                      Otro Precio $: <MonetizationOnIcon />
                    </h6>
                  </label>
                  <input
                    type="Number"
                    maxLength="30"
                    name="otherPrice"
                    value={ordenForm.otherPrice}
                    onChange={handleOrdenChange}
                  />
                </div>

                <div>
                  <label htmlFor="comentInt">
                    <h6>
                      Comentarios Interno: <SupportAgentIcon />
                    </h6>
                  </label>
                  <textarea
                    name="comentInt"
                    value={ordenForm.comentInt}
                    onChange={handleOrdenChange}
                    cols="20"
                    rows="4"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div style={{ marginLeft: "20%" }}>
        <NewOrderAndClientPrint
          orden={ordenForm}
          companys={companys}
          client={clientForm}
          image="/logo.png"
          identifier={identifier + 1}
        />

        <NewOrderAndClientTicket
          orden={ordenForm}
          companys={companys}
          client={clientForm}
          image="/logo.png"
          identifier={identifier + 1}
        />
      </div>
    </>
  );
};

export default NewClientAndOrdenForm;
