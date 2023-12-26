import bcrypt from 'bcrypt';
import User from '../../../models/User'; // Importa el modelo de Usuario
import dbConnect from '../../../lib/dbConnect';

export default async function handler(req, res) {
  await dbConnect(); // Establece la conexión con la base de datos

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
   
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
   
    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
}
