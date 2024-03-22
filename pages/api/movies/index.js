import { ConfigService } from '@/services/config.service';
import { fetchMovieDB } from '@/services/fetch.service';

/**
 * @swagger
 * /api/movies:
 *   get:
 *     description: Endpoint which returns movies data
 *     responses:
 *       200:
 *         description: Success Response
 *       404:
 *         description: Not found Response
 */
const handler = async (req, res) => {

  const { page } = req.query;
  const pagination = !!page ? `?page=${page}` : '';
  const url = ConfigService.themoviedb.urls.discoverMovies + pagination;
  const movies = await fetchMovieDB("GET", url)

  switch (req.method) {
    case "GET":
      if (!movies) {
        res.status(404).json({ status: 404, message: "Not found" });
      }
      res.json({ status: 200, data: movies });
      break;
    default:
      res.status(405).json({ status: 405, message: "Method not allowed" });
      break;
  }
}

export default handler;