import React, { useState, useEffect } from "react";
import CustomInput from "../core/CustomInput";
import CustomButton from "../core/CustomButton";
import PrimaryHeading from "../core/PrimaryHeading";
import { useAuth } from "../../AuthContext";
import { Navigate } from "react-router-dom";

// Utility function for email validation
const validateEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const { login } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
      if (token) {
        setToken(token)
      }
  }, []);


  const validateForm = () => {
    let valid = true;
    let errors = {};

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

    setErrors(errors);
    return valid;
  };

  // Step 3: Handle Signin function
  const handleSignin = async ()  => {
    if (validateForm()) {
      setLoading(true);

      await login({email, password})

      console.log("Form is valid. Proceed to sign in:", { email, password });
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
          <PrimaryHeading title={'Sign in'} />
        </div>
        <div className="flex flex-col items-center gap-5 w-full">
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

          {/* Remember Me Checkbox */}
          <div className="w-full flex justify-center items-center">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4  !rounded-lg !bg-[#224957] focus:ring-2 focus:ring-[#224957]"
            />
            <label htmlFor="remember-me" className="ml-2">Remember Me</label>
          </div>

          {/* Signin Button */}
          {/* <CustomButton onClick={handleSignin}>
              {loading ? 
                  <div className="flex justify-center items-center" role="status">
                      <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                      </svg>
                  </div>
                  :
                "Signin"}
          </CustomButton> */}
                <CustomButton title={"Sign in"} onClick={handleSignin}>
                </CustomButton>
        </div>
      </div>
    </div>
  );
}
