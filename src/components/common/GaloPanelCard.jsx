import React from "react";

const GaloPanelCard = ({
    title,
    subtitle,
    active,
    onNavigate,
    onEdit,
    onToggle,
}) => {
    return (
        <div
            onClick={onNavigate}
            className="p-5 bg-white rounded-xl shadow-sm border border-yellow-400 hover:shadow-md transition cursor-pointer"
        >
            <h3 className="font-medium text-black">{title}</h3>

            <p className="text-xs text-gray-600 mt-1">{subtitle}</p>

            <div className="mt-4 flex items-center gap-3">
                {/* Edit button – yellow outline with black text */}
                <button
                    onClick={onEdit}
                    className="px-4 py-1.5 text-sm text-yellow-600 border border-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-white transition"
                >
                    Edit
                </button>

                {/* Toggle button – changes style based on `active` */}
                <button
                    onClick={onToggle}
                    className={`px-4 py-1.5 text-sm font-medium rounded-lg border transition
                        ${
                            active
                                ? "bg-yellow-400 text-black border-yellow-500 hover:bg-yellow-500 hover:text-white"
                                : "bg-black text-white border-black hover:bg-gray-800"
                        }`}
                >
                    {active ? "Inactive" : "Active"}
                </button>
            </div>
        </div>
    );
};

export default GaloPanelCard;
