import MemoTitle from "./MemoTitle";

export default function MemoList({
  memos,
  selectedMemo,
  isAddingNewMemo,
  onClickMemoTitle,
  onClickAddButton,
}) {
  return (
    <div className="memo-list-container">
      <div>
        <ul>
          {memos.length > 0 &&
            memos.map((memo) => (
              <MemoTitle
                key={memo.id}
                memo={memo}
                className={
                  selectedMemo !== null && selectedMemo.id === memo.id
                    ? "selected-memo-title"
                    : "memo-title"
                }
                onClick={() => onClickMemoTitle(memo)}
              />
            ))}
        </ul>
      </div>
      <div>
        <button onClick={onClickAddButton} disabled={isAddingNewMemo && true}>
          +
        </button>
      </div>
    </div>
  );
}
