import dbConnect from '../../../lib/dbConnect';
import ArticleSale from '../../../models/ArticleSale';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const articleSales = await ArticleSale.find({}); /* encontrar todos los artículos de venta en la base de datos */
        res.status(200).json({ success: true, data: articleSales });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const currentDate = new Date();
        const newArticleSale = await ArticleSale.create({ ...req.body, createdAt: currentDate }); /* crear una nueva venta de artículo en la base de datos y la fecha */
        res.status(201).json({ success: true, data: newArticleSale });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
