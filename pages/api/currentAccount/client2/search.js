import dbConnect from '../../../../lib/dbConnect'
import CurrentAccountClient2 from '../../../../models/CurrentAccountClient2'

export default async function handler(req, res) {
  await dbConnect()

  const { q } = req.query

  try {
    const result = await CurrentAccountClient2.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { lastname: { $regex: q, $options: 'i' } },
      ],
    })

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving clients' })
  }
}