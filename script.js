// モバイルナビゲーション
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // ナビゲーションリンクをクリックしたらメニューを閉じる
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
});

// スクロールアニメーション
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

// ページロード時に実行
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', function() {
    // アニメーション対象の要素にクラスを追加
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.classList.add('reveal');
    });
    
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.classList.add('reveal');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.classList.add('reveal');
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // 初回実行
    revealOnScroll();
});

// スムーススクロール（より滑らかに）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ヘッダーの背景透明度をスクロールに応じて変更
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > 100) {
        header.style.backgroundColor = 'rgba(253, 247, 239, 0.98)';
    } else {
        header.style.backgroundColor = 'rgba(253, 247, 239, 0.95)';
    }
});

// 画像の遅延読み込み（パフォーマンス向上）
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// パララックス効果（軽微な効果でパフォーマンス重視）
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-bg img');
    
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// フォームバリデーション（将来的な拡張用）
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// タイピングアニメーション（ヒーローセクション用）
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// アクセシビリティの向上
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// パフォーマンス最適化：デバウンス関数
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        
        if (callNow) func.apply(context, args);
    };
}

// プロジェクトカードのアニメーション
function revealProjects() {
    const projectCards = document.querySelectorAll('.reveal-project');
    
    projectCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight - 100) {
            setTimeout(() => {
                card.classList.add('active');
            }, index * 150); // 順次表示効果
        }
    });
}

// プロジェクトカードのホバーエフェクト（モバイル対応）
function addProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // タッチデバイス対応
        card.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 300);
        });
        
        // プロジェクトボタンクリック効果
        const button = card.querySelector('.project-button');
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // リップルエフェクト
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                ripple.style.left = e.offsetX + 'px';
                ripple.style.top = e.offsetY + 'px';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
                
                // 将来的にページ遷移やモーダル表示を実装
                console.log('プロジェクト詳細:', card.dataset.project);
            });
        }
    });
}

// リップルエフェクト用CSS（動的追加）
function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .project-button {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            background-color: rgba(255, 255, 255, 0.6);
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .touch-active .project-overlay {
            opacity: 1;
        }
        
        .touch-active {
            transform: translateY(-10px) scale(1.01);
        }
    `;
    document.head.appendChild(style);
}

// デバウンスを適用したスクロールイベント（モバイルのみ）
const debouncedReveal = debounce(revealOnScroll, 10);
const debouncedRevealProjects = debounce(revealProjects, 10);

// モバイルでのみスクロールアニメーションを有効化
function initScrollAnimations() {
    if (window.innerWidth <= 768) {
        window.addEventListener('scroll', function() {
            debouncedReveal();
            debouncedRevealProjects();
        });
    }
}

// ウィンドウリサイズ時にイベントリスナーを再評価
window.addEventListener('resize', debounce(initScrollAnimations, 250));

// 初期化
window.addEventListener('load', function() {
    addRippleStyles();
    addProjectInteractions();
    initScrollAnimations(); // スクロールアニメーション初期化
    
    // モバイルでのみ初回アニメーションチェック
    if (window.innerWidth <= 768) {
        revealProjects();
        revealOnScroll();
    }
});

// 会社概要モーダル機能
function openCompanyModal() {
    const modal = document.getElementById('companyModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeCompanyModal() {
    const modal = document.getElementById('companyModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// モーダル外クリックで閉じる機能
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('companyModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeCompanyModal();
            }
        });
    }
});

// ESCキーでモーダルを閉じる機能を既存のキーダウンイベントに追加
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
        
        // モーダルも閉じる
        closeCompanyModal();
    }
});