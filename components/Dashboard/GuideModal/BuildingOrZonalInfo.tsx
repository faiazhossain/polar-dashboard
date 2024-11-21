import React from 'react';

const BuildingOrZonalInfo = () => {
  return (
    <li>
      <ol className="list-decimal pl-5 mt-2">
        <li>
          On the top right of the map, you will see two buttons:{' '}
          <strong>Zone</strong> and <strong>Building</strong>.
        </li>
        <li>
          To view information about a <strong>Zone</strong>, click the{' '}
          <strong>Zone</strong> button. After selecting this option, click on
          any <strong>Zone</strong> on the map.
        </li>
        <li>
          Upon clicking a <strong>Zone</strong>, you will see detailed{' '}
          <strong>Zone</strong> information displayed on the map, as well as in
          the <strong>Statistics</strong> section.
        </li>
        <li>
          To view information about a <strong>Building</strong>, click the{' '}
          <strong>Building</strong> button on the top right of the map.
        </li>
        <li>
          After selecting the <strong>Building</strong> option, click on any
          building on the map. You will see detailed building information on the
          map, but please note that you will not be able to extract data when
          viewing building information.
        </li>
      </ol>
      <div className="mt-4">
        <p>Watch the procedure below for a visual demonstration:</p>
        <div className="mt-2 border border-gray-300 rounded shadow">
          {/* Use local video or GIF */}
          <video
            src="/guidePictures/zoneAndBuildingInfo.mp4"
            controls
            loop
            muted
            className="w-full rounded"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </li>
  );
};

export default BuildingOrZonalInfo;
