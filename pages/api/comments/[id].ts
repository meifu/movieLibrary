import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from '../../../lib/mongodb'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query?.id as string

  if (!id) {
    res.status(400).json({ message: 'No Id'})
  }

  try {
    const client = await clientPromise

    const db = client.db('movie_app')
    const commentsDb = await db.collection('comments')

    switch (req.method) {
      case 'POST':
        commentsDb.insertOne(req.body)

        res.status(200).json({ message: 'success' })
        break
      default:
        const comments = await commentsDb.find({ movieId: id }).toArray()

        res.status(200).json(comments)
    }

  } catch (e) {
    res.status(500).json({ error: e })
  }
}
