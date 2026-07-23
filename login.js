// التبديل بين اللوجن وإنشاء الحساب
function switchTab(type) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.form-toggle').forEach(form => form.classList.remove('active'));

  if (type === 'login') {
    document.querySelectorAll('.tab-btn')[0].classList.add('active');
    document.getElementById('login-form').classList.add('active');
  } else {
    document.querySelectorAll('.tab-btn')[1].classList.add('active');
    document.getElementById('signup-form').classList.add('active');
  }
}

// تسجيل الدخول والتوجيه للموقع الرئيسي
function handleAuth(e) {
  e.preventDefault();
  localStorage.setItem('userLoggedIn', 'true');
  alert('تم تسجيل الدخول بنجاح! جاري التوجيه للرئيسية...');
  window.location.href = 'index.html';
}

// اختيار الخطة
function selectPlan(planType) {
  if (!localStorage.getItem('userLoggedIn')) {
    alert('برجاء تسجيل الدخول أو إنشاء حساب أولاً!');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  alert('تم اختيار الاشتراك ' + planType + '! سيتم توجيهك لصفحة الدفع.');
  // يمكنك وضع رابط الدفع الخاص بك هنا لاحقاً
}