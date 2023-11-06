import { useState } from "react";
import MemoList from "./MemoList";
import MemoDetail from "./MemoDetail";
import "./App.css";

if (!localStorage.getItem("memos")) {
  localStorage.setItem("memos", JSON.stringify([]));
}

const latestMemos = JSON.parse(localStorage.getItem("memos"));
console.log(latestMemos);

function App() {
  console.log("Appコンポーネントのレンダリング!");
  const [memos, setMemos] = useState(latestMemos);
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [isAddingNewMemo, setIsAddingNewMemo] = useState(false);

  return (
    <>
      <MemoList
        memos={memos}
        setMemos={setMemos}
        selectedMemo={selectedMemo}
        setSelectedMemo={setSelectedMemo}
        setIsEditable={setIsEditable}
        isAddingNewMemo={isAddingNewMemo}
        setIsAddingNewMemo={setIsAddingNewMemo}
      />
      {isEditable && (
        <MemoDetail
          key={selectedMemo.id}
          memos={memos}
          setMemos={setMemos}
          selectedMemo={selectedMemo}
          setIsEditable={setIsEditable}
          isAddingNewMemo={isAddingNewMemo}
          setIsAddingNewMemo={setIsAddingNewMemo}
        />
      )}
    </>
  );
}

export default App;
