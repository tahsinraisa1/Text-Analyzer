document.addEventListener("DOMContentLoaded", () => {
  const signInBtn = document.getElementById("signInBtn");
  const signUpBtn = document.getElementById("signUpBtn");
  signUpBtn?.addEventListener("click", async (event) => {
    const form = document.querySelector("#signUpForm");
    const formData = new FormData(form);
    const reqBody = {};
    formData.forEach((value, key) => {
      reqBody[key] = value;
    });
    const res = await fetch("/v1/api/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    const data = await res.json();
    if (res.status === 201) {
      localStorage.setItem("accessToken", data.data.token);
      window.location.pathname = "/views/texts.html";
    }
  });

  signInBtn?.addEventListener("click", async (event) => {
    const form = document.querySelector("#signInForm");
    const formData = new FormData(form);
    const reqBody = {};
    formData.forEach((value, key) => {
      reqBody[key] = value;
    });
    const res = await fetch("/v1/api/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    const data = await res.json();
    if (data?.data?.token) {
      localStorage.setItem("accessToken", data.data.token);
      window.location.pathname = "/views/texts.html";
    }
  });
});
