import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from '../../../lib/mongodb'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query?.id as string
  if (!id) {
    res.status(400).json({ message: 'No Id'})
    return
  }
  const objectId = new ObjectId(id)

  try {
    const client = await clientPromise

    const db = client.db('movie_app')

    const movie = await db
        .collection('movies')
        .find({ _id: objectId })
        .toArray()

    res.status(200).json(movie[0])
  } catch (e) {
    res.status(500).json({ error: e })
  }
}
