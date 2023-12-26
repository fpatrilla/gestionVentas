import React, { useState, useEffect } from "react";
import {
  format,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";
import dbConnect from "../lib/dbConnect";
import CurrentAccount from "../models/CurrentAccount";
import Link from "next/link";
import { useRequireAuth } from "../lib/auth";
import { useRouter } from "next/router";

// Material icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function currentAccount({ currentAccounts }) {
  const [filter, setFilter] = useState("day");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCurrentAccount, setFilteredCurrentAccount] =
    useState(currentAccounts);
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const router = useRouter();

  useEffect(() => {
    const getFilteredCurrentAccount = () => {
      let startDate, endDate;

      switch (filter) {
        case "day":
          startDate = startOfWeek(new Date(selectedDate));
          endDate = endOfWeek(new Date(selectedDate));
          break;
        case "week":
          startDate = startOfWeek(new Date(selectedDate));
          endDate = endOfWeek(new Date(selectedDate));
          break;
        case "month":
          startDate = startOfMonth(new Date(selectedDate));
          endDate = endOfMonth(new Date(selectedDate));
          break;
        case "year":
          startDate = startOfYear(new Date(selectedDate));
          endDate = endOfYear(new Date(selectedDate));
          break;
        case "custom":
          startDate = startOfDay(new Date(selectedDateRange.startDate));
          endDate = endOfDay(new Date(selectedDateRange.endDate));
          break;
        default:
          startDate = startOfMonth(new Date(selectedDate));
          endDate = endOfMonth(new Date(selectedDate));
          break;
      }

      const filteredCurrentAccount = currentAccounts
        .filter((currentAccount) => {
          const currentAccountDate = new Date(currentAccount.createdAt);
          const currentAccountDateUTC = new Date(
            Date.UTC(
              currentAccountDate.getFullYear(),
              currentAccountDate.getMonth(),
              currentAccountDate.getDate()
            )
          );
          return (
            currentAccountDateUTC >= startDate &&
            currentAccountDateUTC <= endDate
          );
        })
        .sort((a, b) => {
          // Sort by estado (Pendiente first, others after)
          if (a.estado === "Pendiente" && b.estado !== "Pendiente") {
            return -1; // a should come before b
          } else if (a.estado !== "Pendiente" && b.estado === "Pendiente") {
            return 1; // b should come before a
          } else {
            // If both are Pendiente or both are not, sort by createdAt
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB - dateA; // Descending order
          }
        });

      setFilteredCurrentAccount(filteredCurrentAccount);
    };

    getFilteredCurrentAccount();
  }, [selectedDate, filter, selectedDateRange]);

  useRequireAuth();

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) {
      setFilteredCurrentAccount(currentAccounts);
      return;
    }

    const response = await fetch(`/api/currentAccount/search?q=${query}`);
    const data = await response.json();

    setFilteredCurrentAccount(data);
  };

  const handleGoBack = () => {
    router.back();
  };

  const [selectedEstado, setSelectedEstado] = useState("Pendiente"); // Estado seleccionado para filtrar

  useEffect(() => {
    // Filtrar inicialmente según el estado seleccionado por defecto ("Pendiente")
    const filteredByEstado = currentAccounts.filter(
      (currentAccount) => currentAccount.estado === selectedEstado
    );

    setFilteredCurrentAccount(
      selectedEstado === "" ? currentAccounts : filteredByEstado
    );
  }, [currentAccounts, selectedEstado]);
  const handleEstadoFilter = (estado) => {
    setSelectedEstado(estado);

    // Filtrar según el estado seleccionado
    const filteredByEstado = currentAccounts.filter(
      (currentAccount) => currentAccount.estado === estado
    );

    setFilteredCurrentAccount(
      estado === "" ? currentAccounts : filteredByEstado
    );
  };
  return (
    <div>
      <h1>
        Cuentas Corrientes
        <EditNoteIcon
          style={{
            textDecoration: "none",
            color: "#dc3545",
            height: "60px",
            width: "60px",
            marginLeft: "10px",
          }}
        />
      </h1>
      <hr />

      <div className="d-flex justify-content-between">
        <div style={{ display: "flex", width: "100%" }}>
          <div>
            <button className="btn btn-secondary" onClick={handleGoBack}>
              <ArrowBackIcon />
            </button>
          </div>
          <div style={{display:"flex", marginLeft:"auto"}}>
            <div style={{marginRight:"3%"}}>
              <button className="btn btn-primary">
                <Link
                  href="/currenAccountClient1"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  GABRIEL
                </Link>
              </button>
            </div>
            <div>
              <button className="btn btn-dark">
                <Link
                  href="/currenAccountClient2"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Alvaro
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div>
          <div></div>
        </div>
      </div>
      <div style={{ width: "60%", margin: "0 auto", textAlign: "center" }}>
        <div className="d-flex align-items-center">
          <form>
            <div className="form-group mr-2">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar clientes..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </form>
        </div>
      </div>

      <div className="container text-center">
        <div className="mb-3">
          <label htmlFor="filter" className="form-label">
            Filtrar por:
          </label>
          <select
            id="filter"
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="month">Mes</option>
            <option value="year">Año</option>
            <option value="custom">Personalizado</option>
          </select>
        </div>
        <div style={{ margin: "20px 0" }}>
        <button
          className={`btn ${selectedEstado === "Pendiente" ? "boton-rojo" : "btn-danger"}`}
          onClick={() => handleEstadoFilter("Pendiente")}
          style={{ marginRight: "10px" }}
        >
          Pendiente
        </button>
        <button
          className={`btn ${selectedEstado === "Pagado" ? "boton-gris" : "btn-secondary"}`}
          onClick={() => handleEstadoFilter("Pagado")}
        >
          Pagado
        </button>
        <button
          className={`btn ${selectedEstado === "" ? "boton-negro" : "btn-dark"}`}
          onClick={() => handleEstadoFilter("")}
          style={{ marginLeft: "10px" }}
        >
          Mostrar Todos
        </button>
      </div>
        <div>
          <div style={{ width: "100%" }}>
            {filter === "custom" && (
              <div style={{ display: "flex" }}>
                <div style={{ width: "20%" }}>
                  <label htmlFor="startDate" className="form-label">
                    Fecha de inicio:
                  </label>
                </div>
                <div style={{ width: "25%" }}>
                  <input
                    type="date"
                    id="startDate"
                    className="form-control"
                    value={selectedDateRange.startDate}
                    onChange={(e) =>
                      setSelectedDateRange({
                        ...selectedDateRange,
                        startDate: e.target.value,
                      })
                    }
                  />
                </div>

                <div style={{ width: "20%" }}>
                  <label htmlFor="endDate" className="form-label">
                    Fecha de fin:
                  </label>
                </div>
                <div style={{ width: "25%" }}>
                  <input
                    type="date"
                    id="endDate"
                    className="form-control"
                    value={selectedDateRange.endDate}
                    onChange={(e) =>
                      setSelectedDateRange({
                        ...selectedDateRange,
                        endDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Fecha</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Producto</th>
              <th scope="col">Estado</th>
              <th scope="col">Precio</th>
            </tr>
          </thead>
          <tbody>
            {filteredCurrentAccount.map((currentAccount, index) => (
              <tr key={currentAccount._id}>
                <td>{index + 1}</td>
                <td>
                  {format(new Date(currentAccount.createdAt), "dd/MM/yyyy")}
                </td>
                <td>{currentAccount.name}</td>
                <td>{currentAccount.lastname}</td>
                <td>{currentAccount.product}</td>
                <td>
                  <div
                    className={`estado ${currentAccount.estado}`}
                    style={{ borderRadius: "10px", padding: "3px" }}
                  >
                    {currentAccount.estado}
                  </div>
                </td>
                <td>${currentAccount.price}</td>
                <td>
                  <Link
                    href="/[id]/editCurrentAccount"
                    as={`/${currentAccount._id}/editCurrentAccount`}
                    legacyBehavior
                  >
                    <button
                      className="btn btn-success"
                      style={{ margin: "3px" }}
                    >
                      <ArrowForwardIcon />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  await dbConnect();

  const result = await CurrentAccount.find({});
  const currentAccounts = result.map((doc) => {
    const currentAccount = doc.toObject();
    currentAccount._id = currentAccount._id.toString();
    currentAccount.createdAt = currentAccount.createdAt.toISOString(); // Convertir la fecha a una cadena ISO
    return currentAccount;
  });

  return { props: { currentAccounts } };
}
