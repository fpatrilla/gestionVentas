import dbConnect from '../../../lib/dbConnect'
import Part from '../../../models/Part'

export default async function handler(req, res) {
  const { method, body, query } = req
  const { id } = query; // Extract id from query parameters

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const parts = await Part.find({})
        res.status(200).json({ success: true, data: parts })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const partDate = new Date();
        const partssData = { ...body, createdAt: partDate };
        const part = await Part.create(partssData);
        res.status(201).json({ success: true, data: part })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'DELETE':
      try {
        // Check if id is present and perform the deletion
        if (!id) {
          return res.status(400).json({ success: false, error: 'Missing ID parameter' });
        }

        const deletedPart = await Part.deleteOne({ _id: id });

        if (!deletedPart) {
          return res.status(400).json({ success: false, error: 'Part not found' });
        }

        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false, error: 'Invalid method' });
      break;
  }
}
