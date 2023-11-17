export const saveMemosToStorage = (memos) =>
  localStorage.setItem("memos", JSON.stringify(memos));

export const getAllMemosFromStorage = () => localStorage.getItem("memos");

export const getMemoFirstLine = (memo) => {
  const newlineIndex = memo.indexOf("\n");
  return newlineIndex === -1 ? memo : memo.slice(0, newlineIndex);
};
