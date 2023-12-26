import React, { useState, useEffect } from 'react';
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import dbConnect from '../lib/dbConnect';
import Sales from '../models/Sales';
import Link from 'next/link';

//material icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function SaleHistory({ sales }) {
  const [filter, setFilter] = useState('day');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [totalVentas, setTotalVentas] = useState(0);
  const [cantidadVentas, setCantidadVentas] = useState(0);
  
  useEffect(() => {
    const getFilteredSales = () => {
      let startDate, endDate;

      switch (filter) {
        case 'day':
          startDate = startOfDay(new Date(selectedDate));
          endDate = endOfDay(new Date(selectedDate));
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
        default:
          startDate = startOfDay(new Date(selectedDate));
          endDate = endOfDay(new Date(selectedDate));
          break;
      }
  

      const filteredSales = sales.filter((sale) => {
      const saleDate = new Date(sale.createdAt);
      const saletDateUTC = new Date(
        Date.UTC(
          saleDate.getFullYear(),
          saleDate.getMonth(),
          saleDate.getDate()
        )
      );
      return saletDateUTC >= startDate && saletDateUTC <= endDate;
    });
        const sortedSale= filteredSales.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA; // Orden descendente
    });

    let totalVentas = 0;
    sortedSale.forEach((sale) => {
      totalVentas += sale.price;
    });

    const cantidadVentas = sortedSale.length;
    return { filteredSales: sortedSale, totalVentas, cantidadVentas };

  };

  const { filteredSales, totalVentas, cantidadVentas } = getFilteredSales();
  setFilteredSales(filteredSales);
  setTotalVentas(totalVentas);
  setCantidadVentas(cantidadVentas);
}, [selectedDate, filter]);
;

  

  return (
    <div>
      <h1>
        Historial de Caja
        <AttachMoneyIcon style={{ textDecoration: 'none', color: '#dc3545', height: '60px', width: '60px', marginLeft: '10px' }} />
      </h1>
      <hr />

      <div className="d-flex justify-content-between">
        <div>
          <button className="btn btn-secondary float-start">
            <Link href="/administracion" style={{ textDecoration: 'none', color: 'white' }}>
              <ArrowBackIcon />
            </Link>
          </button>
        </div>
        <div>
          Total del día: <span style={{ fontWeight: 'bold', fontSize: '20px', marginRight: '8px'  }}> ${totalVentas}</span>
          Cantidad de ventas: <span style={{ fontWeight: 'bold', fontSize: '20px', marginRight: '8px' }}>{cantidadVentas}</span>
        </div>
        <div>
          <Link href="/saleHistory">
            <span className="mr-2 btn btn bg-primary" style={{ marginRight: '8px', textDecoration: 'none', color: 'white' }}>
              Caja <CurrencyExchangeIcon style={{ marginLeft: '1px' }} />
            </span>
          </Link>
          <Link href="/historyTarjet">
            <span className="mr-2 btn btn bg-secondary" style={{ marginRight: '8px', textDecoration: 'none', color: 'white' }}>
              Tarjeta <CreditCardIcon style={{ marginLeft: '1px' }} />
            </span>
          </Link>
          <Link href="/historyCheq" style={{ marginRight: '8px' }}>
            <span className="mr-2 btn btn bg-dark" style={{ marginRight: '8px', textDecoration: 'none', color: 'white' }}>
              Cheques <SubtitlesIcon style={{ marginLeft: '1px' }} />
            </span>
          </Link>
        </div>
      </div>

      <div className="container text-center">
        <div className="mb-3">
          <label htmlFor="filter" className="form-label">
            Filtrar por:
          </label>
          <select id="filter" className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="day">Día</option>
            <option value="week">Semana</option>
            <option value="month">Mes</option>
            <option value="year">Año</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="datepicker" className="form-label">
            Seleccionar fecha:
          </label>
          <input
            type="date"
            id="datepicker"
            className="form-control"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Fecha</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Producto</th>
              <th scope="col">Precio</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale, index) => (
              <tr key={sale._id}>
                <td>{index + 1}</td>
                <td>{format(new Date(sale.createdAt), 'dd/MM/yyyy HH:mm:ss')}</td>
                <td>{sale.name}</td>
                <td>{sale.lastname}</td>
                <td>{sale.product}</td>
                <td>${sale.price}</td>
                <td>  <Link href="/[id]/saleAdmin" as={`/${sale._id}/saleAdmin`} legacyBehavior>
                        <button className="btn btn-success" style={{ margin: '3px' }}>
                        <ArrowForwardIcon />
                        </button>
                      </Link></td>
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

  const result = await Sales.find({});
  const sales = result.map((doc) => {
    const sale = doc.toObject();
    sale._id = sale._id.toString();
    sale.createdAt = sale.createdAt.toISOString(); // Convertir la fecha a una cadena ISO
    return sale;
  });

  let totalVentas = 0;
  sales.forEach((sale) => {
    totalVentas += sale.price;
  });

  return { props: { sales } };
}
