// sales.js (API)

import dbConnect from '../../../lib/dbConnect'
import Note from '../../../models/Note'

export default async function handler(req, res) {
  const { method, body } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const notes = await Note.find({})
        res.status(200).json({ success: true, data: notes })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const currentDate = new Date();
        const notetData = { ...body, createdAt: currentDate };
        const currentNote = await Note.create(notetData);
        res.status(201).json({ success: true, data: currentNote })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
