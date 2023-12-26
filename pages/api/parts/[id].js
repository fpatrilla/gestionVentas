import dbConnect from '../../../lib/dbConnect'
import Part from '../../../models/Part'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
   

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedPart= await Part.deleteOne({ _id: id })
        if (!deletedPart) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
