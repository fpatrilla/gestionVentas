import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import Orden from "../../models/Orden";
import Company from "../../models/Company";
import OrderSaleModal from "../../components/OrderSaleModal";
import OrderPrintTicket from "../../components/Print/OrderPrintTicket";
import WhatsappInfoModal from "../../components/WhatsappInfoModal";
import WhatsappSendOrderModal from "../../components/WhatsappSendOrderModal";

import EmailInfoModal from "../../components/EmailInfoModal";

import OrderPrint from "../../components/Print/OrderPrint";

//material icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import GetAppIcon from "@mui/icons-material/GetApp";
import LogoutIcon from "@mui/icons-material/Logout";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import SendToMobileIcon from "@mui/icons-material/SendToMobile";

const OrdenPage = ({ orden, companys }) => {
  const router = useRouter();
  const formattedDate = new Date(orden.createdAt).toLocaleDateString();
  const formattedTime = new Date(orden.createdAt).toLocaleTimeString(); // Agrega la hora y los minutos
  const formattedDateTime = `${formattedDate} ${formattedTime}`; // Combinar fecha y hora

  const formattedDateExit = orden.exitAt
    ? new Date(orden.exitAt).toLocaleDateString()
    : "";
  const formattedTimeExit = orden.exitAt
    ? new Date(orden.exitAt).toLocaleTimeString()
    : ""; // Agrega la hora y los minutos
  const formattedDateTimeExit = orden.exitAt
    ? `${formattedDateExit} ${formattedTimeExit}`
    : ""; // Combinar fecha y hora

  const handleBack = () => {
    router.push("/ordenes");
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");

    if (printWindow) {
      const printContent = document.getElementById("print-content").innerHTML;
      printWindow.document.open();
      printWindow.document.write(`
       
          ${printContent}
      
      `);
      printWindow.document.close();
      printWindow.print();
    } else {
      alert(
        "¡El bloqueo de ventanas emergentes puede estar activado en tu navegador!"
      );
    }
  };
  const [orderSalelIsOpen, setOrderSaleIsOpen] = useState(false);
  const openOrderSale = () => {
    setOrderSaleIsOpen(true);
  };

  const closeOrderSale = () => {
    setOrderSaleIsOpen(false);
  };

  const [WhatsappInfoModalIsOpen, setWhatsappInfoModalIsOpen] = useState(false);
  const openWhatsappInfoModal = () => {
    setWhatsappInfoModalIsOpen(true);
  };

  const closeWhatsappInfoModal = () => {
    setWhatsappInfoModalIsOpen(false);
  };
  const [EmailInfoModalIsOpen, setEmailInfoModalIsOpen] = useState(false);
  const openEmailInfoModal = () => {
    setEmailInfoModalIsOpen(true);
  };

  const closeEmailInfoModal = () => {
    setEmailInfoModalIsOpen(false);
  };

  const [WhatsappSendOrderModalIsOpen, setWhatsappSendOrderModalIsOpen] =
    useState(false);
  const openWhatsappSendOrderModal = () => {
    setWhatsappSendOrderModalIsOpen(true);
  };

  const closeWhatsappSendOrderModal = () => {
    setWhatsappSendOrderModalIsOpen(false);
  };

  const exitAt = orden.exitAt ? new Date(orden.exitAt) : null;

  const handleMarkAsDelivered = async () => {
    try {
      const response = await fetch(`/api/ordenes/delivered/${orden._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ markAsDelivered: true }),
      });

      if (response.ok) {
        console.log("Orden marcada como entregada");

        window.location.reload();
      } else {
        console.error("Error al marcar la orden como entregada");
      }
    } catch (error) {
      console.error("Error al marcar la orden como entregada:", error);
    }
  };
  const handlePrintTicket = () => {
    const printTicket = window.open("", "_blank");

    if (printTicket) {
      const ticketContent = document.getElementById("ticket-content").innerHTML;
      printTicket.document.open();
      printTicket.document.write(`
       
          ${ticketContent}
      
      `);
      printTicket.document.close();
      printTicket.print();
    } else {
      alert(
        "¡El bloqueo de ventanas emergentes puede estar activado en tu navegador!"
      );
    }
  };
  const handleOpenOutlook = () => {
    const email = orden.email; // Cambia por tu dirección de correo electrónico
    const subject = `Orden ${orden.identifier}`; // Cambia por el asunto deseado
    const body = `Saludos Sr(a)  ${orden.name} ${orden.lastname} 

    Su ${orden.type} ${orden.marca} ${orden.model} Orden N* ${
      orden.identifier
    } se encuentra en estado: ${orden.estado}.
    
    Detalle: ${orden.comentOrden}.
      
      Total a pagar: $${orden.otherPrice}

   Saludos Cordiales
   ${companys.map((company) => company.companyname).join(", ")}
   ${companys.map((company) => company.companyType).join(", ")}
   Direccion: ${companys.map((company) => company.address).join(", ")}
   Web: ${companys.map((company) => company.web).join(", ")} 
   Localidad: ${companys.map((company) => company.city).join(", ")}
   Telefono: ${companys.map((company) => company.telephone1).join(", ")}
   Celular: ${companys.map((company) => company.celphone1).join(", ")}   `; // Usar el contenido de comentOrden como cuerpo del correo

    const outlookURL = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = outlookURL;
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", width: "95%" }}>
        <div style={{ width: "60%" }}>
          <h1>Orden de Reparación: {orden.identifier}</h1>
        </div>
        <div style={{ marginLeft: "auto", marginRight: "6%", width: "18%" }}>
          <p
            style={{
              marginLeft: "6%",
              backgroundColor: "white",
              padding: "4%",
              textAlign: "center",
              borderRadius: "30px",
            }}
            class="fw-semibold"
            className={`estado ${orden.estado}`}
          >
            {orden.estado}
          </p>
        </div>
        <div style={{ marginLeft: "auto", marginRight: "6%", display: "flex" }}>
          <div style={{ padding: "1%", paddingLeft: "auto" }}>
            {orden.otherPrice === 0 && (
              <CheckCircleOutlineIcon
                style={{ color: "green", width: "60px", height: "60px" }}
              />
            )}
          </div>
          <div style={{ marginTop: "30px", marginLeft: "20%" }}>
            {orden.otherPrice === 0 && orden.estado !== "Entregado" && (
              <button
                type="button"
                onClick={handleMarkAsDelivered}
                className="btn btn-secondary"
              >
                <MoveToInboxIcon />
              </button>
            )}
          </div>
        </div>
      </div>
      <div style={{ display: "Felx" }}>
        <div style={{ width: "4%" }}>
          <button
            className="btn btn-secondary float-start"
            style={{ marginRight: "5%", marginTop: "1px" }}
          >
            <Link
              href="/ordenes"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ArrowBackIcon />
            </Link>
          </button>
        </div>
        <div className="boxorderhead">
          <div>
            <h5>
              <AccountCircleIcon /> {orden.name} {orden.lastname}
            </h5>
          </div>
          <div style={{ marginLeft: "2%" }} onClick={openWhatsappInfoModal}>
            <h5>
              <PhoneForwardedIcon />: {orden.number}
            </h5>
          </div>
          <div style={{ marginLeft: "2%" }} onClick={openEmailInfoModal}>
            <h5>
              <EmailIcon />: {orden.email}
            </h5>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <button className="btn btn-danger" onClick={openOrderSale}>
              <MonetizationOnIcon />
              <ArrowCircleRightIcon />
            </button>
          </div>
          <div style={{ marginLeft: "1%" }}>
            <Link
              href={`/${orden._id}/registerOrderPay?name=${orden.name}&lastname=${orden.lastname}&number=${orden.number}`}
            >
              <button className="btn btn-primary">
                <PriceCheckIcon />
              </button>
            </Link>
          </div>
          <div style={{ marginLeft: "1%" }}>
            <button
              className="btn btn-success"
              onClick={handlePrint}
              style={{ width: "60px" }}
            >
              <LocalPrintshopIcon />
            </button>

            <OrderPrint
              orden={orden}
              companys={companys}
              image="/logo.png"
              portaSimChecked={true}
              simChecked={false}
              tpuChecked={true}
              sdChecked={false}
            />
          </div>
          <div style={{ marginLeft: "1%" }}>
            <button className="btn btn-secondary" onClick={handlePrintTicket}>
              <BookOnlineIcon />
            </button>
          </div>
          <div style={{ marginLeft: "1%" }}>
            <Link
              href={`/${orden._id}/editOrden?name=${orden.name}&lastname=${orden.lastname}&number=${orden.number}`}
            >
              <button
                className="btn btn bg-warning float-end"
                style={{ color: "white" }}
              >
                <ModeEditOutlineIcon />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* order */}

      <div className="boxorderbody">
        <div style={{ width: "50% " }}>
          <div>
            <h5>
              <SettingsCellIcon /> Tipo:
            </h5>
            <p
              style={{
                marginLeft: "6%",
                backgroundColor: "white",
                width: "25%",
                padding: "2%",
                textAlign: "center",
                borderRadius: "30px",
              }}
              class="fw-semibold"
            >
              {orden.type}
            </p>
          </div>
          <div>
            <h5>
              <SettingsCellIcon /> Marca:
            </h5>
            <p
              style={{
                marginLeft: "6%",
                backgroundColor: "white",
                width: "25%",
                padding: "2%",
                textAlign: "center",
                borderRadius: "30px",
              }}
              class="fw-semibold"
            >
              {orden.marca}
            </p>
          </div>
          <div>
            <h5>
              <SettingsCellIcon /> Modelo:
            </h5>
            <p
              style={{
                marginLeft: "6%",
                backgroundColor: "white",
                width: "25%",
                padding: "2%",
                textAlign: "center",
                borderRadius: "30px",
              }}
              class="fw-semibold"
            >
              {orden.model}
            </p>
          </div>
          <div>
            <h5>
              <PinIcon /> Numero de serie:
            </h5>
            <p
              style={{
                marginLeft: "6%",
                backgroundColor: "white",
                width: "25%",
                padding: "2%",
                textAlign: "center",
                borderRadius: "30px",
              }}
              class="fw-semibold"
            >
              {orden.serialNumber}
            </p>
          </div>
          <div>
            <h5>
              <VpnKeyIcon /> Contraseña:
            </h5>
            <p
              style={{
                marginLeft: "6%",
                backgroundColor: "white",
                width: "25%",
                padding: "2%",
                textAlign: "center",
                borderRadius: "30px",
              }}
              class="fw-semibold"
            >
              {orden.password}
            </p>
          </div>
          <div>
            <h5>
              <WarningAmberIcon style={{ color: "#b7b718" }} /> Falla o
              Requerimiento:
            </h5>
            <p
              style={{
                marginLeft: "6%",
                backgroundColor: "white",
                width: "90%",
                padding: "2%",
                textAlign: "center",
                borderRadius: "30px",
              }}
              class="fw-semibold"
            >
              {orden.issue}
            </p>
          </div>
        </div>
        <div style={{ width: "50% " }}>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "5%" }}>
              <h5>
                Fecha: <GetAppIcon />
              </h5>
              <p
                style={{
                  marginLeft: "6%",
                  backgroundColor: "white",
                  width: "200px",
                  padding: "3%",
                  textAlign: "center",
                  borderRadius: "30px",
                }}
                class="fw-semibold"
              >
                {formattedDateTime}
              </p>
            </div>
            <div>
              <h5>
                Fecha: <LogoutIcon />
              </h5>
              <p
                style={{
                  marginLeft: "6%",
                  backgroundColor: "white",
                  width: "200px",
                  padding: "3%",
                  textAlign: "center",
                  borderRadius: "30px",
                }}
                class="fw-semibold"
              >
                {" "}
                {exitAt
                  ? exitAt instanceof Date && !isNaN(exitAt)
                    ? formattedDateTimeExit
                    : ""
                  : ""}
              </p>
            </div>
          </div>
          <div>
            <h5>Estado:</h5>
            <div style={{ display: "flex" }}>
              <div style={{ width: "30%" }}>
                <p
                  style={{
                    marginLeft: "6%",
                    backgroundColor: "white",
                    padding: "2%",
                    textAlign: "center",
                    borderRadius: "30px",
                  }}
                  class="fw-semibold"
                  className={`estado ${orden.estado}`}
                >
                  {orden.estado}
                </p>
              </div>
              <div style={{ marginLeft: "10px" }}>
                <button
                  type="button"
                  class="btn btn-success"
                  onClick={openWhatsappSendOrderModal}
                  style={{ height: "30px" }}
                >
                  <SendToMobileIcon
                    style={{
                      color: "white",
                      height: "25px",
                      marginTop: "-12px",
                    }}
                  />
                  <WhatsAppIcon
                    style={{
                      color: "white",
                      height: "27px",
                      marginTop: "-12px",
                    }}
                  />
                </button>
                <button
                  type="button"
                  class="btn btn-light"
                  onClick={handleOpenOutlook}
                  style={{ marginLeft: "10px", border: "1px solid" }}
                >
                  <ForwardToInboxIcon
                    style={{
                      color: "#dc3545",
                      height: "27px",
                      paddingTop: "5px",
                      marginTop: "-12px",
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
          <div></div>
          <div></div>
          <div>
            <h5>
              <ManageAccountsIcon /> Comentario:
            </h5>
            <p
              style={{
                marginLeft: "6%",
                backgroundColor: "white",
                width: "90%",
                padding: "7%",
                textAlign: "center",
                borderRadius: "30px",
              }}
              class="fw-semibold"
            >
              {orden.comentOrden}
            </p>
          </div>
          <div>
            <h5>
              <MonetizationOnIcon style={{ color: "#dc3545" }} /> Acepta cargos
            </h5>
            <p
              style={{
                marginLeft: "6%",
                backgroundColor: "white",
                width: "25%",
                padding: "2%",
                textAlign: "center",
                borderRadius: "30px",
              }}
              class="fw-semibold"
            >
              ${orden.price}
            </p>
          </div>
          <div>
            <h5>
              <MonetizationOnIcon style={{ color: "#dc3545" }} /> Precio:
            </h5>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  fontSize: "18px",
                  marginLeft: "6%",
                  backgroundColor: "white",
                  width: "20%",
                  padding: "1%",
                  textAlign: "center",
                  borderRadius: "30px",
                  backgroundColor: orden.otherPrice === 0 ? "gray" : "white",
                  paddingTop: "6px",
                  height: "40px",
                }}
                class="fw-semibold"
              >
                ${orden.otherPrice}
              </div>

              <div style={{ padding: "1%" }}>
                {orden.otherPrice === 0 && (
                  <CheckCircleOutlineIcon style={{ color: "green" }} />
                )}
              </div>
              <div></div>
            </div>
          </div>
          <div>
            <h5>
              <SupportAgentIcon /> Comentario interno:
            </h5>
            <p
              style={{
                marginLeft: "6%",
                backgroundColor: "white",
                width: "90%",
                padding: "2%",
                textAlign: "center",
                borderRadius: "30px",
              }}
              class="fw-semibold"
            >
              {orden.comentInt}
            </p>
          </div>
        </div>
      </div>

      <WhatsappSendOrderModal
        isOpen={WhatsappSendOrderModalIsOpen}
        closeModal={closeWhatsappSendOrderModal}
        orden={orden}
        companys={companys}
      />
      <WhatsappInfoModal
        isOpen={WhatsappInfoModalIsOpen}
        closeModal={closeWhatsappInfoModal}
        orden={orden}
        companys={companys}
      />
      <EmailInfoModal
        isOpen={EmailInfoModalIsOpen}
        closeModal={closeEmailInfoModal}
        orden={orden}
        companys={companys}
      />

      <OrderSaleModal
        isOpen={orderSalelIsOpen}
        closeModal={closeOrderSale}
        orden={orden}
        companys={companys}
      />
      <OrderPrintTicket orden={orden} companys={companys} image="/logo.png" />
    </div>
  );
};
export async function getServerSideProps({ params }) {
  await dbConnect();
  const result = await Company.find({});
  const companys = result.map((doc) => {
    const company = doc.toObject();
    company._id = company._id.toString();
    return company;
  });

  const orden = await Orden.findById(params.id).lean();
  orden._id = orden._id.toString();
  orden.createdAt = orden.createdAt.toISOString();
  if (orden.exitAt) {
    orden.exitAt = new Date(orden.exitAt).toISOString();
  }

  return { props: { orden, companys } };
}

export default OrdenPage;
