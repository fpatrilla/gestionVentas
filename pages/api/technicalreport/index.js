

import dbConnect from '../../../lib/dbConnect'
import Technicalreport from '../../../models/Technicalreport'

export default async function handler(req, res) {
  const { method, body } = req

  await dbConnect()

  switch (method) {
    case 'GET':
  try {
    const technicalreports = await Technicalreport.find({});
    res.status(200).json({ success: true, data: technicalreports });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
  break;

      case 'POST':
        try {
          const currentDate = new Date();
          const technicalreportsData = { ...body, createdAt: currentDate };
          const technicalreport = await Technicalreport.create(technicalreportsData); // Use Technicalreport.create
          res.status(201).json({ success: true, data: technicalreport });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      
    default:
      res.status(400).json({ success: false })
      break
  }
}
