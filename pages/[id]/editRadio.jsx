import React, { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import dbConnect from "../../lib/dbConnect";
import Link from "next/link";
import Radio from "../../models/Radio";

import Swal from "sweetalert2";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";

import RadioIcon from '@mui/icons-material/Radio';


const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const editRadio = ({ radio }) => {
  const router = useRouter();
  const [radiosForm, setRadiosForm] = useState({
    name: radio.name,
    frecuencias: radio.frecuencias,
    
  });

  const handleOrdenChange = (e) => {
    const { name, value } = e.target;
    setRadiosForm({ ...radiosForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/radio/${radio._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(radiosForm),
      });

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
          Editar Frecuencia:{" "}
          <RadioIcon
            style={{
              textDecoration: "none",
              color: "#198754ad",
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
              href="/radio"
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
          padding: "10px",
          backgroundColor: "#f5f5f5",
          borderColor: "#f5f5f5",
          borderRadius: "0px  0px 30px 30px",
          paddingLeft: "12%",
        }}
      >
        <div style={{ }}>
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
            <div style={{ marginLeft: "19px" }}>
              <input
                type="text"
                name="name"
                value={radiosForm.name}
                onChange={handleOrdenChange}
                style={{ textAlign: "center" }}
              />
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
              <RadioIcon /> Frecuencias:
            </div>
            <div style={{ marginLeft: "36px" }}>
              <textarea
                type="text"
                name="frecuencias"
                value={radiosForm.frecuencias}
                onChange={handleOrdenChange}
                style={{ textAlign: "center", height:"150px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  await dbConnect();

  const { params } = context;
  const radioId = params.id; // Get the ID from the context

  const radio = await Radio.findById(radioId).lean();
  if (!radioId) {
    return {
      notFound: true,
    };
  }

  // You should not modify the original object returned by Mongoose, so create a new object with the modifications
  const modifiedRadio = {
    ...radio,
    _id: radio._id.toString(),
    createdAt: radio.createdAt.toISOString(),
  };

  return { props: { radio: modifiedRadio} };
}

export default editRadio;
