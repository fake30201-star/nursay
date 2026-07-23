// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  loadSavedChecklist();
  setupThemeToggle();
});

// 1. إدارة الـ Checklist والتفقد التفاعلي
function updateChecklist() {
  const checkboxes = document.querySelectorAll('.checklist-items input[type="checkbox"]');
  const total = checkboxes.length;
  let checkedCount = 0;
  let savedState = [];

  checkboxes.forEach((box) => {
    if (box.checked) checkedCount++;
    savedState.push(box.checked);
  });

  // حساب النسبة المئوية
  const percentage = Math.round((checkedCount / total) * 100);

  // تحديث الشاشة
  document.getElementById('checkProgressText').innerText = `${checkedCount} / ${total} خطوة`;
  document.getElementById('progressBarFill').style.width = `${percentage}%`;
  document.getElementById('totalScore').innerText = `${percentage}%`;

  // حفظ التقدم في المتصفح
  localStorage.setItem('nursay_checklist_cannula', JSON.stringify(savedState));
}

// 2. استرجاع البيانات عند إعادة الفتح
function loadSavedChecklist() {
  const savedState = JSON.parse(localStorage.getItem('nursay_checklist_cannula'));
  if (savedState) {
    const checkboxes = document.querySelectorAll('.checklist-items input[type="checkbox"]');
    checkboxes.forEach((box, index) => {
      if (savedState[index] !== undefined) {
        box.checked = savedState[index];
      }
    });
    updateChecklist();
  }
}

// 3. إعادة تعيين الـ Checklist
function resetChecklist() {
  const checkboxes = document.querySelectorAll('.checklist-items input[type="checkbox"]');
  checkboxes.forEach(box => box.checked = false);
  updateChecklist();
}

// 4. حاسبة معدل تنقيط المحاليل (IV Drip Rate Calculator)
function calculateDripRate() {
  const volume = parseFloat(document.getElementById('volumeInput').value);
  const hours = parseFloat(document.getElementById('timeInput').value);
  const dropFactor = parseFloat(document.getElementById('dropFactorSelect').value);

  if (!volume || !hours || volume <= 0 || hours <= 0) {
    alert('من فضلك أدخل قيم صحيحة لحجم المحلول والوقت!');
    return;
  }

  // المعادلة: (الحجم بالمل × معامل التنقيط) ÷ (الوقت بالساعات × 60)
  const timeInMinutes = hours * 60;
  const dripRate = Math.round((volume * dropFactor) / timeInMinutes);

  // عرض النتيجة
  document.getElementById('resultDripRate').innerText = dripRate;
  document.getElementById('resultHint').innerText = 
    `لإعطاء ${volume} مل خلال ${hours} ساعة، اضبط جهاز المحلول على ${dripRate} قطرة في الدقيقة.`;
}

// 5. تبديل الوضع الداكن
function setupThemeToggle() {
  const themeBtn = document.getElementById('themeToggle');
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    themeBtn.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
  });
}