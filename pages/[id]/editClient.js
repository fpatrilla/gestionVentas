import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "../../components/Form/FormClient";

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const EditClient = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: client,
    error,
    isLoading,
  } = useSWR(id ? `/api/client/${id}` : null, fetcher);

  if (error) return <p>Failed to load</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!client) return null;

  const clientForm = {
    name: client.name,
    lastname: client.lastname,
    city: client.city,
    number: client.number,
    dni: client.dni,
    email: client.email,
    coment: client.coment,
    company: client.company,
  };

  return (
    <Form
      formId="edit-client-form"
      clientForm={clientForm}
      forNewClient={false}
    />
  );
};

export default EditClient;
