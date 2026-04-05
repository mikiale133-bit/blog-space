// top grid section
const HeroSkeleton = () => (
  <div className="animate">
    <div className="max-lg:hidden lg:grid lg:grid-cols-2 lg:grid-rows-3 gap-2 max-w-7xl mx-auto mb-5 rounded-lg border-gray-300 p-3">
      {/* Big Card */}
      <div className="lg:row-span-3 h-70 bg-gray-200 rounded-lg" />

      {/* Small Side Cards */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex gap-2 border border-gray-300 p-1 rounded-lg"
        >
          <div className="w-30 h-21 rounded-lg bg-gray-200"></div>
          <div className="space-y-2 flex-1">
            <div className="w-full h-3 bg-gray-200" />
            <div className="w-full h-3 bg-gray-200" />
            <div className="w-full h-3 bg-gray-200" />
            <div className="w-[80%] h-3 bg-gray-200" />
          </div>
        </div>
      ))}
    </div>

    {/* small screen */}
    <div className="grid grid-cols-1 gap-4 lg:hidden max-w-[96vw] mx-auto  p-2 py-4 rounded-lg md:grid-cols-3">
      <div>
        <div className="h-50 bg-gray-200 rounded-lg"></div>
        <div className="w-full h-2 bg-gray-200 mt-2" />
        <div className="w-full md:w-full h-2 bg-gray-200 mt-2" />
        <div className="w-[80%] md:w-full h-2 bg-gray-200 mt-2" />
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-gray-300"></span>
          </div>
          <div className="w-full h-4 bg-gray-200 mx-2"></div>

          <span className="w-8 h-4 rounded-md bg-gray-300"></span>
        </div>
      </div>

      <div className="max-md:hidden">
        <div className="h-50 bg-gray-200 rounded-lg"></div>
        <div className="w-full h-2 bg-gray-200 mt-2" />
        <div className="w-full md:w-full h-2 bg-gray-200 mt-2" />
        <div className="w-[80%] md:w-full h-2 bg-gray-200 mt-2" />
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-gray-300"></span>
          </div>
          <div className="w-full h-4 bg-gray-200 mx-2"></div>

          <span className="w-8 h-4 rounded-md bg-gray-300"></span>
        </div>
      </div>

      <div className="max-md:hidden">
        <div className="h-50 bg-gray-200 rounded-lg"></div>
        <div className="w-full h-2 bg-gray-200 mt-2" />
        <div className="w-full md:w-full h-2 bg-gray-200 mt-2" />
        <div className="w-[80%] md:w-full h-2 bg-gray-200 mt-2" />
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-gray-300"></span>
          </div>
          <div className="w-full h-4 bg-gray-200 mx-2"></div>

          <span className="w-8 h-4 rounded-md bg-gray-300"></span>
        </div>
      </div>
    </div>
  </div>
);

// explore more section
const ExploreSkeleton = () => (
  <section className="w-full animate">
    {/* small screen */}
    <div className="grid grid-cols-1 gap-4 max-w-[96vw] mx-auto  p-2 py-4 rounded-lg md:grid-cols-3 lg:grid-cols-4">
      <div>
        <div className="h-50 bg-gray-200 rounded-lg"></div>
        <div className="w-full h-2 bg-gray-200 mt-2" />
        <div className="w-full md:w-full h-2 bg-gray-200 mt-2" />
        <div className="w-[80%] md:w-full h-2 bg-gray-200 mt-2" />
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-gray-300"></span>
          </div>
          <div className="w-full h-4 bg-gray-200 mx-2"></div>

          <span className="w-8 h-4 rounded-md bg-gray-300"></span>
        </div>
      </div>

      <div className="max-md:hidden">
        <div className="h-50 bg-gray-200 rounded-lg"></div>
        <div className="w-full h-2 bg-gray-200 mt-2" />
        <div className="w-full md:w-full h-2 bg-gray-200 mt-2" />
        <div className="w-[80%] md:w-full h-2 bg-gray-200 mt-2" />
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-gray-300"></span>
          </div>
          <div className="w-full h-4 bg-gray-200 mx-2"></div>

          <span className="w-8 h-4 rounded-md bg-gray-300"></span>
        </div>
      </div>

      <div className="max-md:hidden">
        <div className="h-50 bg-gray-200 rounded-lg"></div>
        <div className="w-full h-2 bg-gray-200 mt-2" />
        <div className="w-full md:w-full h-2 bg-gray-200 mt-2" />
        <div className="w-[80%] md:w-full h-2 bg-gray-200 mt-2" />
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-gray-300"></span>
          </div>
          <div className="w-full h-4 bg-gray-200 mx-2"></div>

          <span className="w-8 h-4 rounded-md bg-gray-300"></span>
        </div>
      </div>

      <div className="max-md:hidden hidden lg:block">
        <div className="h-50 bg-gray-200 rounded-lg"></div>
        <div className="w-full h-2 bg-gray-200 mt-2" />
        <div className="w-full md:w-full h-2 bg-gray-200 mt-2" />
        <div className="w-[80%] md:w-full h-2 bg-gray-200 mt-2" />
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-gray-300"></span>
          </div>
          <div className="w-full h-4 bg-gray-200 mx-2"></div>

          <span className="w-8 h-4 rounded-md bg-gray-300"></span>
        </div>
      </div>
    </div>
  </section>
);
export default HeroSkeleton;
export { ExploreSkeleton };
