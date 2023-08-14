import { faCircle, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputItem from "app/components/atoms/Input";
import React, { useState } from "react";
import SelectColor from "../SelectColor";
import ToggleButton from "app/components/atoms/ToggleButton";

interface AddProjectProps {
  isClick: boolean;
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddProject: React.FC<AddProjectProps> = (props) => {
  const { isClick, setIsClick } = props;

  const [selectedImageTest, setSelectedImageTest] = useState(false);
  const [selectedImageBoear, setSelectedImageBoear] = useState(false);

  return (
    <>
      {isClick && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={() => setIsClick(false)}
          ></div>
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-md mx-auto bg-white rounded-md shadow-lg">
              <div className="flex items-center justify-between p-2 border-b">
                <h4 className="text-lg font-medium text-gray-800">
                  Add Project
                </h4>
                <button className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                  <FontAwesomeIcon icon={faCircleQuestion} />
                </button>
              </div>
              <div className="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed  ">
                <InputItem placeholder="" title="Name" type="text" />
                <SelectColor />
                <ToggleButton title="Add to favorites" />
              </div>
              <div className="flex justify-evenly">
                <div className="flex">
                  <input
                    id="test-radio"
                    type="radio"
                    value="Test"
                    name="default-radio"
                    className="w-4 h-4 accent-red-500 bg-gray-100 radioList"
                    checked={selectedImageTest}
                    onChange={() => {
                      setSelectedImageTest(true);
                      setSelectedImageBoear(false);
                    }}
                  />
                  <label
                    htmlFor="test-radio"
                    className={`ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 ${
                      selectedImageTest
                        ? "border border-yellow-500"
                        : "border border-violet-200"
                    }`}
                  >
                    <div style={{ border: "1px solid #ccc", padding: "5px" }}>
                      <img
                        src="https://todoist.b-cdn.net/assets/images/21ab83928e698e2cd56b75be2756e393.svg"
                        alt="Image 1"
                      />
                    </div>
                    Test
                  </label>
                </div>
                <div className="flex">
                  <input
                    id="test-radio"
                    type="radio"
                    value="Test"
                    name="default-radio"
                    className="w-4 h-4 accent-red-500 bg-gray-100 radioList"
                    checked={selectedImageBoear}
                    onChange={() => {
                      setSelectedImageTest(false);
                      setSelectedImageBoear(true);
                    }}
                  />
                  <label
                    htmlFor="test-radio"
                    className={`ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 ${
                      selectedImageBoear
                        ? "border border-yellow-500"
                        : "border border-violet-200"
                    }`}
                  >
                    <div style={{ border: "1px solid #ccc", padding: "5px" }}>
                      <img
                        src="https://todoist.b-cdn.net/assets/images/21ab83928e698e2cd56b75be2756e393.svg"
                        alt="Image 1"
                      />
                    </div>
                    Test
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 p-4 mt-5 border-t">
                <div
                  className="px-6 py-2 text-gray-800 border rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                  onClick={() => setIsClick(false)}
                >
                  Cancel
                </div>
                <div
                  className="px-6 py-2 text-white bg-red-500 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                  onClick={() => setIsClick(false)}
                >
                  Accept
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProject;
