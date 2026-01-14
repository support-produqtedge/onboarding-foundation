"use client";

import Link from "next/link";
import { useState, ChangeEvent } from "react";
import InputGroup from "../ui/InputGroup";

type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement>;

interface MonoNin {
  status: string;
  message: string;
  timestamp: string;
  data: {
    firstname: string;
    surname: string;
    middlename: string
  }
}

const fetchNin = async (nin: string) => {
  const response = await fetch("/api/verify-nin", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({nin})
  });
  const data = await response.json();
  return data;
}

export const UserRegisterForm = ({ className, ...props }: UserRegisterFormProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nin: '',
    password: '',
    confirmPassword: ''
  });
  const [validateNin, setValidateNin] = useState<MonoNin>({
    status: '',
    message: '',
    timestamp: '',
    data: {
      firstname: '',
      surname: '',
      middlename: ''
    }
  })
  const [loadingNinData, setLoadingNinData] = useState(false);
  const [ninError, setNinError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [validated, setValidated] = useState<{validatedNin: boolean, validatedPassword: boolean}>({
    validatedNin: false,
    validatedPassword: false
  })

  const validateConfirmPassword = () => {
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      setValidated({...validated, validatedPassword: false});
    } else if(formData.password === formData.confirmPassword) {
      setConfirmPasswordError("");
      setValidated({...validated, validatedPassword: true});
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

    // Validate confirm password when either field changes
    if (event.target.name === 'confirmPassword' || event.target.name === 'password') {
      setTimeout(validateConfirmPassword, 0);
    }
  };

  const handleConfirmPasswordBlur = () => {
    validateConfirmPassword();
  };

  const validateMonoNin = () => {
    setLoadingNinData(true);
    setNinError("");
    fetchNin(formData.nin).then(res => {
      if ("error" in res) {
        setNinError(res.error);
        setLoadingNinData(false);
      } else {
        if (res.status === "failed") {
          setNinError("Invalid credentials");
          setValidated({...validated, validatedNin: false});
          setLoadingNinData(false)
        } else {
          setValidateNin({
            status: res.status,
            message: res.message,
            timestamp: res.timestamp,
            data: {
              firstname: res.data.firstname,
              surname: res.data.surname,
              middlename: res.data.middlename
            }
          });
          setValidated({
            ...validated,
            validatedNin: true
          })
          setLoadingNinData(false);
        }
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }
    // Handle form submission here
    console.log("Form submitted", formData);
  };
  return (
    <div className="w-[80%] pb-10">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-2xl">
              Create Your Account
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Already have an account? {" "}
              <Link href="/login" className="font-semibold text-blue-400">Login</Link>
            </p>
          </div>
        </div>
        {/* {error && <p className="text-red-600 text-sm text-center -mt-2">{error}</p>} */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 mt-2">
            <div>
              <InputGroup
                label="First Name"
                name="firstName"
                className="mb-5 [&_input]:py-3.75"
                placeholder="Enter first name"
                type="text"
                handleChange={handleInputChange}
                value={formData.firstName}
              />
              <InputGroup
                label="Last Name"
                name="lastName"
                className="mb-5 [&_input]:py-3.75"
                placeholder="Enter last name"
                type="text"
                handleChange={handleInputChange}
                value={formData.lastName}
              />
              <InputGroup
                label="Email"
                name="email"
                className="mb-5 [&_input]:py-3.75"
                placeholder="Enter email"
                type="email"
                handleChange={handleInputChange}
                value={formData.email}
              />
              <InputGroup
                label="Phone"
                name="phone"
                className="mb-5 [&_input]:py-3.75"
                placeholder="Enter phone number"
                type="text"
                handleChange={handleInputChange}
                value={formData.phone}
              />
              <div className="mb-5">
                <InputGroup
                  label="NIN"
                  name="nin"
                  className="[&_input]:py-3.75"
                  placeholder="Enter nin"
                  type="text"
                  handleChange={handleInputChange}
                  handleBlur={validateMonoNin}
                  value={formData.nin}
                />
                <div>
                  {
                    loadingNinData ? (
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-black border-t-transparent" />
                    ) : (ninError ? <p className="text-red-500">{ninError}</p> : <p className="text-green-500">{`${validateNin.data.firstname} ${validateNin.data.middlename} ${validateNin.data.surname}`}</p>)
                  }
                </div>
              </div>
              <InputGroup
                label="Password"
                name="password"
                className="mb-5 [&_input]:py-3.75"
                placeholder="Enter password"
                type="password"
                handleChange={handleInputChange}
                value={formData.password}
              />
              <InputGroup
                label="Confirm Password"
                name="confirmPassword"
                className="mb-5 [&_input]:py-3.75"
                placeholder="Confirm password"
                type="password"
                handleChange={handleInputChange}
                handleBlur={handleConfirmPasswordBlur}
                value={formData.confirmPassword}
              />
              {confirmPasswordError && <p className="text-red-600 text-sm -mt-4 mb-2">{confirmPasswordError}</p>}
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-lg bg-[#24292F] disabled:bg-[#24292F]/60 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50"
              disabled={confirmPasswordError !== "" || !validated.validatedNin || !validated.validatedPassword}
            >
              <span className="inline-block pr-2">Continue</span>
              {/* {isPending && (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
              )} */}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
