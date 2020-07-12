import React, { FC, useEffect, useState, useRef } from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { darkTheme, lightTheme } from "../utils/constants";

type TableCompProps = {
  tableDisplay: [];
  appConfigs: any;
};

const TableComp: FC<TableCompProps> = ({ tableDisplay, appConfigs }) => {
  const [columnsConvert, setColumnsConvert] = useState([]);

  const theme = useSelector((state: RootState) => state.utils.theme);

  const sortRef = useRef("");
  const filterRef = useRef("");

  useEffect(() => {
    const withPayment = appConfigs && appConfigs.paymentEnabled;

    const filteredColumns = withPayment
      ? appConfigs.columns
      : appConfigs.columns.filter((ap: any) => ap.fieldName !== "pay");

    setColumnsConvert(
      filteredColumns
        .filter((col: any) => col.display)
        .map((col: any) => {
          const column: any = {
            title: col.displayName,
            dataIndex: col.fieldName,
            key: col.fieldName,
            sorterOn: col.sorterOn.enabled,
            defaultSortOrder: col.sorterOn.defaultOrder,
            render: (text: any) => {
              return {
                props: {
                  style: {
                    background:
                      theme === "dark"
                        ? darkTheme.tableBackground
                        : lightTheme.body,
                    color: theme === "dark" ? darkTheme.text : lightTheme.text
                  }
                },
                children: <div>{text}</div>
              };
            }
          };

          if (col.filter.enabled) {
            const uniqueValues = [
              ...new Set(tableDisplay.map((p: any) => p[col.fieldName]))
            ];

            column.filters = uniqueValues.map(val => ({
              text: val,
              value: val
            }));

            column.onFilter = (value: any, record: any) =>
              record[filterRef.current] === value;
          }
          if (column.sorterOn) {
            column.sorter = (a: any, b: any) => {
              if (typeof a[sortRef.current] === "string") {
                return a[sortRef.current].length - b[sortRef.current].length;
              }
              return a[sortRef.current] - b[sortRef.current];
            };
            column.sortDirections = ["descend", "ascend"];
          }

          return column;
        })
    );
  }, [appConfigs, tableDisplay, theme]);

  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
        marginTop: "20vh"
      }}
    >
      <img src="/Ivoyant-logo_03.png" alt="" style={{ marginLeft: "40%" }} />
      <Table
        onChange={(val, filterData: any, columnData: any) => {
          sortRef.current = columnData.columnKey;
          Object.keys(filterData).map((it: any) => (filterRef.current = it));
        }}
        dataSource={tableDisplay}
        columns={columnsConvert}
        style={{ marginTop: 40 }}
        bordered={true}
        loading={!tableDisplay.length ? true : false}
      />
    </div>
  );
};

export default TableComp;
