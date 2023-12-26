import React, { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import dbConnect from "../../lib/dbConnect";
import Link from "next/link";
import Technicalreport from "../../models/Technicalreport";

import Swal from "sweetalert2";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import InventoryIcon from "@mui/icons-material/Inventory";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const edittechnicalreport = ({ technicalreport }) => {
  const router = useRouter();
  const [technicalreportsForm, setTechnicalreportsForm] = useState({
    name: technicalreport.name,
    lastname: technicalreport.lastname,
    report: technicalreport.report,
    price: technicalreport.price,
  });

  const handleOrdenChange = (e) => {
    const { name, value } = e.target;
    setTechnicalreportsForm({ ...technicalreportsForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/technicalreport/${technicalreport._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(technicalreportsForm),
        }
      );

      if (response.ok) {
        // Handle successful update
        // You can redirect or show a success message
        router.back();
      } else {
        // Handle error
        // You can show an error message
      }
    } catch (error) {
      console.error("Error updating the order:", error);
    }
  };

  return (
    <div>
      <div>
        <h1>
          Editar Informe:{" "}
          <NoteAltIcon
            style={{
              textDecoration: "none",
              color: "black",
              height: "60px",
              width: "60px",
              marginLeft: "10px",
            }}
          />{" "}
        </h1>
      </div>
      <div style={{ display: "Flex" }}>
        <div style={{ width: "4%" }}>
          <button
            className="btn btn-secondary float-start"
            style={{ marginRight: "5%", marginTop: "1px" }}
          >
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
            borderColor: "#f5f5f5",
            borderRadius: "30px  30px 0px 0px ",
          }}
        >
          <div style={{ marginLeft: "auto" }}>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-success"
              style={{ width: "100px" }}
            >
              <SaveIcon />
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
          padding: "3px",
          backgroundColor: "#f5f5f5",
          borderColor: "#969ea5",
          borderRadius: "0px  0px 30px 30px",
          paddingLeft: "12%",
        }}
      >
        <div style={{ display: "flex", marginTop: "25px" }}>
          <div style={{ marginRight: "10%" }}>
            <h5>
              <AccountCircleIcon /> Nombre:{" "}
              <span style={{}}>
                <div style={{ marginLeft: "19px" }}>
                  <input
                    type="text"
                    name="name"
                    value={technicalreportsForm.name}
                    onChange={handleOrdenChange}
                    style={{ textAlign: "center" }}
                  />
                </div>
              </span>
            </h5>
          </div>
          <div style={{ marginRight: "10%" }}>
            <h5>
              <AccountCircleIcon /> Apellido:{" "}
              <span style={{}}>
                <input
                  type="text"
                  name="lastname"
                  value={technicalreportsForm.lastname}
                  onChange={handleOrdenChange}
                  style={{ textAlign: "center" }}
                />
              </span>
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
          <textarea
            type="text"
            name="report"
            value={technicalreportsForm.report}
            onChange={handleOrdenChange}
            style={{ textAlign: "center", height: "140px" }}
          />
        </div>
        <div
          style={{
            width: "80%",
            textAlign: "center",
            fontSize: "28px",
            fontWeight: "bold",
            display: "flex",
            marginLeft: "40%",
          }}
        >
          <div>Precio: $</div>
          <div style={{ width: "20%", marginLeft: "10px" }}>
            <input
              type="text"
              name="price"
              value={technicalreportsForm.price}
              onChange={handleOrdenChange}
              style={{ textAlign: "center" }}
            />
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
          borderColor: "#f5f5f5",
          borderRadius: "0px  0px 30px 30px",
          paddingLeft: "12%",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", padding: "10px" }}>
            <div
              style={{
                marginBottom: "8px",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              <AccountCircleIcon /> Nombre:
            </div>
          </div>
          <div style={{ display: "flex", padding: "10px" }}>
            <div
              style={{
                marginBottom: "8px",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              <AccountCircleIcon /> Apellido:
            </div>
            <div style={{ marginLeft: "36px" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  await dbConnect();

  const { params } = context;
  const technicalreportId = params.id; // Get the ID from the context

  const technicalreport = await Technicalreport.findById(
    technicalreportId
  ).lean();
  if (!technicalreportId) {
    return {
      notFound: true,
    };
  }

  // You should not modify the original object returned by Mongoose, so create a new object with the modifications
  const modifiedTechnicalreport = {
    ...technicalreport,
    _id: technicalreport._id.toString(),
    createdAt: technicalreport.createdAt.toISOString(),
  };

  return { props: { technicalreport: modifiedTechnicalreport } };
}

export default edittechnicalreport;
