import { retrieveMemoFirstLine } from "./modules";

export default function MemoTitle({ memo, className, onClick }) {
  const firstLine = retrieveMemoFirstLine(memo.content);

  return (
    <li>
      <p className={className} onClick={onClick}>
        {firstLine}
      </p>
    </li>
  );
}
