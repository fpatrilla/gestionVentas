import React from "react";
import Link from "next/link";

import PresupuestoModal from "../components/PresupuestoModal";
import { useRouter } from "next/router";
import { useState } from "react";
import dbConnect from "../lib/dbConnect";
import Company from "../models/Company";

//material icons

import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ListAltIcon from "@mui/icons-material/ListAlt";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";

export default function nuevo(companys) {
  const [PresupuestoModalIsOpen, setPresupuestoModalIsOpen] = useState(false);

  const router = useRouter();

  const openPresupuestoModal = () => {
    setPresupuestoModalIsOpen(true);
  };

  const closePresupuestoModal = () => {
    setPresupuestoModalIsOpen(false);
  };

  return (
    <div>
      <h1>
        Crear Nueva
        <PointOfSaleIcon className="iconhead" />
      </h1>
      <hr></hr>

      <div
        className="container text-center"
        style={{ margin: "1%", marginTop: "7%" }}
      >
        <div className="row">
          <div className="col box-index1 btn btn-dark">
            <Link href="/newSale" style={{ textDecoration: "none" }}>
              <LocalOfferIcon className="box-index" />
              <h2 className="boxh2">Ventas</h2>
            </Link>
          </div>
          <div className="col box-index1 btn btn-danger">
            <Link href="/newOrden" style={{ textDecoration: "none" }}>
              <ListAltIcon className="box-index" />
              <h2 className="boxh2">Ordenes</h2>
            </Link>
          </div>
          <div className="col  box-index1 btn btn-primary">
            <BorderColorIcon
              onClick={openPresupuestoModal}
              className="box-index"
            />

            <h2 className="boxh2">Presupuestos</h2>
          </div>
        </div>
      </div>

      <PresupuestoModal
        isOpen={PresupuestoModalIsOpen}
        closeModal={closePresupuestoModal}
        {...companys}
      />
    </div>
  );
}
export async function getServerSideProps() {
  await dbConnect();
  const result = await Company.find({});
  const companys = result.map((doc) => {
    const company = doc.toObject();
    company._id = company._id.toString();
    return company;
  });

  return { props: { companys } };
}
