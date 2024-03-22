// import fetch from 'node-fetch';
// import { ConfigService } from '@/services/config.service';
// import { NextApiRequest, NextApiResponse } from 'next';

// /**
//  * @swagger
//  * /api/discover:
//  *   get:
//  *     description: Endpoint which returns discover data
//  *     responses:
//  *       200:
//  *         description: Success Response
//  *       404:
//  *         description: Not found Response
//  */
// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
// 	const options = {
// 		method: 'GET',
// 		headers: {
// 			'accept': 'application/json',
// 			'Authorization': ConfigService.themoviedb.keys.API_AUTH,
// 		},
// 	};
// 	const response = await fetch(ConfigService.themoviedb.urls.discoverMovies, options)
// 		.then((res) => res.json())
// 		.catch((err) => console.error('error:' + err));

// 	res.status(200).json(response);
// }

// export default handler;