import Collections from "@/constants/Collections";
import { getOne, insertOne, updateOne } from "@/services/db.service";


/**
 * @swagger
 * /api/movies/{idMovie}/likes:
 *   get:
 *     description: Endpoint which returns likes data
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: ID movie
 *     responses:
 *       200:
 *         description: Success Response
 *       404:
 *         description: Not found Response
 *   patch:
 *     description: Endpoint which increments likeCounter
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: ID movie
 *     responses:
 *       201:
 *         description: Success Response
 *       404:
 *         description: Not found Response
 */
const handler = async (req, res) => {

  const idMovie = parseInt(req.query.idMovie, 10);

  switch (req.method) {

    case "PATCH":

      const like = await getOne(Collections.LIKES, { idTMDB: idMovie });
      let resMongo, data;

      if (like) {
        resMongo = await updateOne(Collections.LIKES,
          { idTMDB: idMovie },
          { $inc: { likeCounter: 1 } }
        )
        data = {
          action: 'likeCounter incremented',
          idMovie: idMovie,
          matchedCount: resMongo.matchedCount,
          modifiedCount: resMongo.modifiedCount
        }
        res.status(201).json({ status: 201, data: data });
      } else {
        resMongo = await insertOne(Collections.LIKES,
          { idTMDB: idMovie, likeCounter: 1 }
        )
        data = {
          action: 'likeCounter created',
          idMovie: idMovie,
          insertedId: resMongo.insertedId
        }
        res.status(201).json({ status: 201, data: data });
      }

      break;

    case "GET":

      const likes = await getOne(Collections.LIKES, { idTMDB: idMovie });
      res.json({ status: 200, data: { likes: likes } });
      break;

    default:
      res.status(405).json({ status: 405, error: "Method Not Allowed" });
  }
}

export default handler;