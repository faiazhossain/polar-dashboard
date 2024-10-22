//@ts-nocheck
import React, { useState, useEffect } from "react";
import { Select, Spin, Alert } from "antd";
import { useAppDispatch } from "@/lib/store/hooks";
import { setSelectedRegion } from "@/lib/store/features/leftPanelSlice/leftPanelDataSlice";
import { useMap } from "react-map-gl";

const { Option } = Select;

const transformData = (data) => {
  const divisionMap = {};

  data.forEach((item) => {
    const division = item.division;
    const pid = item.pId;

    if (!divisionMap[division]) {
      divisionMap[division] = {
        title: division,
        children: {},
      };
    }

    if (!divisionMap[division].children[pid]) {
      divisionMap[division].children[pid] = {
        title: pid,
        values: [],
      };
    }

    divisionMap[division].children[pid].values.push({
      title: item.title,
      value: item.value,
      center: item.center,
    });
  });

  return divisionMap;
};

const RegionSelect = () => {
  const [data, setData] = useState({});
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedPid, setSelectedPid] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch();
  const { myMapA } = useMap();
  useEffect(() => {
    fetch("/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const transformedData = transformData(data);
        setData(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching JSON data:", error);
        setError("Failed to load data. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDivisionChange = (value) => {
    setSelectedDivision(value);
    setSelectedPid("");
    setSelectedValue("");
  };

  const handlePidChange = (value) => {
    setSelectedPid(value);
    setSelectedValue("");
  };

  const handleValueChange = (value) => {
    setSelectedValue(value);

    const selectedItem = data[selectedDivision].children[
      selectedPid
    ].values.find((item) => item.value === value);

    if (selectedItem) {
      const { center } = selectedItem;

      // Assuming you have access to the MapLibre map instance:
      myMapA.flyTo({
        center: [center[1], center[0]],
        essential: true,
      });
    }

    dispatch(setSelectedRegion({ pId: selectedPid, value }));
  };

  const filteredPids =
    selectedDivision && data[selectedDivision]
      ? Object.keys(data[selectedDivision].children)
      : [];

  const filteredValues =
    selectedDivision &&
    selectedPid &&
    data[selectedDivision].children[selectedPid]
      ? data[selectedDivision].children[selectedPid].values.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  return (
    <div className="p-4">
      {loading ? (
        <Spin tip="Loading..." />
      ) : error ? (
        <Alert message={error} type="error" />
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2 text-sm">
              Select Division
            </label>
            <Select
              value={selectedDivision}
              onChange={handleDivisionChange}
              placeholder="Select Division"
              className="w-full"
            >
              {Object.keys(data).map((division) => (
                <Option key={division} value={division}>
                  {division}
                </Option>
              ))}
            </Select>
          </div>

          {selectedDivision && (
            <div>
              <label className="block text-gray-700 mb-2 text-sm">
                Select District
              </label>
              <Select
                value={selectedPid}
                onChange={handlePidChange}
                placeholder="Select Pid"
                className="w-full"
              >
                {filteredPids.map((pid) => (
                  <Option key={pid} value={pid}>
                    {pid}
                  </Option>
                ))}
              </Select>
            </div>
          )}

          {selectedPid && (
            <div>
              <label className="block text-gray-700 mb-2 text-sm">
                Search Area
              </label>
              <Select
                showSearch
                value={selectedValue}
                onChange={handleValueChange}
                placeholder="Select Value"
                className="w-full"
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {filteredValues.map((item) => (
                  <Option key={item.value} value={item.value}>
                    {item.title}
                  </Option>
                ))}
              </Select>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RegionSelect;
