import Link from "next/link";

const Banner = () => {
  return (
    <div className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden mb-12">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=1600&q=80')",
          filter: "brightness(0.7)" 
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
        {/* Emblem Simulation */}
        <div className="flex justify-center mb-8">
          <div className="relative flex flex-col items-center">
             <div className="text-primary/80 text-7xl font-serif leading-none italic opacity-80">60</div>
             <div className="text-[10px] uppercase tracking-[0.4em] font-bold mt-1 text-primary">Years of Trading</div>
             {/* Wreath Simulation with CSS or icons could go here */}
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-6 leading-tight">
          Perfectly designed for beautiful living
        </h1>
        
        <p className="text-base md:text-lg lg:text-xl font-medium mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed">
          With our wide range of beautiful tiles, let us help you create a perfect finish in your home.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/all-tiles?search=wall" 
            className="w-full sm:w-auto px-8 py-4 bg-white text-[#5c564b] font-bold uppercase tracking-widest text-xs hover:bg-[#f4f1ea] transition-colors"
          >
            Shop Wall Tiles
          </Link>
          <Link 
            href="/all-tiles?search=floor" 
            className="w-full sm:w-auto px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors"
          >
            Shop Floor Tiles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
