import React, { useEffect, useRef } from 'react';
import { Collapse } from 'antd';
import NavbarGuide from './NavbarGuide';
import LeftPanelGuide from './LeftPanelGuide';
import BuildingOrZonalInfo from './BuildingOrZonalInfo';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const { Panel } = Collapse;

const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    // Add event listener on mount
    document.addEventListener('click', handleClickOutside);

    // Clean up event listener on unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef} // Reference to the modal container
        className="bg-white rounded-lg shadow-lg p-6"
        style={{
          width: '80%',
          height: '80%',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        <h2 className="text-xl font-semibold mb-4">Dashboard Guide</h2>
        <p className="mb-4">
          Welcome to the Dashboard! Here’s an overview of the features:
        </p>

        <Collapse>
          <Panel header="Navbar Guide" key="1">
            <NavbarGuide />
          </Panel>
          <Panel header="How to see Building or Zonal Info?" key="2">
            <BuildingOrZonalInfo />
          </Panel>
          <Panel header="How to download data?" key="3">
            <LeftPanelGuide />
          </Panel>
        </Collapse>

        {/* Close Button - Sticky */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 w-10 h-10 rounded-full border-4 border-white bg-red-600 text-white font-bold flex items-center justify-center cursor-pointer hover:bg-red-700 "
          style={{
            fontSize: '18px',
            border: 'none',
            outline: 'none',
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default GuideModal;
