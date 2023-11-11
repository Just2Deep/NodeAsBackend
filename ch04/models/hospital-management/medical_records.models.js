import mongoose from "mongoose";

const illnessSchema = new mongoose.Schema({
  illnessName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const medicalRecordSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    illness: {
      type: [illnessSchema],
    },
  },
  { timestamps: true }
);

export const MedicalRecord = mongoose.model(
  "MedicalRecord",
  medicalRecordSchema
);
