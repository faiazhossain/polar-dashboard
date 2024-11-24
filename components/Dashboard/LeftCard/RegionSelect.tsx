//@ts-nocheck
import React, { useState, useEffect } from 'react';
import { Select, Spin, Alert, Tooltip, Button } from 'antd';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import {
  setSelectedRegion,
  setToggleInfo,
} from '@/lib/store/features/leftPanelSlice/leftPanelDataSlice';
import { useMap } from 'react-map-gl';
import { setStatistics } from '@/lib/store/features/statistics/zoneStatisticsSlice';
import { InfoCircleOutlined } from '@ant-design/icons';
import {
  setBuildingStatistics,
  setGeohash,
} from '@/lib/store/features/statistics/buildingStatisticsSlice';
import {
  addClickedCoordinate,
  clearClickedCoordinates,
  setHighlight,
  setSelectedRankFromSlider,
} from '@/lib/store/features/MapSlice/mapSlice';
import { message } from 'antd'; // Import Ant Design's message component
import { Slider } from 'antd';
import ToggleButton from './ToggleButton';
import { FaInfoCircle } from 'react-icons/fa';
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
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedPid, setSelectedPid] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedGeohash, setSelectedGeohash] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch();
  const { myMapA } = useMap();
  const { selectedRegion } = useAppSelector((state) => state.leftPanel);

  const filteredGeohashData = useAppSelector(
    (state) => state?.mapdata?.filteredGeohash
  );

  const selectedRank = useAppSelector(
    (state: any) => state?.mapdata?.selectedRankFromSlider
  );

  const toggleInfo = useAppSelector(
    (state: any) => state?.leftPanel?.toggleInfo
  );

  useEffect(() => {
    fetch('/data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const transformedData = transformData(data);
        setData(transformedData);
      })
      .catch((error) => {
        console.error('Error fetching JSON data:', error);
        setError('Failed to load data. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDivisionChange = (value) => {
    setSelectedDivision(value);
    setSelectedPid('');
    setSelectedValue('');
    setSelectedGeohash('');
    dispatch(clearClickedCoordinates());
  };

  const handlePidChange = (value) => {
    setSelectedPid(value);
    setSelectedValue('');
    setSelectedGeohash('');
    dispatch(clearClickedCoordinates());
  };
  const handleGeohashChange = (value) => {
    setSelectedGeohash(value);
    dispatch(setGeohash(value));
  };

  const handleValueChange = (value) => {
    setSelectedValue(value);
    setSelectedGeohash('');
    dispatch(clearClickedCoordinates());
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
    dispatch(
      setStatistics({
        '18-24': 0,
        '25-34': 0,
        '35-49': 0,
        '50': 0,
        DayCount: 0,
        NightCount: 0,
        F: 0,
        High: 0,
        M: 0,
        Mid: 0,
        Ultra_High: 0,
        details: '',
        geohash: '',
        lat: 0,
        lng: 0,
        low: 0,
        poi_count: 0,
        region: '',
      })
    );
    dispatch(
      setBuildingStatistics({
        details: '',
        lat: 0,
        lng: 0,
        poi_count: 0,
        region: '',
        rank: 0,
      })
    );
    dispatch(setSelectedRegion({ pId: selectedPid, value }));
  };

  const filteredPids =
    selectedDivision && data[selectedDivision]
      ? Object.keys(data[selectedDivision].children).sort((a, b) =>
          a.localeCompare(b)
        ) // Sort districts alphabetically
      : [];

  const filteredValues =
    selectedDivision &&
    selectedPid &&
    data[selectedDivision].children[selectedPid]
      ? data[selectedDivision].children[selectedPid].values
          .filter((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .sort((a, b) => a.title.localeCompare(b.title)) // Sort areas alphabetically
      : [];

  useEffect(() => {
    if (selectedRegion === '') {
      setSelectedDivision('');
      setSelectedPid('');
      setSelectedValue('');
    }
  }, [selectedRegion]);

  const [rank, setRank] = useState(6); // Default value set to 6 (or any number)

  const handleRankChange = (value) => {
    dispatch(setSelectedRankFromSlider(value));
  };
  const handleToggleChange = (checked: boolean) => {
    dispatch(setToggleInfo(checked)); // Update the parent state with the toggle value
    if (!checked) {
      dispatch(clearClickedCoordinates());
    }
  };

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

          {selectedValue && selectedRank && (
            <div className="mt-4 flex items-center gap-4">
              <ToggleButton onToggleChange={handleToggleChange} />
              <Tooltip
                placement="rightBottom"
                title={
                  toggleInfo
                    ? `The Export Feature is currently enabled, and you are viewing the ${selectedValue} area on the map. Click on your desired zone within this area to export the data. The export will include building information. After selecting the zone, click the export button below to download the data.`
                    : 'The Export Feature is currently disabled, which means you cannot export any data. However, you can view building or zone data by clicking on a building or zone.'
                }
              >
                <div className="flex items-center h-full">
                  <FaInfoCircle className="text-lg" />
                </div>
              </Tooltip>
            </div>
          )}

          {toggleInfo && (
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <h3 className="text-md font-semibold">
                  Select Rank (Greater Than {selectedRank})
                </h3>
                <Tooltip
                  title={`Select a value to export all addresses in your selected zone that are greater than this value (e.g., as you have selected ${selectedRank} will export all addresses where Rank is greater than ${selectedRank} in the zone).`}
                >
                  <Button
                    type="link"
                    icon={<FaInfoCircle className="text-lg text-black" />}
                    className="ml-2 text-black"
                  />
                </Tooltip>
              </div>
              <Slider
                min={0} // Minimum value set to 6
                max={100} // Maximum value can be adjusted as needed
                step={1} // Increment by 1 (or adjust as needed)
                defaultValue={selectedRank}
                onChange={handleRankChange}
                tooltip={{ formatter: (value) => `Rank ${value}` }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RegionSelect;
