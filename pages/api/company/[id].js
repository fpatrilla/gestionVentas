// api/company/[id].js

import dbConnect from '../../../lib/dbConnect';
import Company from '../../../models/Company';

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

    case 'PUT' /* Edit a model by its ID */:
      try {
        const company = await Company.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!company) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: company })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

   

    default:
      res.status(400).json({ success: false })
      break
  }
}