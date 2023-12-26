import React, { useState, useEffect } from 'react';
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import dbConnect from '../lib/dbConnect';
import SalesCheq from '../models/SaleCheq';
import Link from 'next/link';

// material icons
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function HistoryCheq({ salesCheqs }) {
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

      const filteredSaleCheqs = salesCheqs.filter((saleCheq) => {
        const saleCheqDate = new Date(saleCheq.createdAt);
        const saleCheqDateUTC = new Date(
          Date.UTC(
            saleCheqDate.getFullYear(),
            saleCheqDate.getMonth(),
            saleCheqDate.getDate()
          )
        );
        return saleCheqDateUTC >= startDate && saleCheqDateUTC <= endDate;
      });

      const sortedSaleCheqs = filteredSaleCheqs.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA; // Orden descendente
      });

      let totalVentas = 0;
      sortedSaleCheqs.forEach((saleCheq) => {
        totalVentas += saleCheq.price;
      });

      const cantidadVentas = sortedSaleCheqs.length;

      return { filteredSaleCheqs: sortedSaleCheqs, totalVentas, cantidadVentas };
    };

    const { filteredSaleCheqs, totalVentas, cantidadVentas } = getFilteredSales();
    setFilteredSales(filteredSaleCheqs);
    setTotalVentas(totalVentas);
    setCantidadVentas(cantidadVentas);
  }, [selectedDate, filter]);

  return (
    <div>
      <h1>
        Historial de Cheques
        <SubtitlesIcon
          style={{
            textDecoration: 'none',
            color: '#6c757d',
            height: '60px',
            width: '60px',
            marginLeft: '10px',
          }}
        />
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
            <span
              className="mr-2 btn btn bg-primary"
              style={{ marginRight: '8px', textDecoration: 'none', color: 'white' }}
            >
              Caja <CurrencyExchangeIcon style={{ marginLeft: '1px' }} />
            </span>
          </Link>
          <Link href="/historyTarjet">
            <span
              className="mr-2 btn btn bg-secondary"
              style={{ marginRight: '8px', textDecoration: 'none', color: 'white' }}
            >
              Tarjeta <CreditCardIcon style={{ marginLeft: '1px' }} />
            </span>
          </Link>
          <Link href="/historyCheq" style={{ marginRight: '8px' }}>
            <span
              className="mr-2 btn btn bg-dark"
              style={{ marginRight: '8px', textDecoration: 'none', color: 'white' }}
            >
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

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Fecha y Hora</th>
              <th scope="col">Titular</th>
              <th scope="col">Dador</th>
              <th scope="col">Banco</th>
              <th scope="col">N* Cheque</th>
              <th scope="col">F. Cobro</th>
              
              <th scope="col">Tenedor</th>
             
              <th scope="col">Precio</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((salesCheq, index) => (
              <tr key={salesCheq._id}>
                <td>{index}</td>
                <td>{format(new Date(salesCheq.createdAt), 'dd/MM/yyyy')}</td>
                <td>{salesCheq.nombre}</td>
                <td>{salesCheq.dador}</td>
                <td>{salesCheq.bank}</td>
                <td>{salesCheq.NumCheq}</td>
                <td>{salesCheq.FechDep}</td>
               
               
                <td>{salesCheq.tenedor}</td>
                
                 <td>${salesCheq.price}</td>
                 <td style={{padding:"13px"}}  >
                        <div className={`estadoCheq ${salesCheq.estado}`} style={{borderRadius:"10px", padding:"3px"}}>{salesCheq.estado}</div>
                      </td>
                <td>
                      <Link href="/[id]/editCheq" as={`/${salesCheq._id}/editCheq`} legacyBehavior>
                        <button className="btn btn-warning" style={{ margin: '3px', color:'white' }}>
                          <ModeEditOutlineIcon/>
                        </button>
                      </Link> <Link href="/[id]/cheq" as={`/${salesCheq._id}/cheq`} legacyBehavior>
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
  );
}

export async function getServerSideProps() {
  await dbConnect();

  const result = await SalesCheq.find({});
  const salesCheqs = result.map((doc) => {
    const salesCheq = doc.toObject();
    salesCheq._id = salesCheq._id.toString();
    salesCheq.createdAt = salesCheq.createdAt.toISOString();
    return salesCheq;
  });
  let totalVentas = 0;
  salesCheqs.forEach((salesCheq) => {
    totalVentas += salesCheq.price;
  });

  return { props: { salesCheqs } };
}
