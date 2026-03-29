import mongoose from "mongoose";    
 const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true        
    },
    password: { 
        type: String,
        required: true        
    },

    phoneNumber: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["student", "admin", "recruiter"],
        default: "user"
    },
    profile: {
        bio: { type: String},
        skills: [{ type: String}],
        resume: { type: String},
        resumeOriginalName: { type: String},
        company: {type:mongoose.Schema.Types.ObjectId, ref:"Company"},
        profilePhoto: { 
            type: String,
            default:""
        },
    
    }
    
    
 },{timestamps:true});

 export default mongoose.model("User", userSchema);