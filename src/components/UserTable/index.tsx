import React from "react";

import { Table } from "components";
import { IUser } from "interfaces";

interface IProps {
  data: Array<IUser>;
  onRemove(_id: string): void;
}

const UserTable: React.FC<IProps> = (props) => {
  const keys = [
    { name: "Firts name", key: "firstName" },
    { name: "Last name", key: "lastName" },
    { name: "Phone", key: "phone" },
    { name: "Sex", key: "sex" },
    { name: "Age", key: "age" },
  ];
  return <Table data={props.data} keys={keys} onRemove={props.onRemove} />;
};

export default UserTable;
