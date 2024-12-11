import mongoose, { Schema, Document } from "mongoose";

interface Categorie extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
}

const categorieSchema = new Schema<Categorie>({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
});


const Categorie = mongoose.model<Categorie>('Categorie', categorieSchema);

export default Categorie;