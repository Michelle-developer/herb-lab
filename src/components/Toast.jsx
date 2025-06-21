import { useEffect } from "react";
import { useConstitutionContext } from "../contexts/ConstitutionContext";

function Toast({ type }) {
  const { symptomState, symptomDispatch } = useConstitutionContext();
  const shouldDispay = symptomState.displayMessage.type === type;
  const relatedMessage = symptomState.displayMessage.text;

  useEffect(() => {
    //提示訊息有內容，才建立倒數計時器
    if (shouldDispay) {
      const timer = setTimeout(() => {
        symptomDispatch({ type: "clearDisplayMessage" });
      }, 5000);
      //取消舊的倒數
      return () => clearTimeout(timer);
    } else return;
  }, [relatedMessage, symptomDispatch, shouldDispay]);

  return (
    <div className="fixed top-4 left-8 z-50 w-3/5 rounded bg-white/90 px-4 py-2 text-sm text-gray-600 shadow-md">
      {relatedMessage}
    </div>
  );
}

export default Toast;
