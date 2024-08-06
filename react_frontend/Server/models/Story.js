import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    story: String,
    date: { type: Date, default: Date.now }
});
  
const Story = mongoose.model('Story', storySchema);

export default Story;