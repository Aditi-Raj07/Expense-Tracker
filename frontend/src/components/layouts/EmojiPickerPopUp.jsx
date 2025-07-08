import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuX } from "react-icons/lu";
import ImageIcon from "../../assets/Image-icon-03.png"; // ✅ Corrected image import

const EmojiPickerPopUp = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6 relative">
      {/* Clickable icon section */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {/* Icon container */}
        <div className="w-14 h-14 flex items-center justify-center text-3xl bg-purple-50 text-primary rounded-lg overflow-hidden">
          {icon ? (
            <span>{icon}</span> // If emoji is selected, show it
          ) : (
            <img
              src={ImageIcon}
              alt="Pick Icon"
              className="w-8 h-8 object-contain"
            /> // Show image as default icon
          )}
        </div>

        {/* Optional label (text next to icon) */}
        <p className="text-sm font-medium text-gray-600">
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>

      {/* Emoji Picker Popup */}
      {isOpen && (
        <div className="absolute top-20 z-50">
          <button
            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded-full absolute -top-3 -right-3 z-10"
            onClick={() => setIsOpen(false)}
          >
            <LuX />
          </button>

          <EmojiPicker
            onEmojiClick={(emojiData) => {
              onSelect(emojiData.emoji); // Pass selected emoji
              setIsOpen(false);
            }}
            theme="light"
            height={350}
            width={300}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopUp;
