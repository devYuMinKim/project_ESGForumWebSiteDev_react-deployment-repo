export const getAutortity = (authorityData: number | null) => {
  if (authorityData === 0 || authorityData === 1) {
    return "O"
  }
  return "-"
}

export const selectMember = (
  id: number,
  manage: boolean,
  selected: number[],
  setManage: React.Dispatch<React.SetStateAction<boolean>>,
  setSelected: React.Dispatch<React.SetStateAction<number[]>>) => {

  if (selected?.length === 0) {
    setSelected([...selected, id]);
    setManage(!manage);
    return;
  }

  if (selected.includes(id)) {
    setSelected(selected.filter((select) => select !== id));
    setManage(!manage);
  }

  else {
    setSelected([...selected, id]);
  }
}