import { retrieveMemoFirstLine } from "./modules";

export default function MemoTitle({ memo, className, onClick }) {
  const firstLine = retrieveMemoFirstLine(memo.content);

  return <p className={className} onClick={onClick}>{firstLine}</p>;
}
