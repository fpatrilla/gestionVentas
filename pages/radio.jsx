// import Company from '../models/Company';
import RadioModal from "../components/RadioModal";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Radio from "../models/Radio";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/router";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import RadioIcon from '@mui/icons-material/Radio';

import InventoryIcon from "@mui/icons-material/Inventory";
import { format } from "date-fns";

export default function account({ radios }) {
  const [filteredRadios, setFilteredRadios] = useState(radios);
  const [searchTerm, setSearchTerm] = useState("");
  const [RadioModalIsOpen, setRadioModalIsOpen] = useState(false);

  const router = useRouter();

  const openRadioModal = () => {
    setRadioModalIsOpen(true);
  };

  const closeRadioModal = () => {
    setRadioModalIsOpen(false);
  };

  useEffect(() => {
    const filtered = radios.filter(
      (radio) =>
     
      radio.name.toLowerCase().includes(searchTerm.toLowerCase())||
      radio.frecuencias.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    const sortedFiltered = filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt);

      const dateB = new Date(b.createdAt);
      return dateB - dateA; // Sort in ascending order
    });

    setFilteredRadios(sortedFiltered);
  }, [searchTerm, radios]);

  return (
    <div>
      <h1>
        Frecuencias de Radios
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
      <hr></hr>
      <div className="container text-center">
        <div className="row">
          <div style={{ display: "flex" }}>
            <div>
              <button
                className="btn btn-secondary float-start"
                style={{ marginRight: "5%", marginTop: "1px" }}
              >
                <Link
                  href="/varios"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <ArrowBackIcon />
                </Link>
              </button>
            </div>
            <div style={{ width: "70%", margin: "auto" }}>
              <input
                type="text"
                placeholder="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="btn btn-primary" style={{ margin: "1%" }}>
              <FiberNewIcon
                onClick={openRadioModal}
                style={{
                  textDecoration: "none",
                  color: "white",
                  height: "30px",
                  width: "30px",
                }}
              />
            </div>
          </div>
          <div className="col-12">
            <br></br>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col-1">#</th>
                  <th scope="col-2">Nombre</th>
               
                  <th scope="col-2">Fecha</th>
                  <th scope="col-2">Frecuencias</th>
                </tr>
              </thead>
              <tbody>
                {filteredRadios.map((radio, index) => (
                  <tr key={radio._id}>
                    <td>{index}</td>
                    <td>{radio.name}</td>
        
                    <td>{radio.createdAt}</td>
                    <td>{radio.frecuencias}</td>
                    <td>
                      <Link
                        href="/[id]/radio"
                        as={`/${radio._id}/radio`}
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
      </div>
      <RadioModal
        isOpen={RadioModalIsOpen}
        closeModal={closeRadioModal}
      
      />
    </div>
  );
}

/* Retrieves Articulos(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect();


  /* find all the data in our database */
  const result = await Radio.find({}).sort({ createdAt: -1 });

  const radios = result.map((doc) => {
    const radio = doc.toObject();
    radio._id = radio._id.toString();

    radio.createdAt = radio.createdAt.toString();


    radio.createdAt = format(new Date(radio.createdAt), "dd-MM-yyyy ");
    return radio;
  });

  return { props: { radios } };
}
