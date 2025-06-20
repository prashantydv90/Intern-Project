import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import axios from "axios";
import { FiXCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";

export default function ViewItems() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [enquireLoading, setEnquireLoading] = useState(false);


  useEffect(() => {
    axios
      .get("https://intern-project-zqz6.onrender.com/api/getallitem")
      .then((res) => {
        console.log(res.data)
        setItems(res.data.items)
      })
      .catch((err) => console.error(err));
  }, []);

  const openModal = (item) => {
    setSelected(item);
    setCurrentImg(0);
  };

  const closeModal = () => {
    setSelected(null);
    setCurrentImg(0);
  };

  const handleEnquire = async (item) => {
    setEnquireLoading(true);
    try {
      await axios.post("https://intern-project-zqz6.onrender.com/api/enquire", {
        itemName: item.itemName,
        itemType: item.itemType,
        description: item.description,
      });
      alert("Enquiry email sent successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to send enquiry.");
    } finally {
      setEnquireLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="relative">
        {/* Menu */}
        <div
          onClick={() => setShowMenu(!showMenu)}
          className="bg-white rounded-full flex justify-center items-center w-12 h-12 md:ml-3 cursor-pointer shadow"
        >
          <HiMiniBars3 className="text-2xl text-indigo-700" />
        </div>

        {/* Sidebar */}
        {showMenu && (
          <div className="absolute top-14 left-3 bg-white shadow-lg rounded-xl w-44 py-2">
            <button
              onClick={() => {
                navigate("/add-item");
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-indigo-100 text-indigo-600 font-medium"
            >
              Add Item
            </button>
            <button
              onClick={() => {
                navigate("/view-items");
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-indigo-100 text-indigo-600 font-medium"
            >
              View Items
            </button>
          </div>
        )}
      </div>

      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        View Items
      </h2>

      {/*Items */}
      <div className="grid gap-6 grid-cols-3 sm:grid-cols-2 md:grid-cols-4 max-w-6xl mx-auto">
        {items.map((item, idx) => (
          <div
            key={idx}
            onClick={() => openModal(item)}
            className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
          >
            <img
              src={item.coverImage}
              alt={item.itemName}
              className="md:h-90 sm:h-80 h-30 w-full object-cover"
            />
            <div className="p-3">
              <h3 className="font-semibold text-[14px] sm:text-lg text-gray-800 flex justify-center items-center h-5 sm:h-auto ">
                {item.itemName}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl relative max-h-[90vh] overflow-auto z-50">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-3xl text-gray-700 hover:text-red-600"
            >
              <FiXCircle />
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-indigo-700">
                {selected.itemName}
              </h2>
              <p className="text-gray-600 mb-1">
                <strong>Type:</strong> {selected.itemType}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Description:</strong>{" "}
                {selected.description}
              </p>

              {/* Carousel */}
              <div className="relative">
                <div className="w-full h-64 flex items-center justify-center relative">
                  {/* Left Button */}
                  <button
                    onClick={() =>
                      setCurrentImg((prev) =>
                        prev === 0
                          ? [selected.coverImage, ...(selected.additionalImages || [])].length - 1
                          : prev - 1
                      )
                    }
                    className="absolute left-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full p-2 shadow-lg z-10"
                  >
                    <FaAngleLeft />
                  </button>

                  {/* Current Image */}
                  <img
                    src={
                      [selected.coverImage, ...(selected.additionalImages || [])][currentImg]
                    }
                    alt="carousel"
                    className="h-64 object-contain rounded-md shadow-lg"
                  />

                  {/* Right Button */}
                  <button
                    onClick={() =>
                      setCurrentImg((prev) =>
                        prev ===
                          [selected.coverImage, ...(selected.additionalImages || [])].length - 1
                          ? 0
                          : prev + 1
                      )
                    }
                    className="absolute right-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full p-2 shadow-lg z-10"
                  >
                    <FaAngleRight />
                  </button>
                </div>

                {/* Dots */}
                <div className="flex justify-center mt-2 gap-2">
                  {[selected.coverImage, ...(selected.additionalImages || [])].map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImg(i)}
                      className={`h-3 w-3 rounded-full ${currentImg === i ? "bg-indigo-600" : "bg-gray-400"
                        }`}
                    />
                  ))}
                </div>
              </div>


              {/* Enquire Button */}
              <button
                onClick={() => handleEnquire(selected)}
                disabled={enquireLoading}
                className={`mt-6 px-5 py-2 rounded-md font-semibold text-white ${enquireLoading ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
              >
                {enquireLoading ? "Sending..." : "Enquire"}
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
