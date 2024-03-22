import { ConfigService } from "@/services/config.service";
import { fetchMovieDB } from "@/services/fetch.service";

/**
* @swagger
* /api/movies/{idMovie}/videos:
*   get:
*     description: Endpoint which returns related videos data
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
  const url = ConfigService.themoviedb.urls.movieVideos(idMovie);

  switch (req.method) {

    case "GET":
      const movie = await fetchMovieDB("GET", url)


      if (movie) {
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