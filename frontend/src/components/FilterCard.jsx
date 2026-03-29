import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { X } from 'lucide-react';

const Filterdata = [
  {
    filterType: "Location",
    array: ["Delhi", "Mumbai", "Pune", "Chennai"],
  },
  {
    filterType: "Industry",
    array: ["IT", "Frontend", "Backend", "FullStack Developer", "Mobile", "DevOps"],
  },
  {
    filterType: "Salary",
    array: ["50k-1Lakh", "3-4lakh", "6-7lakh", "150-200k", "10Lakh+"],
  },
];

const FilterCard = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");

  const handleFilter = (value) => {
    setSelected(value);
    dispatch(setSearchedQuery(value));
  };

  const handleReset = () => {
    setSelected("");
    dispatch(setSearchedQuery(""));
  };

  return (
    <div className="p-5 bg-white/5 border border-white/10 rounded-2xl w-full sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-sm font-semibold text-white uppercase tracking-widest">Filters</h1>
        {selected && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition"
          >
            <X size={11} /> Reset
          </button>
        )}
      </div>

      <hr className="border-white/10 mb-4" />

      {Filterdata.map((data, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
            {data.filterType}
          </h2>
          <RadioGroup value={selected} onValueChange={handleFilter} className="space-y-2.5">
            {data.array.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <RadioGroupItem
                  value={item}
                  id={`${data.filterType}-${item}`}
                  className="w-4 h-4 border-2 border-gray-600 rounded-full data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 shrink-0"
                />
                <label
                  htmlFor={`${data.filterType}-${item}`}
                  className={`text-sm cursor-pointer transition ${
                    selected === item ? 'text-purple-400 font-medium' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {item}
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;