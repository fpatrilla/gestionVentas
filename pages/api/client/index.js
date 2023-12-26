import dbConnect from '../../../lib/dbConnect'
import Client from '../../../models/Client'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const clients = await Client.find({}) /* find all the clients in the database */
        res.status(200).json({ success: true, data: clients })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const client = await Client.create(req.body) /* create a new client in the database */
        res.status(201).json({ success: true, data: client })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
