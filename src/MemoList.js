import MemoTitle from "./MemoTitle";

export default function MemoList({
  memos,
  setMemos,
  selectedMemo,
  setSelectedMemo,
  setIsEditable,
  isAddingNewMemo,
  setIsAddingNewMemo,
}) {
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
              onClick={() => {
                if (selectedMemo !== null && selectedMemo.id === memo.id) {
                  return;
                }

                setIsEditable(true);
                setSelectedMemo(memo);
                setMemos(JSON.parse(localStorage.getItem("memos")));
                isAddingNewMemo && setIsAddingNewMemo(false);
              }}
            />
          ))}
      </div>
      <div>
        <button
          onClick={handleAddButtonClick}
          disabled={isAddingNewMemo && true}
        >
          +
        </button>
      </div>
    </div>
  );
}
