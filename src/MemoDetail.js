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
    <div>
      <div>
        <textarea
          rows="4"
          cols="40"
          value={inputContent}
          onChange={(e) => {
            setInputContent(e.target.value);
          }}
        ></textarea>
      </div>
      <div>
        <button onClick={() => onSubmitMemo(inputContent)}>
          {isAddingNewMemo ? "追加" : "編集"}
        </button>
      </div>
      <div>
        <button onClick={onDeleteMemo}>削除</button>
      </div>
    </div>
  );
}
