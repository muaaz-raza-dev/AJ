import { useAppSelector } from '@/app/ReduxHooks'
import {FC, ReactNode} from 'react'
import { Navigate } from 'react-router-dom';

const RoleBasedAccess:FC<{redirect?:string; roleToGiveAccess?:"admin"|"chief admin"|"user"|(("admin"|"chief admin"|"user")[]),children:ReactNode}> = ({roleToGiveAccess,children,redirect}) => {
    const {Role} =useAppSelector(s=>s.credits.Info)
    if(!Role){
        return children
    }
    else {
        if(typeof roleToGiveAccess == "string" && roleToGiveAccess==Role) {
            return children
        }
        else if(Array.isArray(roleToGiveAccess) && roleToGiveAccess.includes(Role)) {
            return children
       }
    return redirect ? <Navigate to={redirect||location.pathname}/>:null
    }

}

export default RoleBasedAccess