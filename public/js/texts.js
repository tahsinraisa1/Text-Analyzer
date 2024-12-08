document.addEventListener("DOMContentLoaded", () => {
  const addTextBtn = document.querySelector("#addTextBtn");
  const textInputArea = document.querySelector("#textInputArea");
  const submitTextBtn = document.querySelector("#submitTextBtn");
  const textList = document.querySelector("#textList");
  const metricsOutput = document.querySelector("#metricsOutput");
  const logoutBtn = document.querySelector("#logout");

  const headersObj = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  };

  async function viewCount(type, e) {
    const id = e.target?.parentElement?.id;
    const res = await fetch(`/v1/api/text/${id}/${type}`, {
      method: "GET",
      headers: headersObj,
    });
    if (res.status === 200) {
      const data = await res.json();
      if (type === "longest-words")
        alert(
          `Longest word(s): ${data?.data?.["longest-words"]
            ?.map((word) => word)
            .join(", ")}!`
        );
      else alert(`This text has ${data?.data?.[type]} ${type}!`);
    }
  }

  async function getTextItems() {
    const res = await fetch("/v1/api/texts", {
      method: "GET",
      headers: headersObj,
    });
    const content = await res.json();
    if (content?.data) {
      textList.replaceChildren();
      content?.data?.forEach((data) => {
        const listItem = document.createElement("li");
        const textContent = document.createElement("div");
        textContent.textContent = data?.data;
        listItem.appendChild(textContent);
        listItem.innerHTML += `<div class='textMetrics' id=${data?._id}><button class='wordCountBtn'>Word Count</button><button class='charCountBtn'>Character Count</button><button class='paraCountBtn'>Paragraph Count</button><button class='longestWordBtn'>Longest Word</button></div>`;
        textList.appendChild(listItem);

        const wordCountBtn = listItem.querySelector(".wordCountBtn");
        const charCountBtn = listItem.querySelector(".charCountBtn");
        const paraCountBtn = listItem.querySelector(".paraCountBtn");
        const longestWordBtn = listItem.querySelector(".longestWordBtn");
        wordCountBtn.addEventListener("click", async (e) => {
          viewCount("words", e);
        });
        charCountBtn.addEventListener("click", async (e) => {
          viewCount("chars", e);
        });
        paraCountBtn.addEventListener("click", async (e) => {
          viewCount("paragraphs", e);
        });
        longestWordBtn.addEventListener("click", async (e) => {
          viewCount("longest-words", e);
        });
      });
    }
  }
  getTextItems();

  submitTextBtn.addEventListener("click", async () => {
    const textInput = document.querySelector("#userText");
    if (textInput?.value?.trim()) {
      const res = await fetch("/v1/api/text", {
        method: "POST",
        headers: headersObj,
        body: JSON.stringify({ text: textInput?.value }),
      });
      if (res.status === 201) {
        getTextItems();
      }
    }
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/views/index.html";
  });
});
