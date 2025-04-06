import React, { useEffect, useRef, useState } from 'react';

interface WebcamCaptureProps {
  fetchFoods: () => Promise<void>;
}

export default function WebcamCapture({ fetchFoods }: WebcamCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  // Start webcam stream
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Failed to access webcam:', err);
        setMessage('❌ Could not access webcam');
      }
    };

    startCamera();
  }, []);

  // Capture image from video
  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const ctx = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      setCapturedImage(dataUrl); // preview
    }
  };

  // Send image to backend
  const handleSendToAPI = async () => {
    if (!capturedImage) return; // this is a base64 data URL
  
    try {
      const res = await fetch('http://localhost:3000/api/food/analyze-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ base64: capturedImage })
      });
  
      const data = await res.json();
      setMessage(`✅ API Response: ${JSON.stringify(data)}`);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to send image to API');
    }
    fetchFoods()
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Webcam Photo Capture</h2>

      {/* Live video */}
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxWidth: 400 }} />

      <br />
      <button onClick={handleCapture}>📸 Take Picture</button>

      {/* Hidden canvas for capturing frame */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {capturedImage && (
        <div>
          <h3>Preview:</h3>
          <img src={capturedImage} alt="Captured" style={{ maxWidth: '100%' }} />
          <br />
          <button onClick={handleSendToAPI}>🚀 Send to API</button>
        </div>
      )}

      <p>{message}</p>
    </div>
  );
}
