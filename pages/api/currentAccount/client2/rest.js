import dbConnect from '../../../../lib/dbConnect';
import CurrentAccountClient2 from '../../../../models/CurrentAccountClient2';

export default async function handler(req, res) {
  const { method, body } = req;

  await dbConnect();

  switch (method) {
    // ...
case 'PUT':
    try {
      // Parsea el cuerpo JSON para obtener el valor a restar (como una cadena)
      const pago = parseFloat(body);
  
      // Consulta la base de datos para obtener el valor actual de otherprice
      const currentAccount = await CurrentAccountClient2.findOne();
  
      // Calcula el nuevo valor de otherprice restando el valor de pago
      const newOtherPrice = currentAccount.otherprice - pago;
  
      // Actualiza el valor de otherprice en la base de datos
      await CurrentAccountClient2.findOneAndUpdate({}, { otherprice: newOtherPrice });
  
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
    break;
  // ...
  

    default:
      res.status(400).json({ success: false });
      break;
  }
}
