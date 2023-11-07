import { useState } from "react";
import MemoList from "./MemoList";
import MemoDetail from "./MemoDetail";
import { retrieveMemoFirstLine } from "./modules";
import "./App.css";
const blankCharRegExp = /^[\s\u3000]+$/;

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

  const handleMemoTitleClick = (memo) => {
    if (selectedMemo !== null && selectedMemo.id === memo.id) {
      return;
    }

    setIsEditable(true);
    setSelectedMemo(memo);
    setMemos(JSON.parse(localStorage.getItem("memos")));
    isAddingNewMemo && setIsAddingNewMemo(false);
  };

  const handleAddButtonClick = () => {
    const newMemoId = memos.length > 0 ? memos[memos.length - 1].id + 1 : 1;
    const temporaryNewMemo = {
      id: newMemoId,
      content: "新規メモ",
    };
    const temporaryNewMemoList = [...memos, temporaryNewMemo];
    setIsAddingNewMemo(true);
    setIsEditable(true);
    setMemos(temporaryNewMemoList);
    setSelectedMemo(temporaryNewMemo);
  };

  const handleEditButtonClick = (editedContent) => {
    const firstLine = retrieveMemoFirstLine(editedContent);
    if (firstLine === "" || blankCharRegExp.test(firstLine)) {
      alert("メモの1行目には空白以外の文字を1文字以上入力してください。");
      return;
    }

    const editedMemo = { ...selectedMemo, content: editedContent };
    const updatedMemos = memos.map((memo) => {
      if (memo.id === editedMemo.id) {
        return editedMemo;
      } else {
        return memo;
      }
    });
    isAddingNewMemo && setIsAddingNewMemo(false);
    saveMemosToStorage(updatedMemos);
    setMemos(updatedMemos);
  };

  const handleDeleteButtonClick = () => {
    isAddingNewMemo && setIsAddingNewMemo(false);
    const updatedMemos = memos.filter((memo) => memo.id !== selectedMemo.id);
    saveMemosToStorage(updatedMemos);
    setMemos(updatedMemos);
    setIsEditable(false);
  };

  const saveMemosToStorage = (memos) =>
    localStorage.setItem("memos", JSON.stringify(memos));

  return (
    <>
      <MemoList
        memos={memos}
        selectedMemo={selectedMemo}
        isAddingNewMemo={isAddingNewMemo}
        onMemoTitleClick={handleMemoTitleClick}
        onAddButtonClick={handleAddButtonClick}
      />
      {isEditable && (
        <MemoDetail
          key={selectedMemo.id}
          selectedMemo={selectedMemo}
          onMemoEditClick={handleEditButtonClick}
          onDeleteButtonClick={handleDeleteButtonClick}
        />
      )}
    </>
  );
}

export default App;
