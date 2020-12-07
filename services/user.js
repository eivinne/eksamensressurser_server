import User from "../models/user.js";

export const getuserById = async (id) => User.findById(id);

export const listusers = async () => User.find();

export const createuser = async (data) => User.create(data);

export const updateuser = async (id, data) =>
User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

export const removeuser = async (id) => {
  const user = await user.findById(id);
  user.remove();
}

export const checkToken = async (data) => User.findOne({'token': data.token}); // finne en bruker (returnerer ett objekt)
export const login = async (data) => User.findOne({'email' : data.email, 'password' : data.password}); // finne en bruker (returnerer ett objekt)