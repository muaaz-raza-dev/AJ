import { Input, Select } from "antd";
import RegLabelWrapper from "../LabelWrapper.reg";
import TextArea from "antd/es/input/TextArea";
import { useFormContext ,Controller } from "react-hook-form";
import { BsWhatsapp } from "react-icons/bs";
import { BiPhone } from "react-icons/bi";
const RegPersonalDetailsForm = () => {
  let { control ,setValue} = useFormContext();
  return (
    <div className="flex w-full flex-wrap gap-x-4 gap-y-6">
   <RegLabelWrapper className="w-[48%] self-end" title="First Name">
        <Controller
          rules={{required:"First Name is required"}}
          name="FirstName"
          control={control}
          render={({ field ,fieldState:{error} }) => (
            <>
            <Input {...field} placeholder="Osman" className="active:border-[var(--dark)]" />
            {
              error && <p className="text-red-500 text-xs">{error.message}</p>
            }
            </>
          )}
        />
      </RegLabelWrapper>
      <RegLabelWrapper className="w-[48%] self-end" title="Last Name">
        <Controller
          name="LastName"
          control={control}
          render={({ field  }) => (
           <>
            <Input {...field} placeholder="Yousuf" className="active:border-[var(--dark)]" />
           </>
          )}
        />
      </RegLabelWrapper>
      <RegLabelWrapper className="w-[48%]" title="Father Name">
        <Controller
          name="fatherName"
          rules={{required:"Father name is required"}}
          control={control}
          render={({ field,fieldState:{error} }) => (
            <>
            <Input {...field} placeholder="Yousuf" className="active:border-[var(--dark)]" />
            { error && <p className="text-red-500 text-xs">{error.message}</p>}
            </>
          )}
        />
      </RegLabelWrapper>
      <RegLabelWrapper className="w-[48%]" title="Date of Birth">
        <Controller
          name="DOB"
          rules={{required:"Date of birth is required"}}
          control={control}
          render={({ field,fieldState:{error} }) => (
        <>
            <Input {...field} className="active:border-[var(--dark)]" type="date" />
{            error && <p className="text-red-500 text-xs">{error.message}</p>}
        </>
          )}
        />

      </RegLabelWrapper>
      <RegLabelWrapper className="w-[48%]" title="Gender">
        <Select
          defaultValue={"male"}
          onChange={(value) => setValue("Gender", value)}
        >
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
          <Select.Option value="other">Other</Select.Option>
        </Select>
      </RegLabelWrapper>
      <RegLabelWrapper className="w-[48%]" title="Email Address">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="osman@gmail.com"
              className="active:border-[var(--dark)]"
         
            />
          )}
        />
      </RegLabelWrapper>
      <RegLabelWrapper className="w-[31%]" title="Student's CNIC No.">
        <Controller
          name="sCNIC"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="XXXXX-XXXXXXX-X"
              className="active:border-[var(--dark)] px-2"
              
            />
          )}
        />
      </RegLabelWrapper>
      <RegLabelWrapper className="w-[31%]" title="Mother's CNIC No.">
        <Controller
          name="mCNIC"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="XXXXX-XXXXXXX-X"
              className="active:border-[var(--dark)] px-2"
              
            />
          )}
        />
      </RegLabelWrapper>
      <RegLabelWrapper className="w-[31%]" title="Father's CNIC No.">
        <Controller
          name="fCNIC"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="XXXXX-XXXXXXX-X"
              className="active:border-[var(--dark)] px-2"
              
            />
          )}
        />
      </RegLabelWrapper>
      <RegLabelWrapper className="w-[48%]" title="Contact numbers">
        <div className="flex w-full gap-x-1">
          <Controller
          rules={{required:"Atleast one contact number is required"}}

            name="contact.0" 
            control={control}
            render={({ field,fieldState:{error} }) => (
           
           
              <Input {...field} placeholder="32348290342" className={`w-[49%] active:border-[var(--dark)] ${error&&"border border-red-500"}`} type="number" prefix={<BiPhone/>} />
             
            )}
          />
          <Controller
            name="contact.1"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="032348290342" className="w-[49%] active:border-[var(--dark)]" type="number" prefix={<BiPhone/>} />
            )}
          />
        </div>
      </RegLabelWrapper>
      <RegLabelWrapper className="w-[48%]" title="WhatsApp number">
        <Controller
          name="WA"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              placeholder="+92234234234234"
              className="active:border-[var(--dark)] px-2"
              prefix={<BsWhatsapp/>}
            />
          )}
        />
      </RegLabelWrapper>
      <RegLabelWrapper className="w-[48%]" title="Address">
  <div className="flex w-full gap-x-1 flex-col">
    <Controller
      name="Address"
      control={control}
      render={({ field }) => (
        <>
        <TextArea
          {...field}
          rows={1}
          maxLength={200}
          placeholder="Lorem ipsum dolo,"
          className="!resize-none"
        />
          <p className="text-xs self-end text-[var(--secondary)]">{field.value.length}/200</p>
          </>
      )}
    />
  </div>
</RegLabelWrapper>
    </div>
  );
};

export default RegPersonalDetailsForm;


      
