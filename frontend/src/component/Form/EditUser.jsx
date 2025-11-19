import React from 'react'
import { FiEdit } from "react-icons/fi"
const EditUser = () => {
  return (
    <button
      className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition-all"
    >
      <FiEdit size={20} />
      Edit Profile
    </button>
  );
}

export default EditUser