import  { useState, useEffect } from "react";
function useTrackChanges(stateToCompare: any) {
  const [initialState, setInitialState] = useState<any>(null);
  const [changes, setChanges] = useState(false);
  
  useEffect(() => {
    if (stateToCompare !== null&&initialState!=null) {
      const sortedInitialState = sortObjectKeys(DeepCopy(initialState));
      const sortedCompareableState = sortObjectKeys(DeepCopy(stateToCompare));
      setChanges(!(JSON.stringify(sortedInitialState)==JSON.stringify(sortedCompareableState)));
    }
  },[DeepCopy(stateToCompare)]); 


const UpdateState = (updatedState: any) => {
    setInitialState(DeepCopy(updatedState));
};

  return { changes, UpdateState };
}


export { useTrackChanges };
const DeepCopy = (obj:{[key:string]:any})=>{
  return JSON.parse(JSON.stringify(obj))
}
const sortObjectKeys = (obj:any) => {
  if(obj){
    const sortedKeys = Object.keys(obj).sort();
    const sortedObj:{[key:string]:any} = {};
    sortedKeys.forEach(key => {
      sortedObj[key] = obj[key]??"";
    });
    return sortedObj;
  }
};
