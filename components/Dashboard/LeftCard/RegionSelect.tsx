// RegionSelect.tsx
import React, { useState } from "react";
import { TreeSelect } from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setBoundingBox,
  setSelectedRegion,
} from "@/lib/store/features/leftPanelSlice/leftPanelDataSlice";

const RegionSelect: React.FC = () => {
  const dispatch = useAppDispatch();
  const { timeState, selectedRegion } = useAppSelector(
    (state) => state.leftPanel
  );
  const [treeData, setTreeData] = useState([
    {
      id: "Dhaka",
      pId: "Division",
      value: "Dhaka",
      title: "Dhaka",
      isLeaf: false,
    },
  ]);

  // Function to load regions and areas dynamically
  const onLoadData = ({ id, title }: any) =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        if (title === "Dhaka") {
          const regions = [
            {
              id: "Dhaka North",
              pId: "Dhaka",
              value: "Dhaka North",
              title: "Dhaka North",
              isLeaf: false,
            },
            {
              id: "Dhaka South",
              pId: "Dhaka",
              value: "Dhaka South",
              title: "Dhaka South",
              isLeaf: false,
            },
          ];
          setTreeData([...treeData, ...regions]);
        } else if (title === "Dhaka South") {
          const areas = [
            {
              id: "Azimpur",
              pId: "Dhaka South",
              value: "Azimpur",
              title: "Azimpur",
              isLeaf: true,
            },
          ];
          setTreeData([...treeData, ...areas]);
        } else if (title === "Dhaka North") {
          const areas = [
            {
              id: "Adabor",
              pId: "Dhaka North",
              value: "Adabor",
              title: "Adabor",
              isLeaf: true,
            },
            {
              id: "Aftabnagar",
              pId: "Dhaka North",
              value: "Aftabnagar",
              title: "Aftabnagar",
              isLeaf: true,
            },
            {
              id: "Agargaon",
              pId: "Dhaka North",
              value: "Agargaon",
              title: "Agargaon",
              isLeaf: true,
            },
            {
              id: "Amin Bazar",
              pId: "Dhaka North",
              value: "Amin Bazar",
              title: "Amin Bazar",
              isLeaf: true,
            },
            {
              id: "Baunia",
              pId: "Dhaka North",
              value: "Baunia",
              title: "Baunia",
              isLeaf: true,
            },
            {
              id: "Barua",
              pId: "Dhaka North",
              value: "Barua",
              title: "Barua",
              isLeaf: true,
            },
            {
              id: "Bashundhara",
              pId: "Dhaka North",
              value: "Bashundhara",
              title: "Bashundhara",
              isLeaf: true,
            },
            {
              id: "Badda",
              pId: "Dhaka North",
              value: "Badda",
              title: "Badda",
              isLeaf: true,
            },
            {
              id: "Bakshi Bazar",
              pId: "Dhaka North",
              value: "Bakshi Bazar",
              title: "Bakshi Bazar",
              isLeaf: true,
            },
            {
              id: "Banasree",
              pId: "Dhaka North",
              value: "Banasree",
              title: "Banasree",
              isLeaf: true,
            },
            {
              id: "Bangshal",
              pId: "Dhaka North",
              value: "Bangshal",
              title: "Bangshal",
              isLeaf: true,
            },
            {
              id: "Bashantek",
              pId: "Dhaka North",
              value: "Bashantek",
              title: "Bashantek",
              isLeaf: true,
            },
            {
              id: "Beraid",
              pId: "Dhaka North",
              value: "Beraid",
              title: "Beraid",
              isLeaf: true,
            },
            {
              id: "Bhakurta",
              pId: "Dhaka North",
              value: "Bhakurta",
              title: "Bhakurta",
              isLeaf: true,
            },
            {
              id: "Biman Bandar",
              pId: "Dhaka North",
              value: "Biman Bandar",
              title: "Biman Bandar",
              isLeaf: true,
            },
            {
              id: "Biralia",
              pId: "Dhaka North",
              value: "Biralia",
              title: "Biralia",
              isLeaf: true,
            },
            {
              id: "Dakkhingaon",
              pId: "Dhaka North",
              value: "Dakkhingaon",
              title: "Dakkhingaon",
              isLeaf: true,
            },
            {
              id: "Dakkhinkhan",
              pId: "Dhaka North",
              value: "Dakkhinkhan",
              title: "Dakkhinkhan",
              isLeaf: true,
            },
            {
              id: "Darus Salam",
              pId: "Dhaka North",
              value: "Darus Salam",
              title: "Darus Salam",
              isLeaf: true,
            },
            {
              id: "Dhanmondi",
              pId: "Dhaka North",
              value: "Dhanmondi",
              title: "Dhanmondi",
              isLeaf: true,
            },
            {
              id: "Donia",
              pId: "Dhaka North",
              value: "Donia",
              title: "Donia",
              isLeaf: true,
            },
            {
              id: "Dumni",
              pId: "Dhaka North",
              value: "Dumni",
              title: "Dumni",
              isLeaf: true,
            },
            {
              id: "Eskaton",
              pId: "Dhaka North",
              value: "Eskaton",
              title: "Eskaton",
              isLeaf: true,
            },
            {
              id: "Ghatarchar",
              pId: "Dhaka North",
              value: "Ghatarchar",
              title: "Ghatarchar",
              isLeaf: true,
            },
            {
              id: "Gulshan",
              pId: "Dhaka North",
              value: "Gulshan",
              title: "Gulshan",
              isLeaf: true,
            },
            {
              id: "Harirampur",
              pId: "Dhaka North",
              value: "Harirampur",
              title: "Harirampur",
              isLeaf: true,
            },
            {
              id: "Jatiyo Sangsad Bhaban (Parliament Of Bangladesh)",
              pId: "Dhaka North",
              value: "Jatiyo Sangsad Bhaban (Parliament Of Bangladesh)",
              title: "Jatiyo Sangsad Bhaban (Parliament Of Bangladesh)",
              isLeaf: true,
            },
            {
              id: "Joar Shahara",
              pId: "Dhaka North",
              value: "Joar Shahara",
              title: "Joar Shahara",
              isLeaf: true,
            },
            {
              id: "Kalabagan",
              pId: "Dhaka North",
              value: "Kalabagan",
              title: "Kalabagan",
              isLeaf: true,
            },
            {
              id: "Kalachandpur",
              pId: "Dhaka North",
              value: "Kalachandpur",
              title: "Kalachandpur",
              isLeaf: true,
            },
            {
              id: "Kafrul",
              pId: "Dhaka North",
              value: "Kafrul",
              title: "Kafrul",
              isLeaf: true,
            },
            {
              id: "Kaundiya",
              pId: "Dhaka North",
              value: "Kaundiya",
              title: "Kaundiya",
              isLeaf: true,
            },
            {
              id: "Kaundia",
              pId: "Dhaka North",
              value: "Kaundia",
              title: "Kaundia",
              isLeaf: true,
            },
            {
              id: "Korail",
              pId: "Dhaka North",
              value: "Korail",
              title: "Korail",
              isLeaf: true,
            },
            {
              id: "Lalmatia",
              pId: "Dhaka North",
              value: "Lalmatia",
              title: "Lalmatia",
              isLeaf: true,
            },
            {
              id: "Malibagh",
              pId: "Dhaka North",
              value: "Malibagh",
              title: "Malibagh",
              isLeaf: true,
            },
            {
              id: "Meradia",
              pId: "Dhaka North",
              value: "Meradia",
              title: "Meradia",
              isLeaf: true,
            },
            {
              id: "Mirpur",
              pId: "Dhaka North",
              value: "Mirpur",
              title: "Mirpur",
              isLeaf: true,
            },
            {
              id: "Mohakhali",
              pId: "Dhaka North",
              value: "Mohakhali",
              title: "Mohakhali",
              isLeaf: true,
            },
            {
              id: "Mohammadpur",
              pId: "Dhaka North",
              value: "Mohammadpur",
              title: "Mohammadpur",
              isLeaf: true,
            },
            {
              id: "Mostul",
              pId: "Dhaka North",
              value: "Mostul",
              title: "Mostul",
              isLeaf: true,
            },
            {
              id: "Nikunja",
              pId: "Dhaka North",
              value: "Nikunja",
              title: "Nikunja",
              isLeaf: true,
            },
            {
              id: "Old Airport Tejgaon",
              pId: "Dhaka North",
              value: "Old Airport Tejgaon",
              title: "Old Airport Tejgaon",
              isLeaf: true,
            },
            {
              id: "Pallabi",
              pId: "Dhaka North",
              value: "Pallabi",
              title: "Pallabi",
              isLeaf: true,
            },
            {
              id: "Panthapath",
              pId: "Dhaka North",
              value: "Panthapath",
              title: "Panthapath",
              isLeaf: true,
            },
            {
              id: "Rayer Bazar",
              pId: "Dhaka North",
              value: "Rayer Bazar",
              title: "Rayer Bazar",
              isLeaf: true,
            },
            {
              id: "Rampura",
              pId: "Dhaka North",
              value: "Rampura",
              title: "Rampura",
              isLeaf: true,
            },
            {
              id: "Satarkul",
              pId: "Dhaka North",
              value: "Satarkul",
              title: "Satarkul",
              isLeaf: true,
            },
            {
              id: "Shyamoli",
              pId: "Dhaka North",
              value: "Shyamoli",
              title: "Shyamoli",
              isLeaf: true,
            },
            {
              id: "Shahbagh",
              pId: "Dhaka North",
              value: "Shahbagh",
              title: "Shahbagh",
              isLeaf: true,
            },
            {
              id: "Sher E Bangla Nagar",
              pId: "Dhaka North",
              value: "Sher E Bangla Nagar",
              title: "Sher E Bangla Nagar",
              isLeaf: true,
            },
            {
              id: "Tejgaon",
              pId: "Dhaka North",
              value: "Tejgaon",
              title: "Tejgaon",
              isLeaf: true,
            },
            {
              id: "Tongi",
              pId: "Dhaka North",
              value: "Tongi",
              title: "Tongi",
              isLeaf: true,
            },
            {
              id: "Tongi Paurashava",
              pId: "Dhaka North",
              value: "Tongi Paurashava",
              title: "Tongi Paurashava",
              isLeaf: true,
            },
            {
              id: "Turag",
              pId: "Dhaka North",
              value: "Turag",
              title: "Turag",
              isLeaf: true,
            },
            {
              id: "Uttar Khan",
              pId: "Dhaka North",
              value: "Uttar Khan",
              title: "Uttar Khan",
              isLeaf: true,
            },
            {
              id: "Uttara",
              pId: "Dhaka North",
              value: "Uttara",
              title: "Uttara",
              isLeaf: true,
            },
            {
              id: "Uttarkhan",
              pId: "Dhaka North",
              value: "Uttarkhan",
              title: "Uttarkhan",
              isLeaf: true,
            },
            {
              id: "Vatara",
              pId: "Dhaka North",
              value: "Vatara",
              title: "Vatara",
              isLeaf: true,
            },
            {
              id: "Washpur",
              pId: "Dhaka North",
              value: "Washpur",
              title: "Washpur",
              isLeaf: true,
            },
            {
              id: "Zoo Road",
              pId: "Dhaka North",
              value: "Zoo Road",
              title: "Zoo Road",
              isLeaf: true,
            },
          ];
          setTreeData([...treeData, ...areas]);
        }
        resolve();
      }, 500);
    });

  // const handleRegionChange = (value: string) => {
  //   dispatch(setSelectedRegion(value));
  // };

  const handleRegionChange = (value: string, label: any, extra: any) => {
    if (extra?.triggerNode?.props) {
      const { title, pId } = extra?.triggerNode?.props;
      dispatch(setSelectedRegion({ pId, title }));
      let bbox = null;
      if (pId.includes("Dhaka")) {
        bbox = {
          minLng: 90.159745,
          minLat: 23.572289,
          maxLng: 90.698177,
          maxLat: 23.989694,
        };
      }
      dispatch(setBoundingBox(bbox));
    }
  };

  return (
    <TreeSelect
      treeDataSimpleMode
      style={{ width: "100%" }}
      value={selectedRegion?.pId ? selectedRegion?.title : undefined}
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
      placeholder="Select Region"
      onChange={handleRegionChange}
      loadData={onLoadData}
      treeData={treeData}
      disabled={!timeState}
    />
  );
};

export default RegionSelect;
