import Form from '../components/Form/FormClient'

const NewClient = () => {
  const ClientForm = {
    name: '',
    lastname: '',
    city: '',
    number: '',
    dni: '',
    email: '',
    company: '',
    coment: [],
   
   
  }

  return <Form formId="add-client-form" clientForm={ClientForm} />
}

export default NewClient
