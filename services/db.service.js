import clientPromise from "@/lib/mongodb";

const getDB = async () => {
  const client = await clientPromise;
  return client.db("ynov-cloud");
}



export const getOne = async (collection, query) => {
  const db = await getDB();
  return db.collection(collection).findOne(query);
}

export const getAll = async (collection, query, options = undefined) => {
  const db = await getDB();
  return db.collection(collection).find(query, options).toArray();
}

export const insertOne = async (collection, query) => {
  const db = await getDB();
  return db.collection(collection).insertOne(query);
}

export const updateOne = async (collection, query, update) => {
  const db = await getDB();
  return db.collection(collection).updateOne(query, update);
}