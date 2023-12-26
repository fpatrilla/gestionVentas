


// import Company from '../models/Company';
import TechnicalreportModal from '../components/TechnicalreportModal';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Technicalreport from '../models/Technicalreport';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dbConnect from '../lib/dbConnect';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/router';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import Company from '../models/Company';
import InventoryIcon from '@mui/icons-material/Inventory';
import NoteAltIcon from '@mui/icons-material/NoteAlt';




export default function technicalreport ({ technicalreports,  companys }) {
  const [filteredTechnicalreports, setFilteredTechnicalreports] = useState(technicalreports);
  const [searchTerm, setSearchTerm] = useState('');
  const [TechnicalreportModalIsOpen, setTechnicalreportModalIsOpen] = useState(false);

  const router = useRouter();

const openTechnicalreportModal = () => {
    setTechnicalreportModalIsOpen(true);
};

const closeTechnicalreportModal  = () => {
    setTechnicalreportModalIsOpen(false);
};



  useEffect(() => {
    const filtered = technicalreports.filter(
      (technicalreport) =>
      technicalreport.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      technicalreport.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort the filtered data by identifier in descending order
    const sortedFiltered = filtered.sort((a, b) => b.identifier - a.identifier);

    setFilteredTechnicalreports(sortedFiltered);
  }, [searchTerm, technicalreports]);

  const currentDate = new Date();

  const day = String(currentDate.getDate()).padStart(2, '0');
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
const year = currentDate.getFullYear();

const formattedDate = `${day}/${month}/${year}`;


  return (
    <div>
      <h1>Informes Técnicos
      <NoteAltIcon 
                style={{ textDecoration: 'none', color: 'black', height: '60px', width: '60px',marginLeft:"10px" }}
              />
        
      
      </h1>
      <hr></hr>
      <div className="container text-center">
        <div className="row">
          <div style={{ display: 'flex' }}>
          <div>
          <button className="btn btn-secondary float-start" style={{marginRight:"5%", marginTop:"1px"}}>
                <Link href="/varios" style={{ textDecoration: 'none', color: 'white' }}>
                   <ArrowBackIcon />
                </Link>
               </button>
          </div>
            <div style={{ width: '70%', margin:"auto" }}>
              <input
                type="text"
                placeholder="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="btn btn-primary" style={{ margin: '1%'}}>
          
            <FiberNewIcon
             onClick={openTechnicalreportModal}
            
              style={{ textDecoration: 'none', color: 'white', height: '30px', width: '30px' }}
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
                {filteredTechnicalreports.map((technicalreport, index) => (
                  <tr key={technicalreport._id}>
                  <td>{index}</td>
                    <td>{technicalreport.name}</td>
                    <td>{technicalreport.lastname}</td>
                    <td>{formattedDate}</td>
                    <td>
                       <Link href="/[id]/technicalreport" as={`/${technicalreport._id}/technicalreport`} legacyBehavior>
                        <button className="btn btn-success" style={{ margin: '3px' }}>
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
      <TechnicalreportModal isOpen={TechnicalreportModalIsOpen} closeModal={closeTechnicalreportModal} companys={companys}  />
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
    const result = await Technicalreport.find({});
    const technicalreports = result.map((doc) => {
        const technicalreport = doc.toObject();
        technicalreport._id = technicalreport._id?.toString(); // Use optional chaining
        // Transforma el campo createdAt a una cadena de texto antes de devolverlo
        technicalreport.createdAt = technicalreport.createdAt.toString();
        return technicalreport;
      });
  
    return { props: { technicalreports, companys } };
  }
  