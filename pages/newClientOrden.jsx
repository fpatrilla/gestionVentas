import React from 'react';
import NewClientAndOrdenForm from '../components/Form/NewClientAndOrden';
import Company from '../models/Company';
import dbConnect from '../lib/dbConnect';

const NewClientAndOrden = ({ companys,ordenRes }) => {
  const ClientForm = {
    name: '',
    lastname: '',
    city: '',
    number: '',
    dni: '',
    email: '',
    comment: [],
  };

  const OrdenForm = {
    type: '',
    marca: '',
    model: '',
    issue: [],
    password: '',
    serialNumber: '',
    comentOrden: [],
    estado: 'Pendiente',
  };
  

  return (
    <>
      <NewClientAndOrdenForm clientForm={ClientForm} ordenForm={OrdenForm} companys={companys} />

    
    </>
  );
};
export async function getServerSideProps({ params }) {
  await dbConnect();
  const result = await Company.find({});
  const companys = result.map((doc) => {
    const company = doc.toObject();
    company._id = company._id.toString();
    return company;
  });

 

  return { props: {  companys } };
}
export default NewClientAndOrden;
