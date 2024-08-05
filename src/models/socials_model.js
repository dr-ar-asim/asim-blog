import mongoose from "mongoose";

const socials_schema = new mongoose.Schema({
  facebook: {
    type: String
  },
  instagram: {
    type: String
  },
  youtube: {
    type: String
  },
  tiktok: {
    type: String
  }
})

const Socials_model = mongoose.models.social || mongoose.model('social', socials_schema)
export default Socials_model