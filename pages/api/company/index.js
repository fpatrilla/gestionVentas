import dbConnect from '../../../lib/dbConnect'
import Company from '../../../models/Company'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const company = await Company.findById(id)
        if (!company) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: company })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

      case 'POST':
        try {
          const company = await Company.create(req.body) /* create a new client in the database */
          res.status(201).json({ success: true, data: company })
        } catch (error) {
          res.status(400).json({ success: false })
        }
        break
      default:
        res.status(400).json({ success: false })
        break
    }
  }