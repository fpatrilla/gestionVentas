import React from 'react';
import { format } from 'date-fns';
import dbConnect from '../lib/dbConnect';
import Sales from '../models/Sales';
import Link from 'next/link';

import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


export default function Ventas({ saless, morningTotal, eveningTotal, totalVentas }) {
  return (
    <div>
      <h1>Ventas / Caja
      <CurrencyExchangeIcon 
                style={{ textDecoration: 'none', color: '#0d6efd', height: '60px', width: '60px',marginLeft:"10px" }}
              />
              <Link href="/newSale"><div className='btn btn bg-danger float-end'><LocalOfferIcon style={{color:"white"}}/></div></Link>
      </h1>
      
      <hr />
      <div className="d-flex justify-content-between">
        <div>
          Total del día:
          <span style={{ fontWeight: 'bold', fontSize: '20px', marginRight: '8px', marginLeft: '3px'}}>
            ${totalVentas}
          </span>
          Total de la Mañana: 
          <span style={{ fontWeight: 'bold', fontSize: '20px', marginRight: '8px',  marginLeft: '3px' }}>
            ${morningTotal}
          </span>
          Total de la Tarde:
          <span style={{ fontWeight: 'bold', fontSize: '20px', marginLeft: '3px' }}>
            ${eveningTotal}
          </span>
        </div>
        <div>
          <Link href="/ventas">
            <span className="mr-2 btn btn bg-primary" style={{ marginRight: '8px', textDecoration:"none", color:"white" }}>Caja <CurrencyExchangeIcon style={{marginLeft:"1px"}}/></span>
          </Link>
          <Link href="/saleTarjeta">
            <span className="mr-2 btn btn bg-secondary" style={{ marginRight: '8px', textDecoration:"none", color:"white" }}>Tarjeta <CreditCardIcon style={{marginLeft:"1px"}}/></span>
          </Link>
         
          <Link href="/saleCheq">
            <span className="mr-2 btn btn bg-dark" style={{ marginRight: '8px', textDecoration:"none", color:"white" }}>Cheques <SubtitlesIcon style={{marginLeft:"1px"}}/></span>
          </Link>
        </div>
      </div>

      <div className="container text-center">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Codigo</th>
              <th scope="col">Fecha y Hora</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Producto</th>
              <th scope="col">Precio</th>
            </tr>
          </thead>
          <tbody>
            {saless.map((sales, index) => (
              <tr key={sales._id}>
                <td>{index}</td>
                <td>{sales.createdAt}</td>
                <td>{sales.name}</td>
                <td>{sales.lastname}</td>
                <td>{sales.product}</td>
                <td>${sales.price}</td>
                <td>  <Link href="/[id]/sale" as={`/${sales._id}/sale`} legacyBehavior>
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

  const currentDate = new Date();
  const startOfDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    0, 0, 0
  );
  const endOfDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    23, 59, 59
  );

  const startMorning = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    7, 0, 0
  );
  const endMorning = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    13, 0, 0
  );

  const startEvening = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    15, 0, 0
  );
  const endEvening = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    20, 0, 0
  );

  const morningSales = await Sales.aggregate([
    {
      $match: {
        createdAt: { $gte: startMorning, $lt: endMorning },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$price' },
      },
    },
  ]);

  const eveningSales = await Sales.aggregate([
    {
      $match: {
        createdAt: { $gte: startEvening, $lt: endEvening },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$price' },
      },
    },
  ]);

  const morningTotal = morningSales.length > 0 ? morningSales[0].total : 0;
  const eveningTotal = eveningSales.length > 0 ? eveningSales[0].total : 0;

  const result = await Sales.find({
    createdAt: { $gte: startOfDay, $lt: endOfDay },
  }).sort({ createdAt: -1 });
  
  const saless = result.map((doc) => {
    const sales = doc.toObject();
    sales._id = sales._id.toString();
    sales.createdAt = format(new Date(sales.createdAt), 'dd-MM-yyyy HH:mm ');
    return sales;
  });

  let totalVentas = 0;
  saless.forEach((sales) => {
    totalVentas += sales.price;
  });

  return { props: { saless, morningTotal, eveningTotal, totalVentas } };
}
