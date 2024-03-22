import { ConfigService } from "@/services/config.service";
import { fetchMovieDB } from "@/services/fetch.service";
import { getOne } from "@/services/db.service";
import Collections from "@/constants/Collections";

/**
* @swagger
* /api/movies/{idMovie}:
*   get:
*     description: Endpoint which returns movie data
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
* 
*/
const handler = async (req, res) => {

  const idMovie = parseInt(req.query.idMovie, 10);
  const url = ConfigService.themoviedb.urls.movie(idMovie);

  switch (req.method) {

    case "GET":
      const movie = await fetchMovieDB("GET", url)

      const likes = await getOne(Collections.LIKES, { idTMDB: idMovie });

      if (movie) {
        if (likes?.likeCounter) {
          movie.likes = likes.likeCounter;
        } else {
          movie.likes = 0;
        }
        res.json({ status: 200, data: { movie: movie } });
      } else {
        res.status(404).json({ status: 404, error: "Not Found" });
      }
      break;

    default:
      res.status(405).json({ status: 405, error: "Method Not Allowed" });
  }
}

export default handler;