import { useState, useCallback, useRef, useEffect } from 'react';
import { FaVideo } from 'react-icons/fa';

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
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose} // Close the popup on backdrop click
      >
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md" onClick={(e) => e.stopPropagation()}>
          <h2 className="text-2xl font-bold mb-4">Select Devices</h2>
          <div className="mb-4">
            <label htmlFor="microphone" className="block font-semibold mb-2">
              Microphone
            </label>
            <select
              id="microphone"
              value={selectedMicrophone || ''}
              onChange={(e) => setSelectedMicrophone(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select a microphone</option>
              {availableMicrophones.map((microphone) => (
                <option key={microphone.deviceId} value={microphone.deviceId}>
                  {microphone.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="camera" className="block font-semibold mb-2">
              Camera
            </label>
            <select
              id="camera"
              value={selectedCamera || ''}
              onChange={(e) => setSelectedCamera(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select a camera</option>
              {availableCameras.map((camera) => (
                <option key={camera.deviceId} value={camera.deviceId}>
                  {camera.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => handleJoinRoom(selectedMicrophone, selectedCamera)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 flex items-center"
            >
              <FaVideo className="mr-2" /> Join Room
            </button>
          </div>
        </div>
      </div>
    </>
  );
  };
  
  export default DeviceSelection;