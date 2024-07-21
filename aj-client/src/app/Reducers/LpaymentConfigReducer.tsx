import { PayloadAction } from "@reduxjs/toolkit";
import {
  Ipayment_config_short,
  IpaymentconfigLanding,
} from "../Types/IpaymentLanding";
interface IconfigFilters {
  label: "sessions" | "feeTypes";
  available?: string[];
  selected?: string;
  register?:{isLoading:boolean} ;
  isLoading?: boolean;
}

export const FilterSettingsFn = (
  state: IpaymentconfigLanding,
  {
    payload: { label, available, selected, isLoading ,register},
  }: PayloadAction<IconfigFilters>
) => {
  if(register) state.register.isLoading = register.isLoading
  if (available) state.filters[label].available = available;
  if (selected) state.filters[label].selected = selected;
  if (isLoading != undefined) state.isLoading = isLoading;
};

export const InsertpayloadFn = (
  state: IpaymentconfigLanding,
  {payload,
    
  }: PayloadAction<{ isLoading?: boolean; payload: Ipayment_config_short[] }>
) => {
if (payload.isLoading != undefined) state.isLoading = payload.isLoading;
state.payload = payload.payload;
};
