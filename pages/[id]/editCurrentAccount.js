import React, { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import dbConnect from "../../lib/dbConnect";
import Link from "next/link";
import CurrentAccount from "../../models/CurrentAccount";

import Swal from "sweetalert2";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const EditCurrentAccount = ({ currentAccount }) => {
  const router = useRouter();
  const [currentAccountsForm, setCurrentAccountsForm] = useState({
    name: currentAccount.name,
    lastname: currentAccount.lastname,
    product: currentAccount.product,
    estado: currentAccount.estado,
    price: currentAccount.price,
    observation: currentAccount.observation,
  });

  const handleOrdenChange = (e) => {
    const { name, value } = e.target;
    setCurrentAccountsForm({ ...currentAccountsForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/currentAccount/${currentAccount._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentAccountsForm),
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

  const handleDelete = async () => {
    try {
      await fetch(`/api/currentAccount/${currentAccount._id}`, {
        method: "Delete",
      });

      Swal.fire({
        title: "¿Estás seguro que deseas eliminar la cuenta corriente ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        cancelButtonColor: "gray",
        confirmButtonText: "Sí",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/currentAccount");
          Swal.fire("Eliminado", "Se eliminó.", "Exitoso");
        }
      });
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  return (
    <div>
      <div>
        <h1>
          Editar Cuenta corriente: <ModeEditOutlineIcon />{" "}
        </h1>
      </div>
      <div style={{ display: "Flex" }}>
        <div style={{ width: "4%" }}>
          <button
            className="btn btn-secondary float-start"
            style={{ marginRight: "5%", marginTop: "1px" }}
          >
            <Link
              href="/currentAccount"
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
            marginLeft: "6%",
            width: "90%",
            border: "1px solid",
            padding: "10px",
            backgroundColor: "#f5f5f5",
            borderColor: "#f5f5f5",
            borderRadius: "30px  30px 0px 0px",
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
          <div style={{ marginLeft: "1%" }}>
            <button
              type="submit"
              onClick={handleDelete}
              className="btn btn-danger"
            >
              <DeleteForeverIcon />
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          border: "1px solid",
          paddingBottom: "25px",
          paddingTop: "25px",
          paddingLeft: "15px",
          paddingRight: "15px",
          borderRadius: "30px",
          borderBlockColor: "#adb5bd",
          backgroundColor: "#e9ecef",
          width: "40%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            marginLeft: "2%",
            width: "100%",
            padding: "2%",
            textAlign: "center",
            borderRadius: "30px",
          }}
          className="fw-semibold"
        >
          <div
            style={{
              marginBottom: "8px",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            <AccountCircleIcon /> Nombre:
          </div>
          <input
            type="text"
            maxLength="30"
            name="name"
            value={currentAccountsForm.name}
            onChange={handleOrdenChange}
            style={{ textAlign: "center" }}
          />
        </div>
        <div
          style={{
            marginLeft: "2%",
            width: "100%",
            padding: "2%",
            textAlign: "center",
            borderRadius: "30px",
          }}
          className="fw-semibold"
        >
          <div
            style={{
              marginBottom: "8px",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            <AccountCircleIcon /> Apellido:
          </div>
          <input
            type="text"
            maxLength="30"
            name="lastname"
            value={currentAccountsForm.lastname}
            onChange={handleOrdenChange}
            style={{ textAlign: "center" }}
          />
        </div>
        <div
          style={{
            marginLeft: "2%",
            width: "100%",
            padding: "2%",
            textAlign: "center",
            borderRadius: "30px",
          }}
          className="fw-semibold"
        >
          <div
            style={{
              marginBottom: "8px",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            <ShoppingCartIcon /> Producto:
          </div>
          <input
            type="text"
            maxLength="30"
            name="product"
            value={currentAccountsForm.product}
            onChange={handleOrdenChange}
            style={{ textAlign: "center" }}
          />
        </div>
        <div
          style={{
            marginLeft: "2%",
            width: "100%",
            padding: "2%",
            textAlign: "center",
            borderRadius: "30px",
          }}
          className="fw-semibold"
        >
          <div
            style={{
              marginBottom: "8px",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            <MonetizationOnIcon /> Precio:
          </div>
          <input
            type="text"
            maxLength="30"
            name="price"
            value={currentAccountsForm.price}
            onChange={handleOrdenChange}
            style={{ textAlign: "center" }}
          />
        </div>
        <div
          style={{
            marginLeft: "2%",
            padding: "2%",
            textAlign: "center",
            width: "100%",
          }}
          className="fw-semibold"
        >
          <div
            style={{
              marginBottom: "8px",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            <AutorenewIcon /> Estado:
          </div>
          <select
            className="form-select"
            aria-label="Default"
            style={{ borderRadius: "60px", width: "100%" }}
            name="estado"
            value={currentAccountsForm.estado}
            onChange={handleOrdenChange}
          >
            {["Pendiente", "Pagado"].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{
            marginLeft: "2%",
            width: "100%",
            padding: "2%",
            textAlign: "center",
            borderRadius: "30px",
          }}
          className="fw-semibold"
        >
          <div
            style={{
              marginBottom: "8px",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            <MonetizationOnIcon /> Observaciones:
          </div>
          <input
            type="text"
          
            name="observation"
            value={currentAccountsForm.observation}
            onChange={handleOrdenChange}
            style={{ textAlign: "center" }}
          />
        </div>
      </div>
      <div
        style={{
          marginLeft: "2%",
          backgroundColor: "white",
          width: "45%",
          padding: "2%",
          textAlign: "center",
          borderRadius: "30px",
        }}
        className="fw-semibold"
      ></div>
      <div
        style={{
          marginLeft: "2%",
          backgroundColor: "white",
          width: "45%",
          padding: "2%",
          textAlign: "center",
          borderRadius: "30px",
        }}
        className="fw-semibold"
      ></div>
    </div>
  );
};

export async function getServerSideProps(context) {
  await dbConnect();

  const { params } = context;
  const currentAccountId = params.id; // Get the ID from the context

  const currentAccount = await CurrentAccount.findById(currentAccountId).lean();
  if (!currentAccount) {
    return {
      notFound: true,
    };
  }

  // You should not modify the original object returned by Mongoose, so create a new object with the modifications
  const modifiedCurrentAccount = {
    ...currentAccount,
    _id: currentAccount._id.toString(),
    createdAt: currentAccount.createdAt.toISOString(),
  };

  return { props: { currentAccount: modifiedCurrentAccount } };
}

export default EditCurrentAccount;
