import dbConnect from '../../../lib/dbConnect'
import Company from '../../../models/Company'


export default async function handler(req, res) {
  if (req.method === 'POST') {
    await dbConnect();

    try {
      const { _id, companyname, companyType, owner, cuit, web, email, city, telephone1, telephone2, celphone1, celphone2 } = req.body;

      // Validar los datos aquí si es necesario

      // Buscar la empresa por su ID en la base de datos
      const company = await Company.findById(_id);

      if (!company) {
        return res.status(404).json({ error: 'Empresa no encontrada' });
      }

      // Actualizar los datos de la empresa con los valores proporcionados
      company.companyname = companyname;
      company.companyType = companyType;
      company.owner = owner;
      company.cuit = cuit;
      company.web = web;
      company.email = email;
      company.city = city;
      company.telephone1 = telephone1;
      company.telephone2 = telephone2;
      company.celphone1 = celphone1;
      company.celphone2 = celphone2;

      // Guardar los cambios en la base de datos
      await company.save();

      return res.status(200).json({ message: 'Empresa actualizada exitosamente' });
    } catch (error) {
      return res.status(500).json({ error: 'Error al actualizar la empresa' });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}
