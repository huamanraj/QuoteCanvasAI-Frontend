import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import { FiDownload, FiRefreshCw } from 'react-icons/fi'
import { FaEdit } from "react-icons/fa";
import { RiAiGenerate } from "react-icons/ri";
import { FaTwitter, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa'
import ColorPicker from './components/ColorPicker'
import axios from 'axios';
import logo from '../src/assets/icon.png'
import { Helmet } from 'react-helmet-async';

function App() {
  const [quote, setQuote] = useState("QuoteCanvas AI: Your go-to tool for creating stunning, AI-generated social media quotes with customizable styles. Designed for effortless styling, quick previews, and smooth downloads—all in a modern, responsive interface.")
  const [topic, setTopic] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isManualQuote, setIsManualQuote] = useState(false)
  const [settings, setSettings] = useState({
    bgColor: "#1F2937",
    textColor: "#ffff",
    fontSize: "26",
    fontFamily: "Cormorant Garamond",
    textAlign: "center",
    imageRatio: "1:1",
    padding: "40"
  })


  
  const quoteBoxRef = useRef(null)



  const handleGenerateQuote = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await axios.post('https://quote-canvas-ai-backend.vercel.app/api/generateText', {
        topic: topic || "inspiration"
      });

      console.log('Full response:', response.data);

      if (response.data.success && response.data.data.text) {  // Changed from quote to text
        const generatedQuote = response.data.data.text;  // Changed from quote to text
        console.log('Generated quote:', generatedQuote);
        setQuote(generatedQuote);
      } else {
        console.error('Invalid response format:', response.data);
        throw new Error("Invalid response format from server");
      }
      
    } catch (error) {
      console.error('Error generating quote:', error);
      setError(
        error.response?.data?.error || 
        error.message || 
        "Failed to generate quote. Please try again or enter manually."
      );
    }
    
    setLoading(false);
};




  const handleDownload = async () => {
    try {
      if (quoteBoxRef.current) {
        const canvas = await html2canvas(quoteBoxRef.current)
        const link = document.createElement('a')
        link.download = 'quote-image.png'
        link.href = canvas.toDataURL()
        link.click()
      }
    } catch (error) {
      setError("Failed to download image. Please try again.")
    }
  }

  const updateSettings = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <> 
    <Helmet>
    {/* Primary Meta Tags */}
    <title>QuoteCanvas AI - Generate Inspiring Quotes On Images</title>
    <meta name="title" content="QuoteCanvas AI- Generate Inspiring Quotes On Images" />
    <meta name="description" content="Create beautiful, AI-generated quotes for any topic. Customize fonts, backgrounds, and share your unique quote images." />
    
    {/* Open Graph / Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://quotecanvasai.vercel.app/" />
    <meta property="og:title" content="QuoteCanvas AI - Generate Inspiring Quotes" />
    <meta property="og:description" content="Create beautiful, AI-generated quotes for any topic. Customize fonts, backgrounds, and download and share your unique quote images." />
    

    {/* Twitter */}
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://quotecanvasai.vercel.app/" />
    <meta property="twitter:title" content="QuoteCanvas AI - Generate Inspiring Quotes" />
    <meta property="twitter:description" content="Create beautiful, AI-generated quotes for any topic. Customize fonts, backgrounds, and download & share your unique quote images." />
    

    {/* Keywords */}
    <meta name="keywords" content="quotes, AI quotes,quote image generator ai, inspirational quote image,quotes images about thankful, quote generator, inspirational quote generator, free ai quote generator, free, inspiration, motivation, quote maker" />

    {/* Additional SEO tags */}
    <meta name="robots" content="index, follow" />
    <meta name="language" content="English" />
    <meta name="author" content="Aman Raj" />
    
    {/* Favicon */}
    <link rel="icon" href={logo} />

    <script type="application/ld+json">
    {`
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Quote Canvas AI",
        "description": "AI-powered quote generator and customization tool",
        "url": "https://quotecanvasai.vercel.app/",
        "applicationCategory": "UtilityApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    `}
  </script>
</Helmet>


    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 py-3 px-6 border-b border-gray-700">
        <div className="container mx-auto flex justify-between items-center">
          <div className='flex items-center flex-row cursor-pointer'>
          <img className='w-8 pr-1 ' src={logo} alt="logo" />
          <h1 className="text-xl pr-5 font-semibold">QuoteCanvas AI</h1>
          
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com/huamanraj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://linkedin.com/in/huamanraj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://github.com/huamanraj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://aman-raj.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              <FaGlobe size={20} />
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-6">
        {/* Left Panel */}
        <div className="md:w-1/3 space-y-4">
          {/* Quote Input Section */}
          <div className="bg-gray-800 rounded-xl shadow-sm p-6 space-y-4">
            <div className="flex gap-2 items-center mb-4">
              <button
                onClick={() => {
                  setIsManualQuote(false) 
                  setError("")}}
                className={`px-4 py-2 rounded-lg text-sm ${!isManualQuote ? 'bg-blue-600 text-white' : 'bg-gray-700'}`}
              > <p className='flex'>Quote from AI <RiAiGenerate className='p-1'  size={20} /></p>
                
              </button>
              <button
                onClick={() => {
                  setIsManualQuote(true) 
                  setError("")}}
                className={`px-4 py-2 rounded-lg text-sm ${isManualQuote ? 'bg-blue-600 text-white' : 'bg-gray-700'}`}
              > 
               <p className='flex'>Edit Quote<FaEdit className='p-1'  size={20} /></p>

              </button>
            </div>

            {isManualQuote ? (
              <textarea
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                className="w-full h-32 p-3 rounded-lg bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                placeholder="Enter your quote here..."
              />
            ) : (
              <>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  placeholder="Enter topic for quote"
                />
                <button
                  onClick={handleGenerateQuote}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <FiRefreshCw className="animate-spin" />
                  ) : (
                    'Generate Quote with AI'
                  )}
                </button>
              </>
            )}

            {error && (
              <div className="text-red-400 text-sm p-3 bg-red-900/50 rounded-lg">
                {error}
              </div>
            )}
          </div>

          {/* Style Settings */}
          <div className="bg-gray-800 rounded-xl shadow-sm p-6 space-y-4">
            <h3 className="font-semibold">Style Settings</h3>

            <div className="space-y-4">
              <div>
                <ColorPicker
                  label="Background Color"
                  color={settings.bgColor}
                  onChange={(color) => updateSettings('bgColor', color)}
                />

                <ColorPicker
                  label="Text Color"
                  color={settings.textColor}
                  onChange={(color) => updateSettings('textColor', color)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Font Size: {settings.fontSize}px</label>
                <input
                  type="range"
                  min="16"
                  max="72"
                  value={settings.fontSize}
                  onChange={(e) => updateSettings('fontSize', e.target.value)}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Font Family</label>
                <select
                  value={settings.fontFamily}
                  onChange={(e) => {
                    updateSettings('fontFamily', e.target.value)
                    e.target.style.setProperty('--preview-font', e.target.value)
                  }}
                  className="w-full p-2 rounded-lg bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent select-with-preview"
                  style={{ '--preview-font': settings.fontFamily }}
                >
                  {/* Serif Fonts - Good for quotes */}
                  <optgroup label="Serif Fonts">
                    <option value="Playfair Display">Playfair Display</option>
                    <option value="Merriweather">Merriweather</option>
                    <option value="Lora">Lora</option>
                    <option value="Crimson Text">Crimson Text</option>
                    <option value="Cormorant Garamond">Cormorant Garamond</option>
                  </optgroup>

                  {/* Sans Serif Fonts - Modern Look */}
                  <optgroup label="Sans Serif Fonts">
                    <option value="Montserrat">Montserrat</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Raleway">Raleway</option>
                    <option value="Poppins">Poppins</option>
                    <option value="Inter">Inter</option>
                  </optgroup>

                  {/* Decorative Fonts */}
                  <optgroup label="Decorative Fonts">
                    <option value="Abril Fatface">Abril Fatface</option>
                    <option value="Libre Baskerville">Libre Baskerville</option>
                    <option value="Source Serif Pro">Source Serif Pro</option>
                    <option value="Philosopher">Philosopher</option>
                    <option value="Spectral">Spectral</option>
                  </optgroup>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Text Alignment</label>
                <div className="flex gap-2">
                  {['left', 'center', 'right'].map((align) => (
                    <button
                      key={align}
                      onClick={() => updateSettings('textAlign', align)}
                      className={`flex-1 p-2 rounded-lg text-sm ${settings.textAlign === align ? 'bg-blue-600 text-white' : 'bg-gray-700'
                        }`}
                    >
                      {align.charAt(0).toUpperCase() + align.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Image Ratio</label>
                <select
                  value={settings.imageRatio}
                  onChange={(e) => updateSettings('imageRatio', e.target.value)}
                  className="w-full p-2 rounded-lg bg-gray-700 border-gray-600"
                >
                  <option value="1:1">1:1 (Square)</option>
                  <option value="16:9">16:9 (Landscape)</option>
                  <option value="9:16">9:16 (Portrait)</option>
                  <option value="4:5">4:5 (Portrait)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="md:w-2/3">
          <div className="bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="font-semibold">Preview</h3>
              <button
                onClick={handleDownload}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <FiDownload />
                Download
              </button>
            </div>

            <div className="flex items-center justify-center bg-gray-700 rounded-lg p-4">
              <div
                ref={quoteBoxRef}
                className={`w-full ${
                  settings.imageRatio === '1:1' ? 'aspect-square' :
                  settings.imageRatio === '16:9' ? 'aspect-video' :
                  settings.imageRatio === '4:5' ? 'aspect-[4/5]' :
                  settings.imageRatio === '9:16' ? 'aspect-[9/16]' : ''
                }  overflow-hidden max-w-[500px]`}
                style={{
                  backgroundColor: settings.bgColor,
                  color: settings.textColor,
                  fontSize: `${settings.fontSize}px`,
                  fontFamily: settings.fontFamily,
                  textAlign: settings.textAlign,
                  padding: `${settings.padding}px`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <p className="max-w-[80%]">{quote}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    </>
  )
}

export default App