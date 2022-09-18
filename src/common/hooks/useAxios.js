import { useState, useEffect, useCallback } from "react";
import { reducerUtils } from "../../util/async.utill";

export default function useAxios(api) {
  const [apiState, setApiState] = useState(reducerUtils.initial());
  const sendQuery = useCallback(async () => {
    setApiState(reducerUtils.loading());

    try {
      const res = await api();
      setApiState(reducerUtils.success(res.data));
    } catch (e) {
      setApiState(reducerUtils.error(e));
    }
  }, [api]);

  useEffect(() => {
    sendQuery();
  }, [sendQuery]);

  return { ...apiState };
}
