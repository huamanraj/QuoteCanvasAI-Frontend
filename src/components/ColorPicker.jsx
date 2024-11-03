import { useState, useRef, useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'
import { IoColorPaletteOutline } from 'react-icons/io5'

const ColorPicker = ({ color, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false)
  const popover = useRef()

  const handleClickOutside = (e) => {
    if (popover.current && !popover.current.contains(e.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="flex gap-2">
        <div className="relative">
          <button
            className="w-12 h-10 rounded-lg border border-gray-600 shadow-sm flex items-center justify-center"
            style={{ backgroundColor: color }}
            onClick={() => setIsOpen(true)}
          >
            <IoColorPaletteOutline 
              className={`w-5 h-5 ${parseInt(color.replace('#', ''), 16) > 0xffffff / 2 ? 'text-gray-800' : 'text-white'}`}
            />
          </button>
          {isOpen && (
            <div
              ref={popover}
              className="absolute left-0 top-12 z-10 shadow-xl bg-gray-800 rounded-lg p-3"
            >
              <HexColorPicker color={color} onChange={onChange} />
            </div>
          )}
        </div>
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 p-2 rounded-lg bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
          placeholder="#000000"
        />
      </div>
    </div>
  )
}

export default ColorPicker