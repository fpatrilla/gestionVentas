import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "../../components/Form/FormCompany";

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const EditCompany = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log("ID:", id);

  const {
    data: company,
    error,
    isValidating,
  } = useSWR(id ? `/api/company/${id}` : null, fetcher);

  useEffect(() => {
    console.log("Company data:", company); // Agrega este console.log para ver los datos de la compañía
  }, [company]);

  if (error) return <p>Failed to load</p>;
  if (isValidating) return <p>Loading...</p>;
  if (!company || !company.data) return null; // Agregar una comprobación adicional para company.data

  const companyForm = {
    companyname: company.data.companyname,
    companyType: company.data.companyType,
    owner: company.data.owner,
    cuit: company.data.cuit,
    web: company.data.web,
    email: company.data.email,
    city: company.data.city,
    telephone1: company.data.telephone1,
    telephone2: company.data.telephone2,
    celphone1: company.data.celphone1,
    celphone2: company.data.celphone2,
    address: company.data.address,
  };

  return (
    <Form
      formId="edit-company-form"
      companyForm={companyForm}
      forNewCompany={false}
    />
  );
};

export default EditCompany;
