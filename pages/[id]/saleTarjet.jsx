import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import { format } from "date-fns";
import Company from "../../models/Company";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TarjetPrint from "../../components/Print/TarjetPrint";
import TarjetTicket from "../../components/Print/TarjetTicket";

import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import Image from "next/image";

import CreditCardIcon from "@mui/icons-material/CreditCard";

import SaleTarjet from "../../models/SaleTarjet";

const saleTarjet = ({ saleTarjets, companys }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");

    if (printWindow) {
      const printContent = document.getElementById("print-Tarjet").innerHTML;
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

  const handlePrintTicket = () => {
    const printTicket = window.open("", "_blank");

    if (printTicket) {
      const ticketContentSale =
        document.getElementById("ticket-tarjet").innerHTML;
      printTicket.document.open();
      printTicket.document.write(`
        ${ticketContentSale}
      `);
      printTicket.document.close();
      printTicket.print();
    } else {
      alert(
        "¡El bloqueo de ventanas emergentes puede estar activado en tu navegador!"
      );
    }
  };

  return (
    <>
      <h1>
        Venta Tarjeta :
        <CreditCardIcon
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
      <div style={{ display: "flex", width: "100%" }}>
        <div>
          <button className="btn btn-secondary float-start">
            <Link
              href="/saleTarjeta"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ArrowBackIcon />
            </Link>
          </button>
        </div>

        <div style={{ marginLeft: "auto", marginRight: "8%" }}>
          <button
            type="submit"
            className="btn bg-success"
            onClick={handlePrint}
            style={{ color: "white", marginRight: "12px" }}
          >
            <LocalPrintshopIcon />
          </button>

          <button
            type="submit"
            className="btn bg-secondary"
            onClick={handlePrintTicket}
            style={{ color: "white" }}
          >
            <BookOnlineIcon />
          </button>
        </div>
      </div>
      <hr></hr>
      <div className="voucher">
        <div>
          <h5>Nombre: {saleTarjets.name}</h5>
        </div>
        <div>
          <h5>Apellido: {saleTarjets.lastname} </h5>
        </div>
        <div>
          <h5>Fecha: {saleTarjets.createdAt}</h5>
        </div>
        <div>
          <h5>Producto: {saleTarjets.product} </h5>
        </div>
        <div>
          <h5>Forma de Pago:{saleTarjets.formaPago}</h5>
        </div>
        <div>
          <h5>cuotas: {saleTarjets.cuote}</h5>
        </div>
        <div>
          <h5>Codigo Autorización: {saleTarjets.codigoAutorizacion}</h5>
        </div>
        <div>
          <h5>Precio: ${saleTarjets.price}</h5>
        </div>
      </div>
      <div>
        <div>
          <TarjetPrint
            image="/logo.png"
            companys={companys}
            saleTarjets={saleTarjets}
          />
          <TarjetTicket
            image="/logo.png"
            companys={companys}
            saleTarjets={saleTarjets}
          />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  const resultCompany = await Company.find({});
  const companys = resultCompany.map((doc) => {
    const company = doc.toObject();
    company._id = company._id.toString();
    return company;
  });

  const result = await SaleTarjet.findById(params.id).lean();
  result._id = result._id.toString();

  // Formatear createdAt a una cadena en formato ISO
  result.createdAt = format(new Date(result.createdAt), "dd-MM-yyyy HH:mm");

  return { props: { saleTarjets: result, companys } };
}

export default saleTarjet;
