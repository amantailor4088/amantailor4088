import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSignup } from "@/hooks/auth/useSignup";
import OtpModal from "../otp/OtpModal";

type props = {
    setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
}

function SignupForm({ setShowLogin }: props) {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { signup, loading, error, success } = useSignup();

    const inputClass =
        "w-full px-4 py-3 pr-12 rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white border border-gray-300 dark:border-neutral-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (data.password !== data.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        await signup(data);
    };

    return (
        <>
            <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Name */}
                <input
                    type="text"
                    placeholder="Your name"
                    className={inputClass}
                    value={data.name}
                    onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                />

                {/* Email */}
                <input
                    type="email"
                    placeholder="Email"
                    className={inputClass}
                    value={data.email}
                    onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                />

                <input
                    type="tel"
                    placeholder="Phone number (e.g., +91-XXXXXXXXXX)"
                    className={inputClass}
                    value={data.phone}
                    onChange={(e) => setData((prev) => ({ ...prev, phone: e.target.value }))}
                />

                {/* Password */}
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className={inputClass}
                        value={data.password}
                        onChange={(e) => setData((prev) => ({ ...prev, password: e.target.value }))}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                    >
                        {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                    </button>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        className={inputClass}
                        value={data.confirmPassword}
                        onChange={(e) => setData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                    >
                        {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                    </button>
                </div>

                {/* Error Message */}
                {error && <p className="text-sm text-red-500 text-center -mt-2">{error}</p>}

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    whileTap={{ scale: 0.97 }}
                    disabled={loading}
                    className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md transition ${loading ? "opacity-60 cursor-not-allowed" : ""
                        }`}
                >
                    {loading ? "Signing Up..." : "Sign Up"}
                </motion.button>
            </form>
            <OtpModal isOpen={success} onClose={() => setShowLogin(false)} email={data.email} />
        </>
    );
}

export default SignupForm;
