import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import Radio from "../../models/Radio";

import Swal from "sweetalert2";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import RadioIcon from "@mui/icons-material/Radio";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

/* Allows you to view client card info and delete client card*/
const radio = ({ radio }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const handleDelete = async () => {
    const radioID = router.query.id;

    try {
      await fetch(`/api/radio/${radioID}`, {
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
          router.push("/radio");
          Swal.fire("Eliminado!", "Se ah eliminado.", "Exitoso");
        }
      });
    } catch (error) {
      setMessage("Failed to delete the radio.");
    }
  };

  const currentDate = new Date();

  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Los meses comienzan en 0
  const year = currentDate.getFullYear();

  return (
    <div>
      <h1>
        Frecuencia :
        <RadioIcon
          style={{
            textDecoration: "none",
            color: "#198754ad",
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
            borderColor: "#6c757d",
            borderRadius: "30px  30px 0px 0px ",
          }}
        >
          <div style={{ margin: "3px" }}>
            <h5>
              <AccountCircleIcon /> Nombre:{" "}
              <span
                style={{
                  padding: "12px",
                  paddingLeft: "18px",
                  paddingRight: "18px",
                }}
              >
                {radio.name}
              </span>
            </h5>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Link
              href="/[id]/editRadio"
              as={`/${radio._id}/editRadio`}
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
        <div style={{ marginTop: "25px" }}>
          <div>
            <div>
              <h5>
                <RadioIcon /> Frecuencias:
              </h5>
              <textarea
                style={{
                  backgroundColor: "white",
                  width: "60%",
                  height: "200px",
                  textAlign: "center",
                  borderRadius: "30px",
                  marginLeft:"10%"
                }}
                className="fw-semibold"
                readOnly // Agrega el atributo readOnly para hacer el textarea no editable
              >
                {radio.frecuencias}
              </textarea>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <div></div>

        <div style={{ marginLeft: "auto", marginRight: "8%" }}></div>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  const radio = await Radio.findById(params.id).lean();
  radio._id = radio._id.toString();
  radio.createdAt = radio.createdAt.toISOString();

  return { props: { radio } };
}

export default radio;
