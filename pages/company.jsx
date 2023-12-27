import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Company from "../models/Company";

// material icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ApartmentIcon from "@mui/icons-material/Apartment";
import EditIcon from "@mui/icons-material/Edit";
import DomainAddIcon from "@mui/icons-material/DomainAdd";

export default function CompanyPage({ companys }) {
  return (
    <div>
      <div style={{display:"flex"}}>
        <div className="title-container">
          {" "}
          <h1>
            Empresa
            <ApartmentIcon
              className="icon"
              style={{
                textDecoration: "none",
                color: "#198754",
                height: "60px",
                width: "60px",
                marginLeft: "10px",
              }}
            />
          </h1>
        </div>
        <div style={{marginLeft:"auto"}}>
        {companys.length === 0 && (
                    <button
                      className="btn btn-secondary"
                      style={{ color: "white" }}
                    >
                      <Link href="/newCompany">
                        <DomainAddIcon style={{ color: "white" }} />{" "}
                      </Link>
                    </button>
                  )}

        </div>
        
      </div>
      <hr></hr>
      <div style={{ width: "100%" }}>
        <button className="btn btn-secondary">
          <a
            href="/administracion"
            style={{ textDecoration: "none", color: "white" }}
          >
            <ArrowBackIcon />
          </a>
        </button>
      </div>
      <div className="company">
        <div style={{ width: "30%" }}>
          <img
            src="../company.png"
            alt="Descripción de la imagen"
            width={30}
            className="card-img-top"
          />
        </div>
        <div style={{ width: "60%" }}>
          {companys.map((company, index) => (
            <div key={company._id}>
              <div style={{ display: "flex" }}>
                <div>
                  <h5 className="card-title">Empresa: {company.companyname}</h5>
                </div>
                <div style={{ marginLeft: "10%" }}>
                  
                  <Link
                    href="/[id]/editCompany"
                    as={`/${company._id}/editCompany`}
                    legacyBehavior
                  >
                    <button
                      size="small"
                      className="btn btn-warning float-end"
                      style={{ marginRight: "8px", color: "white" }}
                    >
                      <EditIcon />
                    </button>
                  </Link>
                </div>
              </div>

              <div>Rubro: {company.companyType}</div>
              <div>Responsable: {company.owner}</div>

              <div>Cuit: {company.cuit}</div>
              <div>Direccion: {company.address}</div>
              <div>Web: {company.web}</div>
              <div>Email: {company.email}</div>
              <div>Localidad: {company.city}</div>
              <div>Telefono: {company.telephone1}</div>
              <div>Telefono: {company.telephone2}</div>
              <div>Celular: {company.celphone1}</div>
              <div>Celular: {company.celphone2}</div>
            </div>
          ))}
        </div>
      </div>
      
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
