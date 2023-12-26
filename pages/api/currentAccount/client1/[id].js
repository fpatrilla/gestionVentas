
import dbConnect from '../../../../lib/dbConnect'
import CurrentAccountClient1 from '../../../../models/CurrentAccountClient1'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
   

      case 'DELETE' /* Delete a model by its ID */:
        try {
          const deletedCurrentAccountClient1 = await CurrentAccountClient1.deleteOne({ _id: id });
          if (!deletedCurrentAccountClient1) {
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
