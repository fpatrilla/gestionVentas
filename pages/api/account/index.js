

import dbConnect from '../../../lib/dbConnect'
import Account from '../../../models/Account'

export default async function handler(req, res) {
  const { method, body } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const accounts = await Account.find({})
        res.status(200).json({ success: true, data: accounts })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const currentDate = new Date();
        const accountsData = { ...body, createdAt: currentDate };
        const currentAccount = await Account.create(accountsData);
        res.status(201).json({ success: true, data: currentAccount })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
