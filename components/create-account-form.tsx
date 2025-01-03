"use client";

import { useRouter } from "next/navigation";

export default function Creataccountform() {
  const router = useRouter();
  async function handleCreateAccount(e: any) {
    e.preventDefault();

    const SubmitBtn = document.getElementById("submit");
    if (SubmitBtn) {
      SubmitBtn.setAttribute("disabled", "true");
      SubmitBtn.textContent = "Creating Account...";
    }

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();
    try {
      const response = await fetch("api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("redirecting........");
        router.push("/login");
      } else {
        console.log(result);
        if (SubmitBtn) {
          SubmitBtn.removeAttribute("disabled");
          SubmitBtn.textContent = "Create Account";
        }


        if (result.commonError) {
          const commonError = document.getElementById("commonError");

          if (commonError) {
            commonError.textContent = result.commonError;
            commonError?.classList.remove("hidden");
          }

          return
        }



        if (result.validationError.fieldErrors.name) {
          const nameError = document.getElementById("nameError");

          if (nameError) {
            nameError.textContent = result.validationError.fieldErrors.name[0];
            nameError?.classList.remove("hidden");
          }
        }

        if (result.validationError.fieldErrors.email) {
          const emailError = document.getElementById("emailError");

          if (emailError) {
            emailError.textContent = result.validationError.fieldErrors.email[0];
            emailError?.classList.remove("hidden");
          }
        }

        if (result.validationError.fieldErrors.password) {
          const passwordError = document.getElementById("passwordError");

          if (passwordError) {
            passwordError.textContent = result.validationError.fieldErrors.password[0];
            passwordError?.classList.remove("hidden");
          }
        }

       
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleErrors() {
    const errorElements = document.querySelectorAll("form p");

    errorElements.forEach((element) => {
      element.classList.add("hidden");
    });
  }

  return (
    <div className="min-w-full">
      <form onSubmit={handleCreateAccount}>
        <div className="form-container  flex flex-col justify-center items-center gap-y-4 mt-5 rounded p-10 bg-slate-200">
          <div className="name-container w-full flex flex-col gap-y-1 text-left">
            <label htmlFor="name" className="font-semibold text-sm">
              NAME
            </label>
            <input
              type="text"
              name="name"
              className="p-2 w-full rounded font-medium"
              id="name"
              onChange={handleErrors}
            />
            <p className="text-red-500 font-semibold hidden" id="nameError">
              error for name !
            </p>
          </div>
          <div className="email-container w-full flex flex-col gap-y-1 text-left">
            <label htmlFor="email" className="font-semibold text-sm">
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              className="p-2 w-full rounded font-medium"
              id="email"
              onChange={handleErrors}
            />
            <p className="text-red-500 font-semibold hidden" id="emailError">
              error for email !
            </p>
          </div>
          <div className="pass-container w-full flex flex-col gap-y-1 text-left">
            <label htmlFor="password" className="font-semibold text-sm">
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              className="p-2  w-full rounded font-medium"
              id="password"
              onChange={handleErrors}
            />
            <p className="text-red-500 font-semibold hidden" id="passwordError">
              error for password !
            </p>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full font-semibold"
            id="submit">Create Account </button>

          <p className="text-red-500 font-semibold hidden" id="commonError"></p>
        </div>
      </form>
    </div>
  );
}
