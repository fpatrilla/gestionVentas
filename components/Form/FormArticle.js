import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

//materia icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";

const Form = ({ formId, articleForm, forNewArticle = true }) => {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    code: articleForm.code,
    name: articleForm.name,
    stock: articleForm.stock,
    price: articleForm.price,
  });

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/article/${id}`, {
        method: "PUT",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      mutate(`/api/article/${id}`, data, false); // Update the local data without a revalidation
      router.push("/adminArticle");
    } catch (error) {
      setMessage("Failed to update articles");
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch("/api/article", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push("/articles");
    } catch (error) {
      setMessage("Failed to add Article");
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const value =
      target.name === "poddy_trained" ? target.checked : target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  /* Makes sure article info is filled for article name, owner name, city*/
  const formValidate = () => {
    let err = {};
    if (!form.code) err.code = "Code is required";
    if (!form.name) err.name = "Name is required";
    if (!form.stock) err.stock = "stock is required";
    if (!form.price) err.price = "Price is required";

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      forNewArticle ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };
  const handleGoBack = () => {
    router.back();
  };
  return (
    <>
      <h1>Articulo</h1>
      <hr></hr>
      <div>
        <button className="btn btn-secondary" onClick={handleGoBack}>
          {" "}
          <ArrowBackIcon />{" "}
        </button>
      </div>

      <div className="article">
        <div>
          <form id={formId} onSubmit={handleSubmit}>
            <div style={{ padding: "1%" }}>
              <label htmlFor="name">
                <h5>Nombre del Articulo:</h5>
              </label>

              <input
                type="text"
                maxLength="60"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                style={{ width: "80%", margin: "auto", textAlign: "center" }}
              />
            </div>
            <div style={{ padding: "1%" }}>
              <label htmlFor="stock">
                <h5>Stock:</h5>
              </label>
              <input
                type="stock"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                style={{ width: "30%", margin: "auto", textAlign: "center" }}
              />
            </div>
            <div style={{ padding: "1%" }}>
              <label htmlFor="code">
                <h5>Codigo:</h5>
              </label>
              <input
                type="code"
                name="code"
                value={form.code}
                onChange={handleChange}
                style={{ width: "30%", margin: "auto", textAlign: "center" }}
              />
            </div>
            <div style={{ padding: "1%" }}>
              <label htmlFor="price">
                <h5>Precio $:</h5>
              </label>
              <input
                type="price"
                name="price"
                value={form.price}
                onChange={handleChange}
                style={{ width: "30%", margin: "auto", textAlign: "center" }}
              />
            </div>
            <div style={{ padding: "1%" }}>
              <button
                type="submit"
                className="btn bg-danger"
                style={{ margin: "5px", color: "white", width: "130px" }}
              >
                Guardar <SaveIcon />
              </button>
            </div>
          </form>
        </div>
      </div>

      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  );
};

export default Form;
