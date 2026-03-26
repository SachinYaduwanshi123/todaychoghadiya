export default function AdBanner({ 
  dataAdSlot, 
  className 
}: { 
  dataAdSlot: string;
  className?: string;
}) {
  return (
    <div className={`w-full flex justify-center overflow-hidden my-4 bg-gray-50 items-center text-gray-400 text-sm border border-dashed border-gray-300 ${className}`}>
      {/* 
        In production, replace this with the actual Google AdSense <ins> tag
        and load the Google AdSense script in layout.tsx using next/script 
      */}
      <div className="flex flex-col items-center justify-center p-4">
        <span className="font-medium">Advertisement</span>
        <span className="text-xs opacity-70">Slot: {dataAdSlot}</span>
      </div>
    </div>
  );
}
