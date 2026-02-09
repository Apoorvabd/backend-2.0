import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    fullname: "",
    password: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [cover, setCover] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("username", form.username);
    data.append("email", form.email);
    data.append("fullname", form.fullname);
    data.append("password", form.password);
    data.append("avatar", avatar);
    data.append("coverImage", cover);

    try {
      await API.post("/user/register", data);
      alert("Registered Successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setForm({ ...form, fullname: e.target.value })}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-gray-600 mb-2">Avatar</label>
              <input
                type="file"
                className="file-input file-input-bordered file-input-primary w-full"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 mb-2">Cover Image</label>
              <input
                type="file"
                className="file-input file-input-bordered file-input-primary w-full"
                onChange={(e) => setCover(e.target.files[0])}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-5 text-center text-gray-500">
          Already have an account?{" "}
          <span
            className="text-indigo-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
