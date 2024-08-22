import React, { useState, useEffect } from "react";
import CustomInput from "../core/CustomInput";
import CustomButton from "../core/CustomButton";
import PrimaryHeading from "../core/PrimaryHeading";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { Navigate } from "react-router-dom";

// Utility function for email validation
const validateEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setfullName] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const { registor } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
      if (token) {
        setToken(token)
      }
  }, []);

  const validateForm = () => {
    let valid = true;
    let errors = {};

    if (!fullName) {
      errors.fullName = "Full Name is required";
      valid = false;
    }

    if (!email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!validateEmail(email)) {
      errors.email = "Please enter a valid email";
      valid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    if (!confirmPassword) {
      errors.confirmPassword = "confirmPassword is required";
      valid = false;
    } else if (confirmPassword.length < 6) {
      errors.password = "Password must be at least 6 characters long";
      valid = false;
    } else if ( confirmPassword !== password) {
      errors.confirmPassword = "confiorm Password must be same as password";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  // const handleSignup = () => {
  //   debugger
  //   if (validateForm()) {
  //     setLoading(true);
  //     console.log("Form is valid. Proceed to Sign up:", { email, password });
  //   } else {
  //     console.log("Form has errors");
  //   }
  // };

  const handleSignup = async (e) => {
    // debugger
    if (validateForm()) {
      setLoading(true);

      await registor({fullName, email, password, confirmPassword})

      // console.log("Form is valid. Proceed to sign in:", { email, password });
    } else {
      console.log("Form has errors");
    }
  };

  if (token) {
    return <Navigate to={"/movies"} />
  }

  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="mb-8 text-3xl text-center">
          <PrimaryHeading title={'Sign up'} />
        </div>
        <div className="flex flex-col items-center gap-5 w-full">
          {/* full name Input */}
          <CustomInput
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
          />
          {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}

          {/* Email Input */}
          <CustomInput
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          
          {/* Password Input */}
          <CustomInput
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
            {errors.password && <p className="text-red-500">{errors.password}</p>}

          {/* confirmPassword Input */}
          <CustomInput
            placeholder="confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}

          {/* Remember Me Checkbox */}
          <div className="w-full flex justify-center items-center">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4  !rounded-lg !bg-[#224957] focus:ring-2 focus:ring-[#224957]"
            />
            <label htmlFor="remember-me" className="ml-2">Remember Me</label>
          </div>

          {/* Signup Button */}
          <CustomButton title={"Sign up"} onClick={handleSignup}>
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
