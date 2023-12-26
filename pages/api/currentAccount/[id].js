import dbConnect from '../../../lib/dbConnect'
import CurrentAccount from '../../../models/CurrentAccount'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const currentAccount = await CurrentAccount.findById(id)
        if (!currentAccount) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: orden })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const currentAccount = await CurrentAccount.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!currentAccount) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: currentAccount })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

      case 'DELETE' /* Delete a model by its ID */:
        try {
          const deletedCurrentAccount = await CurrentAccount.deleteOne({ _id: id });
          if (!deletedCurrentAccount) {
            return res.status(400).json({ success: false });
          }
          res.status(200).json({ success: true, data: {} });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;

    default:
      res.status(400).json({ success: false })
      break
  }
}
