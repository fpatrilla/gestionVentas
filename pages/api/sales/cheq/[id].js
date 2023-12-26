import dbConnect from '../../../../lib/dbConnect'
import SaleCheq from '../../../../models/SaleCheq'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const cheq = await SaleCheq.findById(id)
        if (!cheq) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: cheq })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const cheq = await SaleCheq.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!cheq) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: cheq })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedCheq = await SaleCheq.deleteOne({ _id: id })
        if (!deletedCheq) {
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
