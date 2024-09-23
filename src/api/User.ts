import { IAPIRequestResult } from "../interfaces/IAPIRequestResult";
import { IUser } from "../interfaces/IUser";

export const User: {
  isLogedIn: () => boolean;
  currentUser: () => IUser;
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
} = {
  isLogedIn: () => !!localStorage.getItem("currentUser"),
  currentUser: () =>
    !!localStorage.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser") || "{}")
      : [],
  amountOfRegisteredUsers: () => !!localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users") || "{}")?.length
    : 0,
  login: function (phone: string, password: string) {
    const users = !!localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users") || "{}")
      : [];

    const user = users?.find((user: IUser) => user?.phone === phone);
    if (!user) {
      return {
        success: false,
        result: null,
        errorMessage: "Нет такого пользователя",
      };
    } else {
      if (user?.password === password) {
        localStorage.setItem("currentUser", JSON.stringify(user));
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
    const users = !!localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users") || "{}")
      : [];
    const user = users?.find((user: IUser) => user?.phone === phone);

    if (user) {
      return {
        success: false,
        result: null,
        errorMessage:
          "Пользователь с таким номером телефона уже зарегистрирован. Если вы не помните пароль, то попробуйте его восстановить",
      };
    } else {
      localStorage.setItem(
        "users",
        JSON.stringify([
          ...users,
          { phone: phone, password: password, fio: fio, gender: gender },
        ])
      );
      return User.login(phone, password);
    }
  },
  rememberPassword: function (phone: string) {
    const users = !!localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users") || "{}")
      : [];
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
    localStorage.removeItem("currentUser");
    return { success: true, result: null, errorMessage: null };
  },
};
