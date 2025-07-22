export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 bg-theme-background flex items-center justify-center">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-theme-background via-slate-900/20 to-theme-background"></div>
      
      {/* Animated background orbs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-main-blue/10 rounded-full blur-3xl orb-1"></div>
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-main-bluedark/8 rounded-full blur-2xl orb-2"></div>

      {/* Main loading content */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Pure CSS spinning loader */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-20 h-20 border-4 border-main-blue/20 rounded-full spinner-outer">
            {/* Inner spinning element */}
            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-main-blue rounded-full spinner-inner"></div>
          </div>
          
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-main-bluedark rounded-full center-dot"></div>
        </div>
      </div>
    </div>
  );
} 