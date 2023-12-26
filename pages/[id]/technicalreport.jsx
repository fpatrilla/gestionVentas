import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import Technicalreport from "../../models/Technicalreport";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TechnicalreportPrint from "../../components/Print/TechnicalreportPrint";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import Image from "next/image";

import Swal from "sweetalert2";
import InventoryIcon from "@mui/icons-material/Inventory";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Company from "../../models/Company";
import AccountTicket from "../../components/Print/AccountTicket";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

const technicalreport = ({ technicalreport, companys }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const handleDelete = async () => {
    const technicalreportID = router.query.id;

    try {
      await fetch(`/api/technicalreport/${technicalreportID}`, {
        method: "Delete",
      });

      Swal.fire({
        title: "Estas seguro que desea eliminarlo?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si!",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/technicalreport");
          Swal.fire("Eliminado!", "Se ah eliminado.", "Exitoso");
        }
      });
    } catch (error) {
      setMessage("Failed to delete the client.");
    }
  };

  const currentDate = new Date();

  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Los meses comienzan en 0
  const year = currentDate.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");

    if (printWindow) {
      const printContent = document.getElementById(
        "print-TechnicalreportPrint"
      ).innerHTML;
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

  return (
    <div>
      <h1>
        Informe
        <NoteAltIcon
          className="iconhead "
          style={{
            color: "black",
          }}
        />
      </h1>
      <hr />
      <div style={{ display: "Flex" }}>
        <div style={{ width: "4%" }}>
          <button className="btn btn-secondary float-start">
            <Link
              href="/technicalreport"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ArrowBackIcon />
            </Link>
          </button>
        </div>
        <div className="boxotechnicalreporthead">
          <div style={{ marginLeft: "auto" }}>
            <Link
              href="/[id]/edittechnicalreport"
              as={`/${technicalreport._id}/edittechnicalreport`}
              legacyBehavior
            >
              <button
                className="btn btn-warning"
                style={{ margin: "3px", color: "white" }}
              >
                <ModeEditOutlineIcon />
              </button>
            </Link>

            <button
              className="btn btn-success"
              onClick={handlePrint}
              style={{ width: "60px" }}
            >
              <LocalPrintshopIcon />
            </button>

            {/* <button type="submit" className="btn bg-secondary"  onClick={handlePrintTicket}  style={{  color:"white" }}>
                          <BookOnlineIcon/>
                            </button> */}
            <button
              className="btn bg-danger"
              onClick={handleDelete}
              style={{ marginLeft: "2px", color: "white" }}
            >
              <DeleteForeverIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="boxotechnicalreportbody">
        <div style={{ display: "flex", marginTop: "25px" }}>
          <div style={{ marginRight: "10%" }}>
            <h5>
              <AccountCircleIcon /> Nombre:{" "}
              <span style={{}}>{technicalreport.name}</span>
            </h5>
          </div>
          <div style={{ marginRight: "10%" }}>
            <h5>
              <AccountCircleIcon /> Apellido:{" "}
              <span style={{}}>{technicalreport.lastname}</span>
            </h5>
          </div>
          <div>
            <h5>
              <AccountCircleIcon /> Fecha:{" "}
              <span style={{}}>{formattedDate}</span>
            </h5>
          </div>
        </div>
        <div
          style={{
            width: "80%",
            border: "1px solid",
            borderRadius: "30px",
            padding: "15px",
            marginTop: "15px",
            marginBottom: "20px",
          }}
        >
          {technicalreport.report}
        </div>
        <div
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          Precio: ${technicalreport.price}
        </div>
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <div></div>

        <div style={{ marginLeft: "auto", marginRight: "8%" }}></div>
      </div>

      <div>
        <div>
          <TechnicalreportPrint
            image="/logo.png"
            companys={companys}
            technicalreport={technicalreport}
            firma="/firma.png"
          />
        </div>
      </div>

      {message && <p>{message}</p>}
    </div>
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

  const technicalreport = await Technicalreport.findById(params.id).lean();
  technicalreport._id = technicalreport._id.toString();
  technicalreport.createdAt = technicalreport.createdAt.toISOString();

  return { props: { technicalreport, companys } };
}

export default technicalreport;
