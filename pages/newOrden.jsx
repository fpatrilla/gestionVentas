import React from "react";
import Link from "next/link";

//materia icons

import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function newOrden() {
  return (
    <div>
      <h1>
        Nueva Orden
        <ListAltIcon
          className="iconhead"
          style={{
            color: "#dc3545",
          }}
        />
      </h1>
      <hr />
      <div>
        <button className="btn btn-secondary float-start">
          <Link
            href="/nuevo"
            style={{ textDecoration: "none", color: "white" }}
          >
            <ArrowBackIcon />
          </Link>
        </button>
      </div>
      <div
        className="container text-center"
        style={{ margin: "1%", marginTop: "7%" }}
      >
        <div className="row">
          <div className="col box-index1 btn btn-dark">
            <Link href="/clientsOrden" style={{ textDecoration: "none" }}>
              <PersonSearchIcon className="box-index" />
              <h2 className="boxh2">Ya es cliente?</h2>
            </Link>
          </div>
          <div className="col box-index1 btn btn-danger">
            <Link href="/newClientOrden" style={{ textDecoration: "none" }}>
              <PersonAddIcon className="box-index" />
              <h2 className="boxh2">Nuevo Cliente</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
