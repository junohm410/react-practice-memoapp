import { getMemoFirstLine } from "./modules";

export default function MemoTitle({ memo, selectedMemo, onClick }) {
  const className =
    selectedMemo !== null && selectedMemo.id === memo.id
      ? "selected-memo-title"
      : "memo-title";
  const firstLine = getMemoFirstLine(memo.content);

  return (
    <li>
      <p className={className} onClick={onClick}>
        {firstLine}
      </p>
    </li>
  );
}
