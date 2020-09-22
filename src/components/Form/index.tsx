import React, { useState, useRef } from "react";

import { Input } from "components";
import { IFormData } from "interfaces";
import { validate } from "utils";

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

const clearValidation = {
  firstName: false,
  lastName: false,
  phone: false,
  sex: false,
  age: false,
};
const clearFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  sex: false,
  age: 0,
};

const Form: React.FC<IProps> = (props) => {
  const [formValidation, setFormValidation] = useState<IFormValidation>(
    clearValidation
  );
  const [formData, setFormData] = useState<IFormData>(clearFormData);

  const maleCheckbox = useRef<HTMLInputElement>(null);
  const femaleCheckbox = useRef<HTMLInputElement>(null);

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

  const onFormChange = (
    value: string | number | boolean,
    validated: boolean,
    key: string
  ) => {
    setFormValidation({ ...formValidation, [key]: validated });
    setFormData({ ...formData, [key]: value });
  };

  const choseMale = () => {
    onFormChange(true, true, "sex");
    femaleCheckbox.current!.checked = false;
  };
  const choseFemale = () => {
    onFormChange(false, true, "sex");
    maleCheckbox.current!.checked = false;
  };

  const clearForm = () => {
    setFormValidation(clearValidation);
    setFormData(clearFormData);
  };

  const onFormSumbit = () => {
    if (formIsValid()) {
      props.onSubmit(formData);
      clearForm();
    }
  };

  return (
    <form>
      <Input
        label="First name"
        name="firstName"
        type="text"
        placeholder="First name"
        value={formData.firstName}
        validation={validate.onlyLettersValidation}
        onChange={onFormChange}
        errorValidationMessage="Only En letters allowed"
        succesfullValidationMessage="✓"
      />
      <Input
        label="Last name"
        name="lastName"
        type="text"
        placeholder="Last name"
        value={formData.lastName}
        validation={validate.onlyLettersValidation}
        onChange={onFormChange}
        errorValidationMessage="Only En letters allowed"
        succesfullValidationMessage="✓"
      />
      <Input
        label="Phone"
        name="phone"
        type="text"
        placeholder="380XXXXXX format"
        value={formData.phone}
        validation={validate.uaNumberValidation}
        onChange={onFormChange}
        errorValidationMessage="Phone - 380... format"
        succesfullValidationMessage="✓"
      />
      <label>Male</label>
      <input
        name="gender"
        type="checkbox"
        ref={maleCheckbox}
        onChange={choseMale}
        checked={formData.sex && formValidation.sex}
      />
      <label>Female</label>
      <input
        name="gender"
        type="checkbox"
        ref={femaleCheckbox}
        onChange={choseFemale}
        checked={!formData.sex && formValidation.sex}
      />
      <Input
        label="Age"
        name="age"
        type="number"
        placeholder="1 - 100"
        value={formData.age}
        validation={validate.ageValidation}
        onChange={onFormChange}
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
