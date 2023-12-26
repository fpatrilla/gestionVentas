
import dbConnect from '../../../../lib/dbConnect'
import CurrentAccountClient2 from '../../../../models/CurrentAccountClient2'

export default async function handler(req, res) {
  const { method, body } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const currentAccountClient2s = await CurrentAccountClient2.find({})
        res.status(200).json({ success: true, data: currentAccountClient2s })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const currentDate = new Date();
        const currentAccountClient2Data = { ...body, createdAt: currentDate };
        const currentAccountClient2 = await CurrentAccountClient2.create(currentAccountClient2Data);
        res.status(201).json({ success: true, data: currentAccountClient2 })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
