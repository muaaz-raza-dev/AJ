import { IdiaryCreate } from '@/app/Types/IdiaryCreate'
import { Input } from 'antd'
import { Controller, useFormContext } from 'react-hook-form'


export default function DiaryDate() {
  const {control} =useFormContext<IdiaryCreate>()
  return (
    <div>
          <h1 className="hFont font-semibold  pb-1 ">Diary Date (Optional)</h1>
          <Controller control={control} name='date' render={({field})=> {
            return <> <Input type='date' {...field}  /> </>
          }
          }
          />
    </div>
  )
}
