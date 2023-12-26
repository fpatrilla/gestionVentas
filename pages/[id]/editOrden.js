import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import dbConnect from "../../lib/dbConnect";
import Link from "next/link";
import Orden from "../../models/Orden";

import Swal from "sweetalert2";

//material icons

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SettingsCellIcon from "@mui/icons-material/SettingsCell";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import PinIcon from "@mui/icons-material/Pin";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import EmailIcon from "@mui/icons-material/Email";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditOffIcon from "@mui/icons-material/EditOff";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import SaveIcon from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const EditOrden = ({ orden }) => {
  const router = useRouter();
  const [ordenForm, setOrdenForm] = useState({
    type: orden.type,
    marca: orden.marca,
    model: orden.model,
    issue: orden.issue,
    password: orden.password,
    serialNumber: orden.serialNumber,
    comentOrden: orden.comentOrden,
    estado: orden.estado,
    name: orden.name,
    lastname: orden.lastname,
    number: orden.number,
    otherPrice: orden.otherPrice,
    comentInt: orden.comentInt,
    email: orden.email,
  });
  const handleOrdenChange = (e) => {
    const { name, value } = e.target;
    setOrdenForm({ ...ordenForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/ordenes/orden/${orden._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ordenForm),
      });

      if (response.ok) {
        router.back();
      } else {
      }
    } catch (error) {
      console.error("Error updating the order:", error);
    }
  };
  const handleDelete = async () => {
    const articleID = router.query.id;

    Swal.fire({
      title: "¿Estás seguro que deseas eliminar la orden ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "gray",
      confirmButtonText: "Sí",
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirmó la eliminación, entonces eliminamos la orden
        try {
          fetch(`/api/ordenes/orden/${orden._id}`, {
            method: "Delete",
          });

          router.push("/ordenes");
          Swal.fire("Eliminado", "La orden se eliminó.", "Exitoso");
        } catch (error) {
          // Manejar errores si es necesario
          console.error("Error al eliminar la orden:", error);
        }
      }
    });
  };

  const formattedDate = new Date(orden.createdAt).toLocaleDateString();

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div>
          <h1>
            Editar Orden: {orden.identifier} <ModeEditOutlineIcon />{" "}
          </h1>
        </div>
        <div style={{ marginLeft: "3%" }}>
          <button
            type="submit"
            onClick={handleDelete}
            className="btn btn-danger"
          >
            <DeleteForeverIcon />
          </button>
        </div>
      </div>
      <div style={{ display: "Felx" }}>
        <div style={{ width: "4%" }}>
          <button
            className="btn btn-secondary float-start"
            style={{ marginRight: "5%", marginTop: "1px" }}
          >
            <Link
              href="/ordenes"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ArrowBackIcon />
            </Link>
          </button>
        </div>
        <div className="boxorderhead">
          <div style={{ marginLeft: "0%", display: "flex" }}>
            <div>
              <AccountCircleIcon />
            </div>
            <div
              style={{
                marginLeft: "0%",
                backgroundColor: "white",
                padding: "1%",
                textAlign: "center",
                borderRadius: "30px",
              }}
              className="fw-semibold"
            >
              <input
                type="text"
                maxLength="30"
                name="name"
                value={ordenForm.name}
                onChange={handleOrdenChange}
              />
            </div>
            <div
              style={{
                marginLeft: "0%",
                backgroundColor: "white",
                padding: "1%",
                textAlign: "center",
                borderRadius: "30px",
              }}
              className="fw-semibold"
            >
            <input
                type="text"
                maxLength="30"
                name="lastname"
                value={ordenForm.lastname}
                onChange={handleOrdenChange}
              />
            
            </div>
          </div>

          <div style={{ marginLeft: "1%", display: "flex" }}>
            <div>
              <PhoneForwardedIcon />
            </div>
            <div
              style={{
                marginLeft: "1%",
                backgroundColor: "white",
                padding: "2%",
                textAlign: "center",
                borderRadius: "30px",
              }}
              className="fw-semibold"
            >
              <input
                type="number"
                maxLength="30"
                name="number"
                value={ordenForm.number}
                onChange={handleOrdenChange}
              />
            </div>
          </div>
          <div style={{ marginLeft: "1%", display: "flex" }}>
            <div>
              <EmailIcon />
            </div>
            <div
              style={{
                marginLeft: "1%",
                backgroundColor: "white",
                padding: "2%",
                textAlign: "center",
                borderRadius: "30px",
              }}
              className="fw-semibold"
            >
              <input
                type="text"
                name="email"
                value={ordenForm.email}
                onChange={handleOrdenChange}
              />
            </div>
          </div>

          <div style={{ marginLeft: "auto" }}>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-success"
            >
              <SaveIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Order */}

      <div className="boxorderbody">
        <div style={{ width: "50%" }}>
          <div>
            <h5>
              <SettingsCellIcon /> Tipo:
            </h5>

            <div style={{ display: "flex" }}>
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
              >
                <input
                  type="text"
                  maxLength="30"
                  name="type"
                  value={ordenForm.type}
                  onChange={handleOrdenChange}
                />
              </div>
              <div style={{ padding: "2%" }}>
                <ModeEditOutlineIcon />
              </div>
            </div>
          </div>
          <div>
            <h5>
              <SettingsCellIcon /> Marca:
            </h5>
            <div style={{ display: "flex" }}>
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
              >
                <input
                  type="text"
                  maxLength="30"
                  name="marca"
                  value={ordenForm.marca}
                  onChange={handleOrdenChange}
                />
              </div>
              <div style={{ padding: "2%" }}>
                <ModeEditOutlineIcon />
              </div>
            </div>
          </div>
          <div>
            <h5>
              <SettingsCellIcon /> Modelo:
            </h5>
            <div style={{ display: "flex" }}>
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
              >
                <input
                  type="text"
                  maxLength="30"
                  name="model"
                  value={ordenForm.model}
                  onChange={handleOrdenChange}
                />
              </div>
              <div style={{ padding: "2%" }}>
                <ModeEditOutlineIcon />
              </div>
            </div>
          </div>
          <div>
            <h5>
              <PinIcon /> Numero de serie:
            </h5>
            <div style={{ display: "flex" }}>
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
              >
                <input
                  type="number"
                  maxLength="30"
                  name="serialNumber"
                  value={orden.serialNumber}
                  onChange={handleOrdenChange}
                />
              </div>
              <div style={{ padding: "2%" }}>
                <ModeEditOutlineIcon />
              </div>
            </div>
          </div>
          <div>
            <h5>
              <VpnKeyIcon /> Contraseña:
            </h5>
            <div style={{ display: "flex" }}>
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
              >
                <input
                  type="text"
                  maxLength="30"
                  name="password"
                  value={ordenForm.password}
                  onChange={handleOrdenChange}
                />
              </div>
              <div style={{ padding: "2%" }}>
                <ModeEditOutlineIcon />
              </div>
            </div>
          </div>
          <div>
            <h5>
              <WarningAmberIcon /> Falla o Requerimiento:
            </h5>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  marginLeft: "2%",
                  backgroundColor: "white",
                  width: "80%",
                  padding: "2%",
                  textAlign: "center",
                  borderRadius: "30px",
                }}
                className="fw-semibold"
              >
                <textarea
                  type="text"
                  name="issue"
                  value={ordenForm.issue}
                  onChange={handleOrdenChange}
                />
              </div>
              <div style={{ padding: "2%" }}>
                <ModeEditOutlineIcon />
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: "50%", marginTop: "14px" }}>
          <div>
            <h5>
              <CalendarMonthIcon /> Fecha:
            </h5>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  marginLeft: "2%",
                  backgroundColor: "white",
                  width: "30%",
                  padding: "2%",
                  textAlign: "center",
                  borderRadius: "30px",
                }}
                className="fw-semibold"
              >
                {formattedDate}
              </div>
              <div style={{ padding: "2%" }}>
                <EditOffIcon />
              </div>
            </div>
          </div>
          <div>
            <h5>Estado:</h5>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  marginLeft: "2%",
                  padding: "2%",
                  textAlign: "center",
                  width: "40%",
                }}
                className="fw-semibold"
              >
                <select
                  className="form-select"
                  aria-label="Default"
                  style={{ borderRadius: "60px", width: "100%" }}
                  name="estado"
                  value={ordenForm.estado}
                  onChange={handleOrdenChange}
                >
                  {[
                    "Pendiente",
                    "Presupuesto",
                    "Repuesto",
                    "Reparando",
                    "Reparado",
                    "No Reparado",
                    "Entregado",
                  ].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ padding: "2%" }}>
                <SyncAltIcon />
              </div>
            </div>
          </div>
          <div>
            <h5>
              <ManageAccountsIcon /> Comentario:
            </h5>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  marginLeft: "2%",
                  backgroundColor: "white",
                  width: "85%",
                  padding: "2%",
                  textAlign: "center",
                  borderRadius: "30px",
                }}
                className="fw-semibold"
              >
                <textarea
                  type="text"
                  name="comentOrden"
                  value={ordenForm.comentOrden}
                  onChange={handleOrdenChange}
                />
              </div>
              <div style={{ padding: "2%" }}>
                <ModeEditOutlineIcon />
              </div>
            </div>
          </div>
          <div>
            <h5>
              <MonetizationOnIcon /> Acepta cargos
            </h5>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  marginLeft: "3%",
                  backgroundColor: "white",
                  width: "25%",
                  padding: "2%",
                  textAlign: "center",
                  borderRadius: "30px",
                }}
                className="fw-semibold"
              >
                ${orden.price}
              </div>
              <div style={{ padding: "2%" }}>
                <EditOffIcon />
              </div>
            </div>
          </div>
          <div>
            <h5>
              <MonetizationOnIcon /> Precio:
            </h5>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  marginLeft: "3%",
                  backgroundColor: "white",
                  width: "25%",
                  padding: "2%",
                  textAlign: "center",
                  borderRadius: "30px",
                }}
                className="fw-semibold"
              >
                <input
                  type="number"
                  maxLength="30"
                  name="otherPrice"
                  value={ordenForm.otherPrice}
                  onChange={handleOrdenChange}
                />
              </div>
              <div style={{ padding: "2%" }}>
                <ModeEditOutlineIcon />
              </div>
            </div>
          </div>
          <div>
            <h5>
              <SupportAgentIcon /> Comentario interno:
            </h5>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  marginLeft: "2%",
                  backgroundColor: "white",
                  width: "85%",
                  padding: "2%",
                  textAlign: "center",
                  borderRadius: "30px",
                }}
                className="fw-semibold"
              >
                <textarea
                  type="text"
                  name="comentInt"
                  value={ordenForm.comentInt}
                  onChange={handleOrdenChange}
                />
              </div>
              <div style={{ padding: "2%" }}>
                <ModeEditOutlineIcon />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  const orden = await Orden.findById(params.id).lean();
  if (!orden) {
    return {
      notFound: true,
    };
  }

  orden._id = orden._id.toString();
  orden.createdAt = orden.createdAt.toISOString();
  const exitAt = new Date(orden.exitAt);
  const exitYear = exitAt.getFullYear();
  const exitMonth = exitAt.getMonth() + 1;
  const exitDay = exitAt.getDate();

  orden.exitAt = `${exitDay}-${exitMonth}-${exitYear}`;

  return { props: { orden } };
}

export default EditOrden;
