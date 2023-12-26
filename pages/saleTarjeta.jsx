import React from 'react';
import { format } from 'date-fns';
import dbConnect from '../lib/dbConnect';
import SaleTarjet from '../models/SaleTarjet';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';



//material icons
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export default function saleTarjeta({ salesTarjets, morningTotal, eveningTotal, totalVentas }) {
  return (
    <div>
      <h1>Ventas / Tarjeta
      <CreditCardIcon 
                style={{ textDecoration: 'none', color: '#6c757d', height: '60px', width: '60px',marginLeft:"10px" }}
              />
      
      <Link href="/newSale"><div className='btn btn bg-danger float-end'><LocalOfferIcon style={{color:"white"}}/></div></Link>
      </h1>
      <hr></hr>
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
              <th scope="cols-1">Codigo</th>
              <th scope="col">Fecha y Hora</th>
              <th scope="col">Titular</th>
              <th scope="col">tipo</th>
              <th scope="col">Cuotas</th>
              <th scope="col">Código Autorización</th>
              <th scope="col">Producto</th>
              <th scope="col">Precio</th>
            </tr>
          </thead>
          <tbody>
            {salesTarjets.map((salesTarjet, index) => (
              <tr key={salesTarjet._id}>
                <td>{index}</td>
                <td>{salesTarjet.createdAt}</td>
                <td>{salesTarjet.name} {salesTarjet.lastname}</td>
                <td>{salesTarjet.formaPago}</td>
                <td>{salesTarjet.cuote}</td>
                <td>{salesTarjet.codigoAutorizacion}</td>
                <td>{salesTarjet.product}</td>
                <td>${salesTarjet.price}</td>
                <td>  <Link href="/[id]/saleTarjet" as={`/${salesTarjet._id}/saleTarjet`} legacyBehavior>
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

  const morningSales = await SaleTarjet.aggregate([
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
  

  const eveningSales = await SaleTarjet.aggregate([
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

  const result = await SaleTarjet.find({
    createdAt: { $gte: startOfDay, $lt: endOfDay },
  }).sort({ createdAt: -1 });
  
  const salesTarjets = result.map((doc) => {
    const salesTarjets = doc.toObject();
    salesTarjets._id = salesTarjets._id.toString();
    salesTarjets.createdAt = format(new Date(salesTarjets.createdAt), 'dd-MM-yyyy HH:mm');
    return salesTarjets;
  });
  
 

  let totalVentas = 0;
  salesTarjets.forEach((salesTarjet) => {
    totalVentas += salesTarjet.price;
  });

  return { props: { salesTarjets, morningTotal, eveningTotal, totalVentas } };
}
