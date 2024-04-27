import { PayloadAction } from "@reduxjs/toolkit"
import { IfeeDoc, IstdExclusive, IstdExclusiveOverview, IstudentExclusive } from "../Types/IStudentExclusive"
import { IRegisterFormState } from "../Types/IStdregisterForm.t";
interface IstdExclusiveAction{
    overview?:IstdExclusiveOverview;
    isLoading?:boolean,
    isError?:string,
    isFetched?:boolean

}
interface IstdFeeExclusiveAction { 
Filters ?:{Years?:string[],FeeTypes?:string[]},
        AppliedFilters?:{Year?:string;FeeType?:string} // we'll send selectedFilters object to server 
        isLoading?:boolean;
        isError?:string;
        FeeCollection?:IfeeDoc[]
        
}
interface IstdInformationExclusive{
    Information : {isLoading?:boolean,isError?:string;Details?:IRegisterFormState};
}
export const InsertStdExclusiveFn = (state:IstdExclusive,{payload:{overview,isLoading,isError,isFetched}}:PayloadAction<IstdExclusiveAction>)=>{
if(isError!=undefined) state.isError =  isError
if(isLoading!=undefined) state.isLoading =  isLoading
if(overview!=undefined) state.overview =  overview
if(isFetched!=undefined) state.isFetched =  isFetched
}

export const InsertFeeExclusiveFn = (state:IstdExclusive,{payload:{Filters,AppliedFilters,isError,isLoading,FeeCollection}}:PayloadAction<IstdFeeExclusiveAction>) =>{
    if (Filters) {
            if(Filters.Years!=undefined ) state.Fees.Filters.Filters.Years = Filters.Years
            if(Filters.FeeTypes!=undefined) state.Fees.Filters.Filters.FeeTypes = Filters.FeeTypes
    }
    if(AppliedFilters) {
        if(AppliedFilters.Year!=undefined ) state.Fees.Filters.AppliedFilters.Year = AppliedFilters.Year
        if(AppliedFilters.FeeType!=undefined) state.Fees.Filters.AppliedFilters.FeeType = AppliedFilters.FeeType
    }
    if(isError !=undefined) state.Fees.isError = isError
    if(isLoading !=undefined) state.Fees.isLoading = isLoading
    if(FeeCollection !=undefined) state.Fees.FeeCollection = FeeCollection
}
export const InsertStudentsInformationFn= (state:IstdExclusive,{payload:{Information:{isError,isLoading,Details}}}:PayloadAction<IstdInformationExclusive>)=>{
        if(isLoading!=undefined)state.Information.isLoading = isLoading
        if(isError!=undefined)state.Information.isError = isError
        if(Details!=undefined)state.Information.Details =Details
}



