import {  Input, Radio, Select } from "antd";
import RegLabelWrapper from "../LabelWrapper.reg";
import { Controller, useFormContext } from "react-hook-form";
import PolioandVaccineConfirmationField from "./PolioandVaccineConfirmationField.reg";
import DateOfAdmissionField from "./DateOfAdmissionField.reg";
import GRnoRegisterationFormField from "./GRnoField.reg";
import { useAppSelector } from "@/app/ReduxHooks";
import { FC } from "react";
import FirstAcademicClassField from "./FirstAcademicClassField.reg";

const RegAcademicDetailsForm: FC<{ edit?: boolean }> = ({ edit }) => {
  const { control ,watch } = useFormContext();
  let Class  = watch("CurrentClass")
  let { Classes , Sections} = useAppSelector((state) => state.global);
  return (
    <div className="flex w-full flex-wrap gap-x-4 gap-y-6 pb-4">
      <GRnoRegisterationFormField edit={edit} />
      <RegLabelWrapper className="w-[48%]" title="Roll no">
        <Controller
          rules={{ required: "Roll no is required" }}
          name="RollNo"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <Input
                {...field}
                placeholder="003923"
                className="active:border-[var(--dark)] dark:bg-dark dark:border-darker dark:text-white dark:placeholder:text-gray-600"
              />
              {error && <p className="text-red-500 text-xs">{error.message}</p>}
            </>
          )}
        />
      </RegLabelWrapper>

      <RegLabelWrapper className="w-[48%]" title="Current Class">
        <Controller
          rules={{ required: "Class is Required" }}
          name="CurrentClass"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <Select
                showSearch={false}
                className="dark:bg-dark  rounded-md antd-selectBarDark dark:border-darker dark:text-white dark:placeholder:text-gray-600"
                {...field}
                placeholder="7th"
                options={Object.entries(Classes).map((elm) => ({
                  label: elm[1],
                  value: elm[0],
                }))}
              />
              {error && <p className="text-red-500 text-xs">{error.message}</p>}
            </>
          )}
        />
      </RegLabelWrapper>

      <RegLabelWrapper className="w-[48%]" title="Current Section">
        <Controller
          name="CurrentSection"
          control={control}
          render={({ field }) => (
            <Select 
             className="antd-selectBarDark rounded-md  custom-select dark:bg-dark dark:border-darker dark:text-white dark:placeholder-gray-600"
                showSearch={false}
                {...field}
                placeholder="A"
                options={
                  Class?
                  Object?.entries(Sections?.[Class]||{})?.map((elm) => ({
                  label: elm[1],
                  value: elm[0],
                })
              ):[]
            }
              />
          )}
        />
      </RegLabelWrapper>
      <RegLabelWrapper className="w-[48%]" title="Admission Type">
        <Controller
          name="NewAdmission"
          control={control}
          render={({ field }) => (
            <Radio.Group {...field} defaultValue={false}>
              <Radio value={true}  className="dark:text-white ">New Admission</Radio>
              <Radio value={false} className="dark:text-white ">Past Admission</Radio>
            </Radio.Group>
          )}
        />
      </RegLabelWrapper>
      <FirstAcademicClassField/>
      <DateOfAdmissionField edit={edit} />
      <PolioandVaccineConfirmationField />
    </div>
  );
};

export default RegAcademicDetailsForm;
