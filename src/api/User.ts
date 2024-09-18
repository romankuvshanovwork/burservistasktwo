import { IUser } from "../interfaces/IUser";

// TODO: Переписать покрасивее и предусмотреть крайние случаи. Возращать объект: {success, result, errorMessage}
// TODO: Предусмотреть такой пользователь уже есть
export const User: {
  isLogedIn: () =>  boolean;
  currentUser: () => IUser;
  amountOfRegisteredUsers: number;
  login: (phone: string, password: string) => boolean | string;
  register: (
    phone: string,
    password: string,
    fio: string,
    gender: string
  ) => void;
  rememberPassword: (phone: string) => string;
  logout: () => void;
} = {
  isLogedIn: () => !!localStorage.getItem("currentUser"),
  currentUser: () => !!localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser") || "{}")
    : [],
  amountOfRegisteredUsers: !!localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users") || "{}")?.length
    : 0,
  login: function (phone: string, password: string) {
    const users = !!localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users") || "{}")
      : [];

    const user = users?.find((user: IUser) => user?.phone === phone);
    if (!user) {
      return "Нет такого пользователя";
    } else {
      if (user?.password === password) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        return true;
      } else {
        return "Неверный пароль";
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
    localStorage.setItem(
      "users",
      JSON.stringify([
        ...users,
        { phone: phone, password: password, fio: fio, gender: gender },
      ])
    );
    this.login(phone, password);
  },
  rememberPassword: function (phone: string) {
    const users = !!localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users") || "{}")
      : [];

    return (
      users?.find((user: IUser) => user?.phone === phone)?.password ||
      "Нет такого пользователя"
    );
  },
  logout: function () {
    localStorage.removeItem("currentUser");
  },
};
