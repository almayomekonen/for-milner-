import { useContext } from "react";
import { FaCamera, FaUser } from "react-icons/fa";
import AuthContext from "../context/AuthContext";

export default function ProfilePage() {
  const { currentUser, logout } = useContext(AuthContext);

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-32"></div>

          <div className="p-6 relative">
            <div className="absolute -top-16 left-6">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-gray-400">
                <FaUser className="h-20 w-20" />
              </div>

              <label
                htmlFor="profile-image-upload"
                className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full cursor-pointer p-2"
              >
                <FaCamera className="h-4 w-4" />
                <input
                  type="file"
                  id="profile-image-upload"
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>

            <div className="mt-16">
              <h1 className="text-2xl font-bold text-gray-900">
                {currentUser.name}
              </h1>
              <p className="text-gray-600">
                {currentUser.city}, {currentUser.country}
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                  {currentUser.languages &&
                    currentUser.languages.map((lang, index) => (
                      <span key={index}>{lang}, </span>
                    ))}
                </span>
              </div>

              <div className="mt-4">
                <h2 className="text-gray-700 font-semibold mb-2">About Me:</h2>
                <p className="text-gray-600">{currentUser.bio}</p>
              </div>

              <div className="mt-6">
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
