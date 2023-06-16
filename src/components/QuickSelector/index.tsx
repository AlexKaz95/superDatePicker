import React from "react";
import { TimeAction } from "../../reducer/timeReducer";
import { CommonlyUsed } from "./CommonlyUsed";
import { QuickSelect } from "./QuickSelect";
import { RecentlyUsed } from "./RecentlyUsed";
import RefreshEvery from "./RefreshEvery";

type QuickSelectorProps = {
  startDispatch: React.Dispatch<TimeAction>;
  endDispatch: React.Dispatch<TimeAction>;
  uniqId: string;
};

export const QuickSelector: React.FC<QuickSelectorProps> = ({
  startDispatch,
  endDispatch,
  uniqId,
}) => {
  return (
    <div style={{ width: "max-content", padding: "20px" }}>
      <QuickSelect startDispatch={startDispatch} endDispatch={endDispatch} uniqId={uniqId}/>
      <CommonlyUsed 
        startDispatch={startDispatch}
        endDispatch={endDispatch}
      />
      <RecentlyUsed list={[]}/>
      {/* <RefreshEvery /> */}
    </div>
  );
};
