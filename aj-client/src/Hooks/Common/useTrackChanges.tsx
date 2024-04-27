import { useState, useEffect } from "react";
function useTrackChanges(stateToCompare: any) {
  const [InititalState, setInititalState] = useState<any>(null);
  const [changes, setChanges] = useState(false);
  useEffect(() => {
    if (InititalState == null) {
 
        setInititalState(stateToCompare);
      
    }
  }, []);

  useEffect(() => {
    if (stateToCompare!=null&&InititalState!=null) {
      setChanges(!(JSON.stringify(sortObjectKeys(InititalState))==JSON.stringify(sortObjectKeys(stateToCompare))));
    }
  }, [stateToCompare, ]);
  let UpdateState = (updatedState: any) => {
    setInititalState(updatedState);
  };
  return { changes, UpdateState }; //! Change Initialstate to set the updated state which will use in tracking
}
export { useTrackChanges };

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