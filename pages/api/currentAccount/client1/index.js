
import dbConnect from '../../../../lib/dbConnect'
import CurrentAccountClient1 from '../../../../models/CurrentAccountClient1'

export default async function handler(req, res) {
  const { method, body } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const currentAccountClient1s = await CurrentAccountClient1.find({})
        res.status(200).json({ success: true, data: currentAccountClient1s })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const currentDate = new Date();
        const currentAccountClient1Data = { ...body, createdAt: currentDate };
        const currentAccountClient1 = await CurrentAccountClient1.create(currentAccountClient1Data);
        res.status(201).json({ success: true, data: currentAccountClient1 })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
