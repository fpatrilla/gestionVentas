import dbConnect from '../../../../lib/dbConnect';
import Article from '../../../../models/Article';

export default async function handler(req, res) {
  const {
    method,
    query: { articleId },
  } = req;

  await dbConnect();

  switch (method) {
    case 'PUT':
      try {
        // Encuentra el artículo por su ID en la base de datos
        const article = await Article.findById(articleId);

        if (!article) {
          return res.status(404).json({ success: false, error: 'Artículo no encontrado' });
        }

        // Descontar el stock del artículo
        article.stock--;

        // Guardar los cambios en la base de datos
        await article.save();

        res.status(200).json({ success: true, data: article });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
