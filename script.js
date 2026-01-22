document.addEventListener('DOMContentLoaded', () => {
    const dictionary = {
        ar: {
            lnk_h: "الرئيسية", lnk_d: "صمم ساعتك", h_t: "سيمفونية الوقت والريزن", 
            h_d: "قطع يدوية فريدة تُصمم بلمستك الخاصة", h_c: "ابدأ رحلة الإبداع",
            s_t: "استوديو التصميم الخاص بك", l_c: "١. اختيار ألوان الريزن (حتى ٤):",
            l_m: "٢. شكل العلامات:", l_a: "٣. الإضافات الفنية:",
            l_me: "٤. لون الإطار، العقارب، والعلامات:", l_tot: "الإجمالي:", l_sh: "بيانات الشحن والتوصيل",
            l_p: "وسائل الدفع الآمنة:", b_o: "تأكيد الطلب وشحن ساعتك",
            marks: ["بدون", "خطوط", "إنجليزية", "لاتينية"],
            addons: ["رقائق ذهب (+$15)", "رقائق فضة (+$15)", "ورد مجفف (+$20)", "أحجار (+$25)", "صدف (+$10)", "لؤلؤ (+$12)"],
            placeholders: ["الاسم الكامل", "الدولة", "المدينة / الحي", "رقم الهاتف", "العنوان بالتفصيل (الشارع، البناية...)"],
            copyright: "&copy; 2025 LUX RESIN. جميع الحقوق محفوظة."
        },
        en: {
            lnk_h: "Home", lnk_d: "Design Studio", h_t: "Resin Time Symphony", 
            h_d: "Unique handmade pieces by you", h_c: "Start Creating",
            s_t: "Your Design Studio", l_c: "1. Select Colors (Up to 4):",
            l_m: "2. Marks Style:", l_a: "3. Artistic Add-ons:",
            l_me: "4. Frame, Hands, & Marks:", l_tot: "Total:", l_sh: "Shipping Info",
            l_p: "Secure Payments:", b_o: "Confirm & Ship",
            marks: ["None", "Lines", "English", "Roman"],
            addons: ["Gold Flakes (+$15)", "Silver Flakes (+$15)", "Flowers (+$20)", "Stones (+$25)", "Shells (+$10)", "Pearl (+$12)"],
            placeholders: ["Full Name", "Country", "City / District", "Phone Number", "Detailed Address..."],
            copyright: "&copy; 2025 LUX RESIN. All rights reserved."
        }
    };

    let currentLang = 'ar';
    let selectedColors = [];
    let basePrice = 150;
    let currentMetalColor = '#d4af37';

    const resinColors = [
        '#000000', '#FFFFFF', '#d4af37', '#c0c0c0', '#B76E79', '#E5B3BB', '#001f3f', '#0074D9', 
        '#7FDBFF', '#39CCCC', '#003366', '#483d8b', '#01FF70', '#2ECC40', '#004d40', '#3D9970', 
        '#2f4f4f', '#556B2F', '#B10DC9', '#F012BE', '#85144b', '#4b0082', '#702963', '#FF69B4',
        '#FFDC00', '#FF851B', '#FF4136', '#8B4513', '#D2691E', '#A0522D'
    ];

    const metalTypes = { gold: '#d4af37', silver: '#c0c0c0', black: '#000', white: '#fff' };

    window.toggleLang = function() {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        const h = document.getElementById('main-html');
        h.lang = currentLang; h.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
        
        const t = dictionary[currentLang];
        document.getElementById('lnk-home').innerText = t.lnk_h;
        document.getElementById('lnk-design').innerText = t.lnk_d;
        document.getElementById('footer-lnk-home').innerText = t.lnk_h;
        document.getElementById('footer-lnk-design').innerText = t.lnk_d;
        document.getElementById('hero-title').innerText = t.h_t;
        document.getElementById('hero-desc').innerText = t.h_d;
        document.getElementById('hero-cta').innerText = t.h_c;
        document.getElementById('lbl-studio-title').innerText = t.s_t;
        document.getElementById('lbl-colors').innerText = t.l_c;
        document.getElementById('lbl-marks').innerText = t.l_m;
        document.getElementById('lbl-addons').innerText = t.l_a;
        document.getElementById('lbl-metal').innerText = t.l_me;
        document.getElementById('lbl-total').innerText = t.l_tot;
        document.getElementById('lbl-ship-h').innerText = t.l_sh;
        document.getElementById('lbl-pay-p').innerText = t.l_p;
        document.getElementById('btn-order').innerText = t.b_o;
        document.getElementById('lang-btn').innerText = currentLang === 'ar' ? 'EN' : 'AR';
        document.getElementById('copyright').innerHTML = t.copyright;
        
        const p = t.placeholders;
        document.getElementById('in-name').placeholder = p[0];
        document.getElementById('in-country').placeholder = p[1];
        document.getElementById('in-city').placeholder = p[2];
        document.getElementById('in-phone').placeholder = p[3];
        document.getElementById('in-address-detail').placeholder = p[4];

        renderDynamicOptions();
    }

    function renderDynamicOptions() {
        const marksDiv = document.getElementById('marks-options');
        marksDiv.innerHTML = '';
        const mTypes = ['none', 'lines', 'english', 'roman'];
        dictionary[currentLang].marks.forEach((text, i) => {
            const btn = document.createElement('button');
            btn.className = 'shape-btn interactive';
            btn.dataset.type = mTypes[i];
            btn.innerText = text;
            btn.onclick = () => setMarks(btn);
            marksDiv.appendChild(btn);
        });

        const addonsDiv = document.getElementById('addons-options');
        addonsDiv.innerHTML = '';
        const prices = [15, 15, 20, 25, 10, 12];
        dictionary[currentLang].addons.forEach((text, i) => {
            const label = document.createElement('label');
            label.className = 'interactive';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.onchange = () => updatePrice(prices[i], checkbox);
            label.appendChild(checkbox);
            label.append(` ${text}`);
            addonsDiv.appendChild(label);
        });
    }

    function setupPalette() {
        const pGrid = document.getElementById('palette-grid');
        resinColors.forEach(col => {
            let div = document.createElement('div');
            div.className = 'c-option interactive'; div.style.background = col;
            div.onclick = () => {
                if(selectedColors.includes(col)) {
                    selectedColors = selectedColors.filter(c => c !== col);
                    div.classList.remove('active');
                } else if(selectedColors.length < 4) {
                    selectedColors.push(col);
                    div.classList.add('active');
                }
                updateWatchResin();
            };
            pGrid.appendChild(div);
        });
    }

    function setupMetalSelector() {
        const metalDiv = document.getElementById('metal-options');
        Object.keys(metalTypes).forEach(metal => {
            const div = document.createElement('div');
            div.className = `m-circle ${metal} interactive`;
            div.dataset.metal = metal;
            div.onclick = () => setMetal(metal);
            metalDiv.appendChild(div);
        });
    }

    function updateWatchResin() {
        const layer = document.getElementById('resin-layer');
        layer.style.background = selectedColors.length > 0 ? `radial-gradient(circle, ${selectedColors.join(',')})` : '#111';
    }

    window.setMarks = function(button) {
        const type = button.dataset.type;
        const layer = document.getElementById('marks-layer');
        layer.innerHTML = '';

        document.querySelectorAll('#marks-options .shape-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        if (type === 'none') return;

        const radius = layer.offsetWidth / 2 - 25;
        const roman = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];
        
        for (let i = 1; i <= 12; i++) {
            const angle = (i - 3) * 30;
            const rad = angle * (Math.PI / 180);
            const x = radius * Math.cos(rad);
            const y = radius * Math.sin(rad);

            const mark = document.createElement('div');
            mark.classList.add('mark');
            mark.style.color = currentMetalColor;
            
            if (type === 'lines') {
                mark.classList.add('line');
                mark.style.backgroundColor = currentMetalColor;
                mark.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle + 90}deg)`;
            } else {
                mark.classList.add('number');
                mark.innerText = (type === 'roman') ? roman[i % 12] : i;
                mark.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle + 90}deg)`;
            }
            layer.appendChild(mark);
        }
    }

    window.setMetal = function(metalType) {
        currentMetalColor = metalTypes[metalType];
        document.getElementById('frame-layer').style.borderColor = currentMetalColor;
        document.getElementById('hands-layer').style.background = currentMetalColor;
        
        document.querySelectorAll('.mark').forEach(mark => {
            mark.style.color = currentMetalColor;
            if(mark.classList.contains('line')) mark.style.backgroundColor = currentMetalColor;
        });

        document.querySelectorAll('#metal-options .m-circle').forEach(c => c.classList.remove('active'));
        document.querySelector(`#metal-options .m-circle[data-metal="${metalType}"]`).classList.add('active');
    }

    window.updatePrice = function(amount, checkbox) {
        basePrice = checkbox.checked ? basePrice + amount : basePrice - amount;
        document.getElementById('final-price').innerText = basePrice;
    }

    const cursor = document.querySelector('.custom-cursor');
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', e => {
            cursor.style.top = e.clientY + 'px';
            cursor.style.left = e.clientX + 'px';
        });
        document.querySelectorAll('.interactive').forEach(item => {
            item.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            item.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
    } else {
        cursor.style.display = 'none';
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animated-section').forEach(section => observer.observe(section));

    // --- Initial Setup ---
    setupPalette();
    setupMetalSelector();
    renderDynamicOptions();
    setMetal('gold');
}); // <-- *** القوس الذي تم إصلاحه ***
