
import star from "../assets/star.png";

function Strike({ strike, quote }) {
  return (
    <>
      
      {quote && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white/10 px-6 py-4 rounded-xl shadow-xl text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              {quote}
            </h1>
          </div>
        </div>
      )}

      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 sm:gap-4 bg-neutral-800 px-4 py-2 rounded shadow-lg">
        <img className="h-8 w-8" src={star} alt="star" />
        <h2 className="text-cyan-400 font-bold text-xl sm:text-2xl">
          {strike}
        </h2>
      </div>
    </>
  );
}

export default Strike;
