function TalkBubble({ text, bubbleImage, textPosition }) {
  return (
    <div className="relative w-[500px]">
      <img src={`/bubbles/bubble-${bubbleImage}.svg`} className="w-full" alt="對話框" />
      <p
        className={`absolute ${textPosition} overflow-hidden px-10 py-8 leading-relaxed font-medium text-gray-800 md:text-xl`}
      >
        {text}
      </p>
    </div>
  );
}

export default TalkBubble;
