// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Schema } from 'mongoose'
import mongoose from '../../lib/mongoose'


export default async function handler(req, res) {
    try { 
        mongoose.model('Book') 
    } catch (e) {
        const BookSchema = new mongoose.Schema({
            author: { type: String, required: true },
            title: { type: String, required: true },
        })
        
        BookSchema.index({ author: 1, title: 1 }, { unique: true })
        const Book = mongoose.model('Book', BookSchema);
    }   
    try { 
        mongoose.model('User') 
    } catch (e) {
        const UserSchema = new mongoose.Schema({
            name: { type: String, required: true },
            books: { type: [{ type: Schema.Types.ObjectId, ref: 'Book' }], required: true },
        })
        const User = mongoose.model('User', UserSchema)
    }

    try { 
        mongoose.model('Holding') 
    } catch (e) {
        const HoldingSchema = new mongoose.Schema({
            book: { type: Schema.Types.ObjectId, ref: 'Book' , required: true, unique: true },
            total: { type: Number, required: true },
            available: { type: Number, required: true },
        })
        const Holding = mongoose.model('Holding', HoldingSchema)
    }

  res.status(200).json({status: "okay"})
}
