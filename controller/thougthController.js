const { ThoughtModel, UserModel } = require('../models');
const thoughtController = {
    // get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughtDBData = await ThoughtModel.find()
        .sort({ createdAt: -1 });
      res.json(thoughtDBData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // get single thought
  async getSingleThought(req, res) {
    try {
      const thoughtDBData = await ThoughtModel.findOne({ _id: req.params.thoughtId });
      if (!thoughtDBData) {
        return res.status(404).json({ message: 'No thought found' });
      }
      res.json(thoughtDBData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //create new thought
  async createThought(req, res) {
    try {
      const thoughtDBData = await ThoughtModel.create(req.body);
      const userDBData = await UserModel.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thoughtDBData._id } },
        { new: true }
      );
      if (!userDBData) {
        return res.status(404).json({ message: 'No User exists with this ID' });
      }
      res.json({ message: 'Thought successfully created!' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //update thought
  async updateThought(req, res) {
    const thoughtDBData = await ThoughtModel.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });
    if (!thoughtDBData) {
      return res.status(404).json({ message: 'No thought found' });
    }
    res.json(thoughtDBData);
    console.log(err);
    res.status(500).json(err);
  },

  //delete thought
  async deleteThought(req, res) {
    try {
      const thoughtDBData = await ThoughtModel.findOneAndRemove({ _id: req.params.thoughtId })
      if (!thoughtDBData) {
        return res.status(404).json({ message: 'No thought found' });
      }
      
      const userDBData = UserModel.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
      if (!userDBData) {
        return res.status(404).json({ message: 'TNo user with this ID' });
      }
      res.json({ message: 'Thought deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  //add reaction
  async addReaction(req, res) {
    try {
      const thoughtDBData = await ThoughtModel.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thoughtDBData) {
        return res.status(404).json({ message: 'No thought found' });
      }
      res.json(thoughtDBData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  //remove reaction
  async removeReaction(req, res) {
    try {
      const thoughtDBData = await ThoughtModel.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!thoughtDBData) {
        return res.status(404).json({ message: 'No thought found' });
      }
      res.json(thoughtDBData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
module.exports = thoughtController;