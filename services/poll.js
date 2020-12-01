import Poll from "../models/poll.js";

export const getPollById = async (id) => Poll.findById(id);

export const listPolls = async () => Poll.find();

export const createPoll = async (data) => Poll.create(data);

export const updatePoll = async (id, data) =>
Poll.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

export const removePoll = async (id) => {
  const poll = await Poll.findById(id);
  poll.remove();
}

export const getPollByName = async (name) => Poll.findOne({'pollName':name});

