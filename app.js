// ============================================
// PRODUCT DATA (icons instead of emojis)
// ============================================
const products = [
  { id:1, image:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', nameAr:'سماعة بلوتوث لاسلكية', nameEn:'Wireless Bluetooth Headphones', catAr:'إلكترونيات', catEn:'Electronics', price:149, oldPrice:199, badge:'hot', rating:4.8, reviews:234 },
  { id:2, image:'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop', nameAr:'حافظة هاتف أنيقة', nameEn:'Elegant Phone Case', catAr:'إكسسوارات', catEn:'Accessories', price:39, oldPrice:null, badge:'new', rating:4.5, reviews:89 },
  { id:3, image:'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop', nameAr:'لعبة تفاعلية ذكية', nameEn:'Smart Interactive Game', catAr:'ألعاب', catEn:'Games', price:89, oldPrice:119, badge:'sale', rating:4.7, reviews:156 },
  { id:4, image:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop', nameAr:'حقيبة جلدية فاخرة', nameEn:'Luxury Leather Bag', catAr:'حقائب', catEn:'Bags', price:259, oldPrice:null, badge:'new', rating:4.9, reviews:67 },
  { id:5, image:'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=400&fit=crop', nameAr:'دفتر يومي مميز', nameEn:'Premium Daily Notebook', catAr:'قرطاسية', catEn:'Stationery', price:29, oldPrice:45, badge:'sale', rating:4.3, reviews:312 },
  { id:6, image:'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=400&fit=crop', nameAr:'شاحن لاسلكي سريع', nameEn:'Fast Wireless Charger', catAr:'إلكترونيات', catEn:'Electronics', price:79, oldPrice:null, badge:null, rating:4.4, reviews:98 },
  { id:7, image:'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop', nameAr:'عطر شرقي فاخر', nameEn:'Luxury Oriental Perfume', catAr:'عطور', catEn:'Perfumes', price:189, oldPrice:249, badge:'hot', rating:4.9, reviews:445 },
  { id:8, image:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', nameAr:'ساعة ذكية رياضية', nameEn:'Sports Smart Watch', catAr:'إلكترونيات', catEn:'Electronics', price:299, oldPrice:399, badge:'sale', rating:4.6, reviews:178 },
  { id:9, image:'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=400&fit=crop', nameAr:'مكعبات ليغو إبداعية', nameEn:'Creative LEGO Blocks', catAr:'ألعاب', catEn:'Games', price:119, oldPrice:null, badge:'new', rating:4.8, reviews:203 },
  { id:10, image:'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop', nameAr:'مصباح LED ذكي', nameEn:'Smart LED Lamp', catAr:'ديكور', catEn:'Home Décor', price:69, oldPrice:89, badge:'sale', rating:4.2, reviews:134 },
  { id:11, image:'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop', nameAr:'سماعات أذن لاسلكية', nameEn:'Wireless Earbuds', catAr:'إكسسوارات', catEn:'Accessories', price:19, oldPrice:null, badge:null, rating:4.1, reviews:567 },
  { id:12, image:'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=400&fit=crop', nameAr:'كرة ضغط مطاطية', nameEn:'Rubber Stress Ball', catAr:'ألعاب', catEn:'Games', price:15, oldPrice:25, badge:'sale', rating:4.0, reviews:89 }
];

// ============================================
// STATE
// ============================================
let currentLang = 'ar';
let cart = [];
let currentSlide = 0;
let slideInterval;

// ============================================
// RENDER PRODUCTS
// ============================================
function renderProducts() {
  const featured = products.slice(0, 8);
  const newArrivals = products.slice(4);

  document.getElementById('featuredGrid').innerHTML = featured.map(productCard).join('');
  document.getElementById('newArrivalsGrid').innerHTML = newArrivals.map(productCard).join('');
}

function productCard(p) {
  const name = currentLang === 'ar' ? p.nameAr : p.nameEn;
  const cat = currentLang === 'ar' ? p.catAr : p.catEn;
  const currency = currentLang === 'ar' ? 'ر.س' : 'SAR';
  const badgeLabels = {
    new: currentLang === 'ar' ? 'جديد' : 'New',
    sale: currentLang === 'ar' ? 'تخفيض' : 'Sale',
    hot: currentLang === 'ar' ? 'الأكثر مبيعاً' : 'Best Seller'
  };
  const badgeClass = p.badge ? 'badge-' + p.badge : '';

  const fullStars = Math.floor(p.rating);
  const halfStar = p.rating % 1 >= 0.5;
  let starsHtml = '';
  for (let i = 0; i < fullStars; i++) starsHtml += '<i class="fas fa-star"></i>';
  if (halfStar) starsHtml += '<i class="fas fa-star-half-stroke"></i>';
  for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) starsHtml += '<i class="far fa-star"></i>';

  return `
    <div class="product-card">
      <div class="product-image">
        <img src="${p.image}" alt="${name}" loading="lazy" />
        ${p.badge ? '<span class="product-badge ' + badgeClass + '">' + badgeLabels[p.badge] + '</span>' : ''}
        <button class="product-wishlist" onclick="this.classList.toggle('active')"><i class="far fa-heart"></i></button>
      </div>
      <div class="product-info">
        <span class="product-category-tag">${cat}</span>
        <h3 class="product-name">${name}</h3>
        <div class="product-rating">
          <span class="stars">${starsHtml}</span>
          <span class="count">(${p.reviews})</span>
        </div>
        <div class="product-price-row">
          <div class="product-price">
            ${p.price} <span class="currency">${currency}</span>
            ${p.oldPrice ? '<span class="old-price">' + p.oldPrice + ' ' + currency + '</span>' : ''}
          </div>
          <button class="add-cart-btn" onclick="addToCart(${p.id})" title="${currentLang === 'ar' ? 'أضف للسلة' : 'Add to Cart'}">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

// ============================================
// CART
// ============================================
function addToCart(id) {
  const product = products.find(function(p) { return p.id === id; });
  const existing = cart.find(function(c) { return c.id === id; });

  if (existing) {
    existing.qty++;
  } else {
    cart.push(Object.assign({}, product, { qty: 1 }));
  }

  updateCart();
  showToast(currentLang === 'ar'
    ? 'تمت إضافة "' + product.nameAr + '" للسلة'
    : '"' + product.nameEn + '" added to cart'
  );
}

function removeFromCart(id) {
  cart = cart.filter(function(c) { return c.id !== id; });
  updateCart();
}

function changeQty(id, delta) {
  var item = cart.find(function(c) { return c.id === id; });
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }
  updateCart();
}

function updateCart() {
  var count = cart.reduce(function(s, c) { return s + c.qty; }, 0);
  var total = cart.reduce(function(s, c) { return s + c.price * c.qty; }, 0);
  var currency = currentLang === 'ar' ? 'ر.س' : 'SAR';

  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartTotal').innerHTML = total + ' <span>' + currency + '</span>';

  var container = document.getElementById('cartItems');
  var empty = document.getElementById('cartEmpty');

  // Remove existing cart items
  container.querySelectorAll('.cart-item').forEach(function(el) { el.remove(); });

  if (cart.length === 0) {
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';

  cart.forEach(function(item) {
    var name = currentLang === 'ar' ? item.nameAr : item.nameEn;
    var div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML =
      '<div class="cart-item-img"><img src="' + item.image + '" alt="' + name + '" /></div>' +
      '<div class="cart-item-details">' +
        '<h4>' + name + '</h4>' +
        '<span class="cart-item-price">' + item.price + ' ' + currency + '</span>' +
        '<div class="cart-item-qty">' +
          '<button class="qty-btn" onclick="changeQty(' + item.id + ', -1)">&minus;</button>' +
          '<span>' + item.qty + '</span>' +
          '<button class="qty-btn" onclick="changeQty(' + item.id + ', 1)">+</button>' +
        '</div>' +
      '</div>' +
      '<button class="cart-item-remove" onclick="removeFromCart(' + item.id + ')"><i class="fas fa-trash-alt"></i></button>';
    container.appendChild(div);
  });
}

// Cart drawer toggle
document.getElementById('cartBtn').addEventListener('click', function() {
  document.getElementById('cartDrawer').classList.add('active');
  document.getElementById('cartOverlay').classList.add('active');
});

document.getElementById('cartClose').addEventListener('click', closeCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('active');
  document.getElementById('cartOverlay').classList.remove('active');
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showToast(msg) {
  var container = document.getElementById('toastContainer');
  var toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML =
    '<div class="toast-icon"><i class="fas fa-check"></i></div>' +
    '<span class="toast-text">' + msg + '</span>';
  container.appendChild(toast);

  setTimeout(function() {
    toast.classList.add('removing');
    setTimeout(function() { toast.remove(); }, 300);
  }, 2500);
}

// ============================================
// HERO SLIDER
// ============================================
function initSlider() {
  var slides = document.querySelectorAll('.hero-slide');
  var dotsContainer = document.getElementById('heroDots');

  slides.forEach(function(_, i) {
    var dot = document.createElement('button');
    dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
    dot.onclick = function() { goToSlide(i); };
    dotsContainer.appendChild(dot);
  });

  startSlideInterval();
}

function goToSlide(n) {
  var slides = document.querySelectorAll('.hero-slide');
  currentSlide = ((n % slides.length) + slides.length) % slides.length;

  var dir = document.documentElement.dir;
  var offset = dir === 'rtl' ? currentSlide * 100 : -currentSlide * 100;
  document.getElementById('heroSlides').style.transform = 'translateX(' + offset + '%)';

  document.querySelectorAll('.hero-dot').forEach(function(d, i) {
    d.classList.toggle('active', i === currentSlide);
  });
}

function nextSlide() { goToSlide(currentSlide + 1); startSlideInterval(); }
function prevSlide() { goToSlide(currentSlide - 1); startSlideInterval(); }

function startSlideInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(function() { goToSlide(currentSlide + 1); }, 4500);
}

// ============================================
// LANGUAGE TOGGLE
// ============================================
function toggleLang() {
  currentLang = currentLang === 'ar' ? 'en' : 'ar';
  var html = document.documentElement;

  // Disable all transitions during direction change
  html.classList.add('no-transition');

  html.lang = currentLang;
  html.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

  document.getElementById('langToggle').textContent = currentLang === 'ar' ? 'EN' : 'AR';

  // Update all translatable elements
  document.querySelectorAll('[data-ar]').forEach(function(el) {
    var text = currentLang === 'ar' ? el.dataset.ar : el.dataset.en;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return;
    el.textContent = text;
  });

  // Update placeholders
  document.querySelectorAll('[data-placeholder-ar]').forEach(function(el) {
    el.placeholder = currentLang === 'ar' ? el.dataset.placeholderAr : el.dataset.placeholderEn;
  });

  // Re-render products & cart
  renderProducts();
  updateCart();

  // Fix hero arrow icons for direction
  var prevArrow = document.querySelector('.hero-arrow-prev i');
  var nextArrow = document.querySelector('.hero-arrow-next i');
  if (currentLang === 'ar') {
    prevArrow.className = 'fas fa-chevron-right';
    nextArrow.className = 'fas fa-chevron-left';
  } else {
    prevArrow.className = 'fas fa-chevron-left';
    nextArrow.className = 'fas fa-chevron-right';
  }

  // Re-position current slide without animation
  var heroSlides = document.getElementById('heroSlides');
  heroSlides.style.transition = 'none';
  goToSlide(currentSlide);

  // Re-enable transitions after layout settles
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      html.classList.remove('no-transition');
      heroSlides.style.transition = '';
    });
  });
}

// ============================================
// LIVE SEARCH
// ============================================
var searchInput = document.getElementById('searchInput');
var searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', function() {
  var query = this.value.trim().toLowerCase();

  if (!query) {
    searchResults.classList.remove('active');
    return;
  }

  var results = products.filter(function(p) {
    return p.nameAr.toLowerCase().includes(query) ||
      p.nameEn.toLowerCase().includes(query) ||
      p.catAr.toLowerCase().includes(query) ||
      p.catEn.toLowerCase().includes(query);
  });

  if (results.length === 0) {
    var noResults = currentLang === 'ar' ? 'لا توجد نتائج' : 'No results found';
    searchResults.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-light)">' + noResults + '</div>';
  } else {
    var currency = currentLang === 'ar' ? 'ر.س' : 'SAR';
    searchResults.innerHTML = results.map(function(p) {
      var name = currentLang === 'ar' ? p.nameAr : p.nameEn;
      return '<div class="search-result-item" onclick="addToCart(' + p.id + '); searchResults.classList.remove(\'active\'); searchInput.value=\'\';">' +
        '<div class="result-icon"><img src="' + p.image + '" alt="' + name + '" /></div>' +
        '<div class="info">' +
          '<h4>' + name + '</h4>' +
          '<span>' + p.price + ' ' + currency + '</span>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  searchResults.classList.add('active');
});

// Close search results when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.search-box')) {
    searchResults.classList.remove('active');
  }
});

// ============================================
// COUNTDOWN TIMER
// ============================================
function updateCountdown() {
  var now = new Date();
  var end = new Date();
  end.setHours(23, 59, 59, 999);

  var diff = end - now;
  var h = Math.floor(diff / 3600000);
  var m = Math.floor((diff % 3600000) / 60000);
  var s = Math.floor((diff % 60000) / 1000);

  document.getElementById('hours').textContent = String(h).padStart(2, '0');
  document.getElementById('minutes').textContent = String(m).padStart(2, '0');
  document.getElementById('seconds').textContent = String(s).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ============================================
// SCROLL TO TOP
// ============================================
window.addEventListener('scroll', function() {
  document.getElementById('scrollTop').classList.toggle('active', window.scrollY > 400);
});

// ============================================
// MOBILE MENU
// ============================================
document.getElementById('mobileMenuBtn').addEventListener('click', function() {
  document.getElementById('navLinks').classList.toggle('active');
});

// ============================================
// INIT
// ============================================
renderProducts();
initSlider();
