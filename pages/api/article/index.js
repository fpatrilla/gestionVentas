import dbConnect from '../../../lib/dbConnect'
import Article from '../../../models/Article'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const article = await Article.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: article })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const article = await Article.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: article })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
const handleDescontar = async () => {
  if (stock > 0) {
    const updatedStock = stock - 1;
    setStock(updatedStock);

    try {
      await fetch(`/api/article/${article._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stock: updatedStock }),
      });

      // Opcionalmente, puedes mostrar una notificación de éxito
      Swal.fire('Stock actualizado', 'Se ha descontado un artículo del stock.', 'success');
    } catch (error) {
      setMessage('Failed to update the stock.');
    }
  }
};

const handleSumar = async () => {
  
    const updatedStock = stock + 1;
    setStock(updatedStock);

    try {
      await fetch(`/api/article/${article._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stock: updatedStock }),
      });
    } catch (error) {
      setMessage('Failed to update the stock.');
    }
  
};
