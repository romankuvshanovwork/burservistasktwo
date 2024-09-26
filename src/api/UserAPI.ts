import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IAPIRequestResult } from "../interfaces/IAPIRequestResult";
import { IUser } from "../interfaces/IUser";

interface UserStore {
  users: any[];
  currentUser?: IUser;
  isLogedIn: () => boolean;
  amountOfRegisteredUsers: () => number;
  login: (phone: string, password: string) => IAPIRequestResult;
  register: (
    phone: string,
    password: string,
    fio: string,
    gender: string
  ) => IAPIRequestResult;
  rememberPassword: (phone: string) => IAPIRequestResult;
  logout: () => IAPIRequestResult;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: undefined,

      isLogedIn: () => !!get().currentUser,
      amountOfRegisteredUsers: () => get().users.length,
      login: function (phone: string, password: string) {
        const users = get().users;

        const user = users?.find((user: IUser) => user?.phone === phone);
        if (!user) {
          return {
            success: false,
            result: null,
            errorMessage: "Нет такого пользователя",
          };
        } else {
          if (user?.password === password) {
            set({ currentUser: user });
            return { success: true, result: null, errorMessage: null };
          } else {
            return {
              success: false,
              result: null,
              errorMessage: "Неверный пароль",
            };
          }
        }
      },
      register: function (
        phone: string,
        password: string,
        fio: string,
        gender: string
      ) {
        const users = get().users;
        const user = users?.find((user: IUser) => user?.phone === phone);

        if (user) {
          return {
            success: false,
            result: null,
            errorMessage:
              "Пользователь с таким номером телефона уже зарегистрирован. Если вы не помните пароль, то попробуйте его восстановить",
          };
        } else {
          set({
            users: [
              ...users,
              { phone: phone, password: password, fio: fio, gender: gender },
            ],
          });
          return get().login(phone, password);
        }
      },
      rememberPassword: function (phone: string) {
        const users = get().users;
        const user = users?.find((user: IUser) => user?.phone === phone);

        if (user) {
          return { success: true, result: user?.password, errorMessage: null };
        } else {
          return {
            success: false,
            result: null,
            errorMessage: "Нет такого пользователя",
          };
        }
      },

      logout: function () {
        set({ currentUser: undefined });
        return { success: true, result: null, errorMessage: null };
      },
    }),
    {
      name: "users-storage",
    }
  )
);
