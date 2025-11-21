import { FiShield } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function AdminButton() {
  return (
    <Link to="/admin-panel">
       <button   className="flex items-center gap-3 px-6 py-3 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-md hover:scale-105 active:scale-95 transition-all">
      <FiShield size={22} />
      Admin Panel
    </button>
    </Link>
  );
}
