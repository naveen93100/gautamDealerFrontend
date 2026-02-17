// components/PanelCard.jsx
const PanelCard = ({
    title,
    subtitle,
    active,
    onNavigate,
    onEdit,
    onToggle
}) => {

    // console.log("onEdit : ", onEdit)
    return (
        <div
            onClick={onNavigate}
            className="p-5 bg-red-100 rounded-xl shadow-sm border border-red-300 hover:shadow-md transition cursor-pointer"
        >
            <h3 className="font-medium text-gray-800">{title}</h3>

            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>

            <div className="mt-4 flex items-center gap-3">
                <button
                    onClick={onEdit}
                    className="px-4 py-1.5 text-sm text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-600 hover:text-white"
                >
                    Edit
                </button>

                <button
                    onClick={onToggle}
                    className={`px-4 py-1.5 text-sm font-medium rounded-lg border transition
                        ${active
                            ? "bg-red-50 text-red-600 border-red-300 hover:bg-red-600 hover:text-white"
                            : "bg-green-50 text-green-600 border-green-300 hover:bg-green-600 hover:text-white"
                        }`}
                >
                    {active ? "Inactive" : "Active"}
                </button>
            </div>
        </div>
    );
};

export default PanelCard;
