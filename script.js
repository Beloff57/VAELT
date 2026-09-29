/* =========================================================
   VÆLT — PERFORMANCE NUTRITION
   Premium Interaction System
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;

    const pageLoader =
        document.querySelector(".page-loader");

    const siteHeader =
        document.querySelector(".site-header");


    /* =====================================================
       NAVIGATION
    ===================================================== */

    const mobileMenuTrigger =
        document.querySelector(".mobile-menu-trigger");

    const mobileMenu =
        document.querySelector(".mobile-menu");

    const mobileMenuLinks =
        document.querySelectorAll(".mobile-menu a");


    /* =====================================================
       SEARCH
    ===================================================== */

    const searchTrigger =
        document.querySelector(".search-trigger");

    const searchOverlay =
        document.querySelector(".search-overlay");

    const searchClose =
        document.querySelector(".search-close");

    const searchInput =
        document.querySelector(".search-overlay input");


    /* =====================================================
       CART
    ===================================================== */

    const cartTrigger =
        document.querySelector(".cart-trigger");

    const cartDrawer =
        document.querySelector(".cart-drawer");

    const cartClose =
        document.querySelector(".cart-close");

    const pageOverlay =
        document.querySelector(".page-overlay");

    const cartCount =
        document.querySelector(".cart-count");

    const cartHeaderCount =
        document.querySelector(".cart-header-count");

    const cartItemsContainer =
        document.querySelector(".cart-items");

    const cartEmpty =
        document.querySelector(".cart-empty");

    const cartTotal =
        document.querySelector(".cart-total strong");

    const cartFooter =
        document.querySelector(".cart-footer");

    const checkoutButton =
        document.querySelector(".checkout-button");



    /* =====================================================
       PAGE LOADER
    ===================================================== */

    const hideLoader = () => {

        if (!pageLoader) return;

        pageLoader.classList.add("hidden");

        document.body.classList.add("page-ready");

        setTimeout(() => {

            pageLoader.style.display = "none";

        }, 900);

    };


    window.addEventListener("load", () => {

        setTimeout(() => {

            hideLoader();

        }, 500);

    });


    /* Safety fallback */

    setTimeout(() => {

        hideLoader();

    }, 3000);


    /* =====================================================
   ANNOUNCEMENT MARQUEE
===================================================== */

const announcementBar =
    document.querySelector(".announcement-bar");

const announcementTrack =
    document.querySelector(".announcement-track");

const announcementGroup =
    document.querySelector(".announcement-group");


if (
    announcementBar &&
    announcementTrack &&
    announcementGroup
) {

    let marqueePosition = 0;
    let marqueeWidth = 0;
    let marqueeSpeed = 0.65;
    let marqueeAnimationFrame;


    /* ---------------------------------------------
       BUILD MARQUEE
    --------------------------------------------- */

    const buildMarquee = () => {

        cancelAnimationFrame(
            marqueeAnimationFrame
        );


        /* Remove generated clones */

        announcementTrack
            .querySelectorAll(
                ".announcement-group[data-clone]"
            )
            .forEach(clone => {

                clone.remove();

            });


        /*
         * Reset original position
         */

        announcementTrack.style.transform =
            "translate3d(0, 0, 0)";


        marqueePosition = 0;


        /*
         * Measure original group
         */

        marqueeWidth =
            announcementGroup.getBoundingClientRect().width;


        if (!marqueeWidth) return;


        /*
         * Create enough copies to completely
         * cover the viewport.
         *
         * We intentionally create one extra
         * group so there can never be an empty
         * area during the animation.
         */

        const requiredWidth =
            announcementBar.clientWidth +
            marqueeWidth;


        while (
            announcementTrack.scrollWidth <
            requiredWidth
        ) {

            const clone =
                announcementGroup.cloneNode(true);


            clone.dataset.clone =
                "true";


            announcementTrack.appendChild(
                clone
            );

        }


        /*
         * Start animation
         */

        animateMarquee();

    };


    /* ---------------------------------------------
       ANIMATION
    --------------------------------------------- */

    const animateMarquee = () => {

        marqueePosition -= marqueeSpeed;


        /*
         * Once ONE complete group has moved
         * away, move back by exactly that width.
         *
         * Because the next group is identical,
         * the reset is completely invisible.
         */

        if (
            Math.abs(marqueePosition) >=
            marqueeWidth
        ) {

            marqueePosition +=
                marqueeWidth;

        }


        announcementTrack.style.transform =
            `translate3d(${marqueePosition}px, 0, 0)`;


        marqueeAnimationFrame =
            requestAnimationFrame(
                animateMarquee
            );

    };


    /* ---------------------------------------------
       RESIZE
    --------------------------------------------- */

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(resizeTimer);


            resizeTimer =
                setTimeout(() => {

                    buildMarquee();

                }, 150);

        }
    );


    /*
     * Build after fonts/images/layout are ready.
     */

    if (document.fonts) {

        document.fonts.ready.then(() => {

            buildMarquee();

        });

    } else {

        buildMarquee();

    }

}



    /* =====================================================
       HEADER — SCROLL
    ===================================================== */

    const handleHeaderScroll = () => {

        if (!siteHeader) return;

        if (window.scrollY > 40) {

            siteHeader.classList.add("scrolled");

        } else {

            siteHeader.classList.remove("scrolled");

        }

    };


    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );

    handleHeaderScroll();



    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const closeMobileMenu = () => {

        if (!mobileMenuTrigger || !mobileMenu) return;

        mobileMenuTrigger.classList.remove("active");

        mobileMenuTrigger.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileMenu.classList.remove("active");

    };


    if (mobileMenuTrigger && mobileMenu) {

        mobileMenuTrigger.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileMenu.classList.contains("active");


                if (isOpen) {

                    closeMobileMenu();

                } else {

                    mobileMenuTrigger.classList.add(
                        "active"
                    );

                    mobileMenuTrigger.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                    mobileMenu.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    mobileMenuLinks.forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });



    /* =====================================================
       SEARCH
    ===================================================== */

    const openSearch = () => {

        if (!searchOverlay) return;

        searchOverlay.classList.add("active");

        body.classList.add("no-scroll");


        setTimeout(() => {

            searchInput?.focus();

        }, 350);

    };


    const closeSearch = () => {

        if (!searchOverlay) return;

        searchOverlay.classList.remove("active");

        body.classList.remove("no-scroll");

    };


    searchTrigger?.addEventListener(
        "click",
        openSearch
    );


    searchClose?.addEventListener(
        "click",
        closeSearch
    );


    if (searchOverlay) {

        searchOverlay.addEventListener(
            "click",
            event => {

                if (
                    event.target === searchOverlay
                ) {

                    closeSearch();

                }

            }
        );

    }



    /* =====================================================
       CART SYSTEM
    ===================================================== */

    let cart = [];


    /* =====================================================
       PRICE FORMAT
    ===================================================== */

    const formatPrice = price => {

        return `€${price.toFixed(2)}`;

    };



    /* =====================================================
       CART TOTALS
    ===================================================== */

    const getCartTotals = () => {

        let totalItems = 0;
        let totalPrice = 0;


        cart.forEach(item => {

            totalItems += item.quantity;

            totalPrice +=
                item.price * item.quantity;

        });


        return {
            totalItems,
            totalPrice
        };

    };



    /* =====================================================
       RENDER CART
    ===================================================== */

    const renderCart = () => {

        if (!cartItemsContainer) return;


        /* Clear current items */

        cartItemsContainer.innerHTML = "";


        /* Empty cart */

        if (cart.length === 0) {

            if (cartEmpty) {

                cartEmpty.classList.remove(
                    "is-hidden"
                );

            }

        } else {

            if (cartEmpty) {

                cartEmpty.classList.add(
                    "is-hidden"
                );

            }

        }


        /* Create products */

        cart.forEach(item => {

            const itemElement =
                document.createElement("div");


            itemElement.className =
                "cart-item";


            itemElement.dataset.id =
                item.id;


            itemElement.innerHTML = `

                <div class="cart-item-image">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                </div>


                <div class="cart-item-info">

                    <div class="cart-item-top">

                        <div>

                            <h3>
                                ${item.name}
                            </h3>

                            <p>
                                ${item.variant}
                            </p>

                        </div>


                        <button
                            type="button"
                            class="cart-item-remove"
                            data-id="${item.id}"
                            aria-label="Remove ${item.name}"
                        >
                            ×
                        </button>

                    </div>


                    <div class="cart-item-bottom">

                        <div class="quantity-control">

                            <button
                                type="button"
                                class="quantity-minus"
                                data-id="${item.id}"
                                aria-label="Decrease quantity"
                            >
                                −
                            </button>


                            <span class="quantity-value">
                                ${item.quantity}
                            </span>


                            <button
                                type="button"
                                class="quantity-plus"
                                data-id="${item.id}"
                                aria-label="Increase quantity"
                            >
                                +
                            </button>

                        </div>


                        <strong class="cart-item-price">
                            ${formatPrice(
                                item.price *
                                item.quantity
                            )}
                        </strong>

                    </div>

                </div>

            `;


            cartItemsContainer.appendChild(
                itemElement
            );

        });


        /* =================================================
           UPDATE TOTALS
        ================================================= */

        const {
            totalItems,
            totalPrice
        } = getCartTotals();


        if (cartCount) {

            cartCount.textContent =
                totalItems;

        }


        if (cartHeaderCount) {

            cartHeaderCount.textContent =
                `(${totalItems})`;

        }


        if (cartTotal) {

            cartTotal.textContent =
                formatPrice(totalPrice);

        }


        /* =================================================
           CART FOOTER
        ================================================= */

        if (cartFooter) {

            if (cart.length === 0) {

                cartFooter.classList.remove(
                    "has-items"
                );

            } else {

                cartFooter.classList.add(
                    "has-items"
                );

            }

        }

    };



    /* =====================================================
       CHANGE QUANTITY
    ===================================================== */

    const changeQuantity = (
        id,
        amount
    ) => {

        const item =
            cart.find(
                product =>
                    product.id === id
            );


        if (!item) return;


        item.quantity += amount;


        /* Remove if quantity reaches zero */

        if (item.quantity <= 0) {

            cart =
                cart.filter(
                    product =>
                        product.id !== id
                );

        }


        /* IMPORTANT:
           Render immediately.
        */

        renderCart();

    };



    /* =====================================================
       REMOVE PRODUCT
    ===================================================== */

    const removeFromCart = id => {

        const itemElement =
            cartItemsContainer?.querySelector(
                `.cart-item[data-id="${id}"]`
            );


        if (itemElement) {

            itemElement.classList.add(
                "removing"
            );

        }


        /* Small visual delay */

        setTimeout(() => {

            cart =
                cart.filter(
                    item =>
                        item.id !== id
                );


            renderCart();

        }, 220);

    };



    /* =====================================================
       CART EVENT DELEGATION
       
       ONE listener handles:
       + / − / remove

       This is the important fix.
    ===================================================== */

    if (cartItemsContainer) {

        cartItemsContainer.addEventListener(
            "click",
            event => {

                const plusButton =
                    event.target.closest(
                        ".quantity-plus"
                    );


                const minusButton =
                    event.target.closest(
                        ".quantity-minus"
                    );


                const removeButton =
                    event.target.closest(
                        ".cart-item-remove"
                    );


                /* PLUS */

                if (plusButton) {

                    event.preventDefault();

                    const id =
                        plusButton.dataset.id;

                    changeQuantity(
                        id,
                        1
                    );

                    return;

                }


                /* MINUS */

                if (minusButton) {

                    event.preventDefault();

                    const id =
                        minusButton.dataset.id;

                    changeQuantity(
                        id,
                        -1
                    );

                    return;

                }


                /* REMOVE */

                if (removeButton) {

                    event.preventDefault();

                    const id =
                        removeButton.dataset.id;

                    removeFromCart(id);

                    return;

                }

            }
        );

    }



    /* =====================================================
       ADD PRODUCT TO CART
    ===================================================== */

    const addProductToCart = button => {

        const productCard =
            button.closest(".product-card");


        if (!productCard) return;


        const image =
            productCard.querySelector(
                ".product-image img"
            );


        const name =
            productCard.querySelector(
                ".product-info h3"
            );


        const variant =
            productCard.querySelector(
                ".product-info p"
            );


        const priceElement =
            productCard.querySelector(
                ".product-price"
            );


        if (!name || !priceElement) return;


        const productName =
            name.textContent.trim();


        const productVariant =
            variant
                ? variant.textContent.trim()
                : "";


        const price =
            parseFloat(
                priceElement.textContent
                    .replace("€", "")
                    .replace(",", ".")
            ) || 0;


        const productImage =
            image
                ? image.getAttribute("src")
                : "";


        /* Stable product ID */

        const id =
            productName
                .toLowerCase()
                .replace(/æ/g, "ae")
                .replace(/\s+/g, "-");


        /* Check existing product */

        const existingItem =
            cart.find(
                item =>
                    item.id === id
            );


        if (existingItem) {

            existingItem.quantity += 1;

        } else {

            cart.push({

                id,

                name:
                    productName,

                variant:
                    productVariant,

                price,

                image:
                    productImage,

                quantity:
                    1

            });

        }


        /* Update immediately */

        renderCart();


        /* Button feedback */

        const originalText =
            button.innerHTML;


        button.innerHTML =
            "Added ✓";


        button.classList.add(
            "added"
        );


        setTimeout(() => {

            button.innerHTML =
                originalText;

            button.classList.remove(
                "added"
            );

        }, 1200);


        /* Open drawer */

        setTimeout(() => {

            openCart();

        }, 250);

    };



    /* =====================================================
       PRODUCT BUTTONS
    ===================================================== */

    document
        .querySelectorAll(
            ".add-to-cart, .quick-add"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    addProductToCart(
                        button
                    );

                }
            );

        });



    /* =====================================================
       FEATURED PRODUCT
    ===================================================== */

    const featuredButton =
        document.querySelector(
            ".featured-purchase .button"
        );


    if (featuredButton) {

        featuredButton.addEventListener(
            "click",
            () => {

                const existingItem =
                    cart.find(
                        item =>
                            item.id ===
                            "vaelt-whey-01"
                    );


                if (existingItem) {

                    existingItem.quantity += 1;

                } else {

                    cart.push({

                        id:
                            "vaelt-whey-01",

                        name:
                            "VÆLT WHEY 01",

                        variant:
                            "Vanilla / 900 g",

                        price:
                            39.90,

                        image:
                            "images/featured-product.jpg",

                        quantity:
                            1

                    });

                }


                renderCart();


                const originalText =
                    featuredButton.innerHTML;


                featuredButton.innerHTML =
                    "Added ✓";


                featuredButton.classList.add(
                    "added"
                );


                setTimeout(() => {

                    featuredButton.innerHTML =
                        originalText;

                    featuredButton.classList.remove(
                        "added"
                    );

                }, 1200);


                setTimeout(() => {

                    openCart();

                }, 250);

            }
        );

    }



    /* =====================================================
       OPEN CART
    ===================================================== */

    const openCart = () => {

        if (!cartDrawer) return;


        /* Always render latest state */

        renderCart();


        cartDrawer.classList.add(
            "active"
        );


        pageOverlay?.classList.add(
            "active"
        );


        body.classList.add(
            "no-scroll"
        );

    };



    /* =====================================================
       CLOSE CART
    ===================================================== */

    const closeCart = () => {

        if (!cartDrawer) return;


        cartDrawer.classList.remove(
            "active"
        );


        pageOverlay?.classList.remove(
            "active"
        );


        body.classList.remove(
            "no-scroll"
        );

    };


    cartTrigger?.addEventListener(
        "click",
        openCart
    );


    cartClose?.addEventListener(
        "click",
        closeCart
    );


    pageOverlay?.addEventListener(
        "click",
        closeCart
    );



    /* =====================================================
       CHECKOUT
    ===================================================== */

    if (checkoutButton) {

        checkoutButton.addEventListener(
            "click",
            () => {

                if (cart.length === 0) {

                    const originalText =
                        checkoutButton.innerHTML;


                    checkoutButton.innerHTML =
                        "Your bag is empty";


                    setTimeout(() => {

                        checkoutButton.innerHTML =
                            originalText;

                    }, 1600);


                    return;

                }


                const originalText =
                    checkoutButton.innerHTML;


                checkoutButton.innerHTML =
                    "Checkout unavailable";


                setTimeout(() => {

                    checkoutButton.innerHTML =
                        originalText;

                }, 1800);

            }
        );

    }



    /* =====================================================
       SEARCH — ENTER
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            event => {

                if (
                    event.key !== "Enter"
                ) return;


                const query =
                    searchInput.value.trim();


                if (!query) return;


                searchInput.blur();

                searchInput.value = "";

                searchInput.placeholder =
                    `Searching for "${query}"...`;


                setTimeout(() => {

                    searchInput.placeholder =
                        "What are you looking for?";

                }, 1800);

            }
        );

    }



    /* =====================================================
       NEWSLETTER
    ===================================================== */

    const newsletterForm =
        document.querySelector(
            ".newsletter-form"
        );


    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const input =
                    newsletterForm.querySelector(
                        "input"
                    );


                const button =
                    newsletterForm.querySelector(
                        "button"
                    );


                if (!input || !button)
                    return;


                if (!input.value.trim())
                    return;


                const originalButton =
                    button.innerHTML;


                input.disabled = true;

                button.innerHTML =
                    "You're in ✓";


                setTimeout(() => {

                    input.value = "";

                    input.disabled = false;

                    button.innerHTML =
                        originalButton;

                }, 2500);

            }
        );

    }



    /* =====================================================
       ESCAPE
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Escape"
            ) return;


            closeSearch();

            closeCart();

            closeMobileMenu();

        }
    );



    /* =====================================================
       SCROLL REVEAL SYSTEM
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            `
            .section-top,
            .performance-heading,
            .nutrition-heading,
            .shop-heading,
            .education-heading,
            .reviews-heading,
            .goal-card,
            .nutrition-card,
            .product-card,
            .training-image,
            .training-content,
            .training-point,
            .featured-product-inner,
            .education-card,
            .brand-story-content,
            .brand-story-image,
            .review-card,
            .newsletter-inner
            `
        );


    revealElements.forEach(
        element => {

            element.classList.add(
                "reveal-element"
            );

        }
    );


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) return;


                    const parent =
                        entry.target.parentElement;


                    const siblings =
                        parent
                            ? [
                                ...parent.children
                            ]
                            : [];


                    const siblingIndex =
                        siblings.indexOf(
                            entry.target
                        );


                    const delay =
                        Math.min(
                            siblingIndex * 90,
                            360
                        );


                    setTimeout(() => {

                        entry.target.classList.add(
                            "is-visible"
                        );

                    }, delay);


                    revealObserver.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.1,
                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );



    /* =====================================================
       HERO INTRO ANIMATION
    ===================================================== */

    const heroElements =
        document.querySelectorAll(
            `
            .hero-label,
            .hero-title,
            .hero-description,
            .hero-actions,
            .hero-bottom
            `
        );


    heroElements.forEach(
        element => {

            element.classList.add(
                "hero-intro"
            );

        }
    );


    const animateHero = () => {

        heroElements.forEach(
            (element, index) => {

                setTimeout(() => {

                    element.classList.add(
                        "hero-intro-visible"
                    );

                }, 250 + index * 150);

            }
        );

    };


    if (
        document.body.classList.contains(
            "page-ready"
        )
    ) {

        animateHero();

    } else {

        window.addEventListener(
            "load",
            () => {

                setTimeout(
                    animateHero,
                    650
                );

            },
            { once: true }
        );

    }



    /* =====================================================
       ANCHOR LINKS
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) return;


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) return;


                    event.preventDefault();


                    closeMobileMenu();

                    closeSearch();


                    target.scrollIntoView({
                        behavior:
                            "smooth",

                        block:
                            "start"
                    });

                }
            );

        });



/* =====================================================
   REVIEWS — PREMIUM 3D HOVER
===================================================== */

const reviewCards =
    document.querySelectorAll(".review-card");


reviewCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateY =
                ((x - centerX) / centerX) * 1.8;

            const rotateX =
                ((centerY - y) / centerY) * 1.8;


            card.style.transform = `
                perspective(900px)
                translateY(-8px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
            `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});



    /* =====================================================
       INITIAL STATE
    ===================================================== */

    renderCart();

});