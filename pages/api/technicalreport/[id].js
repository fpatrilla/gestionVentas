import dbConnect from '../../../lib/dbConnect'
import Technicalreport from '../../../models/Technicalreport'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const technicalreport = await Technicalreport.findById(id)
        if (!technicalreport) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: technicalreport })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const technicalreport = await Technicalreport.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!technicalreport) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: technicalreport })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedTechnicalreport = await Technicalreport.deleteOne({ _id: id })
        if (!deletedTechnicalreport) {
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
