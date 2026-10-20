// ==========================================================================
// SCRIPT PRINCIPAL - EMERSON DIGITAL SOLUTION
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. ANNÉE AUTOMATIQUE DANS LE FOOTER
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. MENU MOBILE
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-list a');

    const openMenu = () => {
        if (!nav || !menuToggle) return;
        nav.classList.add('active');
        menuToggle.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute('aria-label', 'Fermer le menu');
    };

    const closeMenu = () => {
        if (!nav || !menuToggle) return;
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
    };

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            if (nav.classList.contains('active')) { closeMenu(); } else { openMenu(); }
        });

        navLinks.forEach(link => link.addEventListener('click', closeMenu));

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                closeMenu();
                menuToggle.focus();
            }
        });

        document.addEventListener('click', (e) => {
            if (!nav.classList.contains('active')) return;
            if (nav.contains(e.target) || menuToggle.contains(e.target)) return;
            closeMenu();
        });

        window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
            if (e.matches) closeMenu();
        });
    }

    // 3. FORMULAIRE DE CONTACT VERS WHATSAPP
    const devisForm = document.getElementById('devis-form');

    if (devisForm) {
        devisForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const submitBtn = devisForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;

            const getVal = (id) => document.getElementById(id)?.value.trim() ?? '';
            const name = getVal('name');
            const email = getVal('email');
            const service = getVal('service');
            const budget = getVal('budget');
            const description = getVal('description');

            const sanitize = (str) => str.replace(/[*_~`]/g, '');

            let message = `Bonjour Emerson Digital Solution,\n\n`;
            message += `*Nom:* ${sanitize(name)}\n`;
            if (email) message += `*Email:* ${sanitize(email)}\n`;
            message += `*Service:* ${sanitize(service)}\n`;
            if (budget) message += `*Budget:* ${sanitize(budget)}\n`;
            message += `\n*Description du projet:*\n${description}`;

            const phone = "50943521045";
            const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

            submitBtn.disabled = true;
            submitBtn.textContent = 'Ouverture de WhatsApp...';

            const win = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

            if (!win || win.closed || typeof win.closed === 'undefined') {
                window.location.href = whatsappUrl;
            } else {
                devisForm.reset();
            }

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }, 3000);
        });
    }
});
