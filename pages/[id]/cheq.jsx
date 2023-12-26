import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import { format } from "date-fns";

import Button from "@mui/material/Button";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Swal from "sweetalert2";

import Company from "../../models/Company";
import SalesCheq from "../../models/SaleCheq";

import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import CheqPrint from "../../components/Print/CheqPrint";
import CheqTicket from "../../components/Print/CheqTicket";

import SubtitlesIcon from "@mui/icons-material/Subtitles";

import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const CheqPage = ({ salesCheqs, companys }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    const clientID = router.query.id;

    try {
      await fetch(`/api/sales/cheq/${clientID}`, {
        method: "Delete",
      });

      const result = await Swal.fire({
        title: "¿Estás seguro que deseas eliminarlo?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        router.push("/historyCheq");
        await Swal.fire({
          title: "¡Eliminado!",
          text: "El Cheque se ha eliminado.",
          icon: "success",
        });
      }
    } catch (error) {
      setMessage("Failed to delete the Cheq.");
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");

    if (printWindow) {
      const printContent = document.getElementById("print-Cheq").innerHTML;
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
        document.getElementById("ticket-cheq").innerHTML;
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
        Cheques N* : {salesCheqs.NumCheq}
        <SubtitlesIcon
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
              href="/saleCheq"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ArrowBackIcon />
            </Link>
          </button>
        </div>
        <div style={{ marginLeft: "auto" }}>
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
            style={{ color: "white", marginRight: "12px" }}
          >
            <BookOnlineIcon />
          </button>

          <Link
            href="/[id]/editCheq"
            as={`/${salesCheqs._id}/editCheq`}
            passHref
          >
            <button className="btn btn-warning">
              <ModeEditOutlineIcon style={{ color: "white" }} />
            </button>
            <button
              className="btn btn-danger"
              onClick={handleDelete}
              style={{ marginLeft: "12px" }}
            >
              <DeleteForeverIcon />
            </button>
          </Link>
        </div>
      </div>
      <hr></hr>
      <div className="voucher">
        <div>
          <h5>Titular: {salesCheqs.nombre}</h5>
        </div>
        <div>
          <h5> Dador: {salesCheqs.dador} </h5>
        </div>
        <div>
          <h5>Fecha de Recepción: {salesCheqs.createdAt}</h5>
        </div>
        <div>
          <h5>Banco: {salesCheqs.bank} </h5>
        </div>
        <div>
          <h5>Numero de Cheque: {salesCheqs.NumCheq}</h5>
        </div>
        <div>
          <h5>Fecha de Cobro: {salesCheqs.FechDep}</h5>
        </div>
        <div>
          <h5>Producto: {salesCheqs.product}</h5>
        </div>
        <div>
          <h5>Tenedor: {salesCheqs.tenedor}</h5>
        </div>
        <div>
          <h5>Precio: {salesCheqs.price}</h5>
        </div>
        <div>
          <h5>Estado: {salesCheqs.estado}</h5>
        </div>
        <div>
          <h5>Observación: {salesCheqs.observation}</h5>
        </div>
      </div>
      <div>
        <div>
          <CheqPrint
            image="/logo.png"
            companys={companys}
            salesCheqs={salesCheqs}
          />
          <CheqTicket
            image="/logo.png"
            companys={companys}
            salesCheqs={salesCheqs}
          />
        </div>
      </div>

      {message && <p>{message}</p>}
    </>
  );
};

// Resto del código sin cambios

export async function getServerSideProps({ params }) {
  await dbConnect();
  const resultCompany = await Company.find({});
  const companys = resultCompany.map((doc) => {
    const company = doc.toObject();
    company._id = company._id.toString();
    return company;
  });

  const result = await SalesCheq.findById(params.id).lean();
  result._id = result._id.toString();

  // Formatear createdAt a una cadena en formato ISO
  result.createdAt = format(new Date(result.createdAt), "dd-MM-yyyy HH:mm");

  return { props: { salesCheqs: result, companys } };
}

export default CheqPage;
