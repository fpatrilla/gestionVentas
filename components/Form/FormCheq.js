import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
import Link from "next/link";

//material icons

import SubtitlesIcon from "@mui/icons-material/Subtitles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";

const Form = ({ formId, cheqForm, forNewCheq = true }) => {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    product: cheqForm.product,
    price: cheqForm.price,
    nombre: cheqForm.nombre,
    bank: cheqForm.bank,
    dador: cheqForm.dador,
    NumCheq: cheqForm.NumCheq,
    FechDep: cheqForm.FechDep,
    tenedor: cheqForm.tenedor,
    observation: cheqForm.observation,
  });

  const putData = async (form) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/sales/cheq/${id}`, {
        method: "PUT",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      mutate(`/api/sales/cheq/${id}`, data, false);
      router.push("/historyCheq");
    } catch (error) {
      setMessage("Error al actualizar el cheque");
    }
  };

  const postData = async (form) => {
    try {
      const res = await fetch("/api/sales/cheq", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push("/historyCheq");
    } catch (error) {
      setMessage("Error al agregar el artículo");
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      forNewCheq ? postData(form) : putData(form);
    } else {
      setErrors(errors);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <>
      <>
        <div>
          <div>
            <div>
              <h1>
                Editar de Cheques
                <SubtitlesIcon
                  style={{
                    textDecoration: "none",
                    color: "#6c757d",
                    height: "60px",
                    width: "60px",
                    marginLeft: "10px",
                  }}
                />
              </h1>
            </div>
          </div>
          <hr></hr>
          <button className="btn btn-secondary float-start">
            <Link
              href="/historyCheq"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ArrowBackIcon />
            </Link>
          </button>
          <div className="client">
            <div>
              <form id={formId} onSubmit={handleSubmit}>
                <label htmlFor="nombre">
                  <strong>Nombre</strong>:
                </label>
                <input
                  type="text"
                  maxLength="20"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  style={{ textAlign: "center" }}
                />

                <label htmlFor="bank">
                  <strong>Banco:</strong>
                </label>
                <input
                  type="text"
                  maxLength="20"
                  name="bank"
                  value={form.bank}
                  onChange={handleChange}
                  required
                  style={{ textAlign: "center" }}
                />

                <label htmlFor="dador">
                  <strong>Dador: </strong>
                </label>
                <input
                  type="text"
                  maxLength="30"
                  name="dador"
                  value={form.dador}
                  onChange={handleChange}
                  required
                  style={{ textAlign: "center" }}
                />

                <label htmlFor="tenedor">
                  <strong>Tenedor: </strong>
                </label>
                <input
                  type="text"
                  name="tenedor"
                  value={form.tenedor}
                  onChange={handleChange}
                  style={{ textAlign: "center" }}
                />

                <label htmlFor="NumCheq">
                  <strong>N. Cheque: </strong>
                </label>
                <input
                  type="number"
                  name="NumCheq"
                  value={form.NumCheq}
                  onChange={handleChange}
                  style={{ textAlign: "center" }}
                />

                <label htmlFor="FechDep">
                  <strong>Fecha de Cobro: </strong>
                </label>
                <input
                  type="text"
                  name="FechDep"
                  value={form.FechDep}
                  onChange={handleChange}
                  style={{ textAlign: "center" }}
                />

                <label htmlFor="product">
                  <strong>Producto: </strong>
                </label>
                <textarea
                  name="product"
                  maxLength="60"
                  value={form.product}
                  onChange={handleChange}
                  style={{ textAlign: "center" }}
                />

                <label htmlFor="price">
                  <strong>Precio $ : </strong>
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  style={{ textAlign: "center" }}
                />
                <label htmlFor="price">
                  <strong>Estdo: </strong>
                </label>
                <select
                  className="form-select"
                  aria-label="Default"
                  style={{ borderRadius: "60px", width: "100%" }}
                  name="estado"
                  value={form.estado}
                  onChange={handleFormChange}
                >
                  {["Pendiente", "Depositado", "Endosado"].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <label htmlFor="observation">
                  <strong>Observacion: </strong>
                </label>
                <input
                  type="text"
                  name="observation"
                  value={form.observation}
                  onChange={handleChange}
                  style={{ textAlign: "center" }}
                />
                <div style={{ marginLeft: "30%", marginTop: "20px" }}>
                  <button
                    type="submit"
                    className="btn bg-danger"
                    style={{ margin: "5px", color: "white" }}
                  >
                    Guardar <SaveIcon style={{ color: "white" }} />
                  </button>
                </div>
              </form>
              <p>{message}</p>
              <div>
                {Object.keys(errors).map((err, index) => (
                  <li key={index}>{err}</li>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
      <div>
        <hr />
      </div>

      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  );
};

export default Form;
