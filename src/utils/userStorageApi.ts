import { IUser } from "interfaces";

const userStorageApi = {
  saveUserToStorage(data: IUser): boolean {
    try {
      const storageData = localStorage.getItem("USERS")
        ? JSON.parse(localStorage.getItem("USERS")!)
        : [];

      localStorage.setItem("USERS", JSON.stringify([...storageData, data]));
      return true;
    } catch {
      return false;
    }
  },

  removeUserFromStorage(id: string): boolean {
    try {
      const filtredData = JSON.parse(localStorage.getItem("USERS")!).filter(
        (item: IUser) => item._id !== id
      );
      localStorage.setItem("USERS", JSON.stringify(filtredData));

      return true;
    } catch {
      return false;
    }
  },

  getUsersDataFromStorage(): Array<IUser> {
    return localStorage.getItem("USERS")
      ? JSON.parse(localStorage.getItem("USERS")!)
      : [];
  },
};

export default userStorageApi;
