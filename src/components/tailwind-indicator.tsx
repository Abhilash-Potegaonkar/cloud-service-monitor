

export function TailwindIndicator() {
    if (!isDevEnvironment) return null;
    return (
        //todo this will render at left bottom of screen local use purpose only
        //todo with help of this we can make responsive screen to adopt any resolution
      <div className='fixed bottom-1 left-1 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white'>
        <div className='block sm:hidden'>xs</div>
        <div className='hidden sm:block md:hidden'>sm</div>
        <div className='hidden md:block lg:hidden'>md</div>
        <div className='hidden lg:block xl:hidden'>lg</div>
        <div className='hidden xl:block 2xl:hidden'>xl</div>
        <div className='hidden 2xl:block'>2xl</div>
      </div>
    );
  }
let isDevEnvironment = false;
if (process && process.env.NODE_ENV === "development") {
    isDevEnvironment = true;
}
export { isDevEnvironment };