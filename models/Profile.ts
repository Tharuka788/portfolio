import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProfile extends Document {
    name: string;
    role: string[];
    bio: string;
    profileImage: string;
    resumeLink: string;
    socials: {
        github: string;
        linkedin: string;
        email: string;
        mobile?: string;
    };
}

const ProfileSchema: Schema = new Schema({
    name: { type: String, required: true },
    role: { type: [String], required: true },
    bio: { type: String, required: true },
    profileImage: { type: String, default: '/profile.jpg' },
    resumeLink: { type: String, default: '/cv.pdf' },
    socials: {
        github: { type: String, required: true },
        linkedin: { type: String, required: true },
        email: { type: String, required: true },
        mobile: { type: String },
    },
});

// Prevent model recompilation error in Next.js
const Profile: Model<IProfile> = mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);

export default Profile;
