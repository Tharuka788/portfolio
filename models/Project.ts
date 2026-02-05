import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
    title: string;
    description: string;
    image: string;
    tags: string[];
    links: {
        demo?: string;
        repo: string;
    };
    featured: boolean;
}

const ProjectSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: '/project-placeholder.jpg' },
    tags: { type: [String], required: true },
    links: {
        demo: { type: String },
        repo: { type: String, required: true },
    },
    featured: { type: Boolean, default: false },
});

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
