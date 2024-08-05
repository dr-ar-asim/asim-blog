import mongoose from "mongoose";
import { type } from "os";

const webSchema = new mongoose.Schema({

  website_name: {
    type: String,
    required: true,
    default: 'Blog App'
  },
  website_logo: {
    type: String,
    required: false
  },
  heroSection_heading: {
    type: String,
    required: true,
    default: 'unlock Your potential'
  },
  heroSection_description: {
    type: String,
    required: true,
    default: 'Dive into Educational insights and Tips'
  },
  heroSection_image: {
    type: String,
    required: false
  },
  admin_email: {
    type: String,
    required: true,
    default: 'admin@blogapp.com'
  },
  admin_phone: {
    type: String,
    required: true,
    default: '+1234567890'
  },
  facebook_link: {
    type: String,
    required: false,
    default: 'https://www.facebook.com/blogapp'
  },
  instagram_link: {
    type: String,
    required: false,
    default: 'https://www.instagram.com/'
  },
  tiktok_link: {
    type: String,
    required: false,
    default: 'https://www.tiktok.com/'
  },
  youtube_link: {
    type: String,
    required: false,
    default: 'https://www.youtube.com/'
  }
})

const WebOverViewModel = mongoose.models.webOverview || mongoose.model('webOverview', webSchema)
export default WebOverViewModel;