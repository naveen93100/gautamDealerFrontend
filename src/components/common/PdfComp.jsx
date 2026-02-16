
function PdfComp({ bg, children }) {
  // console.log("bg : ",bg)
  const BASE_URL = "http://localhost:1008/Proposal_Images/watt";

  const imageSrc = bg?.startsWith("/")
    ? bg
    : `${BASE_URL}/${bg}`;

  return (
    <section
      className="
        pdf-page
        relative
        w-[210mm] h-[297mm]
        bg-white
        mx-auto
        overflow-hidden
      "
      // style={{
      //   pageBreakAfter: "always",   // 👈 VERY IMPORTANT
      //   breakAfter: "page"          // modern browsers
      // }}
    >
      {/* background */}
      <img
        src={imageSrc}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* text overlay */}
      <div className="absolute inset-0 z-10">
        {children}
      </div>
    </section>
  );
}

export default PdfComp;