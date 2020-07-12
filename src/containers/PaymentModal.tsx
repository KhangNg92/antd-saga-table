import React, { FC, useState, useEffect } from "react";
import Modal from "antd/lib/modal/Modal";
import { openPayment } from "../redux/slices/utilsSlices";
import { Input, Button, InputNumber } from "antd";
import { submitPaymentStart } from "../redux/slices/invoicesSlice";
import { creditCard } from "../utils/constants";

type PaymentProps = {
  dispatch: Function;
  visible: boolean;
  data: any;
};

const PaymentModal: FC<PaymentProps> = ({ dispatch, visible, data }) => {
  const [amountDue, setAmountDue] = useState(0);
  const [cardNumber, setcardNumber] = useState("");

  const [validationErrors, setValidationErros] = useState("");

  const handlePayment = () => {
    if (cardNumber !== creditCard) {
      return setValidationErros("Invalid Card Number");
    }
    if (amountDue > data.amountDue) {
      return setValidationErros(
        `The amount selected is larger than the actual amount due. Please select an amount that lesser or equal to ${data.amountDue}`
      );
    }
    dispatch(
      submitPaymentStart({ invoices: data, cardNumber, amountPaid: amountDue })
    );
    dispatch(openPayment(false));
  };

  const handleInputChange = (e: any) => {
    setcardNumber(e.target.value);
    setValidationErros("");
  };

  useEffect(() => {
    setAmountDue(data.amountDue);
  }, [data.amountDue]);

  return (
    <Modal
      title="Payment"
      style={{ top: 20 }}
      visible={visible}
      onOk={handlePayment}
      onCancel={() => dispatch(openPayment(false))}
      centered
      footer={[
        <Button key="back" onClick={() => dispatch(openPayment(false))}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handlePayment}>
          Apply Credit
        </Button>
      ]}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <span className="text-display" style={{ flex: 1 }}>
          Amount Due:{" "}
        </span>
        <div>
          <InputNumber
            defaultValue={amountDue}
            formatter={value =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            onChange={val => setAmountDue(val as number)}
          />
        </div>
      </div>

      <Input
        style={{ marginTop: 20 }}
        type="tel"
        pattern="[0-9\s]{13,19}"
        maxLength={19}
        placeholder="Please Enter as this format xxxx-xxxx-xxxx-xxxx"
        inputMode="numeric"
        autoComplete="cc-number"
        onChange={handleInputChange}
      />
      <div style={{ color: "#ff4d4f" }}>{validationErrors}</div>
    </Modal>
  );
};

export default PaymentModal;
