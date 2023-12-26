import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dbConnect from '../lib/dbConnect'
import Company from '../models/Company';

export default function EditCompany({ company }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyname: company.companyname,
    companyType: company.companyType,
    owner: company.owner,
    cuit: company.cuit,
    web: company.web,
    email: company.email,
    city: company.city,
    telephone1: company.telephone1,
    telephone2: company.telephone2,
    celphone1: company.celphone1,
    celphone2: company.celphone2,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/company/${company._id}`, { // Cambiar aquí a "/api/company/${company._id}"
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (res.status === 200) {
        router.push('/');
      } else {
        console.error('Error updating company');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Edit Company</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="companyname">Company Name</label>
          <input type="text" id="companyname" name="companyname" value={formData.companyname} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="companyType">Company Type</label>
          <input type="text" id="companyType" name="companyType" value={formData.companyType} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="owner">Owner</label>
          <input type="text" id="owner" name="owner" value={formData.owner} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="cuit">Cuit</label>
          <input type="text" id="cuit" name="cuit" value={formData.cuit} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="web">Web</label>
          <input type="text" id="web" name="web" value={formData.web} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="telephone1">Telephone 1</label>
          <input type="text" id="telephone1" name="telephone1" value={formData.telephone1} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="telephone2">Telephone 2</label>
          <input type="text" id="telephone2" name="telephone2" value={formData.telephone2} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="celphone1">Celphone 1</label>
          <input type="text" id="celphone1" name="celphone1" value={formData.celphone1} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="celphone2">Celphone 2</label>
          <input type="text" id="celphone2" name="celphone2" value={formData.celphone2} onChange={handleChange} />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  await dbConnect();

  const company = await Company.findById(params.id);
  const companyData = JSON.parse(JSON.stringify(company));

  return {
    props: { company: companyData },
  };
}
