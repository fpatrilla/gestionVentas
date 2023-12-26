import React, { useState, useEffect } from "react";
import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Article from "../models/Article";

import { useRouter } from "next/router";

// Materia ui icons

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import StoreIcon from "@mui/icons-material/Store";

export default function NewSaleArticle({ articles }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [originalStockMap, setOriginalStockMap] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (!searchQuery) {
      setFilteredArticles(articles);
    } else {
      const filteredResults = articles.filter((article) => {
        const codeMatch = article.code
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        const nameMatch = article.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return codeMatch || nameMatch;
      });
      setFilteredArticles(filteredResults);
    }
  }, [searchQuery, articles]);

  const handleAddToSelection = (article) => {
    if (article.stock > 0) {
      setSelectedArticles((prevSelectedArticles) => [
        ...prevSelectedArticles,
        article,
      ]);
    }
    if (article.stock > 0) {
      // Copia el array de artículos filtrados
      const updatedArticles = [...filteredArticles];

      // Encuentra el índice del artículo en el array filtrado
      const articleIndex = updatedArticles.findIndex(
        (a) => a._id === article._id
      );

      // Si se encuentra el artículo, actualiza su stock
      if (articleIndex !== -1) {
        updatedArticles[articleIndex].stock -= 1;

        // Actualiza el array de artículos filtrados
        setFilteredArticles(updatedArticles);
      }
    }
  };

  // Función para cargar los artículos desde la base de datos
  const loadArticles = async () => {
    try {
      const response = await fetch("/api/articles");
      if (!response.ok) {
        throw new Error("Error al cargar los artículos.");
      }
      const data = await response.json();

      // Crear un mapa para almacenar el originalStock de cada artículo
      const originalStockMap = {};

      // Agregar una propiedad para almacenar el stock original de cada artículo
      const articlesWithOriginalStock = data.map((article) => {
        const originalStock = article.stock; // Guardar el valor original en una constante
        originalStockMap[article._id] = originalStock; // Guardar originalStock en el mapa
        return {
          ...article,
          originalStock: originalStock,
        };
      });

      setFilteredArticles(articlesWithOriginalStock); // Actualiza los artículos con el stock original
      setOriginalStockMap(originalStockMap); // Almacenar el mapa en el estado
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleAddArticles = () => {
    if (selectedArticles.length > 0) {
      const selectedArticleList = selectedArticles.map((article) => ({
        articleId: article._id,
        name: article.name,
        code: article.code,
        price: article.price,
      }));
      router.push({
        pathname: "/soldArticle",
        query: { articles: JSON.stringify(selectedArticleList) },
      });
    }
  };

  const handleResetSelection = () => {
    setSelectedArticles([]);
    window.location.reload();
  };

  return (
    <div>
      <h1>
        Articulos
        <StoreIcon
          style={{
            textDecoration: "none",
            color: "red",
            height: "60px",
            width: "60px",
            marginLeft: "10px",
          }}
        />
      </h1>

      {selectedArticles.length > 0 && (
        <button
          className="btn btn-danger float-end"
          style={{ marginTop: "-50px", width: "130px" }}
          onClick={handleAddArticles}
        >
          <MonetizationOnIcon />
          <ArrowCircleRightIcon />
        </button>
      )}

      <hr />
      <div style={{ display: "flex" }}>
        <div style={{ width: "6%" }}>
          <button className="btn btn-secondary float-start">
            <Link
              href="/newSale"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ArrowBackIcon />
            </Link>
          </button>
        </div>
        <div style={{ width: "60%", margin: "auto" }}>
          <form>
            <div className="form-group d-flex align-items-center mr-2">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar Articulos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div style={{ width: "15%", display: "flex", marginLeft: "8%" }}>
          <div>
            <button
              className="btn btn-danger"
              onClick={handleAddArticles}
              disabled={selectedArticles.length === 0}
            >
              <ShoppingCartCheckoutIcon /> ({selectedArticles.length})
            </button>
          </div>
          <div style={{ marginLeft: "4%" }}>
            {selectedArticles.length > 0 && (
              <button
                className="btn btn-secondary"
                onClick={handleResetSelection}
              >
                <RestartAltIcon />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="container text-center">
        <div className="row">
          <div className="col-12">
            <br />
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col-1">Codigo</th>
                  <th scope="col-2">Articulo</th>
                  <th scope="col-2">Stock</th>
                  <th scope="col-2">Precio $</th>
                  <th scope="col-5">Acciones</th>
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
                    <td>
                      <button
                        className={`btn ${
                          article.stock === 0 ? "btn-light" : "btn-success"
                        } ${article.stock === 0 ? "disabled" : ""}`}
                        style={{ margin: "3px" }}
                        onClick={() => handleAddToSelection(article)}
                        disabled={article.stock === article.originalStock}
                      >
                        <AddShoppingCartIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-2" style={{ paddingTop: "20px" }}>
            <div className="form-group mr-2"></div>
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
