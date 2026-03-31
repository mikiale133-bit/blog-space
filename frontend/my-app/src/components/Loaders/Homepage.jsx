// top grid section
const HeroSkeleton = () => (
  <div>
    <div className="max-lg:hidden lg:grid lg:grid-cols-2 lg:grid-rows-3 gap-2 max-w-4xl mx-auto mb-5 animate-pulse border rounded-lg border-gray-300 p-3">
      {/* Big Card */}
      <div className="lg:row-span-3 h-[400px] bg-gray-200 rounded-lg" />

      {/* Small Side Cards */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex gap-2">
          <div className="w-40 h-28 rounded-lg bg-gray-200"></div>
          <div className="space-y-2 flex-1">
            <div className="w-full h-6 bg-gray-200" />
            <div className="w-[80%] h-6 bg-gray-100" />
            <div className="w-[70%] h-4 bg-gray-100" />
            <div className="w-[90%] h-4 bg-gray-50" />
          </div>
        </div>
      ))}
    </div>

    {/* small screen */}
    <div className="grid grid-cols-1 gap-4 lg:hidden max-w-[90vw] mx-auto animate-pulse border border-gray-100 p-2 py-4 rounded-lg">
      <div>
        <div className="h-[200px] bg-gray-200 rounded-lg"></div>
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-gray-300"></span>
            <span className="w-30 h-3 rounded-md bg-gray-300"></span>
          </div>

          <span className="w-8 h-4 rounded-md bg-gray-300"></span>
        </div>
      </div>
    </div>
  </div>
);

// explore more section
const ExploreSkeleton = () => (
  <div className="lg:grid lg:grid-cols-2 gap-4 animate-pulse mx-auto">
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className="flex gap-3 border-2 border-gray-100 rounded-lg p-2"
      >
        <div className="w-32 lg:w-40 lg:h-32 h-24 bg-gray-200 rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-gray-200 rounded lg:w-[30vw] w-5/6" />
          <div className="h-4 bg-gray-100 rounded lg:w-[30vw] w-full" />
          <div className="h-8 bg-gray-50 rounded lg:w-[30vw] mt-2" />
        </div>
      </div>
    ))}
  </div>
);
export default HeroSkeleton;
export { ExploreSkeleton };
