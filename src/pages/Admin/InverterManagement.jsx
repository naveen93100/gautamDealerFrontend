import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { apiCall } from "../../services/api";

const InverterManagement = () => {
  const [phaseName, setPhaseName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [phases, setPhases] = useState([]);

  const handleSubmit = async () => {
    try {
      if (!phaseName.trim()) {
        toast.dismiss();
        toast.error('Phase is required');
        return;
      }

      let res=await apiCall('POST','/adminPanel/add-inverter',{phase:phaseName});

      if(res?.data?.success){
         setPhases((prev)=>[...prev,res?.data?.inverter]);
      }

      setPhaseName("");
      setIsModalOpen(false);

    } catch (er) {
      console.log(er)
    }
  };

  const toggleStatus = (id) => {
    setPhases(
      phases.map((phase) =>
        phase.id === id
          ? { ...phase, status: !phase.status }
          : phase
      )
    );
  };

  useEffect(()=>{
    const fetchInverterPhase=async()=>{
       try {
         let res=await apiCall('GET','adminPanel/get-inverter');

         if(res?.data?.success){
           setPhases(res?.data?.inverter);
         }

         console.log(res);
       } catch (er) {
          console.log(er);
       }
    }
    fetchInverterPhase()
  },[]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="border border-red-200 rounded-2xl p-6 bg-gray-200 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border border-red-300 rounded-xl p-4 mb-6 bg-white">
          <h2 className="text-2xl font-semibold text-slate-800">
            Inverter Phase Management
          </h2>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={18} />
            Add Phase
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phases.length > 0 ? (
            phases.map((phase) => (
              <div
                key={phase._id}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 capitalize">
                      {phase.phase}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Inverter Phase Configuration
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${phase.status
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                      }`}
                  >
                    {phase.status ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Stats */}
                <div className="mt-5">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Available Capacities</p>

                    <p className="text-xl font-bold text-gray-800 mt-1">
                      {phase.capacities?.length || 0}
                    </p>
                  </div>
                </div>

                {/* Capacities */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {phase.capacities?.map((cap) => (
                    <span
                      key={cap}
                      className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full"
                    >
                      {cap} KW
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                  <button className="flex-1 border border-blue-500 text-blue-600 py-2 rounded-xl hover:bg-blue-50 transition">
                    Edit
                  </button>

                  <button
                    onClick={() => toggleStatus(phase._id)}
                    className={`flex-1 py-2 rounded-xl transition ${phase.status
                      ? "bg-red-50 text-red-600 hover:bg-red-100"
                      : "bg-green-50 text-green-600 hover:bg-green-100"
                      }`}
                  >
                    {phase.status ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center">
                <h3 className="text-lg font-semibold text-gray-700">
                  No Phases Found
                </h3>

                <p className="text-gray-500 mt-2">
                  Add your first inverter phase to get started.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-semibold">
                Add Inverter Phase
              </h3>

              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 text-xl"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Phase Name
              </label>

              <input
                type="text"
                placeholder="Enter phase name"
                value={phaseName}
                onChange={(e) => setPhaseName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="border px-4 py-2 rounded-lg cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Save Phase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InverterManagement;