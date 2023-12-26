import dbConnect from '../../../lib/dbConnect'
import Presupuesto from '../../../models/Presupuesto'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
   

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedPresupuesto = await Presupuesto.deleteOne({ _id: id })
        if (!deletedPresupuesto) {
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
