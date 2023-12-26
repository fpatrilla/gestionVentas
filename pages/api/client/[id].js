import dbConnect from '../../../lib/dbConnect'
import Client from '../../../models/Client'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const client = await Client.findById(id)
        if (!client) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: client })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const client = await Client.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!client) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: client })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedClient = await Client.deleteOne({ _id: id })
        if (!deletedClient) {
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
