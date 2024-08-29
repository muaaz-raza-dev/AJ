import { PayloadAction } from "@reduxjs/toolkit";
import {
  IfilterableStats,
  IfilterableStatsPayload,
} from "../Types/IfilterableStats";

interface Ifilters {
  available?: {
    PaymentConfigs?: {
      [key: string]: {
        value: string;
        label: string;
        feeFrequency: "Monthly" | "Yearly" | "Custom" | "One Time";
      }[];
    }; //* {SessionsId:[{monthlyFee:monthlyFeeId}]}
    Dates?: { [key: string]: { [key: string]: string[] } }; //* {SessionsId:{2024:[July,August,March,May]}}
    Classes?: { [key: string]: { value: string; label: string }[] }; //* {SessionsId:{2024:[July,August,March,May]}}
  };
  selected?: {
    PaymentConfig?: string;
    month?: string;
    year?: string;
    Class?: string;
    Session?: string;
    feeFrequency?: "Monthly" | "Yearly" | "Custom" | "One Time";
  };
  isLoading?: boolean;
}

export const InsertFiltersFn = (
  state: IfilterableStats,
  { payload: { available, selected, isLoading } }: PayloadAction<Ifilters>
) => {
  if (isLoading != undefined) state.isLoading = isLoading;

  if (available) {
    const { Classes, Dates, PaymentConfigs } = available;
    if (Classes) state.filters.available.Classes = Classes;
    if (PaymentConfigs) state.filters.available.PaymentConfigs = PaymentConfigs;
    if (Dates) state.filters.available.Dates = Dates;
  }
  if (selected) {
    const { Class, PaymentConfig, Session, month, year, feeFrequency } =
      selected;
    if (Class) state.filters.selected.Class = Class;
    if (PaymentConfig) state.filters.selected.PaymentConfig = PaymentConfig;
    if (month) state.filters.selected.month = month;
    if (year) state.filters.selected.year = year;
    if (Session) state.filters.selected.Session = Session;
    if (feeFrequency) state.filters.selected.feeFrequency = feeFrequency;
  }
};
export interface Ipayload {
  payload: IfilterableStatsPayload[];
  isLoading?: boolean;
}

export const InsertPayloadFn = (
  state: IfilterableStats,
  { payload: { payload, isLoading } }: PayloadAction<Ipayload>
) => {
  state.payload = payload;
  if (isLoading != undefined) state.isLoading = isLoading;
};
