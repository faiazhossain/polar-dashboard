import React from 'react';
const LeftPanelGuide: React.FC = () => {
  return (
    <li>
      The left panel allows you to interact with the map and perform specific
      actions in the following steps:
      <ol className="list-decimal pl-5 mt-2">
        <li>
          Select a <strong>Division</strong> from the dropdown. This will enable
          the
          <strong>District</strong> selection.
        </li>
        <li>
          Choose a <strong>District</strong> from the dropdown. This will enable
          the
          <strong>Area</strong> selection.
        </li>
        <li>
          After selecting an <strong>Area</strong>, it will be highlighted on
          the map for better visualization.
        </li>
        <li>
          Toggle the <strong>Data Extract Mode</strong> using the button. This
          will enable the functionality to extract data.
        </li>
        <li>
          After enabling Data Extract Mode, a <strong>Rank Slider</strong> will
          appear. You can adjust the slider to filter data based on rank. For
          example, if you select rank 6, the map will allow you to extract data
          for areas with a rank greater than 6.
        </li>
        <li>
          Click on the map to activate the <strong>Extract</strong> button for
          the selected area.
        </li>
        <li>
          Click the <strong>Extract</strong> button to download the data in
          Excel format.
        </li>
      </ol>
      <div className="mt-4">
        <p>Watch the procedure below for a visual demonstration:</p>
        <div className="mt-2 border border-gray-300 rounded shadow">
          {/* Use local video or GIF */}
          <video
            src="/guidePictures/dataExtract.mp4"
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

export default LeftPanelGuide;
