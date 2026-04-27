
function PdfComp({ bg, children }) {
  // console.log("bg : ",bg)
  // const BASE_URL = "https://gautamsolar.us/proposal_images/watt";
  const BASE_URL = "http://localhost:1008/proposal_images/watt";


  const imageSrc = bg?.startsWith("/")
    ? bg
    : `${BASE_URL}/${bg}`;

    // w-[210mm] h-[297mm]
  return (
    <section
      className="
        pdf-page
        relative
        w-[794px]
        h-[1123px]
        bg-white
        mx-auto
        overflow-hidden
      "
    >
      {/* background */}
      <img
        src={imageSrc}
        className="absolute inset-0 w-full h-full "
        crossOrigin="anonymous"
      />

      {/* text overlay */}
      <div className="absolute inset-0 z-10">
        {children}
      </div>
    </section>
  );
}

export default PdfComp;