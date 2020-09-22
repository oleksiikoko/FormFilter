import React, { useState } from "react";

interface IProps {
  keys: any;
  data: Array<any>;
  onRemove(_id: string): void;
}

const Table: React.FC<IProps> = (props) => {
  const [sortFlag, setSortFlag] = useState<string | null>(null);
  const [sortOrderFlag, setSortOrderFlag] = useState<boolean>(true); //true - ascending, false - descending

  const sortTable = (key: string) => {
    if (sortFlag === key) {
      setSortOrderFlag(!sortOrderFlag);
    } else {
      setSortFlag(key);
      setSortOrderFlag(true);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          {props.keys.map((item: any) => {
            return (
              <th key={item.key} onClick={() => sortTable(item.key)}>
                {item.name}
              </th>
            );
          })}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {props.data
          .sort((a: any, b: any) => {
            if (!sortFlag) return 0;
            if (sortOrderFlag) {
              if (a[sortFlag!] <= b[sortFlag!]) return 1;
              else return -1;
            } else {
              if (a[sortFlag!] >= b[sortFlag!]) return 1;
              else return -1;
            }
          })
          .map((item) => {
            return (
              <tr key={item._id}>
                {Object.keys(item).map((key) => {
                  return key !== "_id" && <td key={key}>{item[key]}</td>;
                })}
                <td onClick={() => props.onRemove(item._id)}>X</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Table;
