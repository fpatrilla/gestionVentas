// sales.js (API)

import dbConnect from '../../../lib/dbConnect'
import Sales from '../../../models/Sales'

export default async function handler(req, res) {
  const { method, body } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const sales = await Sales.find({})
        res.status(200).json({ success: true, data: sales })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const currentDate = new Date();
        const saleData = { ...body, createdAt: currentDate };
        const sale = await Sales.create(saleData);
        res.status(201).json({ success: true, data: sale })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
