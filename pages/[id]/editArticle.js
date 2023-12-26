import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "../../components/Form/FormArticle";

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const EditArticle = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: article,
    error,
    isLoading,
  } = useSWR(id ? `/api/article/${id}` : null, fetcher);

  if (error) return <p>Failed to load</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!article) return null;

  const articleForm = {
    name: article.name,
    code: article.code,
    stock: article.stock,
    price: article.price,
  };

  return (
    <Form
      formId="edit-article-form"
      articleForm={articleForm}
      forNewArticle={false}
    />
  );
};

export default EditArticle;
