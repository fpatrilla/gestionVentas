import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
import Link from "next/link";

//material icons

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SaveIcon from "@mui/icons-material/Save";

const Form = ({ formId, companyForm, forNewCompany = true }) => {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    companyname: companyForm.companyname,
    owner: companyForm.owner,
    companyType: companyForm.companyType,
    address: companyForm.address,
    city: companyForm.city,
    telephone1: companyForm.telephone1,
    telephone2: companyForm.telephone2,
    email: companyForm.email,
    web: companyForm.web,
    celphone1: companyForm.celphone1,
    celphone2: companyForm.celphone2,
    cuit: companyForm.cuit,
  });

  const putData = async (form) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/company/${id}`, {
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

      mutate(`/api/company/${id}`, data, false);
      router.push("/company");
    } catch (error) {
      setMessage("Failed to update company");
    }
  };

  const postData = async (form) => {
    try {
      const res = await fetch("/api/company", {
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

      router.push("/company");
    } catch (error) {
      setMessage("Failed to add company");
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0) {
      forNewCompany ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  return (
    <>
      <div className="title-container">
        <h1>
          Empresa
          <ApartmentIcon
            className="icon"
            style={{
              textDecoration: "none",
              color: "#198754",
              height: "60px",
              width: "60px",
              marginLeft: "10px",
            }}
          />
        </h1>
      </div>
      <hr></hr>
      <button className="btn btn-secondary float-start">
        <Link
          href="/company"
          style={{ textDecoration: "none", color: "white" }}
        >
          <ArrowBackIcon />
        </Link>
      </button>
      <div
        style={{
          width: "60%",
          margin: "auto",
          border: "1px solid",
          borderRadius: "30px",
          borderBlockColor: "#adb5bd",
          backgroundColor: "#e9ecef",
          padding: "30px",
        }}
      >
        <form id={formId} onSubmit={handleSubmit}>
          <label htmlFor="companyname">Nombre de la Empresa</label>
          <input
            type="text"
            name="companyname"
            value={form.companyname}
            onChange={handleChange}
            required
          />
          <label htmlFor="owner">Responsable</label>
          <input
            type="text"
            name="owner"
            value={form.owner}
            onChange={handleChange}
            required
          />

          <label htmlFor="companyType">Rubro</label>
          <input
            type="text"
            name="companyType"
            value={form.companyType}
            onChange={handleChange}
            required
          />

          <label htmlFor="address">Direccion</label>
          <input
            type="text"
            maxLength="20"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />

          <label htmlFor="city">Localidad</label>
          <input
            type="text"
            maxLength="30"
            name="city"
            value={form.city}
            onChange={handleChange}
            required
          />

          <label htmlFor="web">Web</label>
          <input
            type="text"
            name="web"
            value={form.web}
            onChange={handleChange}
          />

          <label htmlFor="date1">Email</label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <label htmlFor="cuit">Cuit</label>
          <input
            type="text"
            name="cuit"
            value={form.cuit}
            onChange={handleChange}
          />
          <label htmlFor="telephone1">Telefono</label>
          <input
            type="text"
            name="telephone1"
            value={form.telephone1}
            onChange={handleChange}
          />

          <label htmlFor="telephone2">Telefono:</label>
          <input
            type="text"
            name="telephone2"
            value={form.telephone2}
            onChange={handleChange}
          />
          <label htmlFor="celphone1">Celular:</label>
          <input
            type="number"
            name="celphone1"
            value={form.celphone1}
            onChange={handleChange}
          />
          <label htmlFor="celphone2">Celular:</label>
          <input
            type="number"
            name="celphone2"
            value={form.celphone2}
            onChange={handleChange}
          />

          <div style={{ marginLeft: "30%", marginTop: "20px" }}>
            <button
              type="submit"
              className="btn bg-success"
              style={{ margin: "5px", width: "100px" }}
            >
              <SaveIcon style={{ color: "white" }} />
            </button>
          </div>
        </form>
        <p>{message}</p>
      </div>

      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{errors[err]}</li>
        ))}
      </div>
    </>
  );
};

export default Form;
