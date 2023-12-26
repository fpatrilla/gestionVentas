import Form from '../components/Form/FormArticle'

const NewArticle = () => {
  const ArticleForm = {
    name: '',
    stock: '',
    code: '',
    price: '',
    
  }

  return <Form formId="add-article-form" articleForm={ArticleForm} />
}

export default NewArticle
