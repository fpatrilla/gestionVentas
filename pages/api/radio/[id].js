

import dbConnect from '../../../lib/dbConnect'
import Radio from '../../../models/Radio'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const radio = await Radio.findById(id)
        if (!radio) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: radio })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const radio = await Radio.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!radio) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: radio })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedRadio = await Radio.deleteOne({ _id: id })
        if (!deletedRadio) {
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
