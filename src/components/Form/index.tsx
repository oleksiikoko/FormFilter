import React, { useState, useRef } from "react";

import { Input } from "components";
import { IFormData } from "interfaces";

interface IFormValidation {
  firstName: boolean;
  lastName: boolean;
  phone: boolean;
  sex: boolean;
  age: boolean;
}

interface IProps {
  onSubmit(value: IFormData): void;
}

const Form: React.FC<IProps> = (props) => {
  const [formValidation, setFormValidation] = useState<IFormValidation>({
    firstName: false,
    lastName: false,
    phone: false,
    sex: false,
    age: false,
  });
  const [formData, setFormData] = useState<IFormData>({
    firstName: "",
    lastName: "",
    phone: "",
    sex: false,
    age: 0,
  });

  const formIsValid = () => {
    try {
      Object.values(formValidation).forEach((item) => {
        if (!item) throw 0;
      });
    } catch {
      return false;
    }
    return true;
  };

  let maleCheckbox = useRef<HTMLInputElement>(null);
  let femaleCheckbox = useRef<HTMLInputElement>(null);

  const onlyLettersValidation = (value: string) => /^[a-zA-Z]+$/.test(value);
  const uaNumberValidation = (value: string) => /^3?8?(0\d{9})$/.test(value);
  const ageValidation = (value: number) => value <= 100 && value > 0;

  const onFirstNameChange = (value: string, validated: boolean) => {
    setFormValidation({ ...formValidation, firstName: validated });
    setFormData({ ...formData, firstName: value });
  };

  const onLastNameChange = (value: string, validated: boolean) => {
    setFormValidation({ ...formValidation, lastName: validated });
    setFormData({ ...formData, lastName: value });
  };

  const onPhoneChange = (value: string, validated: boolean) => {
    setFormValidation({ ...formValidation, phone: validated });
    setFormData({ ...formData, phone: value });
  };

  const choseMale = () => {
    setFormValidation({ ...formValidation, sex: true });
    setFormData({ ...formData, sex: true });
    femaleCheckbox.current!.checked = false;
  };
  const choseFemale = () => {
    setFormValidation({ ...formValidation, sex: true });
    setFormData({ ...formData, sex: false });
    maleCheckbox.current!.checked = false;
  };

  const onAgeChange = (value: number, validated: boolean) => {
    setFormValidation({ ...formValidation, age: validated });
    setFormData({ ...formData, age: value });
  };

  const onFormSumbit = () => {
    if (formIsValid()) props.onSubmit(formData);
  };

  return (
    <form>
      <Input
        label="First name"
        name="firts-name"
        type="text"
        placeholder="First name"
        value={formData.firstName}
        validation={onlyLettersValidation}
        onChange={onFirstNameChange}
        errorValidationMessage="Only En letters allowed"
        succesfullValidationMessage="✓"
      />
      <Input
        label="Last name"
        name="last-name"
        type="text"
        placeholder="Last name"
        validation={onlyLettersValidation}
        onChange={onLastNameChange}
        errorValidationMessage="Only En letters allowed"
        succesfullValidationMessage="✓"
      />
      <Input
        label="Phone"
        name="phone"
        type="text"
        placeholder="380XXXXXX format"
        validation={uaNumberValidation}
        onChange={onPhoneChange}
        errorValidationMessage="Phone - 380... format"
        succesfullValidationMessage="✓"
      />
      <input
        name="gender"
        type="checkbox"
        ref={maleCheckbox}
        onChange={choseMale}
      />
      <input
        name="gender"
        type="checkbox"
        ref={femaleCheckbox}
        onChange={choseFemale}
      />
      <Input
        label="Age"
        name="age"
        type="number"
        placeholder="1 - 100"
        validation={ageValidation}
        onChange={onAgeChange}
        errorValidationMessage="1 - 100"
        succesfullValidationMessage="✓"
      />
      <button type="button" onClick={onFormSumbit}>
        Submit
      </button>
    </form>
  );
};

export default Form;
