const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex flex-col md:flex-row mt-1">
      <div>
      <label className="label">
        <span className="text-base label-text text-[#696F79]" >Select Gender: </span>
      </label>
      </div>
      <div className="flex flex-wrap">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "male" ? "selected" : ""
          } `}
        >
          <span className="label-text text-[#b5bcc8] m-1">Male</span>
          <input type="checkbox"  
          className="checkbox bg-[#787e88] h-5 w-5" 
          checked={selectedGender === "male"}
          onChange={() => onCheckboxChange("male")}/>
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer  ${
            selectedGender === "female" ? "selected" : ""
          }`}
        >
          <span className="label-text text-[#b5bcc8] m-1">Female</span>
          <input
            type="checkbox"
            className="checkbox bg-[#787e88] h-5 w-5"
            checked={selectedGender === "female"}
            onChange={() => onCheckboxChange("female")}
          />
        </label>
      </div>
      </div>
    </div>
  );
};
export default GenderCheckbox;
