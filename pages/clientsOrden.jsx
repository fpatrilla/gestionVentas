import React, { useState, useEffect } from "react";
import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Client from "../models/Client";
import Cookies from "js-cookie";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useRequireAuth } from "../lib/auth";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

export default function ClientsOrden({ clients }) {
  const handleLogout = () => {
    Cookies.remove("token");
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/auth/user");
      const data = await response.json();
      setUsername(data.username);
    };

    fetchData();
  }, []);

  useRequireAuth();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [previousClients, setPreviousClients] = useState(clients);

  const handleSearch = async (e) => {
    setQuery(e.target.value);

    if (!e.target.value) {
      setSearchResults([]);
      return;
    }

    const response = await fetch(`/api/client/search?q=${e.target.value}`);
    const data = await response.json();

    setSearchResults(data);
  };

  const handleBack = () => {
    setSearchResults([]);
    setQuery("");
  };

  const filteredClients = searchResults.length
    ? searchResults
    : previousClients;

  return (
    <div>
      <h1>
        Clientes
        <PersonSearchIcon
          className="iconhead"
          style={{
            color: "black",
          }}
        />
      </h1>
      <hr />
      <div className="container text-center">
        <div className="row">
          <div className="col-12">
            <div style={{ display: "flex" }}>
              <div>
                <button className="btn btn-secondary">
                  <Link
                    href="/newOrden"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <ArrowBackIcon />
                  </Link>
                </button>
              </div>
              <div
                style={{ width: "60%", margin: "0 auto", textAlign: "center" }}
              >
                <div className="d-flex align-items-center">
                  <form>
                    <div className="form-group mr-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar clientes..."
                        value={query}
                        onChange={handleSearch}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <br />
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col-1">Codigo</th>
                  <th scope="col-2">Nombre</th>
                  <th scope="col-2">Apellido</th>
                  <th scope="col-2">Dni</th>
                  <th scope="col-2">Celular</th>
                  <th scope="col-5">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client, index) => (
                  <tr key={client._id}>
                    <td>
                      <img
                        src="./user.png"
                        alt="Descripción de la imagen"
                        width={30}
                      />{" "}
                      {index}
                    </td>
                    <td>{client.name}</td>
                    <td>{client.lastname}</td>
                    <td>{client.dni}</td>
                    <td>{client.number}</td>
                    <td>
                      <Link
                        href="/[id]/clientOrden"
                        as={`/${client._id}/clientOrden`}
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
          <div className="col-2">
            <hr />
            {/* espacio en blanco */}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Retrieves client(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect();

  /* find all the data in our database */
  const result = await Client.find({});
  const clients = result.map((doc) => {
    const client = doc.toObject();
    client._id = client._id.toString();
    return client;
  });

  return { props: { clients } };
}
