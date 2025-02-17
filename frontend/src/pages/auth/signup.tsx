import { Link } from "react-router-dom";
import { useState } from "react";
import handleValidation from "@/features/auth/handleValidation";
import { signUp, AuthErrors } from "@/lib/auth";
import {
  nameSchema,
  emailSchema,
  passwordSignupSchema,
} from "@packages/schema";
import handleErrors from "@/features/auth/handleErrors";

function SignUp() {
  const [errors, setErrors] = useState<AuthErrors>({
    username: null,
    email: null,
    password: null,
  });

  const handleName = (username: string) =>
    handleValidation("username", username, nameSchema, setErrors);

  const handleEmail = (email: string) =>
    handleValidation("email", email, emailSchema, setErrors);

  const handlePassword = (password: string) =>
    handleValidation("password", password, passwordSignupSchema, setErrors);

  const handleSubmit = (e: React.FormEvent) => {
    const target = e.target as typeof e.target & {
      username: { value: string };
      email: { value: string };
      password: { value: string };
    };

    /* TEMP DISABLE FORM ERROR CHECKS
    // Use UserSignUpSchema to parse and use result.success to determine submission
    if (
      nameError ||
      nameError === null ||
      passwordError ||
      passwordError === null ||
      emailError ||
      emailError === null
    ) {
      handleName({ username: target.username.value } as Name);
      handleEmail({ email: target.email.value } as Email);
      handlePassword({ password: target.password.value } as PasswordSignup);
      console.log("Fix errors before submitting");
    } else {
      // Submit form to backend, check for backend validation errors then redirect to dashboard.
      console.log("submitted");
    }

    */
    signUp(target.username.value, target.email.value, target.password.value)
      .then((res) => console.log("Response", res))
      .catch((err) => handleErrors(err.response.data, setErrors));
    // If signup error
    // Display errors according to error type e.g username errors => setUserError
    // Else
    // redirect to dashboard

    // Prevent form submission
    e.preventDefault();
  };

  return (
    <>
      <main className="bg-black text-white w-screen h-screen flex justify-center items-center">
        <div className="flex flex-col grow gap-8 p-6 sm:w-full sm:max-w-md">
          <h1 className="text-3xl text-center">Sign up for an account.</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2"
            action=""
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Username</label>
              <input
                className={`border-0 outline-0 bg-grey rounded-sm px-3 py-2 text-sm ${
                  errors[`username`]
                    ? "ring-2 ring-[#7f1d1d]"
                    : "ring ring-grey-ring hover:ring-grey-ring-hover focus:ring-[3px] focus:ring-grey-ring-hover"
                }`}
                type="text"
                name="username"
                id="username"
                onBlur={(e) => handleName(e.target.value)}
              />
              <p className="text-[#f36060] text-xs">{errors[`username`]}</p>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                className={`border-0 outline-0 bg-grey rounded-sm px-3 py-2 text-sm ${
                  errors["email"]
                    ? "ring-2 ring-[#7f1d1d]"
                    : "ring ring-grey-ring hover:ring-grey-ring-hover focus:ring-[3px] focus:ring-grey-ring-hover"
                }`}
                type="email"
                name="email"
                id="email"
                onBlur={(e) => handleEmail(e.target.value)}
              />
              <p className="text-[#f36060] text-xs">{errors["email"]}</p>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                className={`border-0 outline-0 bg-grey rounded-sm px-3 py-2 text-sm ${
                  errors["password"]
                    ? "ring-2 ring-[#7f1d1d]"
                    : "ring ring-grey-ring hover:ring-grey-ring-hover focus:ring-[3px] focus:ring-grey-ring-hover"
                }`}
                type="password"
                name="password"
                id="password"
                onBlur={(e) => handlePassword(e.target.value)}
              />
              <p className="text-[#f36060] text-xs">{errors["password"]}</p>
            </div>
            <input
              className="bg-purple py-3 px-8 mt-2 text-sm rounded-sm font-bold transition duration-150 ease-in-out hover:bg-purple-btn-hover hover:cursor-pointer"
              type="submit"
              value="Sign up"
            />
          </form>
          <p className="text-center text-sm text-grey-accent">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-accent hover:text-purple-text-hover"
            >
              Login
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}

export default SignUp;
