import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Invoices {
  invoiceId: number;
  vendorId: string;
  quantity: number;
  product: string;
  amountBal: number;
  amountDue: number;
  invoiceDate: string;
  creditBal?: number;
  vendorName?: string;
}

interface InvoicesState {
  invoices: Invoices[];
  isLoading: boolean;
  error: string;
}

interface payment {
  invoiceId: number;
  amountDue: number;
}

const initialState: InvoicesState = {
  invoices: [],
  isLoading: false,
  error: ""
};

function startLoading(state: InvoicesState) {
  state.isLoading = true;
}

const invoicesSlice = createSlice({
  name: "Invoices",
  initialState,
  reducers: {
    getInvoicesStart: startLoading,

    getInvoicesSuccess: (state, action: PayloadAction<Invoices[]>) => {
      state.isLoading = false;

      state.invoices = action.payload;
    },
    getInvoicesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    adjustInvoiceStart: (
      state: InvoicesState,
      action: PayloadAction<Invoices>
    ) => {
      state.isLoading = true;
    },
    adjustInvoiceSuccess: (
      state,
      action: PayloadAction<{ invoices: Invoices; remaining: number }>
    ) => {
      state.isLoading = false;
      action.payload.invoices.amountDue =
        action.payload.remaining > 0 ? action.payload.remaining : 0;
      action.payload.invoices.creditBal = Math.abs(action.payload.remaining);

      const foundInvoiceIndex = state.invoices.findIndex(
        iv =>
          iv.vendorId === action.payload.invoices.vendorId &&
          iv.quantity === action.payload.invoices.quantity
      );

      state.invoices.splice(foundInvoiceIndex, 1, action.payload.invoices);
    },

    adjustInvoiceFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    submitPaymentStart: (
      state,
      action: PayloadAction<{
        invoices: Invoices;
        cardNumber: string;
        amountPaid: number;
      }>
    ) => {
      state.isLoading = true;
    },
    submitPaymentSuccess: (
      state,
      action: PayloadAction<{ invoices: Invoices; amountPaid: number }>
    ) => {
      state.isLoading = false;

      let newPayload = { ...action.payload.invoices };

      Object.assign(newPayload, {
        amountDue:
          action.payload.invoices.amountDue - action.payload.amountPaid,
        creditBal: 0
      });

      // newPayload.invoices.amountDue = action.payload.amountPaid;
      // newPayload.invoices.creditBal = action.payload.amountPaid;

      const foundIndx = state.invoices.findIndex(
        iv =>
          iv.vendorId === action.payload.invoices.vendorId &&
          iv.quantity === action.payload.invoices.quantity
      );

      state.invoices.splice(foundIndx, 1, newPayload);
    },

    submitPaymentFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getInvoicesStart,
  getInvoicesSuccess,
  getInvoicesFailure,
  adjustInvoiceStart,
  adjustInvoiceSuccess,
  adjustInvoiceFailure,
  submitPaymentStart,
  submitPaymentFailure,
  submitPaymentSuccess
} = invoicesSlice.actions;

export default invoicesSlice.reducer;
