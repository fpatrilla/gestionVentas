import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import Account from "../../models/Account";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import InventoryIcon from "@mui/icons-material/Inventory";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Company from "../../models/Company";
import AccountTicket from "../../components/Print/AccountTicket";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

/* Allows you to view client card info and delete client card*/
const account = ({ account, companys }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const handleDelete = async () => {
    const accountID = router.query.id;

    try {
      await fetch(`/api/account/${accountID}`, {
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
          router.push("/account");
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

  const handlePrintTicket = () => {
    const printTicket = window.open("", "_blank");

    if (printTicket) {
      const ticketContentSale =
        document.getElementById("ticket-Account").innerHTML;
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
    <div>
      <h1>
        Cuenta :
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
      <hr />
      <div style={{ display: "Flex" }}>
        <div style={{ width: "4%" }}>
          <button className="btn btn-secondary float-start">
            <Link
              href="/account"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ArrowBackIcon />
            </Link>
          </button>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "11px",
            marginLeft: "2%",
            width: "90%",
            border: "1px solid",
            padding: "10px",
            backgroundColor: "#f5f5f5",
            borderColor: "#6c757d",
            borderRadius: "30px  30px 0px 0px ",
          }}
        >
          <div style={{ marginLeft: "auto" }}>
            <Link
              href="/[id]/editAccount"
              as={`/${account._id}/editAccount`}
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
              type="submit"
              className="btn bg-secondary"
              onClick={handlePrintTicket}
              style={{ color: "white" }}
            >
              <BookOnlineIcon />
            </button>
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
      <div
        style={{
          marginTop: "11px",
          marginLeft: "6%",
          width: "90%",
          border: "1px solid",
          padding: "10px",
          backgroundColor: "#f5f5f5",
          borderColor: "#969ea5",
          borderRadius: "0px  0px 30px 30px",
          paddingLeft: "12%",
        }}
      >
        <div style={{ display: "flex", marginTop: "25px" }}>
          <div style={{ width: "45%" }}>
            <h5>
              <AccountCircleIcon /> Nombre:{" "}
              <span
                style={{
                  padding: "12px",
                  paddingLeft: "18px",
                  paddingRight: "18px",
                }}
              >
                {account.name}
              </span>
            </h5>
          </div>
          <div>
            <h5>
              <AccountCircleIcon /> Apellido:{" "}
              <span
                style={{
                  padding: "12px",
                  paddingLeft: "18px",
                  paddingRight: "18px",
                }}
              >
                {account.lastname}
              </span>
            </h5>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: "25px" }}>
          <div style={{ width: "45%" }}>
            <h5>
              <AccountCircleIcon /> Gmail:{" "}
              <span
                style={{
                  padding: "12px",
                  paddingLeft: "18px",
                  paddingRight: "18px",
                }}
              >
                {" "}
                {account.gmail}
              </span>
            </h5>
          </div>
          <div>
            <h5>
              <AccountCircleIcon /> Contraseña:{" "}
              <span
                style={{
                  padding: "12px",
                  paddingLeft: "18px",
                  paddingRight: "18px",
                }}
              >
                {" "}
                {account.gmailpass}
              </span>
            </h5>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: "25px" }}>
          <div style={{ width: "45%" }}>
            <h5>
              <AccountCircleIcon /> Facebook:{" "}
              <span
                style={{
                  padding: "12px",
                  paddingLeft: "18px",
                  paddingRight: "18px",
                }}
              >
                {account.facebook}
              </span>
            </h5>
          </div>
          <div>
            <h5>
              <AccountCircleIcon /> Contraseña:{" "}
              <span
                style={{
                  padding: "12px",
                  paddingLeft: "18px",
                  paddingRight: "18px",
                }}
              >
                {" "}
                {account.facebookpass}
              </span>
            </h5>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: "25px" }}>
          <div style={{ width: "45%" }}>
            <h5>
              <AccountCircleIcon /> Icloud:
              <span
                style={{
                  padding: "12px",
                  paddingLeft: "18px",
                  paddingRight: "18px",
                }}
              >
                {" "}
                {account.icloud}
              </span>
            </h5>
          </div>
          <div>
            <h5>
              <AccountCircleIcon /> Contraseña:
              <span
                style={{
                  padding: "12px",
                  paddingLeft: "18px",
                  paddingRight: "18px",
                }}
              >
                {account.icloudpass}
              </span>{" "}
            </h5>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <div></div>

        <div style={{ marginLeft: "auto", marginRight: "8%" }}></div>
      </div>

      <div>
        <div>
          <AccountTicket
            image="/logo.png"
            companys={companys}
            account={account}
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

  const account = await Account.findById(params.id).lean();
  account._id = account._id.toString();
  account.createdAt = account.createdAt.toISOString();

  return { props: { account, companys } };
}

export default account;
