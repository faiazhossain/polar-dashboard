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
            {
              id: "Saralia",
              pId: "Dhaka South",
              value: "Saralia",
              title: "Saralia",
              isLeaf: true,
            },
            {
              id: "Sakta",
              pId: "Dhaka South",
              value: "Sakta",
              title: "Sakta",
              isLeaf: true,
            },
            {
              id: "Shonir Akhra",
              pId: "Dhaka South",
              value: "Shonir Akhra",
              title: "Shonir Akhra",
              isLeaf: true,
            },
            {
              id: "Rayerbagh",
              pId: "Dhaka South",
              value: "Rayerbagh",
              title: "Rayerbagh",
              isLeaf: true,
            },
            {
              id: "Bangshal",
              pId: "Dhaka South",
              value: "Bangshal",
              title: "Bangshal",
              isLeaf: true,
            },
            {
              id: "Kalindi",
              pId: "Dhaka South",
              value: "Kalindi",
              title: "Kalindi",
              isLeaf: true,
            },
            {
              id: "Kamlapur",
              pId: "Dhaka South",
              value: "Kamlapur",
              title: "Kamlapur",
              isLeaf: true,
            },
            {
              id: "Manikdia",
              pId: "Dhaka South",
              value: "Manikdia",
              title: "Manikdia",
              isLeaf: true,
            },
            {
              id: "Basabo",
              pId: "Dhaka South",
              value: "Basabo",
              title: "Basabo",
              isLeaf: true,
            },
            {
              id: "Siddhirganj",
              pId: "Dhaka South",
              value: "Siddhirganj",
              title: "Siddhirganj",
              isLeaf: true,
            },
            {
              id: "Postogola",
              pId: "Dhaka South",
              value: "Postogola",
              title: "Postogola",
              isLeaf: true,
            },
            {
              id: "Madartek",
              pId: "Dhaka South",
              value: "Madartek",
              title: "Madartek",
              isLeaf: true,
            },
            {
              id: "Trimohoni",
              pId: "Dhaka South",
              value: "Trimohoni",
              title: "Trimohoni",
              isLeaf: true,
            },
            {
              id: "Sultanganj",
              pId: "Dhaka South",
              value: "Sultanganj",
              title: "Sultanganj",
              isLeaf: true,
            },
            {
              id: "Chawkbazar",
              pId: "Dhaka South",
              value: "Chawkbazar",
              title: "Chawkbazar",
              isLeaf: true,
            },
            {
              id: "Ramna",
              pId: "Dhaka South",
              value: "Ramna",
              title: "Ramna",
              isLeaf: true,
            },
            {
              id: "Zinzira",
              pId: "Dhaka South",
              value: "Zinzira",
              title: "Zinzira",
              isLeaf: true,
            },
            {
              id: "Kakrail",
              pId: "Dhaka South",
              value: "Kakrail",
              title: "Kakrail",
              isLeaf: true,
            },
            {
              id: "Kutubpur",
              pId: "Dhaka South",
              value: "Kutubpur",
              title: "Kutubpur",
              isLeaf: true,
            },
            {
              id: "Manda",
              pId: "Dhaka South",
              value: "Manda",
              title: "Manda",
              isLeaf: true,
            },
            {
              id: "Gulistan",
              pId: "Dhaka South",
              value: "Gulistan",
              title: "Gulistan",
              isLeaf: true,
            },
            {
              id: "Dhanmondi",
              pId: "Dhaka South",
              value: "Dhanmondi",
              title: "Dhanmondi",
              isLeaf: true,
            },
            {
              id: "New Market",
              pId: "Dhaka South",
              value: "New Market",
              title: "New Market",
              isLeaf: true,
            },
            {
              id: "Sutrapur",
              pId: "Dhaka South",
              value: "Sutrapur",
              title: "Sutrapur",
              isLeaf: true,
            },
            {
              id: "Konda",
              pId: "Dhaka South",
              value: "Konda",
              title: "Konda",
              isLeaf: true,
            },
            {
              id: "Goran",
              pId: "Dhaka South",
              value: "Goran",
              title: "Goran",
              isLeaf: true,
            },
            {
              id: "Dhaka University Campus",
              pId: "Dhaka South",
              value: "Dhaka University Campus",
              title: "Dhaka University Campus",
              isLeaf: true,
            },
            {
              id: "Kotwali",
              pId: "Dhaka South",
              value: "Kotwali",
              title: "Kotwali",
              isLeaf: true,
            },
            {
              id: "Wari",
              pId: "Dhaka South",
              value: "Wari",
              title: "Wari",
              isLeaf: true,
            },
            {
              id: "Sayedabad",
              pId: "Dhaka South",
              value: "Sayedabad",
              title: "Sayedabad",
              isLeaf: true,
            },
            {
              id: "Golapbagh",
              pId: "Dhaka South",
              value: "Golapbagh",
              title: "Golapbagh",
              isLeaf: true,
            },
            {
              id: "Mugda",
              pId: "Dhaka South",
              value: "Mugda",
              title: "Mugda",
              isLeaf: true,
            },
            {
              id: "Jurain",
              pId: "Dhaka South",
              value: "Jurain",
              title: "Jurain",
              isLeaf: true,
            },
            {
              id: "Rajarbagh",
              pId: "Dhaka South",
              value: "Rajarbagh",
              title: "Rajarbagh",
              isLeaf: true,
            },
            {
              id: "Mohammadbagh",
              pId: "Dhaka South",
              value: "Mohammadbagh",
              title: "Mohammadbagh",
              isLeaf: true,
            },
            {
              id: "Jatrabari",
              pId: "Dhaka South",
              value: "Jatrabari",
              title: "Jatrabari",
              isLeaf: true,
            },
            {
              id: "Demra",
              pId: "Dhaka South",
              value: "Demra",
              title: "Demra",
              isLeaf: true,
            },
            {
              id: "Motijheel",
              pId: "Dhaka South",
              value: "Motijheel",
              title: "Motijheel",
              isLeaf: true,
            },
            {
              id: "Nandipara",
              pId: "Dhaka South",
              value: "Nandipara",
              title: "Nandipara",
              isLeaf: true,
            },
            {
              id: "Kadamtali",
              pId: "Dhaka South",
              value: "Kadamtali",
              title: "Kadamtali",
              isLeaf: true,
            },
            {
              id: "Muradpur",
              pId: "Dhaka South",
              value: "Muradpur",
              title: "Muradpur",
              isLeaf: true,
            },
            {
              id: "Shyampur",
              pId: "Dhaka South",
              value: "Shyampur",
              title: "Shyampur",
              isLeaf: true,
            },
            {
              id: "Khilgaon",
              pId: "Dhaka South",
              value: "Khilgaon",
              title: "Khilgaon",
              isLeaf: true,
            },
            {
              id: "Matuail",
              pId: "Dhaka South",
              value: "Matuail",
              title: "Matuail",
              isLeaf: true,
            },
            {
              id: "Subhadya",
              pId: "Dhaka South",
              value: "Subhadya",
              title: "Subhadya",
              isLeaf: true,
            },
            {
              id: "Banasree",
              pId: "Dhaka South",
              value: "Banasree",
              title: "Banasree",
              isLeaf: true,
            },
            {
              id: "Hazaribagh",
              pId: "Dhaka South",
              value: "Hazaribagh",
              title: "Hazaribagh",
              isLeaf: true,
            },
            {
              id: "Shahbagh",
              pId: "Dhaka South",
              value: "Shahbagh",
              title: "Shahbagh",
              isLeaf: true,
            },
            {
              id: "Bakshi Bazar",
              pId: "Dhaka South",
              value: "Bakshi Bazar",
              title: "Bakshi Bazar",
              isLeaf: true,
            },
            {
              id: "Dakkhingaon",
              pId: "Dhaka South",
              value: "Dakkhingaon",
              title: "Dakkhingaon",
              isLeaf: true,
            },
            {
              id: "Keraniganj",
              pId: "Dhaka South",
              value: "Keraniganj",
              title: "Keraniganj",
              isLeaf: true,
            },
            {
              id: "Lalbagh",
              pId: "Dhaka South",
              value: "Lalbagh",
              title: "Lalbagh",
              isLeaf: true,
            },
            {
              id: "Kamrangirchar",
              pId: "Dhaka South",
              value: "Kamrangirchar",
              title: "Kamrangirchar",
              isLeaf: true,
            },
            {
              id: "Donia",
              pId: "Dhaka South",
              value: "Donia",
              title: "Donia",
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
