import { useState } from "react";
import buildings from "../data/building.json";

interface Floor {
  name: string;
  soldiers: number;
  purpose: string;
  description: string;
  activity: string;
}

const useBuildingData = () => {
  const [buildingData, setBuildingData] = useState<Floor[]>(buildings);

  const getFloorByIndex = (floorIndex: number): Floor | undefined => {
    if (floorIndex < 0 || floorIndex >= buildingData.length) return undefined;
    else return buildingData[floorIndex];
  };

  const getListOfActivities = (): string[] => {
    return buildingData.map((building) => building.activity);
  };

  return {
    buildingData,
    getFloorByIndex,
    getListOfActivities,
  };
};

export default useBuildingData;
