import dbConnect from '../../../lib/dbConnect'
import Article from '../../../models/Article'

export default async function handler(req, res) {
  await dbConnect()

  const { q } = req.query

  try {
    const result = await Article.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { code: { $regex: q, $options: 'i' } },
      ],
    })

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving article' })
  }
}