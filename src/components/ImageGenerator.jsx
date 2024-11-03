// src/components/ImageGenerator.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ImageGenerator = () => {
  const [topic, setTopic] = useState('');
  const [font, setFont] = useState('Arial');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageRatio, setImageRatio] = useState('square');

  const handleGenerate = async () => {
    if (!topic) {
      setError('Please enter a topic.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/generateText', { topic });
      setGeneratedText(response.data.text);
    } catch (error) {
      setError('Error generating text. Please try again.');
      console.error('Error generating text:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const width = imageRatio === 'portrait' ? 600 : imageRatio === 'landscape' ? 800 : 600;
    const height = imageRatio === 'portrait' ? 800 : imageRatio === 'landscape' ? 400 : 600;

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = textColor;
    ctx.font = `24px ${font}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(generatedText || 'Your generated text will appear here!', width / 2, height / 2);

    const link = document.createElement('a');
    link.download = 'generated-image.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
      <input
        type="text"
        placeholder="Enter your topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="border rounded-lg p-2 w-full mb-4"
      />
      <select
        value={font}
        onChange={(e) => setFont(e.target.value)}
        className="border rounded-lg p-2 w-full mb-4"
      >
        <option value="Arial">Arial</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Verdana">Verdana</option>
      </select>
      <select
        value={imageRatio}
        onChange={(e) => setImageRatio(e.target.value)}
        className="border rounded-lg p-2 w-full mb-4"
      >
        <option value="square">Square</option>
        <option value="portrait">Portrait</option>
        <option value="landscape">Landscape</option>
      </select>
      <input
        type="color"
        value={bgColor}
        onChange={(e) => setBgColor(e.target.value)}
        className="w-full mb-4"
      />
      <input
        type="color"
        value={textColor}
        onChange={(e) => setTextColor(e.target.value)}
        className="w-full mb-4"
      />
      <button
        onClick={handleGenerate}
        className="bg-purple-600 text-white rounded-lg p-2 w-full hover:bg-purple-700 transition"
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <div
        className="w-full h-64 border border-gray-300 rounded-lg flex justify-center items-center mt-4"
        style={{
          backgroundColor: bgColor,
          color: textColor,
          fontFamily: font,
          fontSize: '24px',
        }}
      >
        {loading ? 'Loading...' : generatedText || 'Your generated text will appear here!'}
      </div>
      <button
        onClick={handleDownload}
        className="bg-green-600 text-white rounded-lg p-2 w-full mt-4 hover:bg-green-700 transition"
        disabled={!generatedText}
      >
        Download Image
      </button>
    </div>
  );
};

export default ImageGenerator;
