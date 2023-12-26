import dbConnect from '../../../../lib/dbConnect';
import SaleTarjet from '../../../../models/SaleTarjet';

export default async function handler(req, res) {
  const { method, body } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const salesTarjet = await SaleTarjet.find({});
        res.status(200).json({ success: true, data: salesTarjet });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const currentDate = new Date();
        const saleData = {
          ...body,
          createdAt: currentDate,
          price: body.price * 1.3 // Multiplica el precio por 1.3 si es pago con tarjeta
        };

        const sale = await SaleTarjet.create(saleData);

        res.status(201).json({ success: true, data: sale });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
