// import Company from '../models/Company';
import AccountModal from "../components/AccountModal";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Account from "../models/Account";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/router";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import Company from "../models/Company";
import InventoryIcon from "@mui/icons-material/Inventory";
import { format } from "date-fns";

export default function account({ accounts, companys }) {
  const [filteredAccounts, setFilteredAccounts] = useState(accounts);
  const [searchTerm, setSearchTerm] = useState("");
  const [AccountModalIsOpen, setAccuontModalIsOpen] = useState(false);

  const router = useRouter();

  const openAccuontModal = () => {
    setAccuontModalIsOpen(true);
  };

  const closeAccuontModal = () => {
    setAccuontModalIsOpen(false);
  };

  useEffect(() => {
    const filtered = accounts.filter(
      (account) =>
        account.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedFiltered = filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt);

      const dateB = new Date(b.createdAt);
      return dateB - dateA; // Sort in ascending order
    });

    setFilteredAccounts(sortedFiltered);
  }, [searchTerm, accounts]);

  return (
    <div>
      <h1>
        Cuentas
        <InventoryIcon
          style={{
            textDecoration: "none",
            color: "#6c757d",
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
                onClick={openAccuontModal}
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
                  <th scope="col-2">Apellido</th>
                  <th scope="col-2">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((account, index) => (
                  <tr key={account._id}>
                    <td>{index}</td>
                    <td>{account.name}</td>
                    <td>{account.lastname}</td>
                    <td>{account.createdAt}</td>
                    <td>
                      <Link
                        href="/[id]/account"
                        as={`/${account._id}/account`}
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
      <AccountModal
        isOpen={AccountModalIsOpen}
        closeModal={closeAccuontModal}
        companys={{ companys }}
      />
    </div>
  );
}

/* Retrieves Articulos(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect();
  const resultCompany = await Company.find({});
  const companys = resultCompany.map((doc) => {
    const company = doc.toObject();
    company._id = company._id.toString();
    return company;
  });

  /* find all the data in our database */
  const result = await Account.find({}).sort({ createdAt: -1 });

  const accounts = result.map((doc) => {
    const account = doc.toObject();
    account._id = account._id.toString();

    account.createdAt = account.createdAt.toString();
    account.createdAt = format(new Date(account.createdAt), "dd-MM-yyyy HH:mm");
    return account;
  });

  return { props: { accounts, companys } };
}
