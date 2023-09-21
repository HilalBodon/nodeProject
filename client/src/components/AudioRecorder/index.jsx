import React, { useState, useRef } from 'react';

function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const audioStream = useRef(null);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder.current = new MediaRecorder(stream);
        audioStream.current = stream;

        mediaRecorder.current.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunks.current.push(e.data);
          }
        };

        mediaRecorder.current.onstop = () => {
          const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
          const url = URL.createObjectURL(audioBlob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'recorded-audio.wav';
          document.body.appendChild(a);
          a.click();
          URL.revokeObjectURL(url);

          // Clear the audioChunks for the next recording
          audioChunks.current = [];

          // Stop and release the audio stream
          audioStream.current.getTracks().forEach((track) => {
            track.stop();
          });
        };

        mediaRecorder.current.start();
        setIsRecording(true);
      })
      .catch((error) => {
        console.error('Error starting recording:', error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording} disabled={isRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
}

export default AudioRecorder;
