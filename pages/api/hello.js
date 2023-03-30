// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from 'mongoose'
mongoose.connect(process.env.MONGO_URL);


export default async function handler(req, res) {
  const Book = mongoose.model('Book');

  const never = new Book({ author: "Jeff Bezos", title: "Invent And Wander" });
  await never.save();
  const neverland = await Book.findOne({author: "Jeff Bezos"}).exec()
  res.status(200).json(neverland)
}
