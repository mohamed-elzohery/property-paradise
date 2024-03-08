"use client";
import React, { useState } from "react";

export interface SelectBoxOption {
  value: string;
  label: string;
}

interface SelectBoxProps {
  options: SelectBoxOption[];
  name: string;
  selectedOption?: SelectBoxOption;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  name,
  options,
  selectedOption,
}) => {
  return <></>;
};

export default SelectBox;
