import { useContext } from "react";
import MemoTitle from "./MemoTitle";
import { LoginContext } from "./LoginContext";

export default function MemoList({
  memos,
  selectedMemo,
  isAddingNewMemo,
  onClickMemoTitle,
  onClickAddButton,
}) {
  const isLoggedIn = useContext(LoginContext);

  return (
    <div className="memo-list-container">
      <div>
        <ul>
          {memos.length > 0 &&
            memos.map((memo) => (
              <MemoTitle
                key={memo.id}
                memo={memo}
                selectedMemo={selectedMemo}
                onClick={() => onClickMemoTitle(memo)}
              />
            ))}
        </ul>
      </div>
      {isLoggedIn && (
        <div>
          <button onClick={onClickAddButton} disabled={isAddingNewMemo}>
            +
          </button>
        </div>
      )}
    </div>
  );
}
