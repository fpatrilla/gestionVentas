

import dbConnect from '../../../lib/dbConnect'
import Radio from '../../../models/Radio'

export default async function handler(req, res) {
  const { method, body } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const radios = await Radio.find({})
        res.status(200).json({ success: true, data: radios })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const currentDate = new Date();
        const RadiosData = { ...body, createdAt: currentDate };
        const radio = await Radio.create(RadiosData);
        res.status(201).json({ success: true, data: radio })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
