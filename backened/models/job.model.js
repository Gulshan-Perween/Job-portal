import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
   
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // },
    jobType: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    company:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Company",
    required:true
  },
    created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
    requirements: {
    type: [String],
    required: true,
    default: []
  },


  experience: {
    type: String,
    required: true
  },

  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },
  ],

  
},{timestamps :true});
  export default mongoose.model("Job", jobSchema);