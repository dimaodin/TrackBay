import React from "react";

function PeriodSelector({ value, period, onChange }) {
  var display = "";
  switch (value) {
    case 1:
      display = "24H";
      break;
    case 3:
      display = "3D";
      break;
    case 7:
      display = "7D";
      break;
    case 14:
      display = "2W";
      break;
    case 30:
      display = "1M";
      break;
    case 90:
      display = "3M";
      break;
    case 180:
      display = "6M";
      break;
    case 365:
      display = "1Y";
      break;
    default:
      break;
  }
  return (
    <div>
      <h1
        className={`cursor-pointer ${
          period === value ? "text-white" : "text-neutral-400"
        } `}
        onClick={onChange}
      >
        {display}
      </h1>
    </div>
  );
}

export default PeriodSelector;
