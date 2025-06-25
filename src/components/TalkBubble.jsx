function TalkBubble({ children, bubbleDirection, textPosition }) {
  return (
    <div className="relative w-[500px]">
      <img
        src={`/bubbles/bubble-${bubbleDirection}.svg`}
        className="w-full"
        alt="對話框"
      />
      <p
        className={`absolute ${textPosition} overflow-hidden px-10 py-4 leading-snug font-medium text-gray-800 md:text-lg`}
      >
        {children}
      </p>
    </div>
  );
}

export default TalkBubble;
