import React, { useState, useEffect } from "react";
import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Article from "../models/Article";

import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

export default function Articles({ articles }) {
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filtered = articles.filter(
      (article) =>
        article.code.toString().includes(searchTerm) ||
        article.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const sortedFiltered = filtered.sort((a, b) => a.code - b.code); // Sort by article code in descending order
  
    setFilteredArticles(sortedFiltered);
  }, [searchTerm, articles]);
  

  return (
    <div>
      <h1>Articulos
      <ShoppingBasketIcon className="iconhead" /></h1>
      <hr></hr>
      <div className="container text-center">
        <div className="row">
          <div style={{ display: "flex" }}>
            <div style={{ width: "70%", margin: "auto" }}>
              <input
                type="text"
                placeholder="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div style={{ width: "10%" }}>
              <Link href="/newArticle">
                <button
                  className="btn btn bg-danger float-end"
                  style={{ color: "white" }}
                >
                  <AddBusinessIcon />
                </button>
              </Link>
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
                          ? "text-danger font-bold"
                          : article.stock === 1
                          ? "text-warning font-bold"
                          : ""
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
    </div>
  );
}

/* Retrieves Articulos(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect();

  /* find all the data in our database */
  const result = await Article.find({});
  const articles = result.map((doc) => {
    const article = doc.toObject();
    article._id = article._id.toString();
    return article;
  });

  return { props: { articles } };
}
