export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Deep dark base background with new gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#120756] to-[#12064F]" />

      {/* Top Left - Lighter Smooth Glow */}
      <div 
        className="absolute -top-[30%] -left-[20%] w-[60vw] h-[60vw] rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-blob"
        style={{ backgroundColor: '#4c40ff' }} 
      />

      {/* Bottom Right - Lighter Smooth Glow */}
      <div 
        className="absolute -bottom-[30%] -right-[20%] w-[60vw] h-[60vw] rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-blob animation-delay-2000"
        style={{ backgroundColor: '#5a55ff' }}
      />

      {/* Center Top - Subtle Highlight (Moved higher) */}
      <div 
        className="absolute -top-[10%] left-[20%] w-[50vw] h-[50vw] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob animation-delay-4000"
        style={{ backgroundColor: '#281a98' }}
      />
    </div>
  );
}
