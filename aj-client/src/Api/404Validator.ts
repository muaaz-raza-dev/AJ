import { AxiosError } from 'axios'

const NotFoundValidator = (err:any) => {
  err = err as AxiosError
  if (err.response?.status === 404) {
    return true
  }
  else false

}

export default NotFoundValidator