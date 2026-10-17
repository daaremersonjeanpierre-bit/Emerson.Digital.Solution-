// ==========================================================================
// SCRIPT PRINCIPAL - EMERSON DIGITAL SOLUTION
// Ce fichier gère toutes les interactions du site.
// ==========================================================================

// On attend que le HTML soit complètement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', () => {

    // ======================================================================
    // 1. MENU MOBILE (Burger)
    // ======================================================================
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Ouvrir / Fermer le menu au clic sur le bouton burger
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // 'toggle' ajoute la classe si elle n'existe pas, et l'enlève si elle existe
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // Fermer le menu automatiquement quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // ======================================================================
    // 2. ANNÉE AUTOMATIQUE DANS LE FOOTER
    // ======================================================================
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        // new Date().getFullYear() récupère l'année actuelle (ex: 2024)
        yearSpan.textContent = new Date().getFullYear();
    }

    // ======================================================================
    // 3. FILTRES DU PORTFOLIO
    // ======================================================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Enlever la classe "active" de tous les boutons
            filterBtns.forEach(b => b.classList.remove('active'));
            // 2. Ajouter la classe "active" au bouton cliqué
            btn.classList.add('active');

            // 3. Récupérer la catégorie du bouton (ex: "web", "logo", ou "all")
            const filterValue = btn.getAttribute('data-filter');

            // 4. Parcourir tous les projets pour les afficher ou les cacher
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.classList.remove('hide'); // Afficher
                } else {
                    item.classList.add('hide');    // Cacher
                }
            });
        });
    });

    // ======================================================================
    // 4. FENÊTRE POPUP (MODAL) POUR LES DÉTAILS DU PORTFOLIO
    // ======================================================================
    const modal = document.getElementById('portfolio-modal');
    const closeModal = document.querySelector('.close-modal');
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');

    // Ouvrir la popup
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // On récupère les infos stockées dans les attributs data-title et data-desc du bouton HTML
            modalTitle.textContent = btn.getAttribute('data-title');
            modalDesc.textContent = btn.getAttribute('data-desc');
            modal.classList.add('active');
        });
    });

    // Fermer la popup avec le bouton "X"
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    // Fermer la popup si on clique en dehors de la boîte blanche
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // ======================================================================
    // 5. FORMULAIRE DE CONTACT VERS WHATSAPP
    // ======================================================================
    const devisForm = document.getElementById('devis-form');

    if (devisForm) {
        devisForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Empêche la page de se recharger

            // Récupération des valeurs saisies
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const service = document.getElementById('service').value;
            const budget = document.getElementById('budget').value.trim();
            const description = document.getElementById('description').value.trim();

            // Numéro de téléphone (sans le +, ni espaces)
            const phone = "50943521045";

            // Construction du message WhatsApp avec des sauts de ligne (\n)
            let message = `Bonjour Emerson Digital Solution,\n\n`;
            message += `*Nom:* ${name}\n`;
            
            if (email !== "") {
                message += `*Email:* ${email}\n`;
            }
            
            message += `*Service:* ${service}\n`;
            
            if (budget !== "") {
                message += `*Budget:* ${budget}\n`;
            }
            
            message += `\n*Description du projet:*\n${description}`;

            // encodeURIComponent transforme le texte en format URL (gère les accents et espaces)
            const messageEncode = encodeURIComponent(message);

            // Création du lien WhatsApp
            const whatsappUrl = `https://wa.me/${phone}?text=${messageEncode}`;

            // Ouverture de WhatsApp dans un nouvel onglet
            window.open(whatsappUrl, '_blank');

            // Optionnel : Réinitialiser le formulaire après l'envoi
            devisForm.reset();
        });
    }

    // ======================================================================
    // 6. ANIMATION D'APPARITION AU DÉFILEMENT (Scroll Reveal)
    // ======================================================================
    // On utilise l'API IntersectionObserver pour détecter quand un élément entre à l'écran
    const observerOptions = {
        threshold: 0.1, // L'élément doit être visible à 10% pour déclencher l'animation
        rootMargin: "0px 0px -50px 0px" 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Quand l'élément est visible, on ajoute la classe "visible"
                entry.target.classList.add('visible');
                // On arrête d'observer cet élément une fois qu'il est apparu
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // On sélectionne toutes les sections et cartes à animer
    const elementsToAnimate = document.querySelectorAll('.section, .card, .value-card, .portfolio-item');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in-element'); // On ajoute la classe de base
        observer.observe(el); // On demande à l'observateur de surveiller cet élément
    });

});

