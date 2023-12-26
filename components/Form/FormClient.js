import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
import Link from "next/link";

//material icons

import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const Form = ({ formId, clientForm, forNewClient = true }) => {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: clientForm.name,
    lastname: clientForm.lastname,
    city: clientForm.city,
    number: clientForm.number,
    dni: clientForm.dni,
    email: clientForm.email,
    company: clientForm.company,
    coment: clientForm.coment,
  });

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/client/${id}`, {
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

      mutate(`/api/client/${id}`, data, false); // Update the local data without a revalidation
      router.push("/clients");
    } catch (error) {
      setMessage("Failed to update client");
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch("/api/client", {
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

      router.push("/clients");
    } catch (error) {
      setMessage("Failed to add client");
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

  /* Makes sure client info is filled for client name, owner name, city*/
  const formValidate = () => {
    let err = {};
    if (!form.name) err.name = "Name is required";
    if (!form.lastname) err.lastname = "lastname is required";
    if (!form.city) err.city = "City is required";

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      forNewClient ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  return (
    <>
      <div>
        <div>
          <div>
            <h1>
              Nuevo Cliente
              <PersonAddAltIcon
                style={{
                  textDecoration: "none",
                  color: "#0d6efd",
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
            href="/clients"
            style={{ textDecoration: "none", color: "white" }}
          >
            <ArrowBackIcon />
          </Link>
        </button>
        <div className="client">
          <div>
            <form id={formId} onSubmit={handleSubmit}>
              <h5 htmlFor="name">Nombre:</h5>
              <input
                type="text"
                maxLength="20"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                style={{ textAlign: "center" }}
              />

              <h5 htmlFor="lastname">Apellido:</h5>
              <input
                type="text"
                maxLength="20"
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                required
                style={{ textAlign: "center" }}
              />

              <h5 htmlFor="city">Localidad:</h5>
              <input
                type="text"
                maxLength="30"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                style={{ textAlign: "center" }}
              />

              <h5 htmlFor="number">Numero de contacto:</h5>
              <input
                type="number"
                name="number"
                value={form.number}
                onChange={handleChange}
                style={{ textAlign: "center" }}
              />
              <h5 htmlFor="dni">Dni/Cuit:</h5>
              <input
                type="dni"
                name="dni"
                value={form.dni}
                onChange={handleChange}
                style={{ textAlign: "center" }}
              />
              <h5 htmlFor="email">Correo electrónico:</h5>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                style={{ textAlign: "center" }}
              />
              <h5 htmlFor="company">Empresa:</h5>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                style={{ textAlign: "center" }}
              />

              <h5 htmlFor="coment">Comentario:</h5>
              <textarea
                name="coment"
                maxLength="60"
                value={form.coment}
                onChange={handleChange}
              />

              <div style={{ marginLeft: "35%" }}>
                <button
                  type="submit"
                  className="btn bg-danger"
                  style={{ color: "white" }}
                >
                  Guardar
                  <SaveIcon style={{ color: "white", width: "30px" }} />
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
  );
};

export default Form;
