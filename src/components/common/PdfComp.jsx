
function PdfComp({bg,children}) {
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
    >
      {/* background */}
      <img
        src={bg}
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