import dbConnect from '../../../../lib/dbConnect';
import Orden from '../../../../models/Orden';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const ordens = await Orden.find({});
        res.status(200).json({ success: true, data: ordens });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const { clientForm, ordenForm, formData } = req.body;

        // Obtener el último número identificador
        const lastOrden = await Orden.findOne().sort({ identifier: -1 });
        const lastIdentifier = lastOrden ? lastOrden.identifier : 0;

        // Crear el número identificador para la nueva orden
        const newIdentifier = lastIdentifier + 1;

        // Obtener la fecha actual
        const currentDate = new Date();

        // Crear la orden con el número identificador y la fecha de creación
        const orden = await Orden.create({
          ...clientForm,
          ...ordenForm,
          ...formData,
          identifier: newIdentifier,
          createdAt: currentDate,
        });

        res.status(201).json({ success: true, data: orden, identifier: newIdentifier });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
