// ==========================================================================
// SCRIPT PRINCIPAL - EMERSON DIGITAL SOLUTION
// Gère les interactions, l'accessibilité et les animations du site.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // ======================================================================
    // 1. ANNÉE AUTOMATIQUE DANS LE FOOTER
    // ======================================================================
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ======================================================================
    // 2. MENU MOBILE (Accessibilité & UX)
    // ======================================================================
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-list a'); // Cible tous les liens, y compris le bouton CTA

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

    // Ouvrir / Fermer au clic sur le bouton burger
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Fermer le menu au clic sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Fermer le menu avec la touche Echap
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                closeMenu();
                menuToggle.focus(); // Remettre le focus sur le bouton
            }
        });

        // Fermer le menu si on clique en dehors
        document.addEventListener('click', (e) => {
            if (!nav.classList.contains('active')) return;
            if (nav.contains(e.target) || menuToggle.contains(e.target)) return;
            closeMenu();
        });

        // Fermer le menu si on redimensionne vers un écran PC
        window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
            if (e.matches) closeMenu();
        });
    }

    // ======================================================================
    // 3. FILTRES DU PORTFOLIO
    // ======================================================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Gérer l'état actif des boutons
                filterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');

                // Filtrer les éléments
                const filterValue = btn.getAttribute('data-filter');
                portfolioItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    if (filterValue === 'all' || filterValue === itemCategory) {
                        item.classList.remove('hide');
                    } else {
                        item.classList.add('hide');
                    }
                });
            });
        });
    }

    // ======================================================================
    // 4. FENÊTRE POPUP (MODAL) POUR LE PORTFOLIO (Accessibilité)
    // ======================================================================
    const modal = document.getElementById('portfolio-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    let lastFocusedElement;

    if (modal && viewDetailsBtns.length > 0) {
        // Ouvrir la modale
        viewDetailsBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (modalTitle && modalDesc) {
                    modalTitle.textContent = btn.getAttribute('data-title') || 'Détails du projet';
                    modalDesc.textContent = btn.getAttribute('data-desc') || 'Aucune description disponible.';
                }
                
                lastFocusedElement = document.activeElement; // Sauvegarder le focus actuel
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Bloquer le scroll arrière-plan
                
                if (closeModalBtn) closeModalBtn.focus(); // Mettre le focus sur le bouton fermer
            });
        });

        // Fonction pour fermer la modale
        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Rétablir le scroll
            if (lastFocusedElement) lastFocusedElement.focus(); // Rétablir le focus
        };

        // Fermer avec le bouton X
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }

        // Fermer en cliquant sur le fond noir (backdrop)
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Fermer avec la touche Echap
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // ======================================================================
    // 5. FORMULAIRE DE CONTACT VERS WHATSAPP
    // ======================================================================
    const devisForm = document.getElementById('devis-form');

    if (devisForm) {
        devisForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const submitBtn = devisForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;

            // Récupération sécurisée des valeurs
            const getVal = (id) => document.getElementById(id)?.value.trim() ?? '';
            const name = getVal('name');
            const email = getVal('email');
            const service = getVal('service');
            const budget = getVal('budget');
            const description = getVal('description');

            // Nettoyage basique pour éviter de casser le formatage WhatsApp (*)
            const sanitize = (str) => str.replace(/[*_~`]/g, '');

            // Construction du message
            let message = `Bonjour Emerson Digital Solution,\n\n`;
            message += `*Nom:* ${sanitize(name)}\n`;
            if (email) message += `*Email:* ${sanitize(email)}\n`;
            message += `*Service:* ${sanitize(service)}\n`;
            if (budget) message += `*Budget:* ${sanitize(budget)}\n`;
            message += `\n*Description du projet:*\n${description}`;

            const phone = "50943521045"; // Numéro sans le +
            const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

            // Feedback visuel sur le bouton
            submitBtn.disabled = true;
            submitBtn.textContent = 'Ouverture de WhatsApp...';

            // Tentative d'ouverture dans un nouvel onglet
            const win = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

            if (!win || win.closed || typeof win.closed === 'undefined') {
                // Si le popup est bloqué (fréquent sur mobile/In-App Browser), on redirige la page actuelle
                window.location.href = whatsappUrl;
            } else {
                // Si ça a marché, on réinitialise le formulaire
                devisForm.reset();
            }

            // Rétablir le bouton après 3 secondes (au cas où l'utilisateur revient)
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }, 3000);
        });
    }

    // ======================================================================
    // 6. ANIMATION D'APPARITION AU DÉFILEMENT (Scroll Reveal)
    // ======================================================================
    // Respecter les préférences de l'utilisateur (réduction des animations)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px" 
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // On arrête d'observer une fois visible
                }
            });
        }, observerOptions);

        // On cible les éléments à animer (on évite les <section> entières pour ne pas avoir de grands blocs vides)
        const elementsToAnimate = document.querySelectorAll('.card, .home-service-card, .step-card, .value-card, .portfolio-card, .pricing-card');

        elementsToAnimate.forEach(el => {
            el.classList.add('fade-in-element');
            
            // Si l'élément est déjà visible au chargement, on l'affiche immédiatement
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('visible');
            } else {
                observer.observe(el);
            }
        });
    } else {
        // Fallback si IntersectionObserver n'est pas supporté ou si animations désactivées
        document.querySelectorAll('.fade-in-element').forEach(el => el.classList.add('visible'));
    }

});