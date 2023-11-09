import { useLoginStatus } from "./LoginStatusContext";

export default function MemoDetail({
  isAddingNewMemo,
  onSubmitMemo,
  onDeleteMemo,
  inputContent,
  onChangeText,
}) {
  const { isLoggedIn } = useLoginStatus();

  return (
    <div className="memo-detail-container">
      <div>
        <textarea
          rows="8"
          cols="40"
          className="memo-textarea"
          value={inputContent}
          readOnly={!isLoggedIn}
          onChange={(e) => {
            onChangeText(e.target.value);
          }}
        ></textarea>
      </div>
      {isLoggedIn && (
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
      )}
    </div>
  );
}
