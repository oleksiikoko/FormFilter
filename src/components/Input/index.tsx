import React, { useRef } from "react";

import "./FormInput.scss";

interface IProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  value?: string | number;
  onChange(
    value: string | number | boolean,
    validated: boolean,
    key: string
  ): void;

  validation?(value: string | number): boolean;
  errorValidationMessage?: string;
  succesfullValidationMessage?: string;
}

const Input: React.FC<IProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);

  if (props.value === "" || props.value === 0) {
    if (inputRef.current) inputRef.current!.className = "";
    if (messageRef.current) messageRef.current!.style.display = "none";
  }

  const validateInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let validated = true;
    if (props.validation && event.target) {
      validated = props.validation(event.target.value);
    }

    props.onChange(event.target.value, validated, props.name);

    //-----Change input style
    inputRef.current!.className = validated
      ? "form-input--correct"
      : "form-input--uncorrect";

    //-----Show message
    if (!validated && props.errorValidationMessage) {
      messageRef.current!.style.display = "block";
      messageRef.current!.textContent = props.errorValidationMessage;
      messageRef.current!.className = "form-input__message--error";
    }
    if (validated && props.succesfullValidationMessage) {
      messageRef.current!.style.display = "block";
      messageRef.current!.textContent = props.succesfullValidationMessage;
      messageRef.current!.className = "form-input__message--succes";
    }
  };

  return (
    <div className="form-input">
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <input
        ref={inputRef}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={validateInput}
      />
      <p ref={messageRef} style={{ display: "none" }}></p>
    </div>
  );
};

export default Input;
