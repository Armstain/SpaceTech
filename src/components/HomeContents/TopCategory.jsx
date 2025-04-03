const TopCategory = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12">Top category</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Main Product - Takes 3 columns */}
        <div className="md:col-span-3 row-span-2 bg-base-300 rounded-2xl p-6">
          <div className="text-sm text-neutral">Electronics / gaming</div>
          <h3 className="text-2xl font-bold mt-2">Play station 5</h3>
          <div className="text-3xl font-bold text-secondary mt-2">$599</div>
          <img 
            src="/images/ps5.png" 
            alt="PlayStation 5" 
            className="mt-4 w-full object-contain"
          />
          <button className="bg-secondary p-3 rounded-lg mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

        {/* Small Product Cards */}
        <div className="bg-pink-50 rounded-2xl p-4 flex flex-col items-center">
          <h3 className="font-semibold mb-4">Headphones</h3>
          <img 
            src="/images/headphones.png" 
            alt="Headphones" 
            className="w-24 h-24 object-contain"
          />
          <div className="mt-4 font-semibold">$ 249.00</div>
        </div>

        <div className="bg-blue-50 rounded-2xl p-4 flex flex-col items-center">
          <h3 className="font-semibold mb-4">Earbuds</h3>
          <img 
            src="/images/earbuds.png" 
            alt="Earbuds" 
            className="w-24 h-24 object-contain"
          />
          <div className="mt-4 font-semibold">$ 249.00</div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center">
          <h3 className="font-semibold mb-4">Laptop</h3>
          <img 
            src="/images/laptop.png" 
            alt="Laptop" 
            className="w-24 h-24 object-contain"
          />
          <div className="mt-4 font-semibold">$ 249.00</div>
        </div>

        {/* Bottom Products */}
        <div className="bg-orange-50 rounded-2xl p-4 flex flex-col items-center md:col-span-1">
          <h3 className="font-semibold mb-4">Smart watch</h3>
          <img 
            src="/images/smartwatch.png" 
            alt="Smart Watch" 
            className="w-24 h-24 object-contain"
          />
          <div className="mt-4 font-semibold">$ 249.00</div>
        </div>

        <div className="bg-green-50 rounded-2xl p-4 flex flex-col md:col-span-2">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold">14 Pro max</h3>
            <div className="text-xl font-bold text-secondary">$ 24.00</div>
          </div>
          <img 
            src="/images/iphone.png" 
            alt="iPhone 14 Pro Max" 
            className="w-full h-40 object-contain mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default TopCategory;
