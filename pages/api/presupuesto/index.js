// sales.js (API)

import dbConnect from '../../../lib/dbConnect'
import Presupuesto from '../../../models/Presupuesto'

export default async function handler(req, res) {
  const { method, body } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const presupuestos = await Presupuesto.find({})
        res.status(200).json({ success: true, data: presupuestos })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const currentDate = new Date();
        const presupuestotData = { ...body, createdAt: currentDate };
        const currentPresupuesto = await Presupuesto.create(presupuestotData);
        res.status(201).json({ success: true, data: currentPresupuesto })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
