import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dbConnect from '../lib/dbConnect';
import Article from '../models/Article';
import Company from '../models/Company';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import StockOrdersPrint from '../components/Print/StockOrdersPrint';


import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

export default function StockOrders({ articles, companys }) {
    const [filteredArticles, setFilteredArticles] = useState(articles);
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      const filtered = articles.filter(
        (article) =>
          article.code.toString().includes(searchTerm) ||
          article.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      // Filtra aún más para incluir solo artículos con stock 0 o 1
      const filteredWithStock0Or1 = filtered.filter(
        (article) => article.stock === 0 || article.stock === 1
      );
  
      // Ordena los artículos filtrados por identificador en orden descendente
      const sortedFiltered = filteredWithStock0Or1.sort(
        (a, b) => b.identifier - a.identifier
      );
  
      setFilteredArticles(sortedFiltered);
    }, [searchTerm, articles]);
  
    // Calcula la cantidad de artículos con stock 0 o 1
    const countArticlesWithStock0Or1 = filteredArticles.length;

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      const printContent = document.getElementById('print-StockOrdersPrint').innerHTML;
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
    <div style={{display:"flex"}}>

        <div>
        <h1>Pedidos 
      
      <LocalGroceryStoreIcon 
                style={{ textDecoration: 'none', color: '#dc3545', height: '60px', width: '60px',marginLeft:"10px" }}
              />
      
      </h1>

        </div>
        <div style={{marginLeft:"auto", marginRight:"8%"}}>   
           <h3> <strong>Cantidad Articulos: {countArticlesWithStock0Or1}</strong></h3>

        </div>
        </div>
     

      <p></p>
      <hr></hr>
      <div className="container text-center">
      <div >
        <button className="btn btn-secondary float-start" style={{marginRight:"5%", marginTop:"1px"}}>
                <Link href="/varios" style={{ textDecoration: 'none', color: 'white' }}>
                   <ArrowBackIcon />
                </Link>
                </button>
        </div>
        <div className="row">
          <div style={{ display: 'flex' }}>
            <div style={{ width: '70%', margin:"auto" }}>
              <input
                type="text"
                placeholder="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
            <button className="btn btn-success"  onClick={handlePrint} style={{width:"60px"}}  >

<LocalPrintshopIcon/>

</button>
            </div>
           
          </div>
          <div className="col-12">
            <br></br>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col-1">Codigo</th>
                  <th scope="col-2">Articulo</th>
                  <th scope="col-2">Stock</th>
                  <th scope="col-2">Precio $</th>
                </tr>
              </thead>
              <tbody>
                {filteredArticles.map((article, index) => (
                  <tr key={article._id}>
                    <td>{article.code}</td>
                    <td>{article.name}</td>
                    <td
                      className={
                        article.stock === 0
                          ? 'text-danger font-bold'
                          : article.stock === 1
                          ? 'text-warning font-bold'
                          : ''
                      }
                    >
                      {article.stock}
                    </td>
                    <td>{article.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </div>
      </div>

<StockOrdersPrint  image="/logo.png"  companys={companys} filteredArticles={filteredArticles} countArticlesWithStock0Or1={countArticlesWithStock0Or1}  />
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
  const result = await Article.find({});
  const articles = result.map((doc) => {
    const article = doc.toObject();
    article._id = article._id.toString();
    return article;
  });

  return { props: { articles, companys } };
}
