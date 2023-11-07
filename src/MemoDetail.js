import { useState } from "react";

export default function MemoDetail({
  selectedMemo,
  isAddingNewMemo,
  onSubmitMemo,
  onDeleteMemo,
}) {
  console.log("編集画面のレンダリング！");
  const [inputContent, setInputContent] = useState(selectedMemo.content);

  return (
    <div className="memo-detail-container">
      <div>
        <textarea
          rows="8"
          cols="40"
          className="memo-textarea"
          value={inputContent}
          onChange={(e) => {
            setInputContent(e.target.value);
          }}
        ></textarea>
      </div>
      <div className="memo-detail-button-container">
        <button
          className="memo-edit-button"
          onClick={() => onSubmitMemo(inputContent)}
        >
          {isAddingNewMemo ? "追加" : "編集"}
        </button>
        <button className="memo-delete-button" onClick={onDeleteMemo}>
          削除
        </button>
      </div>
    </div>
  );
}
