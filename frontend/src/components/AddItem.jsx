import React, { useState } from "react";
import axios from "axios";
import { FiUploadCloud } from "react-icons/fi";
import { HiMiniBars3 } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

export default function AddItem() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "",
    itemType: "",
    description: "",
  });
  const [coverImage, setCoverImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCoverImage = (e) => setCoverImage(e.target.files[0]);

  const handleAdditionalImages = (e) =>
    setAdditionalImages(Array.from(e.target.files));


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.itemName || !formData.itemType || !coverImage) {
      alert("Please fill all required fields.");
      return;
    }

    const data = new FormData();
    data.append("itemName", formData.itemName);
    data.append("itemType", formData.itemType);
    data.append("description", formData.description);
    data.append("coverImage", coverImage);
    additionalImages.forEach((img) => data.append("additionalImages", img));

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/additem", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess(true);
      setFormData({ itemName: "", itemType: "", description: "" });
      setCoverImage(null);
      setAdditionalImages([]);
      e.target.reset();

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while uploading.");
    } finally {
      setLoading(false);
    }


  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white pt-5 pb-12 px-4">

      <div className="relative z-50">
        {/* Menu Icon */}
        <div
          onClick={() => setShowMenu(!showMenu)}
          className="bg-white rounded-full flex justify-center items-center w-12 h-12 md:ml-3 cursor-pointer shadow"
        >
          <HiMiniBars3 className="text-2xl text-indigo-700" />
        </div>

        {/* Sidebar Dialog */}
        {showMenu && (
          <div className="absolute top-14 left-3 bg-white shadow-lg rounded-xl w-44 py-2 ">
            <button
              onClick={() => setShowMenu(false)}
              className="w-full text-left px-4 py-2 hover:bg-indigo-100 text-indigo-600 font-medium cursor-pointer"
            >
              Add Item
            </button>
            <button
              onClick={() => {
                navigate("/view-items");
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-indigo-100 text-indigo-600 font-medium cursor-pointer"
            >
              View Items
            </button>
          </div>
        )}
      </div>

      <div className="mt-5 max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
          Add New Item
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Item Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Item Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              placeholder="e.g. Nike Running Shoes"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Item Type */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Item Type <span className="text-red-500">*</span>
            </label>
            <select
              name="itemType"
              value={formData.itemType}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            >
              <option value="">Select type</option>
              <option value="Shirt">Shirt</option>
              <option value="Pant">Pant</option>
              <option value="Shoes">Shoes</option>
              <option value="Sports Gear">Sports Gear</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Write a short description of the item..."
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Cover Image <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverImage}
                className="w-full"
                required
              />
              <FiUploadCloud className="text-2xl text-indigo-500" />
            </div>
          </div>

          {/* Additional Images */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Additional Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleAdditionalImages}
              className="w-full"
            />
            {additionalImages.length > 0 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {additionalImages.map((img, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(img)}
                    alt={`preview-${i}`}
                    className="h-20 rounded-md shadow"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-6 rounded-xl font-semibold text-white ${loading
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
                } transition duration-300`}
            >
              {loading ? "Adding Item..." : "Add Item"}
            </button>
            {success && (
              <p className="text-green-600 font-medium mt-3">
                Item successfully added!
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

