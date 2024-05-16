import React, { useState, useCallback, useEffect } from 'react';
import { FaVideo } from 'react-icons/fa';
import Button from '@/app/Design/Button';
import Select from '@/app/Design/Select';
import Modal from '@/app/Design/Modal';

const DeviceSelection = ({ onJoinRoom, onClose }) => {
  const [availableMicrophones, setAvailableMicrophones] = useState([]);
  const [selectedMicrophone, setSelectedMicrophone] = useState(null);
  const [availableCameras, setAvailableCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);

  const getDevices = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const microphones = devices.filter((device) => device.kind === 'audioinput');
      const cameras = devices.filter((device) => device.kind === 'videoinput');
      setAvailableMicrophones(microphones);
      setAvailableCameras(cameras);
      if (microphones.length > 0) {
        setSelectedMicrophone(microphones[0].deviceId);
      }
      if (cameras.length > 0) {
        setSelectedCamera(cameras[0].deviceId);
      }
    } catch (error) {
      console.error('Error getting devices:', error);
    }
  }, []);
  
  useEffect(() => {
    getDevices();
  }, [getDevices]);
  
  const handleJoinRoom = useCallback(
    async (selectedMicrophone, selectedCamera) => {
      try {
        await onJoinRoom(selectedMicrophone, selectedCamera);
        onClose(); // Close the popup after joining the room
      } catch (error) {
        console.error('Error initializing WebRTC:', error);
      }
    },
    [onJoinRoom, onClose]
  );

  return (
    <Modal onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4">Select Devices</h2>
      <div className="mb-4">
        <label htmlFor="microphone" className="block font-semibold mb-2">
          Microphone
        </label>
        <Select
          id="microphone"
          value={selectedMicrophone || ''}
          onChange={(e) => setSelectedMicrophone(e.target.value)}
        >
          <option value="">Select a microphone</option>
          {availableMicrophones.map((microphone) => (
            <option key={microphone.deviceId} value={microphone.deviceId}>
              {microphone.label}
            </option>
          ))}
        </Select>
      </div>
      <div className="mb-4">
        <label htmlFor="camera" className="block font-semibold mb-2">
          Camera
        </label>
        <Select
          id="camera"
          value={selectedCamera || ''}
          onChange={(e) => setSelectedCamera(e.target.value)}
        >
          <option value="">Select a camera</option>
          {availableCameras.map((camera) => (
            <option key={camera.deviceId} value={camera.deviceId}>
              {camera.label}
            </option>
          ))}
        </Select>
      </div>
      <div className="flex justify-end">
        <Button onClick={() => handleJoinRoom(selectedMicrophone, selectedCamera)}>
          <FaVideo className="mr-2" /> Join Room
        </Button>
      </div>
    </Modal>
  );
};

export default DeviceSelection;
