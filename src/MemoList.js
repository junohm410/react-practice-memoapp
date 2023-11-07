import MemoTitle from "./MemoTitle";

export default function MemoList({
  memos,
  selectedMemo,
  isAddingNewMemo,
  onMemoTitleClick,
  onAddButtonClick,
}) {
  return (
    <div>
      <div>
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
              onClick={() => onMemoTitleClick(memo)}
            />
          ))}
      </div>
      <div>
        <button onClick={onAddButtonClick} disabled={isAddingNewMemo && true}>
          +
        </button>
      </div>
    </div>
  );
}
