document.addEventListener("DOMContentLoaded", () => {
  let currentStep = 1;
  const totalSteps = 6;
  const questions = document.querySelectorAll(".question");
  const radios = document.querySelectorAll('input[type="radio"]');
  const prevButtons = document.querySelectorAll(".prev-btn");

  // 顯示指定題目
  function showStep(step) {
    const target = document.getElementById("q" + step);
    if (target) {
      questions.forEach(q => q.classList.remove("active"));
      target.classList.add("active");
      currentStep = step;
      target.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }

  // 一開始只顯示第一題
  showStep(1);

  // 選項改變事件
  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      const step = Number(radio.dataset.step);
      const currentQ = document.getElementById("q" + step);

      // 標記完成
      if (currentQ) {
        currentQ.classList.add("completed");

        // 隱藏上一題按鈕
        const prevBtn = currentQ.querySelector(".prev-btn");
        if (prevBtn) prevBtn.style.display = "none";
      }

      // 顯示下一題
      if (step < totalSteps) {
        showStep(step + 1);
      } else {
        calculateResult();
      }
    });
  });

  // 上一題按鈕
  prevButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const currentQ = btn.closest(".question");
      if (!currentQ) return;

      const step = Number(currentQ.id.replace("q", ""));
      const prevStep = step - 1;
      if (prevStep < 1) return;

      // 目前題目退回
      currentQ.classList.remove("active");

      // 上一題恢復可編輯
      const prevQ = document.getElementById("q" + prevStep);
      if (prevQ) {
        prevQ.classList.remove("completed");
        prevQ.classList.add("active");

        const prevBtnInside = prevQ.querySelector(".prev-btn");
        if (prevBtnInside) prevBtnInside.style.display = "inline-block";

        prevQ.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

      currentStep = prevStep;
    });
  });

  // === 計算結果示意（你可以換成導向頁面） ===
  function calculateResult() {
    const answers = {};
    radios.forEach(r => {
      if (r.checked) answers[r.dataset.step] = r.value;
    });

    const count = { A: 0, B: 0, C: 0, D: 0 };
    Object.values(answers).forEach(ans => { if (count[ans] !== undefined) count[ans]++; });

    let resultType = "A";
    let max = 0;
    for (let key in count) {
      if (count[key] > max) { max = count[key]; resultType = key; }
    }

    // 導向對應結果頁
    goToResult(resultType);
  }

  function goToResult(type) {
    switch (type) {
      case "A": window.location.href = "file:///C:/Users/Administrator/Documents/GitHub/psychological-test/answer2-1.html"; break;
      case "B": window.location.href = "file:///C:/Users/Administrator/Documents/GitHub/psychological-test/answer2-2.html"; break;
      case "C": window.location.href = "file:///C:/Users/Administrator/Documents/GitHub/psychological-test/answer2-3.html"; break;
      case "D": window.location.href = "file:///C:/Users/Administrator/Documents/GitHub/psychological-test/answer2-4.html"; break;
    }
  }
});
