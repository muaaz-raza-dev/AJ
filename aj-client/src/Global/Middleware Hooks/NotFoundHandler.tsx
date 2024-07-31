import  { FC, ReactNode } from 'react'
import ErrorPage from '../Loaders/ErrorPage';
import StudentDetailedSkeletonLoader from '@/Pages/Students Directory/sub-section/Student Detailed/StudentDetailedSkeletonLoader';
import NotFoundValidator from '@/Api/404Validator';


interface InotFoundValidatorProps{
    children:ReactNode;
    isError:boolean;
    error:any;
    isLoading:boolean;
    ErrorPageProps ?:{title?:string;message?:string,navigate?:string}

}
const NotFoundHandler:FC<InotFoundValidatorProps> = ({ErrorPageProps={},isLoading,children,error,isError,}) => {
    if (isLoading) return <StudentDetailedSkeletonLoader />;
    if (isError && NotFoundValidator(error))
        return (
          <ErrorPage
            title={ErrorPageProps.title}
            message={ErrorPageProps.message}
            navigate={ErrorPageProps.navigate}
          />
        );
  return  children
}

export default NotFoundHandler