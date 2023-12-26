import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Article from '../models/Article'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ArrowBack } from '@mui/icons-material';

export default function editArticle({ articles }) {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [previousArticles, setPreviousArticles] = useState(articles)
  const [percentageIncrease, setPercentageIncrease] = useState(0)

  const handleSearch = async (e) => {
    e.preventDefault()

    if (!query) {
      setSearchResults([])
      return
    }

    setPreviousArticles(articles)
    const response = await fetch(`/api/article/search?q=${query}`)
    const data = await response.json()

    setSearchResults(data)
  }

  const handleBack = () => {
    setSearchResults([])
    setQuery('')
  }

  const filteredArticles = searchResults.length ? searchResults : previousArticles

  // incrementar precios

  const handlePriceIncrease = () => {
    const updatedArticles = filteredArticles.map((article) => {
      const updatedArticle = { ...article }
      updatedArticle.price = article.price * (1 + percentageIncrease / 100)
      return updatedArticle
    })
    setPreviousArticles(updatedArticles)
    setSearchResults([])
    setQuery('')
  }

  return (
    <div>
  
      <h1>Edicion Articulos</h1>
      <hr></hr>
      

      <div className="container text-center">
        <div className="row">

          <div className="col-10">
          <button className="btn btn-secondary" style={{ color: 'white' }}>
              <Link href="/articles">
                <ArrowBack style={{ color: 'white' }} />
              </Link>
            </button>

            <form onSubmit={handleSearch} >
              <div className="form-group mr-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar Articulos..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />

              </div>
              <button type="submit" className="btn btn-primary">
                Buscar
              </button>
              {searchResults.length > 0 && (
                <button className="btn btn-secondary ml-2" onClick={handleBack}>
                  Volver
                </button>
              )}
            </form>
            <br></br>
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
                    <td>
                      {article.code}
                    </td>
                    <td>{article.name}</td>
                    <td className={article.stock === 0 ? "text-danger font-bold" : article.stock === 1 ? "text-warning font-bold" : ""}>
                      {article.stock}
                    </td>
                    <td>{article.price}</td>
                    <td>
                      <Link href="/[id]/editArticle" as={`/${article._id}/editArticle`} legacyBehavior>
                        <button className="btn btn-warning" style={{ margin: '3px', color: 'white' }}>
                          <ModeEditOutlineIcon />
                        </button>
                      </Link>
                      <Link href="/[id]/article" as={`/${article._id}/article`} legacyBehavior>
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
          <div className="col-2" style={{ textDecoration: 'none', color: 'white' }}>
            <button className="btn btn-secondary" style={{ color: 'white' }}>
              <Link href="/articles">
                <ArrowBack style={{ color: 'white' }} />
              </Link>
            </button>
            <br></br>
            <hr></hr>
            <div className="form-group mr-2">
              <div> Aumentar precios en %:</div>
              <input
                type="text"
                className="form-control"
                placeholder="Porcentaje de aumento"
                value={percentageIncrease}
                onChange={(e) => setPercentageIncrease(parseInt(e.target.value))}
              />
            </div>
            <br></br>
            <button
              type="button"
              className="btn btn-primary ml-2"
              onClick={handlePriceIncrease}
            >
              Aumentar precios
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* Retrieves Articulos(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const result = await Article.find({})
  const articles = result.map((doc) => {
    const article = doc.toObject()
    article._id = article._id.toString()
    return article
  })

  return { props: { articles } }
}
