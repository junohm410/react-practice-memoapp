import { useState } from "react";
import MemoList from "./MemoList";
import MemoDetail from "./MemoDetail";
import { useLoginStatus } from "./LoginStatusContext";
import {
  getAllMemosFromStorage,
  saveMemosToStorage,
  getMemoFirstLine,
} from "./modules";
const blankCharRegExp = /^[\s\u3000]+$/;

export default function App() {
  const [memos, setMemos] = useState(() => {
    if (getAllMemosFromStorage() === null) {
      saveMemosToStorage([]);
    }
    return JSON.parse(getAllMemosFromStorage());
  });
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [isViewingMemoDetail, setIsViewingMemoDetail] = useState(false);
  const [isAddingNewMemo, setIsAddingNewMemo] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useLoginStatus();

  const handleClickMemoTitle = (memo) => {
    if (selectedMemo !== null && selectedMemo.id === memo.id) {
      return;
    }

    if (isAddingNewMemo) {
      setMemos(JSON.parse(getAllMemosFromStorage()));
      setIsAddingNewMemo(false);
    }
    setIsViewingMemoDetail(true);
    setSelectedMemo(memo);
  };

  const handleClickAddButton = () => {
    const newMemoId = memos.length > 0 ? memos[memos.length - 1].id + 1 : 1;
    const memoDraft = {
      id: newMemoId,
      content: "新規メモ",
    };
    const temporaryNewMemoList = [...memos, memoDraft];
    setIsAddingNewMemo(true);
    setIsViewingMemoDetail(true);
    setMemos(temporaryNewMemoList);
    setSelectedMemo(memoDraft);
  };

  const handleSubmitMemo = (inputContent) => {
    const firstLine = getMemoFirstLine(inputContent);
    if (firstLine === "" || blankCharRegExp.test(firstLine)) {
      alert("メモの1行目には空白以外の文字を1文字以上入力してください。");
      return;
    }

    if (!isAddingNewMemo && inputContent === selectedMemo.content) {
      alert("メモの内容に変更がないため保存されません。");
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
    setSelectedMemo(inputMemo);
  };

  const handleDeleteMemo = () => {
    isAddingNewMemo && setIsAddingNewMemo(false);
    const updatedMemos = memos.filter((memo) => memo.id !== selectedMemo.id);
    saveMemosToStorage(updatedMemos);
    setIsViewingMemoDetail(false);
    setMemos(updatedMemos);
    setSelectedMemo(null);
  };

  const handleClickLoginButton = () => {
    if (isAddingNewMemo) {
      setIsAddingNewMemo(false);
      setIsViewingMemoDetail(false);
      setMemos(JSON.parse(getAllMemosFromStorage()));
      setSelectedMemo(null);
      setIsLoggedIn(false);
      return;
    }

    if (!isViewingMemoDetail) {
      setIsLoggedIn(!isLoggedIn);
      return;
    }

    if (isLoggedIn) {
      setIsViewingMemoDetail(false);
      setSelectedMemo(null);
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="memo-app-container">
      <div className="menu-container">
        <button onClick={handleClickLoginButton}>
          {isLoggedIn ? "ログアウト" : "ログイン"}
        </button>
      </div>
      <div className="memo-main-container">
        <MemoList
          memos={memos}
          selectedMemo={selectedMemo}
          isAddingNewMemo={isAddingNewMemo}
          onClickMemoTitle={handleClickMemoTitle}
          onClickAddButton={handleClickAddButton}
        />
        {isViewingMemoDetail && (
          <MemoDetail
            key={selectedMemo.id}
            selectedMemo={selectedMemo}
            isAddingNewMemo={isAddingNewMemo}
            onSubmitMemo={handleSubmitMemo}
            onDeleteMemo={handleDeleteMemo}
          />
        )}
      </div>
    </div>
  );
}
