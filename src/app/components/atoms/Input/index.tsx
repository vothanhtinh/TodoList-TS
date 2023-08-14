import React from "react";

interface InputItemProp {
  type: string;
  placeholder: string;
  title: string;
}
const InputItem: React.FC<InputItemProp> = (props) => {
  const { type, placeholder, title } = props;
  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {title}
      </label>
      <input
        type={type}
        aria-describedby="helper-text-explanation"
        className="w-full pl-3 pr-3 py-1 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 focus:shadow-sm rounded-lg  focus:shadow-blue-500/50"
        placeholder={placeholder}
      />
    </>
  );
};

export default InputItem;
