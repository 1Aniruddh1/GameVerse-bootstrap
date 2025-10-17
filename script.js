// Cart management
        let cart = [];

        // Get elements
        const cartIcon = document.getElementById('cartIcon');
        const cartSidebar = document.getElementById('cartSidebar');
        const cartOverlay = document.getElementById('cartOverlay');
        const cartClose = document.getElementById('cartClose');
        const cartBadge = document.getElementById('cartBadge');
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        const cartFooter = document.getElementById('cartFooter');

        
        function toggleCart() {
            cartSidebar.classList.toggle('active');
            cartOverlay.classList.toggle('active');
        }

        cartIcon.addEventListener('click', toggleCart);
        cartClose.addEventListener('click', toggleCart);
        cartOverlay.addEventListener('click', toggleCart);

        // Update cart display
        function updateCart() {
         
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartBadge.textContent = totalItems;

            // Update cart items
            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="cart-empty">
                        <i class="fas fa-shopping-bag"></i>
                        <p>Your cart is empty</p>
                    </div>
                `;
                cartFooter.style.display = 'none';
            } else {
                cartItems.innerHTML = cart.map((item, index) => `
                    <div class="cart-item">
                        <div class="cart-item-icon">
                            <i class="fas ${item.icon}"></i>
                        </div>
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">${item.price}</div>
                            <div class="cart-item-controls">
                                <button class="cart-btn" onclick="decreaseQuantity(${index})">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <span class="cart-quantity">${item.quantity}</span>
                                <button class="cart-btn" onclick="increaseQuantity(${index})">
                                    <i class="fas fa-plus"></i>
                                </button>
                                <button class="cart-remove" onclick="removeItem(${index})">
                                    <i class="fas fa-trash"></i> Remove
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
                cartFooter.style.display = 'block';
            }

            // Update total
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = `${total.toFixed(2)}`;
        }

        // Add to cart
        function addToCart(name, price, icon) {
            const existingItem = cart.find(item => item.name === name);
            
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    name: name,
                    price: parseFloat(price),
                    icon: icon,
                    quantity: 1
                });
            }
            
            updateCart();
        }

        // Increase quantity
        function increaseQuantity(index) {
            cart[index].quantity++;
            updateCart();
        }

        // Decrease quantity
        function decreaseQuantity(index) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
            updateCart();
        }

        // Remove item
        function removeItem(index) {
            cart.splice(index, 1);
            updateCart();
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Scroll animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-fade').forEach(el => {
            observer.observe(el);
        });

        // Add to cart functionality
        document.querySelectorAll('.btn-buy').forEach(button => {
            button.addEventListener('click', function() {
                const name = this.getAttribute('data-name');
                const price = this.getAttribute('data-price');
                const icon = this.getAttribute('data-icon');
                
                addToCart(name, price, icon);
                
                this.textContent = 'Added!';
                this.style.background = '#27ae60';
                
                setTimeout(() => {
                    this.textContent = 'Add to Cart';
                    this.style.background = '';
                }, 1000);
            });
        });

        // Navbar background change 
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'linear-gradient(135deg, #1e272e 0%, #0c1215 100%)';
            } else {
                navbar.style.background = 'linear-gradient(135deg, var(--dark) 0%, #1e272e 100%)';
            }
        });

        // Checkout button
        document.querySelector('.checkout-btn').addEventListener('click', function() {
            if (cart.length > 0) {
                alert('Thank you for your order! Total: ' + cartTotal.textContent);
                cart = [];
                updateCart();
                toggleCart();
            }
        });