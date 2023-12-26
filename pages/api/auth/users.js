import User from '../../../models/User';
import dbConnect from '../../../lib/dbConnect';

import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const token = req.cookies.token;

  // Verifica si el token se encuentra en la cookie
  if (!token) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }

  // Verifica el token JWT
  try {
    const decodedToken = jwt.verify(token, 'tu_clave_secreta'); // Reemplaza 'tu_clave_secreta' por la clave secreta utilizada en la creación del token
    console.log(decodedToken);
    // Obtén el usuario a partir del token
    const user = await User.findOne({ _id: decodedToken.userId });
    console.log(user);

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    // Devuelve la información del usuario, incluyendo el nombre de usuario
    res.status(200).json({ user: { username: user.username } });

  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}
