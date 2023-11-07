import { useState } from "react";

export default function MemoDetail({
  selectedMemo,
  isAddingNewMemo,
  onMemoEditClick,
  onDeleteButtonClick,
}) {
  console.log("編集画面のレンダリング！");
  const [editedContent, setEditedContent] = useState(selectedMemo.content);

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
        <button onClick={() => onMemoEditClick(editedContent)}>
          {isAddingNewMemo ? "追加" : "編集"}
        </button>
      </div>
      <div>
        <button onClick={onDeleteButtonClick}>削除</button>
      </div>
    </div>
  );
}
