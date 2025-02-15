import { Link } from "react-router-dom";
import { useState } from "react";
import handleValidation from "@/features/auth/handleValidation";
import {
  nameSchema,
  Name,
  passwordLoginSchema,
  PasswordLogin,
} from "@packages/schema";

function LogIn() {
  // Use null to determine if page just loaded
  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleName = (username: Name) => {
    handleValidation(username, nameSchema, setNameError);
  };

  const handlePassword = (password: PasswordLogin) => {
    handleValidation(password, passwordLoginSchema, setPasswordError);
  };

  const handleSubmit = (e: React.FormEvent) => {
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };

    if (
      nameError ||
      nameError === null ||
      passwordError ||
      passwordError === null
    ) {
      // Validate again
      handleName(target.username.value);
      handlePassword(target.password.value);
      console.log("Fix errors before submitting");
    } else {
      // Submit form to backend, check for backend validation errors then redirect to dashboard.
      console.log("submitted");
    }

    // Prevent form submission
    e.preventDefault();
  };

  return (
    <>
      <main className="bg-black text-white w-screen h-screen flex justify-center items-center">
        <div className="flex flex-col grow gap-8 p-6 sm:w-full sm:max-w-md">
          <h1 className="text-3xl text-center">Login to your account.</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2"
            action=""
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Username</label>
              <input
                className={`border-0 outline-0 bg-grey rounded-sm px-3 py-2 text-sm ${
                  nameError
                    ? "ring-2 ring-[#7f1d1d]"
                    : "ring ring-grey-ring hover:ring-grey-ring-hover focus:ring-[3px] focus:ring-grey-ring-hover"
                }`}
                type="text"
                name="username"
                id="username"
                onBlur={(e) => handleName(e.target.value)}
              />
              <p className="text-[#f36060] text-xs">{nameError}</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password">Password</label>
                {/* Create forgot password link and page*/}

                <Link
                  className="text-sm text-purple-accent hover:text-purple-text-hover"
                  to="/forgot-password"
                >
                  Forgot password?
                </Link>
              </div>

              <input
                className={`border-0 outline-0 bg-grey rounded-sm px-3 py-2 text-sm ${
                  passwordError
                    ? "ring-2 ring-[#7f1d1d]"
                    : "ring ring-grey-ring hover:ring-grey-ring-hover focus:ring-[3px] focus:ring-grey-ring-hover"
                }`}
                type="password"
                name="password"
                id="password"
                onBlur={(e) => handlePassword(e.target.value)}
              />
              <p className="text-[#f36060] text-xs">{passwordError}</p>
            </div>
            <input
              className="bg-purple py-3 px-8 mt-2 text-sm rounded-sm font-bold transition duration-150 ease-in-out hover:bg-purple-btn-hover hover:cursor-pointer"
              type="submit"
              value="Login"
            />
          </form>
          <p className="text-center text-sm text-grey-accent">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-purple-accent hover:text-purple-text-hover"
            >
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}

export default LogIn;
