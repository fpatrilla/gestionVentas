import { useEffect, useState } from "react";
import dbConnect from "../lib/dbConnect";
import Orden from "../models/Orden";

// material icons

import StoreIcon from "@mui/icons-material/Store";
import Link from "next/link";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddIcon from '@mui/icons-material/Add';

export default function Index({ ordens, isLoggedIn, username }) {
  const [blueData, setBlueData] = useState([]);
  const [oficialData, setOficialData] = useState([]);
  const [countPendientes, setCountPendientes] = useState(0);

  const url = "https://dolarapi.com/v1/dolares/blue";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b7bad685bfmsh3c02faad8faf9f0p124a88jsn44a235acf46c",
      "X-RapidAPI-Host": "argentina-dolar-blue-live.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const result = await response.json();
        setBlueData(result);
      } else {
        console.error(`Error en la respuesta: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const urlOficial = "https://dolarapi.com/v1/dolares/oficial";
  const optionsoficial = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b7bad685bfmsh3c02faad8faf9f0p124a88jsn44a235acf46c",
      "X-RapidAPI-Host": "argentina-dolar-blue-live.p.rapidapi.com",
    },
  };

  const fetchDataOficial = async () => {
    try {
      const response = await fetch(urlOficial, optionsoficial);
      if (response.ok) {
        const result = await response.json();
        setOficialData(result);
      } else {
        console.error(`Error en la respuesta: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDataOficial();

    const countPendientes = ordens.filter(
      (orden) => orden.estado === "Pendiente"
    ).length;

    setCountPendientes(countPendientes);
  }, []);

  return (
    <div>
      <div>
        <div style={{ display: "flex" }}>
          <div style={{ marginLeft: "5%" }}>
            <img src="./LogoNavBar.png" alt="login form" width={90} />
          </div>
          <div className="box-pendientes">
            <div>Ordenes Pendientes</div>
            <h3>{countPendientes}</h3>
          </div>
          <div className="box-dolar" style={{ marginLeft: "auto" }}>
            <div>Dolar Oficial</div>
            <div>Compra: ${oficialData.compra}</div>
            <div>Venta: ${oficialData.venta}</div>
          </div>
          <div className="box-dolar">
            <div>Dolar Blue</div>
            <div>Compra: ${blueData.compra}</div>
            <div>Venta: ${blueData.venta}</div>
          </div>
        </div>
        <hr></hr>

        <div style={{ marginTop: "20px", marginLeft: "3%" }}>
          <h2>Accesos Directos:</h2>
          <div style={{ display: "flex" }}>
            <div
              className="col btn btn-danger"
              style={{ margin: "1%", borderRadius: "30px" }}
            >
              <Link href="/newSaleArticle" style={{ textDecoration: "none" }}>
                <StoreIcon className="box-index" />
                <h2 className="boxh2">Articulos</h2>
              </Link>
            </div>
            <div
              className="col btn btn-primary"
              style={{ margin: "1%", borderRadius: "30px" }}
            >
              <Link href="/ordenes" style={{ textDecoration: "none" }}>
                <ListAltIcon className="box-index" />
                <h2 className="boxh2">Ordenes</h2>
              </Link>
            </div>
            <div
              className="col btn btn-secondary"
              style={{ margin: "1%", borderRadius: "30px" }}
            >
              <Link href="/newOrden" style={{ textDecoration: "none" }}>
                <span ><AddIcon className="box-index" /></span>
                <ListAltIcon className="box-index" />
                <h2 className="boxh2">Nueva Orden</h2>
              </Link>
            </div>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();

  const result = await Orden.find({});
  const ordens = result.map((doc) => {
    const orden = doc.toObject();
    orden._id = orden._id.toString();

    const createdAt = new Date(orden.createdAt);
    const year = createdAt.getFullYear();
    const month = createdAt.getMonth() + 1;
    const day = createdAt.getDate();

    const exitAt = new Date(orden.exitAt);
    const exitYear = exitAt.getFullYear();
    const exitMonth = exitAt.getMonth() + 1;
    const exitDay = exitAt.getDate();

    orden.createdAt = `${day}-${month}-${year}`;

    orden.exitAt = `${exitDay}-${exitMonth}-${exitYear}`;

    return orden;
  });
  // Use useRequireAuth to get the authenticated user
  const isLoggedIn = !!context.req.cookies.token;
  const username = context.req.cookies.username || null;

  return { props: { ordens, isLoggedIn, username } };
}
