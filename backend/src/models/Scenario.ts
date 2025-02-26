import mongoose, { Schema, Document } from 'mongoose';

export interface Scenario extends Document {
  title: string;
  description: string;
  // Add other fields as needed
}

const ScenarioSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model<Scenario>('Scenario', ScenarioSchema);