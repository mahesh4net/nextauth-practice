"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Loginform() {
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleLogin(e: any) {
    e.preventDefault();

    const SubmitBtn = document.getElementById("submit");
    if (SubmitBtn) {
      SubmitBtn.setAttribute("disabled", "true");
      SubmitBtn.textContent = "Logging in...";
    }

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();
    try {
      const response = await fetch("api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        if (SubmitBtn) {
          SubmitBtn.removeAttribute("disabled");
          SubmitBtn.textContent = "Login";
        }
        const callbackUrl = searchParams.get("callbackUrl");
        const redirectUrl = callbackUrl ? `/${callbackUrl}` : "/";

        router.push(redirectUrl);
      } else {
        console.log(result);

        if (SubmitBtn) {
          SubmitBtn.removeAttribute("disabled");
          SubmitBtn.textContent = "Login";
        }

        if (result.commonError) {
          const commonError = document.getElementById("commonError");

          if (commonError) {
            commonError.textContent = result.commonError;
            commonError?.classList.remove("hidden");
          }

          return;
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
    <>
      <form className="form" onSubmit={handleLogin} onChange={handleErrors}>
        <div className="form-container flex flex-col justify-center items-center gap-y-4 mt-5 rounded p-10 bg-slate-200">
          <div className="email-container w-full flex flex-col gap-y-1 text-left">
            <label htmlFor="email" className="font-semibold text-sm">
              EMAIL
            </label>
            <input type="email" name="email" className="p-2 w-full rounded font-medium" id="email" />
            <p className="text-red-500 font-semibold hidden" id="emailError">
              error for email !
            </p>
          </div>
          <div className="pass-container w-full flex flex-col gap-y-1 text-left">
            <label htmlFor="password" className="font-semibold text-sm">
              PASSWORD
            </label>
            <input type="password" name="password" className="p-2  w-full rounded font-medium" id="password" />
            <p className="text-red-500 font-semibold hidden" id="passwordError">
              error for password !
            </p>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full font-semibold" id="submit">
            Login
          </button>
          <p className="text-red-500 font-semibold hidden" id="commonError"></p>
        </div>
      </form>
    </>
  );
}
