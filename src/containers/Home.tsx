import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";

// Components
import TableComp from "../components/TableComponent";

// Redux actions
import { RootState } from "../redux/store";
import { getInvoicesStart } from "../redux/slices/invoicesSlice";
import { getVendorsStart } from "../redux/slices/vendorsSlice";
import { openAdjustment, openPayment } from "../redux/slices/utilsSlices";

// Containers
import AdjustmentModal from "./AdjustmentModal";
import PaymentModal from "./PaymentModal";
import { darkTheme, lightTheme } from "../utils/constants";

const Home = () => {
  const dispatch = useDispatch();

  const invoices = useSelector((state: RootState) => state.invoices.invoices);
  const vendors = useSelector((state: RootState) => state.vendors.vendors);
  const configs = useSelector((state: RootState) => state.config.config);
  const theme = useSelector((state: RootState) => state.utils.theme);

  const [dataForModal, setDataForModal] = useState({});
  const [tableDisplay, setTableDisplay] = useState([]);

  const paymentModal = useSelector(
    (state: RootState) => state.utils.paymentOpen
  );
  const adjustmentModal = useSelector(
    (state: RootState) => state.utils.adjustmentOpen
  );

  useEffect(() => {
    Promise.all([dispatch(getInvoicesStart()), dispatch(getVendorsStart())]);
  }, [dispatch]);

  useEffect(() => {
    const handlePaymentOpen = (data: any) => {
      setDataForModal(data);
      if (configs.tableConfig.adjustmentEnabled && data.creditBal > 0) {
        return dispatch(openAdjustment(true));
      }

      return dispatch(openPayment(true));
    };

    const renderStyleButton = (data: any) => {
      if (data.amountDue === 0) {
        return;
      }
      return {
        background: theme === "dark" ? darkTheme.body : lightTheme.body,
        color: theme === "dark" ? darkTheme.text : lightTheme.text
      };
    };

    const converted = invoices.length
      ? invoices
          .map(iv => {
            const temp = { ...iv };
            vendors.forEach(ve => {
              if (
                iv.vendorId === ve.vendorId ||
                iv.vendorId === ve.vendorName
              ) {
                if (!temp.hasOwnProperty("creditBal")) {
                  temp.creditBal = ve.creditBal;
                }
                temp.vendorName = ve.vendorName;
              }
              return ve;
            });
            return temp;
          })
          .map((re, idx) => ({
            ...re,
            key: `key_${idx}`,
            pay: (
              <Button
                disabled={re.amountDue === 0}
                onClick={() => {
                  handlePaymentOpen(re);
                }}
                key={`key_${idx}`}
                style={renderStyleButton(re)}
                shape="round"
              >
                Pay
              </Button>
            )
          }))
      : [];

    setTableDisplay(converted as []);
  }, [invoices, vendors, dispatch, configs, theme]);

  return (
    <div>
      <TableComp
        tableDisplay={tableDisplay as []}
        appConfigs={configs.tableConfig}
      />

      {adjustmentModal && (
        <AdjustmentModal
          visible={adjustmentModal}
          dispatch={dispatch}
          data={dataForModal}
        />
      )}

      {paymentModal && (
        <PaymentModal
          visible={paymentModal}
          dispatch={dispatch}
          data={dataForModal}
        />
      )}
    </div>
  );
};

export default Home;
