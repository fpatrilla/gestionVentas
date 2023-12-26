import React, { useState , useEffect } from 'react';
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import dbConnect from '../lib/dbConnect';
import SaleTarjet from '../models/SaleTarjet';
import Link from 'next/link';
import { useRouter } from 'next/router';

// material icons

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

export default function SaleHistory({ salesTarjets }) {
  const [filter, setFilter] = useState('day');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [totalVentas, setTotalVentas] = useState(0);
  const [cantidadVentas, setCantidadVentas] = useState(0);
  const router = useRouter();

  const [message, setMessage] = useState('');
 
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
  
    const filteredSaleTarjets = salesTarjets.filter((saleTarjet) => {
      const saleTarjetDate = new Date(saleTarjet.createdAt);
      const saleTarjetDateUTC = new Date(
        Date.UTC(
          saleTarjetDate.getFullYear(),
          saleTarjetDate.getMonth(),
          saleTarjetDate.getDate()
        )
      );
      return saleTarjetDateUTC >= startDate && saleTarjetDateUTC <= endDate;
    });
  
    const sortedSaleTarjets = filteredSaleTarjets.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA; // Orden descendente
    });
  
    let totalVentas = 0;
    sortedSaleTarjets.forEach((saleTarjet) => {
      totalVentas += saleTarjet.price;
    });
  
    const cantidadVentas = sortedSaleTarjets.length;
  
    return { filteredSaleTarjets: sortedSaleTarjets, totalVentas, cantidadVentas };
  };

  const { filteredSaleTarjets, totalVentas, cantidadVentas } = getFilteredSales();
    setFilteredSales(filteredSaleTarjets);
    setTotalVentas(totalVentas);
    setCantidadVentas(cantidadVentas);
  }, [selectedDate, filter]);
;

  return (
    <div>
      <h1>
        Historial de Tarjeta
        <CreditCardIcon style={{ textDecoration: 'none', color: '#6c757d', height: '60px', width: '60px', marginLeft: '10px' }} />
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
          Total del día: <span style={{ fontWeight: 'bold', fontSize: '20px', marginRight: '8px' }}> ${totalVentas}</span>
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
              <th scope="col">Tipo</th>
              <th scope="col">Cuotas</th>
              <th scope="col">Codigo</th>
              <th scope="col">Producto</th>
              <th scope="col">Precio</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((salesTarjet, index) => (
              <tr key={salesTarjet._id}>
                <td>{index + 1}</td>
                <td>{format(new Date(salesTarjet.createdAt), 'dd/MM/yyyy HH:mm:ss')}</td>
                <td>{salesTarjet.nombre}</td>
                <td>{salesTarjet.formaPago}</td>
                <td>{salesTarjet.cuote}</td>
                <td>{salesTarjet.codigoAutorizacion}</td>
                <td>{salesTarjet.product}</td>
                <td>${salesTarjet.price}</td>
                <td>  <Link href="/[id]/tarjet" as={`/${salesTarjet._id}/tarjet`} legacyBehavior>
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

  const result = await SaleTarjet.find({});
  const salesTarjets = result.map((doc) => {
    const salesTarjet = doc.toObject();
    salesTarjet._id = doc._id.toString();
    salesTarjet.createdAt = salesTarjet.createdAt.toISOString();
    return salesTarjet;
  });

  let totalVentas = 0;
  salesTarjets.forEach((salesTarjet) => {
    totalVentas += salesTarjet.price;
  });

  return { props: { salesTarjets } };
}
