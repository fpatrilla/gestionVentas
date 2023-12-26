import React from "react";
import Link from "next/link";

//material icons

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import ApartmentIcon from "@mui/icons-material/Apartment";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import StoreIcon from "@mui/icons-material/Store";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

export default function administracion() {
  return (
    <div>
      {" "}
      <div>
        <div style={{ marginBottom: "1%" }}>
          <h1>
            Administracion
            <AdminPanelSettingsIcon
              className="iconhead"
              style={{
                color: "black",
              }}
            />
          </h1>
        </div>
        <hr></hr>

        <div className="container text-center" style={{ margin: "1%" }}>
          <div className="row">
            <div className="col box-index1 btn btn-success">
              <Link href="/company" style={{ textDecoration: "none" }}>
                <ApartmentIcon className="box-index" />
                <h2 className="boxh2">La Empresa</h2>
              </Link>
            </div>
            <div className="col box-index1 btn btn-danger">
              <Link href="/saleHistory" style={{ textDecoration: "none" }}>
                <AttachMoneyIcon className="box-index" />
                <h2 className="boxh2">Finanzas</h2>
              </Link>
            </div>
            <div className="col  box-index1 btn btn-primary">
              <Link href="/adminArticle" style={{ textDecoration: "none" }}>
                <StoreIcon className="box-index" />
                <h2 className="boxh2">Articulos</h2>
              </Link>
            </div>
          </div>
          <div className="row">
            <div
              className="col box-index1 btn btn-dark"
              style={{ margin: "1%" }}
            >
              <Link href="/user" style={{ textDecoration: "none" }}>
                <SupervisedUserCircleIcon className="box-index" />
                <h2 className="boxh2">Usuarios</h2>
              </Link>
            </div>

            <div
              className="col box-index1 btn btn-info"
              style={{ margin: "1%" }}
            >
              <Link href="/currentAccount" style={{ textDecoration: "none" }}>
                <EditNoteIcon className="box-index" />
                <h2 className="boxh2">Cuentas Corrientes</h2>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
