import dbConnect from '../../../../lib/dbConnect';
import Orden from '../../../../models/Orden';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const orden = await Orden.findById(id);
        if (!orden) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: orden });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
   

    case 'PUT' /* Marcar una orden como Entregado */:
      try {
        const orden = await Orden.findById(id);

        if (!orden) {
          return res.status(404).json({ success: false, error: 'Orden no encontrada' });
        }

        // Verifica si la acción es para marcar como "Entregado"
        if (req.body.markAsDelivered) {
          orden.estado = 'Entregado';
          orden.exitAt = new Date(); // Establece la fecha de entrega actual

          await orden.save();
        }

        res.status(200).json({ success: true, data: orden });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedOrden = await Orden.deleteOne({ _id: id });
        if (!deletedOrden) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
