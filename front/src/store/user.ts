import { create } from "zustand";
import { User } from "../../utils/types";

interface UserStore extends User {
  setUser: (user: User) => void;
  removeUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  name: "",
  surname: "",
  username: "",
  email: "",
  password: "",
  productsInStore: [],
  favProducts: [],

  setUser: (user: User) => {
    set({
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
