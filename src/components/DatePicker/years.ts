function getYears() {
  const years = [];

  const curYear = new Date().getFullYear();
  for (let i = 0; i < 40; i++) {
    years.push(curYear - 30 + i);
  }

  return years;
}

const years = getYears()

export default years;
