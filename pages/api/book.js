// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import mongoose from "../../lib/mongoose";
import { setup } from '@/lib/mongoose';
import mongoose from 'mongoose'



export default async function handler(req, res) {
  mongoose.connect(process.env.MONGO_URL);
  setup(mongoose)
  const Book = mongoose.model('Book');
  
  if (req.method === 'GET') { 
    res.status(200).json(await Book.find())
  } 
  else if (req.method === 'POST') {
    const { author, title } = req.body
    console.log({author, title})
    const newBook = new Book({ author, title });
    await newBook.save();
    res.status(201).json({ author, title })
  }
}


