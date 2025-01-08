import { create } from "zustand";
import { User } from "../../utils/types";
import mongoose, { set } from "mongoose";
import { getIdFromToken, getUserById, verifyToken } from "../../utils/services";

interface UserStore extends User {
  setUser: (user: User) => void;
  removeUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  _id: new mongoose.Types.ObjectId(),
  name: "",
  surname: "",
  username: "",
  email: "",
  password: "",
  productsInStore: [],
  favProducts: [],

  setUser: (user: User) => {
    set({
      _id: user._id,
      name: user.name,
      surname: user.surname,
      username: user.username,
      email: user.email,
      password: user.password,
      productsInStore: user.productsInStore,
      favProducts: user.favProducts,
    });
  },

  removeUser: () => {
    set({
      _id: new mongoose.Types.ObjectId(),
      name: "",
      surname: "",
      username: "",
      email: "",
      password: "",
      productsInStore: [],
      favProducts: [],
    });
  },
}));

export const checkLogged = async (): Promise<User | undefined> => {
  const token = localStorage.getItem("token");

  if (!token) {
    return;
  }

  const result = await verifyToken(token);
  if (!result) {
    return;
  }

  const userId = await getIdFromToken(token);
  if (!userId) {
    return;
  }

  const user = await getUserById(userId.toString())
  if (!user) {
    return;
  }

  return user;

};
