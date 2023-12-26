import React, { useState, useEffect } from 'react';
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import dbConnect from '../lib/dbConnect';
import Company from '../models/Company';
import Image from 'next/image';
import CurrentAccountClient2 from '../models/CurrentAccountClient2';
import Link from 'next/link';
import { useRequireAuth } from '../lib/auth';
import CurrentAccountClient2Modal from '../components/CurrentAccountClient2Modal';
import CurrenAccountClient2PayModal from '../components/CurrenAccountClient2PayModal';
import CurrenAccountClient2Print from '../components/Print/CurrenAccountClient2Print';

// Material icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function currenAccountClient2({ currentAccountClient2s, companys }) {
  const [filter, setFilter] = useState('day');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedDateRange, setSelectedDateRange] = useState({ startDate: '', endDate: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCurrentAccountClient2, setFilteredCurrentAccountClient2] = useState(currentAccountClient2s);
  const [CurrentAccountClient2ModalIsOpen, setCurrentAccountModalClient2IsOpen] = useState(false);
  const [CurrentAccountClient2PayModalIsOpen, setCurrentAccountModalClient2PayIsOpen] = useState(false);

  const openCurrentAccountClient2 = () => {
    setCurrentAccountModalClient2IsOpen(true);
  };

  const closeCurrentAccountClient2 = () => {
    setCurrentAccountModalClient2IsOpen(false);
  };

  const openCurrentAccountClient2Pay = () => {
    setCurrentAccountModalClient2PayIsOpen(true);
  };

  const closeCurrentAccountClient2Pay = () => {
    setCurrentAccountModalClient2PayIsOpen(false);
  };

  useEffect(() => {
    const getFilteredCurrentAccountClient2 = () => {
      let startDate, endDate;

      switch (filter) {
        case 'day':
          startDate = startOfWeek(new Date(selectedDate));
          endDate = endOfWeek(new Date(selectedDate));
          break;
        case 'week':
          startDate = startOfWeek(new Date(selectedDate));
          endDate = endOfWeek(new Date(selectedDate));
          break;
        case 'month':
          startDate = startOfMonth(new Date(selectedDate));
          endDate = endOfMonth(new Date(selectedDate));
          break;
        case 'year':
          startDate = startOfYear(new Date(selectedDate));
          endDate = endOfYear(new Date(selectedDate));
          break;
        case 'custom':
          startDate = startOfDay(new Date(selectedDateRange.startDate));
          endDate = endOfDay(new Date(selectedDateRange.endDate));
          break;
        default:
          startDate = startOfMonth(new Date(selectedDate));
          endDate = endOfMonth(new Date(selectedDate));
          break;
      }

      const filteredCurrentAccountClient2 = currentAccountClient2s
        .filter((currentAccountClient2) => {
          const currentAccountClient2Date = new Date(currentAccountClient2.createdAt);
          const currentAccountClient2DateUTC = new Date(
            Date.UTC(
              currentAccountClient2Date.getFullYear(),
              currentAccountClient2Date.getMonth(),
              currentAccountClient2Date.getDate()
            )
          );
          return currentAccountClient2DateUTC >= startDate && currentAccountClient2DateUTC <= endDate;
        })
        .sort((a, b) => {
          if (a.estado === 'Pendiente' && b.estado !== 'Pendiente') {
            return -1;
          } else if (a.estado !== 'Pendiente' && b.estado === 'Pendiente') {
            return 1;
          } else {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB - dateA;
          }
        });

      setFilteredCurrentAccountClient2(filteredCurrentAccountClient2);
    };

    getFilteredCurrentAccountClient2();
  }, [selectedDate, filter, selectedDateRange]);

  useRequireAuth();

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) {
      setFilteredCurrentAccountClient2(currentAccountClient2s);
      return;
    }

    const response = await fetch(`/api/currentAccount/client2/search?q=${query}`);
    const data = await response.json();

    setFilteredCurrentAccountClient2(data);
  };

  const calculateTotalPrice = () => {
    const totalPrice = currentAccountClient2s.reduce((total, currentAccount) => {
      return total + currentAccount.otherprice;
    }, 0);

    return totalPrice;
  };

  const totalPrice = calculateTotalPrice();

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      const printContent = document.getElementById('print-CurrenAccountClient2Print').innerHTML;
      printWindow.document.open();
      printWindow.document.write(`
       
          ${printContent}
      
      `);
      printWindow.document.close();
      printWindow.print();
     
    } else {
      alert("¡El bloqueo de ventanas emergentes puede estar activado en tu navegador!");
    }
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div>
          <h1>
            Cuentas Corrientes: Alvaro Gonzalez
            <EditNoteIcon
              style={{ textDecoration: 'none', color: '#dc3545', height: '60px', width: '60px', marginLeft: '10px' }}
            />
          </h1>
        </div>

        <div style={{ marginLeft: 'auto', marginRight: '8%', marginTop: '15px' }}>
          <p>
            <h3>Saldo : ${totalPrice}</h3>
          </p>
        </div>
      </div>

      <hr />

      <div className="d-flex justify-content-between">
        <div style={{ display: 'flex', width: '100%' }}>
          <div>
            <button className="btn btn-secondary float-start">
              <Link href="/currentAccount" style={{ textDecoration: 'none', color: 'white' }}>
                <ArrowBackIcon />
              </Link>
            </button>
          </div>
          

          <div style={{ marginLeft: 'auto' }}>
          <button className="btn btn-success" style={{marginRight: '8px'}}  type="submit" form="clientForm" onClick={handlePrint}   >

            <LocalPrintshopIcon/>
          </button>
            <button onClick={openCurrentAccountClient2Pay} className="btn btn-danger" style={{ color: 'white', marginRight: '8px' }}>
              <MonetizationOnIcon />
              <ArrowCircleRightIcon />
            </button>
            <Link href="/currenAccountClient2Pay" style={{ textDecoration: 'none', color: 'white' }}>
              <button className="btn btn-primary" style={{ color: 'white', marginRight: '8px' }}>
                <PriceCheckIcon />
              </button>
             
            </Link>
            <button onClick={openCurrentAccountClient2} className="btn btn-success">
              <FiberNewIcon />
            </button>
          </div>
        </div>
        <div></div>
      </div>
      <div>
        <div className="d-flex align-items-center"></div>
      </div>

      <div className="container text-center">
        <div className="mb-3">
          <label htmlFor="filter" className="form-label">
            Filtrar por:
          </label>
          <select id="filter" className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
            {/* <option value="day">Día</option> */}
            <option value="week">Semana</option>
            <option value="month">Mes</option>
            <option value="year">Año</option>
            <option value="custom">Personalizado</option>
          </select>
        </div>
        <div>
           <div style={{width:"100%"}}>
                 {filter === 'custom' && (
                    <div style={{display:"flex"}}>
                    <div style={{width:"20%"}}>
                    <label htmlFor="startDate" className="form-label" >
                         Fecha de inicio:
                    </label>

                    </div>
                    <div style={{width:"25%"}}>
                    <input
                      type="date"
                      id="startDate"
                      className="form-control"
                      value={selectedDateRange.startDate}
                      onChange={(e) => setSelectedDateRange({ ...selectedDateRange, startDate: e.target.value })}
                      />  
                    </div>
                    
                    <div style={{width:"20%"}}>
                        <label htmlFor="endDate" className="form-label">
                          Fecha de fin:
                        </label>
                    </div>
                        <div style={{width:"25%"}}>
                        <input
                          type="date"
                          id="endDate"
                          className="form-control"
                          value={selectedDateRange.endDate}
                          onChange={(e) => setSelectedDateRange({ ...selectedDateRange, endDate: e.target.value })}
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
              <th scope="col">Producto</th>
              <th scope="col">Observacion</th>
              <th scope="col">Precio</th>
            </tr>
          </thead>
          <tbody>
            {filteredCurrentAccountClient2.map((currentAccount, index) => (
              <tr key={currentAccount._id}>
                <td>{index + 1}</td>
                <td>{format(new Date(currentAccount.createdAt), 'dd/MM/yyyy')}</td>
            
                
                <td>{currentAccount.product}</td>
                <td>{currentAccount.observation}</td>
                <td>${currentAccount.price}</td>
                <td>
                  <Link href="/[id]/currenAccountClient2" as={`/${currentAccount._id}/currenAccountClient2`} legacyBehavior>
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
      <CurrenAccountClient2Print companys={companys}  image="/logo.png" filteredCurrentAccountClient2={filteredCurrentAccountClient2} totalPrice={totalPrice} />
      <CurrenAccountClient2PayModal isOpen={CurrentAccountClient2PayModalIsOpen} closeModal={closeCurrentAccountClient2Pay} totalPrice={totalPrice} currentAccountClient2s={currentAccountClient2s} />
      <CurrentAccountClient2Modal isOpen={CurrentAccountClient2ModalIsOpen} closeModal={closeCurrentAccountClient2} />
    </div>
  );
}

export async function getServerSideProps() {
  await dbConnect();


  
    const resultCompany = await Company.find({});
    const companys = resultCompany.map((doc) => {
      const company = doc.toObject();
      company._id = company._id.toString();
      return company;
    });
  
   

  const result = await CurrentAccountClient2.find({});
  const currentAccountClient2s = result.map((doc) => {
    const currentAccountClient2 = doc.toObject();
    currentAccountClient2._id = currentAccountClient2._id.toString();
    currentAccountClient2.createdAt = currentAccountClient2.createdAt.toISOString();
    return currentAccountClient2;
  });

  return { props: { currentAccountClient2s, companys } };
}
