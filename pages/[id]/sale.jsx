import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import { format } from "date-fns";
import Company from "../../models/Company";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Swal from "sweetalert2";
import SalePrint from "../../components/Print/SalePrint";
import SaleTicket from "../../components/Print/SaleTicket";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import BookOnlineIcon from "@mui/icons-material/BookOnline";

import Sales from "../../models/Sales";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const SalePage = ({ sales, companys }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");

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
              href="/ventas"
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
      <div>
        <div>
          <SalePrint image="/logo.png" companys={companys} sales={sales} />
          <SaleTicket image="/logo.png" companys={companys} sales={sales} />
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

  const result = await Sales.findById(params.id).lean();
  result._id = result._id.toString();

  // Formatear createdAt a una cadena en formato ISO
  result.createdAt = result.createdAt.toISOString();

  return { props: { sales: result, companys } };
}

export default SalePage;
