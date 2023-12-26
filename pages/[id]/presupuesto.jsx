import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import { format } from "date-fns";
import Company from "../../models/Company";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Swal from "sweetalert2";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import BookOnlineIcon from "@mui/icons-material/BookOnline";
import PresupuestosTicket from "../../components/Print/PresupuestosTicket";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import Presupuesto from "../../models/Presupuesto";

const presupuesto = ({ presupuestos, companys }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    const clientID = router.query.id;

    try {
      await fetch(`/api/presupuesto/${clientID}`, {
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
        router.push("/presupuestos");
        await Swal.fire({
          title: "¡Eliminado!",
          text: "El presupuesto  se elimino.",
          icon: "success",
        });
      }
    } catch (error) {
      setMessage("Failed to delete the sale.");
    }
  };

  const handlePrintTicket = () => {
    const printTicket = window.open("", "_blank");

    if (printTicket) {
      const ticketContentSale = document.getElementById(
        "ticket-presupuestos"
      ).innerHTML;
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
        Presupuesto :
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
      <hr />
      <div style={{ display: "flex", width: "100%" }}>
        <div>
          <button className="btn btn-secondary float-start">
            <Link
              href="/presupuestos"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ArrowBackIcon />
            </Link>
          </button>
        </div>

        <div style={{ marginLeft: "auto", marginRight: "8%" }}>
          <button
            type="submit"
            className="btn bg-secondary"
            onClick={handlePrintTicket}
            style={{ color: "white" }}
          >
            <BookOnlineIcon />
          </button>

          <button
            className="btn btn-danger"
            onClick={handleDelete}
            style={{ marginLeft: "8px" }}
          >
            <DeleteForeverIcon />
          </button>
        </div>
      </div>
      <hr></hr>
      <div className="voucher">
        <div>
          <h5>Nombre: {presupuestos.name}</h5>
        </div>
        <div>
          <h5>Apellido: {presupuestos.lastname} </h5>
        </div>
        <div>
          <h5>
            Fecha :{" "}
            {format(new Date(presupuestos.createdAt), "dd/MM/yyyy HH:mm:ss")}
          </h5>
        </div>
        <div>
          <h5>Producto: {presupuestos.product} </h5>
        </div>
        <div>
          <h5>Precio Efectivo: ${presupuestos.price}</h5>
        </div>
        <div>
          <h5>Precio Tarjeta: ${presupuestos.priceTarjet}</h5>
        </div>
        <div>
          <h5>Observacion: {presupuestos.observation}</h5>
        </div>
      </div>
      <div>
        <div>
          <PresupuestosTicket
            image="/logo.png"
            companys={companys}
            presupuestos={presupuestos}
          />
        </div>
      </div>

      {message && <p>{message}</p>}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          borderTop: "1px solid",
          paddingTop: "15px",
        }}
      ></div>
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

  const result = await Presupuesto.findById(params.id).lean();
  result._id = result._id.toString();

  // Formatear createdAt a una cadena en formato ISO
  result.createdAt = result.createdAt.toISOString();

  return { props: { presupuestos: result, companys } };
}

export default presupuesto;
