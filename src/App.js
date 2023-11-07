import { useState } from "react";
import MemoList from "./MemoList";
import MemoDetail from "./MemoDetail";
import {
  retrieveAllMemosFromStorage,
  saveMemosToStorage,
  retrieveMemoFirstLine,
} from "./modules";
import "./App.css";
const blankCharRegExp = /^[\s\u3000]+$/;

if (retrieveAllMemosFromStorage() === null) {
  saveMemosToStorage([]);
}

console.log(JSON.parse(retrieveAllMemosFromStorage()));

function App() {
  console.log("Appコンポーネントのレンダリング!");
  const [memos, setMemos] = useState(JSON.parse(retrieveAllMemosFromStorage()));
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [isAddingNewMemo, setIsAddingNewMemo] = useState(false);

  const handleClickMemoTitle = (memo) => {
    if (selectedMemo !== null && selectedMemo.id === memo.id) {
      return;
    }

    setIsEditable(true);
    setSelectedMemo(memo);
    setMemos(JSON.parse(retrieveAllMemosFromStorage()));
    isAddingNewMemo && setIsAddingNewMemo(false);
  };

  const handleClickAddButton = () => {
    const newMemoId = memos.length > 0 ? memos[memos.length - 1].id + 1 : 1;
    const memoDraft = {
      id: newMemoId,
      content: "新規メモ",
    };
    const temporaryNewMemoList = [...memos, memoDraft];
    setIsAddingNewMemo(true);
    setIsEditable(true);
    setMemos(temporaryNewMemoList);
    setSelectedMemo(memoDraft);
  };

  const handleSubmitMemo = (inputContent) => {
    const firstLine = retrieveMemoFirstLine(inputContent);
    if (firstLine === "" || blankCharRegExp.test(firstLine)) {
      alert("メモの1行目には空白以外の文字を1文字以上入力してください。");
      return;
    }

    const inputMemo = { ...selectedMemo, content: inputContent };
    const updatedMemos = memos.map((memo) => {
      if (memo.id === inputMemo.id) {
        return inputMemo;
      } else {
        return memo;
      }
    });
    isAddingNewMemo && setIsAddingNewMemo(false);
    saveMemosToStorage(updatedMemos);
    setMemos(updatedMemos);
  };

  const handleDeleteMemo = () => {
    isAddingNewMemo && setIsAddingNewMemo(false);
    const updatedMemos = memos.filter((memo) => memo.id !== selectedMemo.id);
    saveMemosToStorage(updatedMemos);
    setMemos(updatedMemos);
    setIsEditable(false);
  };

  return (
    <div className="memo-app-container">
      <MemoList
        memos={memos}
        selectedMemo={selectedMemo}
        isAddingNewMemo={isAddingNewMemo}
        onClickMemoTitle={handleClickMemoTitle}
        onClickAddButton={handleClickAddButton}
      />
      {isEditable && (
        <MemoDetail
          key={selectedMemo.id}
          selectedMemo={selectedMemo}
          isAddingNewMemo={isAddingNewMemo}
          onSubmitMemo={handleSubmitMemo}
          onDeleteMemo={handleDeleteMemo}
        />
      )}
    </div>
  );
}

export default App;
