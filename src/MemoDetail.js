import { useState } from "react";
import { retrieveMemoFirstLine } from "./modules";
const blankCharRegExp = /^[\s\u3000]+$/;

export default function MemoDetail({
  memos,
  setMemos,
  selectedMemo,
  setIsEditable,
  isAddingNewMemo,
  setIsAddingNewMemo,
}) {
  console.log("編集画面のレンダリング！");
  const [editedContent, setEditedContent] = useState(selectedMemo.content);

  const handleEditButtonClick = () => {
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
    <div>
      <div>
        <textarea
          rows="4"
          cols="40"
          value={editedContent}
          onChange={(e) => {
            setEditedContent(e.target.value);
          }}
        ></textarea>
      </div>
      <div>
        <button onClick={handleEditButtonClick}>編集</button>
      </div>
      <div>
        <button onClick={handleDeleteButtonClick}>削除</button>
      </div>
    </div>
  );
}
