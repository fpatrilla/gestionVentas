import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import SaleTarjet from "../models/SaleTarjet";
import SaleCheq from "../models/SaleCheq";
import Sales from "../models/Sales";
import Company from "../models/Company";
import { format } from "date-fns";
import React, { useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function currenAccountClient2Pay({
  sales,
  salesTarjets,
  salesCheqs,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const filteredSales = sales.filter(
    (sale) =>
      sale.name === "Alvaro" ||
      sale.lastname === "Gonzalez" ||
      sale.product === "CC"
  );
  const filtereSalesTarjets = salesTarjets.filter(
    (salesTarjet) =>
      salesTarjet.name === "Alvaro" ||
      salesTarjet.lastname === "Gonzalez" ||
      salesTarjet.product === "CC"
  );
  const filtereSalesCheqs = salesCheqs.filter(
    (salesCheq) =>
      salesCheq.name === "Alvaro" ||
      salesCheq.lastname === "Gonzalez" ||
      salesCheq.product === "CC"
  );

  const allSales = [
    ...filteredSales,
    ...filtereSalesTarjets,
    ...filtereSalesCheqs,
  ];

  // Ordena las ventas por fecha en orden descendente
  allSales.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Calcular el índice del primer y último registro en la página actual
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = allSales.slice(indexOfFirstRecord, indexOfLastRecord);

  // Función para cambiar de página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div>
        <h1>Registro de Pagos</h1>
      </div>
      <hr />
      <div>
        <div>
          <button className="btn btn-secondary float-start">
            <Link
              href="/currenAccountClient2"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ArrowBackIcon />
            </Link>
          </button>
        </div>
        <div style={{ width: "80%", margin: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Fecha</th>
                <th scope="col">F. Pago</th>
                <th scope="col">Precio</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((sale, index) => (
                <tr key={sale._id}>
                  <td>{index + 1}</td>
                  <td>
                    {format(new Date(sale.createdAt), "dd/MM/yyyy HH:mm:ss")}
                  </td>
                  <td>{sale.type}</td>
                  <td>${sale.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: "center" }}>
            {currentPage > 1 && (
              <button
                className="btn btn-primary mr-2"
                onClick={() => paginate(currentPage - 1)}
              >
                Anterior
              </button>
            )}
            {currentRecords.length === recordsPerPage && (
              <button
                className="btn btn-primary"
                onClick={() => paginate(currentPage + 1)}
              >
                Siguiente
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps({ params }) {
  await dbConnect();

  const resultCompany = await Company.find({});
  const companys = resultCompany.map((doc) => {
    const company = doc.toObject();
    company._id = company._id.toString();
    return company;
  });
  const resultSalesCheq = await SaleCheq.find({});
  const salesCheqs = resultSalesCheq.map((doc) => {
    const salesCheq = doc.toObject();
    salesCheq._id = salesCheq._id.toString();
    salesCheq.createdAt = salesCheq.createdAt.toISOString();
    return salesCheq;
  });

  const resultSalesTarjets = await SaleTarjet.find({});
  const salesTarjets = resultSalesTarjets.map((doc) => {
    const salesTarjet = doc.toObject();
    salesTarjet._id = doc._id.toString();
    salesTarjet.createdAt = salesTarjet.createdAt.toISOString();
    return salesTarjet;
  });

  const result = await Sales.find({});
  const sales = result.map((doc) => {
    const sale = doc.toObject();
    sale._id = sale._id.toString();
    sale.createdAt = sale.createdAt.toISOString(); // Convertir la fecha a una cadena ISO
    return sale;
  });

  return { props: { sales, salesTarjets, salesCheqs, companys } };
}
