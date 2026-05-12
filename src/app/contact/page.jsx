"use client";

import { useState } from "react";

import { contactSections } from "@/data/contacts";

import {
  FaSearch,
  FaUserTie,
} from "react-icons/fa";

export default function ContactPage() {

  const [search, setSearch] = useState("");

  return (
    <main className="min-h-screen bg-[#f5f7f2] p-6">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-10">

        <div className="flex items-center gap-3 mb-4">

          <div className="bg-green-600 p-3 rounded-xl text-white">
            <FaUserTie size={24} />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Government Agriculture Contacts
            </h1>

            <p className="text-gray-500 mt-1">
              Ministry of Agriculture & Farmers Welfare
            </p>
          </div>

        </div>

        {/* SEARCH */}
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3">

          <FaSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Search by name or designation..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full outline-none"
          />

        </div>

      </div>

      {/* CONTACT TABLES */}
      <div className="max-w-7xl mx-auto space-y-10">

        {contactSections.map((section, index) => {

          const filteredContacts =
            section.contacts.filter((item) =>
              item.name
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              item.designation
                .toLowerCase()
                .includes(search.toLowerCase())
            );

          if (filteredContacts.length === 0)
            return null;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >

              {/* SECTION TITLE */}
              <div className="bg-green-700 text-white px-6 py-4">

                <h2 className="text-xl font-bold">
                  {section.title}
                </h2>

              </div>

              {/* TABLE */}
              <div className="overflow-x-auto">

                <table className="w-full text-left">

                  <thead className="bg-green-50 text-gray-700">

                    <tr>

                      <th className="px-6 py-4">
                        Name
                      </th>

                      <th className="px-6 py-4">
                        Designation
                      </th>

                      <th className="px-6 py-4">
                        Office
                      </th>

                      <th className="px-6 py-4">
                        Room No
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredContacts.map(
                      (contact, i) => (
                        <tr
                          key={i}
                          className="border-t hover:bg-gray-50"
                        >

                          <td className="px-6 py-4 font-semibold text-gray-800">
                            {contact.name}
                          </td>

                          <td className="px-6 py-4 text-gray-600">
                            {
                              contact.designation
                            }
                          </td>

                          <td className="px-6 py-4 text-gray-600">
                            {contact.office}
                          </td>

                          <td className="px-6 py-4 text-gray-600">
                            {contact.room}
                          </td>

                        </tr>
                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>
          );
        })}

      </div>

    </main>
  );
}