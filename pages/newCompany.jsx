import Form from '../components/Form/FormCompany'

const NewCompany = () => {
  const CompanyForm = {
    companyname: '',
    city: '',
    owner: '',
    email: '',
    web: '',
    telephone1: '',
    telephone2: '',
    celphone1: '',
    celphone2: '',
    cuit:'',
    companyType: '',
    address: '',
    

   
   
  }

  return <Form formId="add-company-form" companyForm={CompanyForm} />
}

export default NewCompany