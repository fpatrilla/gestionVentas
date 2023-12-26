// api/ordenes/identifier.js
import dbConnect from '../../../../lib/dbConnect';
import Orden from '../../../../models/Orden';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const lastOrden = await Orden.findOne().sort({ identifier: -1 });
      const lastIdentifier = lastOrden ? lastOrden.identifier : 0;

      res.status(200).json({ success: true, identifier: lastIdentifier });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(400).json({ success: false });
  }
}
