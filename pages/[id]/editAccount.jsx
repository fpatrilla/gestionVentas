import React, { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import dbConnect from "../../lib/dbConnect";
import Link from "next/link";
import Account from "../../models/Account";

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

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const editAccount = ({ account }) => {
  const router = useRouter();
  const [accountsForm, setAccountsForm] = useState({
    name: account.name,
    lastname: account.lastname,
    gmail: account.gmail,
    gmailpass: account.gmailpass,
    facebook: account.facebook,
    facebookpass: account.facebookpass,
    icloudpass: account.icloudpass,
    icloud: account.icloud,
  });

  const handleOrdenChange = (e) => {
    const { name, value } = e.target;
    setAccountsForm({ ...accountsForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/account/${account._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accountsForm),
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
          Editar Cuenta:{" "}
          <InventoryIcon
            style={{
              textDecoration: "none",
              color: "#6c757d",
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
            <div style={{ marginLeft: "19px" }}>
              <input
                type="text"
                name="name"
                value={accountsForm.name}
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
              <AccountCircleIcon /> Apellido:
            </div>
            <div style={{ marginLeft: "36px" }}>
              <input
                type="text"
                name="lastname"
                value={accountsForm.lastname}
                onChange={handleOrdenChange}
                style={{ textAlign: "center" }}
              />
            </div>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", padding: "10px" }}>
            <div
              style={{
                marginBottom: "8px",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              <EmailIcon /> Gmail:
            </div>
            <div style={{ marginLeft: "42px" }}>
              <input
                type="text"
                name="gmail"
                value={accountsForm.gmail}
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
              <PasswordIcon /> Contraseña:
            </div>
            <div style={{ marginLeft: "8px" }}>
              <input
                type="text"
                maxLength="30"
                name="gmailpass"
                value={accountsForm.gmailpass}
                onChange={handleOrdenChange}
                style={{ textAlign: "center" }}
              />
            </div>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", padding: "10px" }}>
            <div
              style={{
                marginBottom: "8px",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              <FacebookIcon /> Facebook:
            </div>
            <div style={{ marginLeft: "8px" }}>
              <input
                type="text"
                maxLength="30"
                name="facebook"
                value={accountsForm.facebook}
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
              <PasswordIcon /> Contraseña:
            </div>
            <div style={{ marginLeft: "8px" }}>
              <input
                type="text"
                maxLength="30"
                name="facebookpass"
                value={accountsForm.facebookpass}
                onChange={handleOrdenChange}
                style={{ textAlign: "center" }}
              />
            </div>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", padding: "10px" }}>
            <div
              style={{
                marginBottom: "8px",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              <AppleIcon /> Icloud:
            </div>
            <div style={{ marginLeft: "36px" }}>
              <input
                type="text"
                maxLength="30"
                name="icloud"
                value={accountsForm.iclou}
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
              <PasswordIcon /> Contraseña:
            </div>
            <div style={{ marginLeft: "8px" }}>
              <input
                type="text"
                maxLength="30"
                name="icloudpass"
                value={accountsForm.icloudpass}
                onChange={handleOrdenChange}
                style={{ textAlign: "center" }}
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
  const accountId = params.id; // Get the ID from the context

  const account = await Account.findById(accountId).lean();
  if (!accountId) {
    return {
      notFound: true,
    };
  }

  // You should not modify the original object returned by Mongoose, so create a new object with the modifications
  const modifiedAccount = {
    ...account,
    _id: account._id.toString(),
    createdAt: account.createdAt.toISOString(),
  };

  return { props: { account: modifiedAccount } };
}

export default editAccount;
