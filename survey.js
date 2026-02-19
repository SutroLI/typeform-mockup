(function () {
  const config = typeof SURVEY_CONFIG !== "undefined" ? SURVEY_CONFIG : { questions: [] };
  const questions = config.questions || [];
  let currentIndex = 0;
  const answers = {};

  const welcomeEl = document.getElementById("welcome");
  const surveyEl = document.getElementById("survey");
  const thankyouEl = document.getElementById("thankyou");
  const startBtn = document.getElementById("start-btn");
  const backBtn = document.getElementById("back-btn");
  const nextBtn = document.getElementById("next-btn");
  const questionContainer = document.getElementById("question-container");
  const progressFill = document.getElementById("progress-fill");

  function showScreen(id) {
    [welcomeEl, surveyEl, thankyouEl].forEach((el) => el.classList.remove("active"));
    const target = document.getElementById(id);
    if (target) target.classList.add("active");
  }

  function renderQuestion(q) {
    const div = document.createElement("div");
    div.className = "question";
    div.dataset.id = q.id;

    const title = document.createElement("h2");
    title.className = "question-title";
    title.textContent = q.title;
    div.appendChild(title);

    let inputArea;
    switch (q.type) {
      case "short_text":
        inputArea = document.createElement("input");
        inputArea.type = "text";
        inputArea.className = "question-input";
        inputArea.placeholder = "Type your answer here...";
        inputArea.value = answers[q.id] || "";
        inputArea.addEventListener("input", () => { answers[q.id] = inputArea.value; });
        break;

      case "long_text":
        inputArea = document.createElement("textarea");
        inputArea.className = "question-input textarea";
        inputArea.placeholder = "Type your answer here...";
        inputArea.value = answers[q.id] || "";
        inputArea.addEventListener("input", () => { answers[q.id] = inputArea.value; });
        break;

      case "yes_no":
        inputArea = document.createElement("div");
        inputArea.className = "yes-no-buttons";
        ["Yes", "No"].forEach((opt) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "option-btn" + (answers[q.id] === opt ? " selected" : "");
          btn.textContent = opt;
          btn.addEventListener("click", () => {
            inputArea.querySelectorAll(".option-btn").forEach((b) => b.classList.remove("selected"));
            btn.classList.add("selected");
            answers[q.id] = opt;
          });
          inputArea.appendChild(btn);
        });
        break;

      case "multiple_choice":
        inputArea = document.createElement("ul");
        inputArea.className = "options-list";
        (q.options || []).forEach((opt) => {
          const li = document.createElement("li");
          li.className = "option-item";
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "option-btn" + (answers[q.id] === opt ? " selected" : "");
          btn.textContent = opt;
          btn.addEventListener("click", () => {
            inputArea.querySelectorAll(".option-btn").forEach((b) => b.classList.remove("selected"));
            btn.classList.add("selected");
            answers[q.id] = opt;
          });
          li.appendChild(btn);
          inputArea.appendChild(li);
        });
        break;

      default:
        inputArea = document.createElement("input");
        inputArea.type = "text";
        inputArea.className = "question-input";
        inputArea.placeholder = "Type your answer here...";
        inputArea.value = answers[q.id] || "";
        inputArea.addEventListener("input", () => { answers[q.id] = inputArea.value; });
    }

    div.appendChild(inputArea);
    return div;
  }

  function updateQuestion() {
    questionContainer.innerHTML = "";
    if (currentIndex >= questions.length) {
      showScreen("thankyou");
      return;
    }
    const q = questions[currentIndex];
    questionContainer.appendChild(renderQuestion(q));
    updateProgress();
    backBtn.disabled = currentIndex === 0;
    nextBtn.textContent = currentIndex === questions.length - 1 ? "Submit" : "Next →";
  }

  function updateProgress() {
    const pct = questions.length ? ((currentIndex + 1) / questions.length) * 100 : 0;
    progressFill.style.width = pct + "%";
  }

  startBtn.addEventListener("click", () => {
    showScreen("survey");
    updateQuestion();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && welcomeEl.classList.contains("active")) {
      startBtn.click();
    }
  });

  backBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateQuestion();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < questions.length - 1) {
      currentIndex++;
      updateQuestion();
    } else {
      showScreen("thankyou");
    }
  });

  if (config.participantCount) {
    const countEl = document.querySelector(".participant-count");
    if (countEl) countEl.textContent = config.participantCount + " people have filled this out";
  }
})();
