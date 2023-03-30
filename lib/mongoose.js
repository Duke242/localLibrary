import mongoose from 'mongoose'
mongoose.connect(process.env.MONGO_URL);
export default mongoose 

export const setup = (mongoose) => {
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
            books: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }], required: true },
        })
        const User = mongoose.model('User', UserSchema)
    }

    try { 
        mongoose.model('Holding') 
    } catch (e) {
        const HoldingSchema = new mongoose.Schema({
            book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' , required: true, unique: true },
            total: { type: Number, required: true },
            available: { type: Number, required: true },
        })
        const Holding = mongoose.model('Holding', HoldingSchema)
    }

}