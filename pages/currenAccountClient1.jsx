import React, { useState, useEffect } from 'react';
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import dbConnect from '../lib/dbConnect';
import Company from '../models/Company';
import Image from 'next/image';
import CurrentAccountClient1 from '../models/CurrentAccountClient1';
import Link from 'next/link';
import { useRequireAuth } from '../lib/auth';
import CurrentAccountClient1Modal from '../components/CurrentAccountClient1Modal';
import CurrenAccountClient1PayModal from '../components/CurrenAccountClient1PayModal';
import CurrenAccountClient1Print from '../components/Print/CurrenAccountClient1Print';

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

export default function currentAccount({ currentAccountClient1s, companys }) {
  const [filter, setFilter] = useState('day');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedDateRange, setSelectedDateRange] = useState({ startDate: '', endDate: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCurrentAccountClient1, setFilteredCurrentAccountClient1] = useState(currentAccountClient1s);
  const [CurrentAccountClient1ModalIsOpen, setCurrentAccountModalClient1IsOpen] = useState(false);
  const [CurrentAccountClient1PayModalIsOpen, setCurrentAccountModalClient1PayIsOpen] = useState(false);

  const openCurrentAccountClient1 = () => {
    setCurrentAccountModalClient1IsOpen(true);
  };

  const closeCurrentAccountClient1 = () => {
    setCurrentAccountModalClient1IsOpen(false);
  };

  const openCurrentAccountClient1Pay = () => {
    setCurrentAccountModalClient1PayIsOpen(true);
  };

  const closeCurrentAccountClient1Pay = () => {
    setCurrentAccountModalClient1PayIsOpen(false);
  };

  useEffect(() => {
    const getFilteredCurrentAccountClient1 = () => {
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

      const filteredCurrentAccountClient1 = currentAccountClient1s
        .filter((currentAccountClient1) => {
          const currentAccountClient1Date = new Date(currentAccountClient1.createdAt);
          const currentAccountClient1DateUTC = new Date(
            Date.UTC(
              currentAccountClient1Date.getFullYear(),
              currentAccountClient1Date.getMonth(),
              currentAccountClient1Date.getDate()
            )
          );
          return currentAccountClient1DateUTC >= startDate && currentAccountClient1DateUTC <= endDate;
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

      setFilteredCurrentAccountClient1(filteredCurrentAccountClient1);
    };

    getFilteredCurrentAccountClient1();
  }, [selectedDate, filter, selectedDateRange]);

  useRequireAuth();

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) {
      setFilteredCurrentAccountClient1(currentAccountClient1s);
      return;
    }

    const response = await fetch(`/api/currentAccount/client1/search?q=${query}`);
    const data = await response.json();

    setFilteredCurrentAccountClient1(data);
  };

  const calculateTotalPrice = () => {
    const totalPrice = currentAccountClient1s.reduce((total, currentAccount) => {
      return total + currentAccount.otherprice;
    }, 0);

    return totalPrice;
  };

  const totalPrice = calculateTotalPrice();

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      const printContent = document.getElementById('print-CurrenAccountClient1Print').innerHTML;
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
            Cuentas Corrientes: Gabriel Alvarez
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
            <button onClick={openCurrentAccountClient1Pay} className="btn btn-danger" style={{ color: 'white', marginRight: '8px' }}>
              <MonetizationOnIcon />
              <ArrowCircleRightIcon />
            </button>
            <Link href="/currenAccountClient1Pay" style={{ textDecoration: 'none', color: 'white' }}>
              <button className="btn btn-primary" style={{ color: 'white', marginRight: '8px' }}>
                <PriceCheckIcon />
              </button>
             
            </Link>
            <button onClick={openCurrentAccountClient1} className="btn btn-success">
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
            {filteredCurrentAccountClient1.map((currentAccount, index) => (
              <tr key={currentAccount._id}>
                <td>{index + 1}</td>
                <td>{format(new Date(currentAccount.createdAt), 'dd/MM/yyyy')}</td>
            
                
                <td>{currentAccount.product}</td>
                <td>{currentAccount.observation}</td>
                <td>${currentAccount.price}</td>
                <td>
                  <Link href="/[id]/currenAccountClient1" as={`/${currentAccount._id}/currenAccountClient1`} legacyBehavior>
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
      <CurrenAccountClient1Print companys={companys}  image="/logo.png" filteredCurrentAccountClient1={filteredCurrentAccountClient1} totalPrice={totalPrice} />
      <CurrenAccountClient1PayModal isOpen={CurrentAccountClient1PayModalIsOpen} closeModal={closeCurrentAccountClient1Pay} totalPrice={totalPrice} currentAccountClient1s={currentAccountClient1s} />
      <CurrentAccountClient1Modal isOpen={CurrentAccountClient1ModalIsOpen} closeModal={closeCurrentAccountClient1} />
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
  
   

  const result = await CurrentAccountClient1.find({});
  const currentAccountClient1s = result.map((doc) => {
    const currentAccountClient1 = doc.toObject();
    currentAccountClient1._id = currentAccountClient1._id.toString();
    currentAccountClient1.createdAt = currentAccountClient1.createdAt.toISOString();
    return currentAccountClient1;
  });

  return { props: { currentAccountClient1s, companys } };
}
