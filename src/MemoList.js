import MemoTitle from "./MemoTitle";
import { useLoginStatus } from "./LoginStatusContext";

export default function MemoList({
  memos,
  selectedMemo,
  isAddingNewMemo,
  onClickMemoTitle,
  onClickAddButton,
}) {
  const { isLoggedIn } = useLoginStatus();

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
