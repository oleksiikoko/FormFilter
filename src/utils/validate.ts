const validate = {
  onlyLettersValidation: (value: string) => /^[a-zA-Z]+$/.test(value),
  uaNumberValidation: (value: string) => /^3?8?(0\d{9})$/.test(value),
  ageValidation: (value: number) => value <= 100 && value > 0,
};

export default validate;
