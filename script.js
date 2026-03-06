document.addEventListener('DOMContentLoaded', () => {
    // Preloader Logic
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }
    }, 1500);
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'rgba(253, 251, 247, 0.98)';
                navLinks.style.padding = '2rem';
                navLinks.style.boxShadow = '0 10px 30px rgba(61, 35, 20, 0.08)';
            }
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // Optional: stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe step cards, product cards, testimonials
    document.querySelectorAll('.step-card, .product-card, .testimonial-card, .section-title, .section-desc').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
        observer.observe(el);
    });

    // Add dynamic CSS class for observing
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // --- Particles Canvas Logic ---
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray;

        // Set canvas to full window size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        });

        // Particle Object
        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }
            // Draw particle
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            // Update particle position
            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }
                // Move particle
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        // Initialize particle array
        function initParticles() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 15000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 3) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 0.4) - 0.2;
                let directionY = (Math.random() * 0.4) - 0.2;
                // Gold / Chocolate tones
                let colors = ['rgba(200, 154, 88, 0.5)', 'rgba(74, 40, 16, 0.4)', 'rgba(253, 252, 249, 0.6)'];
                let color = colors[Math.floor(Math.random() * colors.length)];

                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        // Animation loop
        function animateParticles() {
            requestAnimationFrame(animateParticles);
            ctx.clearRect(0, 0, innerWidth, innerHeight);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
        }

        initParticles();
        animateParticles();
    }

    // --- Parallax Effect for Showcase Image ---
    const showcaseImage = document.getElementById('showcase-parallax');
    if (showcaseImage) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                // Move the image down slowly as user scrolls down for parallax depth
                showcaseImage.style.transform = `translateY(${scrollY * 0.15}px)`;
            }
        });
    }

    // --- Shopping Cart Logic ---
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('close-cart');
    const floatingCart = document.getElementById('floating-cart');
    const cartBadge = document.getElementById('cart-badge');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    // REPLACE WITH YOUR ACTUAL WHATSAPP NUMBER (including country code, no + or spaces)
    const WHATSAPP_NUMBER = "573223909876";
    const DELIVERY_FEE = 8000;
    const DISCOUNT_PER_ITEM = 1000;

    let cart = JSON.parse(localStorage.getItem('chocotala_cart')) || [];

    function saveCart() {
        localStorage.setItem('chocotala_cart', JSON.stringify(cart));
        renderCart();
    }

    function toggleCart() {
        if (cartSidebar && cartOverlay) {
            cartSidebar.classList.toggle('open');
            cartOverlay.classList.toggle('active');
        }
    }

    if (floatingCart) floatingCart.addEventListener('click', toggleCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', toggleCart);
    if (cartOverlay) cartOverlay.addEventListener('click', toggleCart);

    function addToCart(id, name, price, img) {
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, img, quantity: 1 });
        }

        saveCart();

        if (cartSidebar && !cartSidebar.classList.contains('open')) {
            toggleCart();
        }
    }

    function updateQuantity(id, delta) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                cart = cart.filter(cartItem => cartItem.id !== id);
            }
            saveCart();
        }
    }

    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        saveCart();
    }

    function renderCart() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartBadge) {
            cartBadge.textContent = totalItems;
            cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
        }

        if (!cartItemsContainer) return;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Tu carrito está vacío 😔<br><br>¡Anímate a probar nuestra magia!</div>';
            if (document.getElementById('cart-subtotal-price')) document.getElementById('cart-subtotal-price').textContent = '$0';
            const discountRow = document.getElementById('cart-discount-row');
            if (discountRow) discountRow.style.display = 'none';
            cartTotalPrice.textContent = '$0';
            if (checkoutBtn) {
                checkoutBtn.style.opacity = '0.5';
                checkoutBtn.style.pointerEvents = 'none';
            }
            return;
        }

        if (checkoutBtn) {
            checkoutBtn.style.opacity = '1';
            checkoutBtn.style.pointerEvents = 'auto';
        }

        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;

            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <div class="cart-item-row-top">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <button class="remove-item" onclick="removeFromCart('${item.id}')"><i class="fas fa-trash-alt"></i></button>
                    </div>
                    <div class="cart-item-row-bottom">
                        <div class="cart-item-price">$${(item.price * item.quantity).toLocaleString('es-CO')}</div>
                        <div class="item-quantity-controls">
                            <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)"><i class="fas fa-minus"></i></button>
                            <span class="cart-item-qty">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)"><i class="fas fa-plus"></i></button>
                        </div>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // Calculate delivery fee and discounts
        const totalItemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);
        const currentDeliveryFee = totalItemsInCart >= 4 ? 0 : DELIVERY_FEE;
        const totalDiscount = totalItemsInCart >= 6 ? (totalItemsInCart * DISCOUNT_PER_ITEM) : 0;

        // Update promo banner text based on eligibility
        const promoBanner = document.getElementById('cart-promo-banner');
        if (promoBanner) {
            if (totalItemsInCart >= 6) {
                promoBanner.innerHTML = `✨ <strong>Domicilio GRATIS</strong> + Descuento de $${DISCOUNT_PER_ITEM.toLocaleString('es-CO')} c/u ✨`;
                promoBanner.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
                promoBanner.style.borderColor = '#4CAF50';
                promoBanner.style.color = '#2E7D32';
            } else if (totalItemsInCart >= 4) {
                const missing = 6 - totalItemsInCart;
                promoBanner.innerHTML = `✨ Domicilio GRATIS ✨<br>¡Agrega ${missing} más y obtén <strong>$${DISCOUNT_PER_ITEM.toLocaleString('es-CO')} de dcto.</strong> en cada una!`;
                promoBanner.style.backgroundColor = 'rgba(200, 154, 88, 0.1)';
                promoBanner.style.borderColor = 'var(--color-gold)';
                promoBanner.style.color = 'var(--color-chocolate)';
            } else {
                const missing = 4 - totalItemsInCart;
                promoBanner.innerHTML = `Agrega <strong>${missing}</strong> chocobomba${missing > 1 ? 's' : ''} más para <strong>domicilio GRATIS</strong> 🛵`;
                promoBanner.style.backgroundColor = 'rgba(200, 154, 88, 0.1)';
                promoBanner.style.borderColor = 'var(--color-gold)';
                promoBanner.style.color = 'var(--color-chocolate)';
            }
        }

        const finalTotal = total - totalDiscount + currentDeliveryFee;

        if (document.getElementById('cart-subtotal-price')) document.getElementById('cart-subtotal-price').textContent = `$${total.toLocaleString('es-CO')}`;

        // Update UI for discount price
        const discountRowEl = document.getElementById('cart-discount-row');
        const discountPriceEl = document.getElementById('cart-discount-price');
        if (discountRowEl && discountPriceEl) {
            if (totalDiscount > 0) {
                discountPriceEl.textContent = `-$${totalDiscount.toLocaleString('es-CO')}`;
                discountRowEl.style.display = 'flex';
            } else {
                discountRowEl.style.display = 'none';
            }
        }

        // Update UI for delivery price
        const deliveryPriceEl = document.getElementById('cart-delivery-price');
        if (deliveryPriceEl) {
            if (currentDeliveryFee === 0) {
                deliveryPriceEl.innerHTML = '<span style="color: #4CAF50; font-weight: bold;">$0 (Gratis)</span>';
            } else {
                deliveryPriceEl.textContent = `$${DELIVERY_FEE.toLocaleString('es-CO')}`;
            }
        }

        if (cartTotalPrice) cartTotalPrice.textContent = `$${finalTotal.toLocaleString('es-CO')}`;
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const btn = e.target.closest('.add-to-cart'); // Handles icon click inside button
            const id = btn.getAttribute('data-id');
            const name = btn.getAttribute('data-name');
            const price = parseFloat(btn.getAttribute('data-price'));
            const img = btn.getAttribute('data-img');
            addToCart(id, name, price, img);
        });
    });

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) return;

            let message = "¡Hola Chocotala! 🍫 Quiero hacer el siguiente pedido:%0A%0A";
            let total = 0;

            cart.forEach(item => {
                const subtotal = item.price * item.quantity;
                total += subtotal;
                message += `🛒 ${item.quantity}x ${item.name} ($${subtotal.toLocaleString('es-CO')})%0A`;
            });

            const totalItemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);
            const finalDeliveryFee = totalItemsInCart >= 4 ? 0 : DELIVERY_FEE;
            const finalDiscount = totalItemsInCart >= 6 ? (totalItemsInCart * DISCOUNT_PER_ITEM) : 0;
            const totalWithDelivery = total - finalDiscount + finalDeliveryFee;

            message += `%0A💵 Subtotal: $${total.toLocaleString('es-CO')}%0A`;
            if (finalDiscount > 0) {
                message += `🎁 Descuento por Volumen: -$${finalDiscount.toLocaleString('es-CO')}%0A`;
            }
            message += `🛵 Domicilio: ${finalDeliveryFee === 0 ? '*$0 (Gratis por promo)*' : '$' + DELIVERY_FEE.toLocaleString('es-CO')}%0A`;
            message += `💰 *TOTAL A PAGAR: $${totalWithDelivery.toLocaleString('es-CO')}*%0A%0A`;
            message += "Por favor, confírmame el método de pago y envío. ¡Gracias!";

            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    window.updateQuantity = updateQuantity;
    window.removeFromCart = removeFromCart;

    renderCart();

});
