import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "../../components/Form/FormCheq";

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const EditCheq = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: cheq,
    error,
    isLoading,
  } = useSWR(id ? `/api/sales/cheq/${id}` : null, fetcher);

  if (error) return <p>Failed to load</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!cheq) return null;

  const cheqForm = {
    nombre: cheq.nombre,
    price: cheq.price,
    bank: cheq.bank,
    dador: cheq.dador,
    NumCheq: cheq.NumCheq,
    FechDep: cheq.FechDep,
    tenedor: cheq.tenedor,
    observation: cheq.observation,
    product: cheq.product,
  };

  return (
    <Form formId="edit-cheq-form" cheqForm={cheqForm} forNewCheq={false} />
  );
};

export default EditCheq;
