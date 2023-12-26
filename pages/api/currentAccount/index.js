// sales.js (API)

import dbConnect from '../../../lib/dbConnect'
import CurrentAccount from '../../../models/CurrentAccount'

export default async function handler(req, res) {
  const { method, body } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const currentAccounts = await CurrentAccount.find({})
        res.status(200).json({ success: true, data: currentAccounts })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const currentDate = new Date();
        const currentAccountData = { ...body, createdAt: currentDate };
        const currentAccount = await CurrentAccount.create(currentAccountData);
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
