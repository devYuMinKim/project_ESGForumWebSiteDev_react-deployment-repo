export const getAutortity = (authorityData: number | null) => {
  if (authorityData === 0 || authorityData === 1) {
    return "O"
  }
  return "-"
}

export const selectMember = (
  id: number,
  selected: number[],
  setSelected: React.Dispatch<React.SetStateAction<number[]>>) => {

  if (selected?.length === 0) {
    setSelected([...selected, id]);
    return;
  }

  if (selected.includes(id)) {
    setSelected(selected.filter((select) => select !== id));
  }

  else {
    setSelected([...selected, id]);
  }
}