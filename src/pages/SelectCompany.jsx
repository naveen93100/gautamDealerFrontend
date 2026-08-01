import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCompany } from "../Context/CompanyContext";
import companies from "../config/companies";

const getInitials = (name) =>
    name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

// ─── CompanyLogo ───────────────────────────────────────────────
const CompanyLogo = ({ company }) => {
    const [failed, setFailed] = useState(false);
    const showImage = company.logoUrl && !failed;

    return (
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1e2332] to-[#151a26] border border-[#2a3040] flex items-center justify-center overflow-hidden shadow-inner shadow-black/20 transition-all duration-300 group-hover:border-[#f2a93b]/40 group-hover:shadow-[0_0_30px_-8px_rgba(242,169,59,0.15)]">
            {showImage ? (
                <img
                    src={company.logoUrl}
                    alt=""
                    className="w-full h-full object-contain p-2.5 transition-transform duration-500 group-hover:scale-105"
                    onError={() => setFailed(true)}
                />
            ) : (
                <span className="font-bold text-lg tracking-wide text-[#f2a93b] drop-shadow-[0_0_12px_rgba(242,169,59,0.2)]">
                    {getInitials(company.name)}
                </span>
            )}
            {/* Glow ring on hover */}
            <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ring-1 ring-[#f2a93b]/20 ring-inset" />
        </div>
    );
};

// ─── SelectCompany ────────────────────────────────────────────
const SelectCompany = () => {
    const { setCompany } = useCompany();
    const navigate = useNavigate();

    const handleSelect = (companyObj) => {
        setCompany(companyObj);
        navigate("/login");
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#0b0e14] px-4 sm:px-6 py-12 overflow-hidden">
            {/*
        ─── Styles ────────────────────────────────────────────
      */}
            <style>{`
        @keyframes gridFloat {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(80px, 80px) rotate(0.5deg); }
        }
        @keyframes cardAppear {
          0% { opacity: 0; transform: translateY(24px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shimmerPulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.4; }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .sc-grid-bg {
          animation: gridFloat 60s linear infinite;
        }
        .sc-card {
          animation: cardAppear 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }
        .sc-shimmer {
          animation: shimmerPulse 4s ease-in-out infinite;
        }
        .sc-float {
          animation: floatSlow 6s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .sc-grid-bg,
          .sc-card,
          .sc-shimmer,
          .sc-float {
            animation: none !important;
          }
        }
      `}</style>

            {/*
        ─── Background ──────────────────────────────────────
      */}
            {/* Base gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#1a1f2e,transparent_60%),radial-gradient(ellipse_at_70%_80%,#1f1a10,transparent_50%),#0b0e14]" />

            {/* Drifting grid */}
            <div
                aria-hidden="true"
                className="sc-grid-bg absolute -inset-[30%] opacity-[0.07]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(242,169,59,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(242,169,59,0.15) 1px, transparent 1px)
          `,
                    backgroundSize: "72px 72px",
                }}
            />

            {/* Soft glow orbs */}
            <div
                aria-hidden="true"
                className="absolute top-[-20%] right-[-10%] w-[50%] aspect-square rounded-full bg-[#f2a93b]/5 blur-[120px]"
            />
            <div
                aria-hidden="true"
                className="absolute bottom-[-30%] left-[-20%] w-[60%] aspect-square rounded-full bg-[#f2a93b]/3 blur-[150px]"
            />

            {/*
        ─── Main Content ────────────────────────────────────
      */}
            <div className="relative z-10 w-full max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#f2a93b]/10 border border-[#f2a93b]/15 mb-5 sc-float">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f2a93b] animate-pulse" />
                        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#f2a93b]">
                            Workspace Access
                        </span>
                    </div>

                    <h1 className="font-bold text-4xl sm:text-5xl text-white tracking-tight leading-[1.1] mb-3">
                        Choose your&nbsp;
                        <span className="bg-linear-to-r from-[#f2a93b] to-[#f5c56e] bg-clip-text text-transparent">
                            company
                        </span>
                    </h1>
                    <p className="text-[15px] sm:text-base text-[#7a859e] max-w-md mx-auto">
                        Select the organisation you'd like to sign in to.
                    </p>
                </div>

                {/* Company Grid */}
                <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))]  justify-center gap-4 sm:gap-5">
                    {companies.map((c, i) => (
                        <button
                            key={c.id}
                            onClick={() => handleSelect(c)}
                            style={{ animationDelay: `${i * 70}ms` }}
                            className="sc-card group relative flex flex-col items-center gap-4 px-4 pt-7 pb-6
                         bg-[#121720] border border-[#1e2636] rounded-2xl
                         transition-all duration-300 ease-out
                         hover:-translate-y-1.5 hover:border-[#f2a93b]/40 hover:bg-[#161d2b]
                         hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6),0_0_0_1px_rgba(242,169,59,0.06)_inset]
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2a93b]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0e14]
                         cursor-pointer select-none"
                        >
                            {/* Top accent bar — slides in from left on hover */}
                            <span
                                aria-hidden="true"
                                className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-[#f2a93b] to-transparent
                           scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left"
                            />

                            {/* Logo */}
                            <CompanyLogo company={c} />

                            {/* Company name */}
                            <span className="font-semibold text-[15px] text-white tracking-tight group-hover:text-[#f2a93b] transition-colors duration-200">
                                {c.name}
                            </span>

                            {/* Continue action */}
                            <span className="flex items-center gap-2 text-[13px] font-medium text-[#5a647a] transition-all duration-300 group-hover:text-[#f2a93b] group-hover:gap-3">
                                <span>Continue</span>
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                                >
                                    <path
                                        d="M1 7.5H14M14 7.5L8 1.5M14 7.5L8 13.5"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>

                            {/* Subtle hover glow behind card */}
                            <span
                                aria-hidden="true"
                                className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
                           bg-[radial-gradient(ellipse_at_50%_0%,rgba(242,169,59,0.06),transparent_70%)]"
                            />
                        </button>
                    ))}
                </div>

                {/* Footer note */}
                <p className="text-center text-[12px] text-[#3d4558] mt-9 tracking-wide">
                    Secured &bull; end-to-end encrypted
                </p>
            </div>
        </div>
    );
};

export default SelectCompany;
