import React, { useState } from "react";

import { UserTable, Form } from "components";
import { IFormData, IUser } from "interfaces";
import { uuidv4, userStorageApi } from "utils";

import "./public/index.scss";

const App: React.FC = () => {
  const [usersData, setUsersData] = useState<Array<IUser>>(
    userStorageApi.getUsersDataFromStorage()
  );

  const updateData = () =>
    setUsersData(userStorageApi.getUsersDataFromStorage());
  const onFormSubmit = (data: IFormData) =>
    userStorageApi.saveUserToStorage({ ...data, _id: uuidv4() }) &&
    updateData();
  const removeUser = (_id: string) =>
    userStorageApi.removeUserFromStorage(_id) && updateData();

  return (
    <>
      <UserTable data={usersData} onRemove={removeUser} />
      <Form onSubmit={onFormSubmit} />
    </>
  );
};

export default App;
