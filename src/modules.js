export const saveMemosToStorage = (memos) =>
  localStorage.setItem("memos", JSON.stringify(memos));

export const retrieveAllMemosFromStorage = () => localStorage.getItem("memos");

export const retrieveMemoFirstLine = (memo) => {
  const newlineIndex = memo.indexOf("\n");
  return newlineIndex === -1 ? memo : memo.slice(0, newlineIndex);
};
