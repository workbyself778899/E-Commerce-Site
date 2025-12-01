import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiMail, FiUser, FiMessageCircle } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";


export default function ContactList() { 
  const [contacts, setContacts] = useState([]);
    const token = localStorage.getItem('u-token')
  // Fetch contacts
  const fetchContacts = async () => {
    try {
      const res = await axios.get("https://e-commerce-site-three-kappa.vercel.app/contact/get",{
          headers:{
            'auth-token':token
          }
        });
        console.log(res)
      setContacts(res.data.getData || []);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Delete contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`https://e-commerce-site-three-kappa.vercel.app/contact/delete/${id}`,{
          headers:{
            'auth-token':token
          }
        });
      setContacts((prev) => prev.filter((c) => c._id !== id));
      toast.success("Successfully, Contact is deleted")
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <ToastContainer/>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Contact Messages
        </h1>

        <div className="space-y-4">
          {contacts.length === 0 ? (
            <p className="text-center text-gray-600">No Contacts Found</p>
          ) : (
            contacts.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-md rounded-xl p-5 border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {item.name}
                    </h2>
                     <p className="text-gray-700 ">Date : {new Date(item.updatedAt).toDateString()}</p>
                     <p className="text-gray-700 mb-2">{item.email}</p>
                     <hr />
                    <p className="text-gray-500 mt-2 font-bold">Subject: {item.subject}</p>
                    <p className="text-gray-600 mt-2">Message: {item.message}</p>
                  </div>

                  <button
                    onClick={() => deleteContact(item._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

