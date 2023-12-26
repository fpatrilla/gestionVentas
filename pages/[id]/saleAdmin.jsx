import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import { format } from "date-fns";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Swal from "sweetalert2";
import CardActions from "@material-ui/core/CardActions";
import SalePrint from "../../components/Print/SalePrint";
import SaleTicket from "../../components/Print/SaleTicket";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import Company from "../../models/Company";

import Sales from "../../models/Sales";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const saleAdmin = ({ sales, companys }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    const clientID = router.query.id;

    try {
      await fetch(`/api/sales/${clientID}`, {
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
        router.push("/saleHistory");
        await Swal.fire({
          title: "¡Eliminado!",
          text: "La venta  se elimino.",
          icon: "success",
        });
      }
    } catch (error) {
      setMessage("Failed to delete the sale.");
    }
  };
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");

    if (printWindow) {
      const printContent = document.getElementById("print-NewSale").innerHTML;
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
        document.getElementById("ticket-sale").innerHTML;
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
        Venta :
        <AttachMoneyIcon
          style={{
            textDecoration: "none",
            color: "#dc3545",
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
              href="/saleHistory"
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
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            style={{ marginRight: "2px" }}
          >
            <DeleteForeverIcon />
          </Button>
        </div>
      </div>
      <hr></hr>
      <div className="voucher">
        <div>
          <h5>Nombre: {sales.name}</h5>
        </div>
        <div>
          <h5>Apellido: {sales.lastname} </h5>
        </div>
        <div>
          <h5>
            Fecha : {format(new Date(sales.createdAt), "dd/MM/yyyy HH:mm:ss")}
          </h5>
        </div>
        <div>
          <h5>Producto: {sales.product} </h5>
        </div>
        <div>
          <h5>Precio: ${sales.price}</h5>
        </div>
      </div>

      <div></div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {message && <p>{message}</p>}
      </div>
      <div>
        <SalePrint image="/logo.png" companys={companys} sales={sales} />
        <SaleTicket image="/logo.png" companys={companys} sales={sales} />
      </div>
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

  const result = await Sales.findById(params.id).lean();
  result._id = result._id.toString();

  // Formatear createdAt a una cadena en formato ISO
  result.createdAt = result.createdAt.toISOString();

  return { props: { sales: result, companys } };
}

export default saleAdmin;
