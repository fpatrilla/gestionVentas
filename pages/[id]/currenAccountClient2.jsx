import React, { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import dbConnect from "../../lib/dbConnect";
import Link from "next/link";
import CurrentAccountClient2 from "../../models/CurrentAccountClient2";

import Swal from "sweetalert2";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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

const currentAccountClient2 = ({ currenAccountClient2 }) => {
  // Rename the function

  const formattedDate = new Date(
    currenAccountClient2.createdAt
  ).toLocaleDateString();
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    const clientID = router.query.id;

    try {
      await fetch(`/api/currentAccount/client2/${clientID}`, {
        method: "DELETE",
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
          router.push("/currenAccountClient2");
          Swal.fire(
            "Eliminado!",
            "El Cuenta corriente se ha eliminado.",
            "Exitoso"
          );
        }
      });
    } catch (error) {
      setMessage("Failed to delete.");
    }
  };

  return (
    <div>
      <h1>
        Cuenta corriente: <ModeEditOutlineIcon />
      </h1>
      <hr></hr>
      <div style={{ width: "100%" }}>
        <button className="btn btn-secondary">
          <Link
            href="/currenAccountClient2"
            style={{ textDecoration: "none", color: "white" }}
          >
            <ArrowBackIcon />
          </Link>
        </button>
      </div>
      <div>
        <div>
          <div style={{ display: "flex" }}>
            <hr></hr>
            <div
              style={{
                marginLeft: "30%",
                marginTop: "20px",
                width: "40%",
                border: "1px solid",
                textAlign: "center",
                padding: "3%",
                borderColor: "gray",
                borderRadius: "3%",
              }}
            >
              <div>
                <h5>Nombre: {currenAccountClient2.name}</h5>
              </div>
              <div>
                <h5>Apellido: {currenAccountClient2.lastname} </h5>
              </div>
              <div>
                <h5>Fecha : {formattedDate}</h5>
              </div>
              <div>
                <h5>Producto: {currenAccountClient2.product} </h5>
              </div>
              <div>
                <h5>Precio: ${currenAccountClient2.price}</h5>
              </div>
              <div>
                <h5>Ovservacion: {currenAccountClient2.observation}</h5>
              </div>

              <div>
                <button
                  size="small"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  {" "}
                  <DeleteForeverIcon />{" "}
                </button>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  const currenAccountClient2 = await CurrentAccountClient2.findById(
    params.id
  ).lean();
  currenAccountClient2._id = currenAccountClient2._id.toString();

  currenAccountClient2.createdAt = currenAccountClient2.createdAt.toISOString();

  return { props: { currenAccountClient2 } };
}

export default currentAccountClient2;
