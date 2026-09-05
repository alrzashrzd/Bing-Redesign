/*
 * Microsoft Bing Redesign — Concept UI
 * Copyright (c) 2025 @alrzashrzd. All rights reserved.
 * This is a personal concept project and is NOT affiliated with Microsoft Corporation.
 */

/* ═══════════════════════════════════════════════════
   JS: Animations, Interactions, i18n
   ═══════════════════════════════════════════════════ */
(function () {

  /* ── ENTRANCE ANIMATION TEARDOWN ─────────────── */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.remove('anim');
    return;
  }
  var removed = false;
  function teardown() {
    if (removed) return;
    removed = true;
    document.documentElement.classList.remove('anim');
  }
  var logos = document.querySelectorAll('.logos .logo');
  if (logos.length) {
    logos[logos.length - 1].addEventListener('animationend', teardown);
  }
  setTimeout(teardown, 2600);

  /* ── SHARED REFERENCES ─────────────────────────── */
  var searchInput = document.querySelector('.search-input');
  var stageDim = document.getElementById('stage-dim');
  var stageVideo = document.querySelector('.stage-video');
  var authPopup = document.getElementById('auth-popup');
  var langDropdown = document.getElementById('lang-dropdown');
  var ms365Popup = document.getElementById('ms365-popup');
  var natureVideos = [
    'https://assets.mixkit.co/videos/4881/4881-720.mp4',
    'https://assets.mixkit.co/videos/2213/2213-720.mp4',
    'https://assets.mixkit.co/videos/51445/51445-720.mp4',
    'https://assets.mixkit.co/videos/1173/1173-720.mp4',
    'https://assets.mixkit.co/videos/4645/4645-720.mp4',
    'https://assets.mixkit.co/videos/4633/4633-720.mp4',
    'https://assets.mixkit.co/videos/1446/1446-720.mp4',
    'https://assets.mixkit.co/videos/1230/1230-720.mp4',
    'https://assets.mixkit.co/videos/1259/1259-720.mp4',
    'https://assets.mixkit.co/videos/1838/1838-720.mp4',
    'https://assets.mixkit.co/videos/4235/4235-720.mp4'
  ];
  var videoIndex = 0;

  /* ── CARD GLOW — mouse follow ─────────────────── */
  var card = document.querySelector('.card');
  var glow = document.querySelector('.card-glow');
  if (card && glow) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      glow.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width) * 100 + '%');
      glow.style.setProperty('--my', ((e.clientY - rect.top) / rect.height) * 100 + '%');
    });
  }

  /* ── CHIP SELECTION + PLACEHOLDER ─────────────── */
  var chips = document.querySelectorAll('.chip');
  if (searchInput && stageDim) {
    searchInput.addEventListener('input', function () {
      stageDim.classList.toggle('active', searchInput.value.length > 0);
    });
    searchInput.addEventListener('blur', function () {
      if (!searchInput.value) stageDim.classList.remove('active');
    });
  }

  function getPlaceholderMap() {
    return {
      'chip_images': t('find_visuals'),
      'chip_videos': t('find_videos'),
      'chip_shopping': t('find_stores'),
      'chip_maps': t('find_places'),
      'chip_news': t('search_news')
    };
  }

  var selectedChip = null;
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var was = chip.classList.contains('selected');
      chips.forEach(function (c) { c.classList.remove('selected'); });
      if (!was) {
        chip.classList.add('selected');
        selectedChip = chip;
        var pm = getPlaceholderMap();
        if (searchInput) searchInput.placeholder = pm[chip.getAttribute('data-i18n')] || t('search_placeholder');
      } else {
        selectedChip = null;
        if (searchInput) searchInput.placeholder = t('search_placeholder');
      }
    });
  });

  /* ── LANGUAGE DROPDOWN ─────────────────────────── */
  var langBtn = document.getElementById('lang-btn');
  var langDropdown = document.getElementById('lang-dropdown');
  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      langDropdown.classList.toggle('open');
    });
    langDropdown.addEventListener('click', function (e) {
      e.stopPropagation();
      var opt = e.target.closest('.lang-option');
      if (opt) {
        langDropdown.querySelectorAll('.lang-option').forEach(function (o) { o.classList.remove('active'); });
        opt.classList.add('active');
        langDropdown.classList.remove('open');
        applyLanguage(opt.getAttribute('data-lang'));
      }
    });
    document.addEventListener('click', function () {
      langDropdown.classList.remove('open');
    });
  }

  /* ── MS365 POPUP ──────────────────────────────── */
  var ms365Btn = document.getElementById('ms365-btn');
  var ms365Popup = document.getElementById('ms365-popup');
  if (ms365Btn && ms365Popup) {
    ms365Btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      ms365Popup.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (!ms365Popup.contains(e.target) && e.target !== ms365Btn) {
        ms365Popup.classList.remove('open');
      }
    });
  }

  /* ── CHIP DROPDOWN (mobile model-selector style) ── */
  var chipDropdown = document.getElementById('chip-dropdown');
  var chipDropdownBtn = document.getElementById('chip-dropdown-btn');
  var chipDropdownLabel = document.getElementById('chip-dropdown-label');
  var chipDropdownList = document.getElementById('chip-dropdown-list');
  if (chipDropdown && chipDropdownBtn && chipDropdownList) {
    chipDropdownBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      chipDropdown.classList.toggle('open');
    });
    chipDropdownList.addEventListener('click', function (e) {
      e.stopPropagation();
      var opt = e.target.closest('.chip-dropdown-option');
      if (opt) {
        var chipKey = opt.getAttribute('data-chip');
        var wasActive = opt.classList.contains('active');
        chipDropdownList.querySelectorAll('.chip-dropdown-option').forEach(function (o) { o.classList.remove('active'); });
        if (!wasActive) {
          opt.classList.add('active');
          chipDropdownLabel.textContent = opt.textContent;
          selectedChip = { getAttribute: function() { return chipKey; } };
          var pm = getPlaceholderMap();
          if (searchInput) searchInput.placeholder = pm[chipKey] || t('search_placeholder');
        } else {
          selectedChip = null;
          chipDropdownLabel.textContent = t('chip_images');
          if (searchInput) searchInput.placeholder = t('search_placeholder');
        }
        chipDropdown.classList.remove('open');
      }
    });
    document.addEventListener('click', function (e) {
      if (!chipDropdown.contains(e.target)) chipDropdown.classList.remove('open');
    });
  }

  /* ── MOBILE SHEET BUTTONS ────────────────────── */
  var sheetUserBtn = document.getElementById('sheet-user-btn');
  var sheetLangBtn = document.getElementById('sheet-lang-btn');
  var sheetWallpaperBtn = document.getElementById('sheet-wallpaper-btn');
  var sheetMs365Btn = document.getElementById('sheet-ms365-btn');
  if (sheetUserBtn && authPopup) {
    sheetUserBtn.addEventListener('click', function (e) {
      e.preventDefault();
      authPopup.classList.add('open');
    });
  }
  if (sheetLangBtn && langDropdown) {
    sheetLangBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      langDropdown.classList.toggle('open');
    });
  }
  if (sheetWallpaperBtn && stageVideo) {
    sheetWallpaperBtn.addEventListener('click', function (e) {
      e.preventDefault();
      videoIndex = (videoIndex + 1) % natureVideos.length;
      var source = stageVideo.querySelector('source');
      if (source) { source.src = natureVideos[videoIndex]; stageVideo.load(); }
    });
  }
  if (sheetMs365Btn && ms365Popup) {
    sheetMs365Btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      ms365Popup.classList.toggle('open');
    });
  }

  /* ── AUTH POPUP ────────────────────────────────── */
  var userBtn = document.getElementById('user-btn');
  var authPopup = document.getElementById('auth-popup');
  var authClose = document.getElementById('auth-close');
  if (userBtn && authPopup) {
    userBtn.addEventListener('click', function (e) {
      e.preventDefault();
      authPopup.classList.add('open');
    });
  }
  if (authClose && authPopup) {
    authClose.addEventListener('click', function () {
      authPopup.classList.remove('open');
    });
  }
  if (authPopup) {
    authPopup.addEventListener('click', function (e) {
      if (e.target === authPopup) authPopup.classList.remove('open');
    });
  }

  /* ── WALLPAPER — cycle through nature videos ───── */
  var wallpaperBtn = document.getElementById('wallpaper-btn');
  if (wallpaperBtn && stageVideo) {
    wallpaperBtn.addEventListener('click', function (e) {
      e.preventDefault();
      videoIndex = (videoIndex + 1) % natureVideos.length;
      var source = stageVideo.querySelector('source');
      if (source) {
        source.src = natureVideos[videoIndex];
        stageVideo.load();
      }
    });
  }

  /* ═══════════════════════════════════════════════════
     i18n — TRANSLATION SYSTEM
     ═══════════════════════════════════════════════════ */

  var translations = {
    en: {
      brand: 'Microsoft',
      hero_title: 'What are you looking for?',
      search_placeholder: 'Search',
      chip_images: 'Images', chip_videos: 'Videos', chip_shopping: 'Shopping', chip_maps: 'Maps', chip_news: 'News',
      find_visuals: 'Find visuals', find_videos: 'Find videos', find_stores: 'Find stores', find_places: 'Find places', search_news: 'Search news',
      welcome: 'Welcome',
      auth_sub: 'Sign in or create an account to get started',
      email_placeholder: 'Email address', password_placeholder: 'Password',
      sign_in: 'Sign In', create_account: 'Create Account', or: 'or',
      continue_ms: 'Continue with Microsoft account'
    },
    es: {
      brand: 'Microsoft',
      hero_title: '¿Qué estás buscando?',
      search_placeholder: 'Buscar',
      chip_images: 'Imágenes', chip_videos: 'Videos', chip_shopping: 'Compras', chip_maps: 'Mapas', chip_news: 'Noticias',
      find_visuals: 'Buscar imágenes', find_videos: 'Buscar vídeos', find_stores: 'Buscar tiendas', find_places: 'Buscar lugares', search_news: 'Buscar noticias',
      welcome: 'Bienvenido',
      auth_sub: 'Inicia sesión o crea una cuenta para comenzar',
      email_placeholder: 'Correo electrónico', password_placeholder: 'Contraseña',
      sign_in: 'Iniciar sesión', create_account: 'Crear cuenta', or: 'o',
      continue_ms: 'Continuar con cuenta Microsoft'
    },
    fr: {
      brand: 'Microsoft',
      hero_title: 'Que recherchez-vous ?',
      search_placeholder: 'Rechercher',
      chip_images: 'Images', chip_videos: 'Vidéos', chip_shopping: 'Achats', chip_maps: 'Cartes', chip_news: 'Actualités',
      find_visuals: 'Rechercher des images', find_videos: 'Rechercher des vidéos', find_stores: 'Rechercher des magasins', find_places: 'Rechercher des lieux', search_news: 'Rechercher des actualités',
      welcome: 'Bienvenue',
      auth_sub: 'Connectez-vous ou créez un compte pour commencer',
      email_placeholder: 'Adresse e-mail', password_placeholder: 'Mot de passe',
      sign_in: 'Se connecter', create_account: 'Créer un compte', or: 'ou',
      continue_ms: 'Continuer avec un compte Microsoft'
    },
    de: {
      brand: 'Microsoft',
      hero_title: 'Was suchen Sie?',
      search_placeholder: 'Suchen',
      chip_images: 'Bilder', chip_videos: 'Videos', chip_shopping: 'Einkaufen', chip_maps: 'Karten', chip_news: 'Nachrichten',
      find_visuals: 'Bilder finden', find_videos: 'Videos finden', find_stores: 'Geschäfte finden', find_places: 'Orte finden', search_news: 'Nachrichten suchen',
      welcome: 'Willkommen',
      auth_sub: 'Melden Sie sich an oder erstellen Sie ein Konto',
      email_placeholder: 'E-Mail-Adresse', password_placeholder: 'Passwort',
      sign_in: 'Anmelden', create_account: 'Konto erstellen', or: 'oder',
      continue_ms: 'Mit Microsoft-Konto fortfahren'
    },
    pt: {
      brand: 'Microsoft',
      hero_title: 'O que você está procurando?',
      search_placeholder: 'Pesquisar',
      chip_images: 'Imagens', chip_videos: 'Vídeos', chip_shopping: 'Compras', chip_maps: 'Mapas', chip_news: 'Notícias',
      find_visuals: 'Buscar imagens', find_videos: 'Buscar vídeos', find_stores: 'Buscar lojas', find_places: 'Buscar lugares', search_news: 'Buscar notícias',
      welcome: 'Bem-vindo',
      auth_sub: 'Faça login ou crie uma conta para começar',
      email_placeholder: 'Endereço de e-mail', password_placeholder: 'Senha',
      sign_in: 'Entrar', create_account: 'Criar conta', or: 'ou',
      continue_ms: 'Continuar com conta Microsoft'
    },
    ja: {
      brand: 'Microsoft',
      hero_title: '何をお探しですか？',
      search_placeholder: '検索',
      chip_images: '画像', chip_videos: '動画', chip_shopping: 'ショッピング', chip_maps: '地図', chip_news: 'ニュース',
      find_visuals: '画像を探す', find_videos: '動画を探す', find_stores: '店舗を探す', find_places: '場所を探す', search_news: 'ニュースを検索',
      welcome: 'ようこそ',
      auth_sub: 'サインインまたはアカウントを作成して開始',
      email_placeholder: 'メールアドレス', password_placeholder: 'パスワード',
      sign_in: 'サインイン', create_account: 'アカウント作成', or: 'または',
      continue_ms: 'Microsoftアカウントで続行'
    },
    zh: {
      brand: 'Microsoft',
      hero_title: '您在寻找什么？',
      search_placeholder: '搜索',
      chip_images: '图片', chip_videos: '视频', chip_shopping: '购物', chip_maps: '地图', chip_news: '新闻',
      find_visuals: '查找图片', find_videos: '查找视频', find_stores: '查找商店', find_places: '查找地点', search_news: '搜索新闻',
      welcome: '欢迎',
      auth_sub: '登录或创建帐户以开始使用',
      email_placeholder: '电子邮件地址', password_placeholder: '密码',
      sign_in: '登录', create_account: '创建帐户', or: '或',
      continue_ms: '使用 Microsoft 帐户继续'
    },
    ko: {
      brand: 'Microsoft',
      hero_title: '무엇을 찾고 계신가요?',
      search_placeholder: '검색',
      chip_images: '이미지', chip_videos: '동영상', chip_shopping: '쇼핑', chip_maps: '지도', chip_news: '뉴스',
      find_visuals: '이미지 찾기', find_videos: '동영상 찾기', find_stores: '매장 찾기', find_places: '장소 찾기', search_news: '뉴스 검색',
      welcome: '환영합니다',
      auth_sub: '로그인하거나 계정을 만들어 시작하세요',
      email_placeholder: '이메일 주소', password_placeholder: '비밀번호',
      sign_in: '로그인', create_account: '계정 만들기', or: '또는',
      continue_ms: 'Microsoft 계정으로 계속'
    },
    ar: {
      brand: 'Microsoft',
      hero_title: 'ماذا تبحث عن؟',
      search_placeholder: 'بحث',
      chip_images: 'الصور', chip_videos: 'الفيديو', chip_shopping: 'التسوق', chip_maps: 'الخرائط', chip_news: 'الأخبار',
      find_visuals: 'البحث عن صور', find_videos: 'البحث عن فيديو', find_stores: 'البحث عن متاجر', find_places: 'البحث عن أماكن', search_news: 'البحث عن أخبار',
      welcome: 'مرحباً',
      auth_sub: 'سجّل الدخول أو أنشئ حساباً للبدء',
      email_placeholder: 'البريد الإلكتروني', password_placeholder: 'كلمة المرور',
      sign_in: 'تسجيل الدخول', create_account: 'إنشاء حساب', or: 'أو',
      continue_ms: 'المتابعة بحساب Microsoft'
    },
    hi: {
      brand: 'Microsoft',
      hero_title: 'आप क्या खोज रहे हैं?',
      search_placeholder: 'खोजें',
      chip_images: 'चित्र', chip_videos: 'वीडियो', chip_shopping: 'खरीदारी', chip_maps: 'मानचित्र', chip_news: 'समाचार',
      find_visuals: 'चित्र खोजें', find_videos: 'वीडियो खोजें', find_stores: 'दुकान खोजें', find_places: 'स्थान खोजें', search_news: 'समाचार खोजें',
      welcome: 'स्वागत है',
      auth_sub: 'शुरू करने के लिए साइन इन करें या खाता बनाएं',
      email_placeholder: 'ईमेल पता', password_placeholder: 'पासवर्ड',
      sign_in: 'साइन इन', create_account: 'खाता बनाएं', or: 'या',
      continue_ms: 'Microsoft खाते से जारी रखें'
    },
    fa: {
      brand: 'Microsoft',
      hero_title: 'چه چیزی را جستجو می‌کنید؟',
      search_placeholder: 'جستجو',
      chip_images: 'تصاویر', chip_videos: 'ویدیوها', chip_shopping: 'خرید', chip_maps: 'نقشه‌ها', chip_news: 'اخبار',
      find_visuals: 'جستجوی تصاویر', find_videos: 'جستجوی ویدیو', find_stores: 'جستجوی فروشگاه‌ها', find_places: 'جستجوی مکان‌ها', search_news: 'جستجوی اخبار',
      welcome: 'خوش آمدید',
      auth_sub: 'برای شروع وارد شوید یا حساب بسازید',
      email_placeholder: 'آدرس ایمیل', password_placeholder: 'رمز عبور',
      sign_in: 'ورود', create_account: 'ساخت حساب', or: 'یا',
      continue_ms: 'ادامه با حساب Microsoft'
    }
  };

  var fontMap = {
    en: null,
    es: null,
    fr: null,
    de: null,
    pt: null,
    ja: "'Noto Sans JP', sans-serif",
    zh: "'Noto Sans SC', 'Noto Sans TC', sans-serif",
    ko: "'Noto Sans KR', sans-serif",
    ar: "'Noto Sans Arabic', sans-serif",
    hi: "'Noto Sans Devanagari', sans-serif",
    fa: "'Noto Sans Arabic', sans-serif"
  };

  var currentLang = 'en';

  function t(key) {
    return (translations[currentLang] && translations[currentLang][key]) || translations.en[key] || key;
  }

  function applyLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;

    // Set font for non-Latin scripts
    var font = fontMap[lang];
    if (font) {
      document.documentElement.style.setProperty('--font-text', font);
      document.body.style.fontFamily = font;
    } else {
      document.documentElement.style.setProperty('--font-text', "'Space Grotesk', -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif");
      document.body.style.fontFamily = "'Space Grotesk', -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
    }

    // Set direction for RTL languages
    if (lang === 'ar' || lang === 'fa') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.removeAttribute('dir');
    }

    // Update text content via data-i18n
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = t(key);
      if (val) el.textContent = val;
    });

    // Update placeholders via data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      var val = t(key);
      if (val) el.placeholder = val;
    });

    // Update chip placeholder if one is selected
    if (selectedChip && searchInput) {
      var pm = getPlaceholderMap();
      searchInput.placeholder = pm[selectedChip.getAttribute('data-i18n')] || t('search_placeholder');
    }

    // Update chip dropdown label
    if (chipDropdownLabel) {
      var activeOpt = chipDropdownList && chipDropdownList.querySelector('.chip-dropdown-option.active');
      if (activeOpt) {
        chipDropdownLabel.textContent = activeOpt.textContent;
      } else {
        chipDropdownLabel.textContent = t('chip_images');
      }
    }
  }

  // Initialize with English
  applyLanguage('en');

})();
