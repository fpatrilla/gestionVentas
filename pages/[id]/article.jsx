import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import Article from "../../models/Article";

import Swal from "sweetalert2";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const ArticlePage = ({ article }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [stock, setStock] = useState(article.stock);

  const handleDelete = async () => {
    const articleID = router.query.id;

    try {
      await fetch(`/api/article/${articleID}`, {
        method: "Delete",
      });

      Swal.fire({
        title: "¿Estás seguro que deseas eliminarlo?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/articles");
          Swal.fire("Eliminado", "El Articulo se ha eliminado.", "Exitoso");
        }
      });
    } catch (error) {
      setMessage("Failed to delete the articulo.");
    }
  };

  const handleDescontar = async () => {
    if (stock > 0) {
      const updatedStock = stock - 1;
      setStock(updatedStock); // Actualiza el estado local

      // Envía la solicitud PUT a la API para actualizar el stock
      try {
        await fetch(`/api/article/${article._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ stock: updatedStock }),
        });
      } catch (error) {
        setMessage("Failed to update the stock.");
      }
    }
  };

  const handleSumar = async () => {
    const updatedStock = stock + 1;
    setStock(updatedStock); // Actualiza el estado local

    // Envía la solicitud PUT a la API para actualizar el stock
    try {
      await fetch(`/api/article/${article._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stock: updatedStock }),
      });
    } catch (error) {
      setMessage("Failed to update the stock.");
    }
  };

  return (
    <div>
      <div>
        <h1>Articulos</h1>
      </div>
      <hr></hr>

      <div>
        <div style={{ width: "100%" }}>
          <button className="btn btn-secondary">
            <Link
              href="/adminArticle"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ArrowBackIcon />
            </Link>
          </button>
        </div>
        <div>
          <div className="article">
            <div>
              <strong>Nombre: {article.name}</strong>
            </div>
            <div style={{ marginTop: "18px" }}>
              <strong>Codigo: {article.code}</strong>
            </div>
            <div style={{ marginTop: "18px" }}>
              <strong>Stock: {stock}</strong>
            </div>
            <div style={{ marginTop: "18px" }}>
              <strong>Precio: ${article.price}</strong>
            </div>
            <div style={{ marginTop: "18px" }}>
              <Link
                href="/[id]/editArticle"
                as={`/${article._id}/editArticle`}
                legacyBehavior
              >
                <button
                  size="small"
                  className="btn btn-warning"
                  style={{ margin: "3px", color: "white" }}
                >
                  <ModeEditOutlineIcon />
                </button>
              </Link>
              <button
                size="small"
                className="btn btn-dark"
                onClick={handleDelete}
                style={{ margin: "5px" }}
              >
                <DeleteForeverIcon />
              </button>

              <button
                size="small"
                onClick={handleDescontar}
                className="btn btn-danger"
                style={{ margin: "5px" }}
              >
                {" "}
                <ThumbDownOffAltIcon />
              </button>
              <button
                size="small"
                onClick={handleSumar}
                className="btn btn-success"
              >
                <ThumbUpOffAltIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  const article = await Article.findById(params.id).lean();
  article._id = article._id.toString();

  return { props: { article } };
}

export default ArticlePage;
