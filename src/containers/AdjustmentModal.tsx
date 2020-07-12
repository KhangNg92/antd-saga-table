import React, { FC, memo } from "react";
import Modal from "antd/lib/modal/Modal";
import { openAdjustment } from "../redux/slices/utilsSlices";
import { Button } from "antd";
import { adjustInvoiceStart } from "../redux/slices/invoicesSlice";

type AdjustmentProps = {
  dispatch: Function;
  visible: boolean;
  data: any;
};

const AdjustmentModal: FC<AdjustmentProps> = ({ dispatch, visible, data }) => {
  const handleOpen = async () => {
    await dispatch(adjustInvoiceStart(data));
    dispatch(openAdjustment(false));
  };

  return (
    <Modal
      className="modal"
      title="Credit Adjustment"
      style={{ top: 20 }}
      visible={visible}
      onOk={handleOpen}
      onCancel={() => dispatch(openAdjustment(false))}
      centered
      footer={[
        <Button key="back" onClick={() => dispatch(openAdjustment(false))}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOpen}>
          Apply Credit
        </Button>
      ]}
    >
      <div className="text-display">Credit Balance: $ {data.creditBal}</div>
      <div style={{ marginTop: 20 }}>
        <span className="text-display" style={{ flex: 1 }}>
          Amount Due: $ {data.amountDue}
        </span>
      </div>
    </Modal>
  );
};

export default memo(AdjustmentModal);
