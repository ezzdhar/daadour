document.addEventListener('DOMContentLoaded', () => {

    /* ─────────────────────────────────────────
       GSAP Plugin Registration
    ───────────────────────────────────────── */
    gsap.registerPlugin(ScrollTrigger);

    /* ─────────────────────────────────────────
       Header: slide down on load
    ───────────────────────────────────────── */
    gsap.from('header', {
        y: -80,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out',
    });

    /* ─────────────────────────────────────────
       Header: sticky background on scroll
    ───────────────────────────────────────── */
    window.addEventListener('scroll', () => {
        document.querySelector('header')
            .classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    /* ─────────────────────────────────────────
       Mobile Menu Toggle
    ───────────────────────────────────────── */
    const toggle = document.getElementById('mobile-toggle');
    const mainNav = document.getElementById('main-nav');

    if (toggle) {
        toggle.addEventListener('click', () => {
            const open = toggle.classList.toggle('active');
            mainNav.classList.toggle('active', open);
            document.body.style.overflow = open ? 'hidden' : '';
        });
    }

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    /* ─────────────────────────────────────────
       Hero Content: staggered reveal on load
    ───────────────────────────────────────── */
    gsap.from('.hero-content > *', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        stagger: 0.2,
        ease: 'expo.out',
        delay: 0.4,
    });

    /* Hero parallax on scroll */
    gsap.to('.hero', {
        backgroundPositionY: '30%',
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
        },
    });

    /* ─────────────────────────────────────────
       SECTION HEADERS — Unified Entrance
    ───────────────────────────────────────── */
    document.querySelectorAll('.section-header').forEach(header => {
        const headerTl = gsap.timeline({
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            },
        });

        headerTl
            .from(header.querySelector('.bg-text'), {
                opacity: 0,
                scale: 1.08,
                duration: 1.4,
                ease: 'expo.out',
            })
            .from(header.querySelector('h2'), {
                opacity: 0,
                y: 50,
                duration: 1.2,
                ease: 'expo.out',
            }, '-=1.0')
            .from(header.querySelector('p'), {
                opacity: 0,
                y: 50,
                duration: 1.2,
                ease: 'expo.out',
            }, '-=1.0');
    });

    /* ─────────────────────────────────────────
       SERVICES — Cards: staggered slide-up
    ───────────────────────────────────────── */
    gsap.from('.service-card', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        stagger: 0.3,
        ease: 'expo.out',
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
        },
    });

    /* ─────────────────────────────────────────
       SERVICES — Circular images: subtle
       mouse-follow parallax per card
    ───────────────────────────────────────── */
    document.querySelectorAll('.service-card').forEach(card => {
        const img = card.querySelector('.card-image img');

        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width - 0.5) * 18;
            const y = ((e.clientY - r.top) / r.height - 0.5) * 18;
            gsap.to(img, { x, y, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(img, { x: 0, y: 0, duration: 0.8, ease: 'expo.out', overwrite: 'auto' });
        });
    });

    /* ─────────────────────────────────────────
       SERVICES — Rotating border: pause when
       card is not in viewport (performance)
    ───────────────────────────────────────── */
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const ring = entry.target.querySelector('.rotating-border');
            if (!ring) return;
            ring.style.animationPlayState =
                entry.isIntersecting ? 'running' : 'paused';
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card')
        .forEach(c => observer.observe(c));

    /* ─────────────────────────────────────────
       BESPOKE — Cards: staggered reveal
    ───────────────────────────────────────── */
    gsap.from('.bespoke-card', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        stagger: 0.2,
        ease: 'expo.out',
        scrollTrigger: {
            trigger: '.bespoke-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
        },
    });

    /* ─────────────────────────────────────────
       CRAFTSMANSHIP — Reveal Logic
    ───────────────────────────────────────── */
    const craftsmanTrigger = document.querySelector('#reveal-trigger');
    const craftsmanHidden = document.querySelector('#hidden-content');

    if (craftsmanTrigger && craftsmanHidden) {
        craftsmanTrigger.onclick = function () {
            this.classList.toggle('active');
            craftsmanHidden.classList.toggle('active');

            if (craftsmanHidden.classList.contains('active')) {
                setTimeout(() => {
                    craftsmanHidden.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 400);
            }
        };
    }

    /* ─────────────────────────────────────────
       CRAFTSMANSHIP — Section Entrance
    ───────────────────────────────────────── */
    gsap.from('.craftsmanship-content h2, .craftsmanship-content .reveal-trigger', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        stagger: 0.2,
        ease: 'expo.out',
        clearProps: 'opacity,y,transform', /* Reset after animation so CSS takes full control */
        scrollTrigger: {
            trigger: '.craftsmanship',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
        },
    });

    /* ─────────────────────────────────────────
       WORKFLOW — Sequential Reveal
    ───────────────────────────────────────── */
    const steps = document.querySelectorAll('.workflow-step');
    const workflowTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.workflow-grid',
            start: 'top 70%',
        },
        repeat: -1, // Loop the animation
    });

    steps.forEach((step, index) => {
        workflowTl.to(step, {
            onStart: () => step.classList.add('active'),
            onReverseComplete: () => step.classList.remove('active'),
            duration: 0.8,
        })
            .to(step, {
                duration: 1.5,
            })
            .add(() => {
                step.classList.remove('active');
            });
    });

    /* ─────────────────────────────────────────
       CTA SECTION — Entrance
    ───────────────────────────────────────── */
    gsap.from('.cta-content > *', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        stagger: 0.2,
        ease: 'expo.out',
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
        },
    });

    gsap.fromTo('.cta-section',
        { backgroundSize: '100% auto' },
        {
            backgroundSize: '110% auto',
            ease: "none",
            scrollTrigger: {
                trigger: '.cta-section',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        }
    );

    /* ─────────────────────────────────────────
       DIFFERENCE — Entrance Animation
    ───────────────────────────────────────── */
    // Handled by unified section-header loop above


    /* ─────────────────────────────────────────
       DIFFERENCE — Sequential Pulse Animation
    ───────────────────────────────────────── */
    const diffCards = document.querySelectorAll('.diff-card');
    if (diffCards.length) {
        const diffTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.difference-grid',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        });

        // 1. First reveal them all normally
        diffTl.fromTo('.diff-card',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power2.out' }
        );

        // 2. Then do the sequential "Zoom & Highlight" pulse IN A LOOP
        const pulseTl = gsap.timeline({ repeat: -1 });

        diffCards.forEach((card) => {
            pulseTl.to(card, {
                scale: 1.05,
                backgroundColor: '#110d0a',
                borderColor: '#e2c091',
                duration: 0.8,
                ease: 'power2.inOut',
                onStart: () => card.classList.add('active'),
            })
                .to(card, {
                    scale: 1,
                    backgroundColor: '#0E0906',
                    borderColor: '#0E0906',
                    duration: 0.8,
                    onComplete: () => card.classList.remove('active'),
                }, "+=0.1");
        });

        diffTl.add(pulseTl);
    }

    /* ─────────────────────────────────────────
       FAQ — Interactive Accordion
    ───────────────────────────────────────── */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    /* ─────────────────────────────────────────
       FAQ — Entrance Animation
    ───────────────────────────────────────── */
    gsap.from('.faq-item', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        stagger: 0.2,
        ease: 'expo.out',
        scrollTrigger: {
            trigger: '.faq-container',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });

    /* ─────────────────────────────────────────
       TESTIMONIALS — Slider Logic
    ───────────────────────────────────────── */
    const slider = document.getElementById('testimonial-slider');
    const prevBtn = document.getElementById('prev-testi');
    const nextBtn = document.getElementById('next-testi');
    const cards = document.querySelectorAll('.testimonial-card');

    if (slider && cards.length) {
        let currentIndex = 0;
        const totalCards = cards.length;
        
        const updateSlider = () => {
            const gap = 30; // From CSS
            const cardWidth = cards[0].offsetWidth;
            const containerWidth = slider.parentElement.offsetWidth;
            const offset = (containerWidth - cardWidth) / 2;
            
            gsap.to(slider, {
                x: -currentIndex * (cardWidth + gap) + offset,
                duration: 0.8,
                ease: 'power3.out'
            });
        };

        // Center the first slide on initialization
        const initialUpdate = () => {
            if (!cards[0]) return;
            const cardWidth = cards[0].offsetWidth;
            const containerWidth = slider.parentElement.offsetWidth;
            const offset = (containerWidth - cardWidth) / 2;
            gsap.set(slider, { x: offset });
        };
        
        // Use both window load and timeout for maximum reliability
        window.addEventListener('load', initialUpdate);
        setTimeout(initialUpdate, 500);

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalCards;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateSlider();
        });

        window.addEventListener('resize', () => {
            updateSlider();
        });

        // Mouse Parallax for Testimonial Cards
        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const r = card.getBoundingClientRect();
                // Increased range to 30px for better visibility
                const x = ((e.clientX - r.left) / r.width - 0.5) * 30;
                const y = ((e.clientY - r.top) / r.height - 0.5) * 30;
                
                gsap.to(card, {
                    x: x,
                    y: y - 15, // Lifted more
                    rotateX: -y * 0.2, // More rotation
                    rotateY: x * 0.2,
                    duration: 0.5,
                    ease: 'power1.out',
                    overwrite: 'auto'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    x: 0,
                    y: 0,
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.8,
                    ease: 'expo.out',
                    overwrite: 'auto'
                });
            });
        });

        // Auto play
        let autoPlayInterval;
        const startAutoPlay = () => {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(() => {
                nextBtn.click();
            }, 6000);
        };

        startAutoPlay();

        // Pause autoplay on interaction
        const wrapper = slider.parentElement;
        wrapper.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        wrapper.addEventListener('mouseleave', () => startAutoPlay());

        // Entrance
        gsap.from(['.testimonial-card', '.slider-controls'], {
            opacity: 0,
            y: 50,
            duration: 1.2,
            stagger: 0.2,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: '#testimonials',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    // Increased Service Card Parallax too
    document.querySelectorAll('.service-card').forEach(card => {
        const img = card.querySelector('.card-image img');
        if (!img) return;

        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width - 0.5) * 30;
            const y = ((e.clientY - r.top) / r.height - 0.5) * 30;
            gsap.to(img, { x, y, duration: 0.5, ease: 'power1.out', overwrite: 'auto' });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(img, { x: 0, y: 0, duration: 0.8, ease: 'expo.out', overwrite: 'auto' });
        });
    });

    /* ─────────────────────────────────────────
       FOOTER — Typewriter & Reveal Animations
    ───────────────────────────────────────── */
    const typeTarget = document.querySelector('.typewriter-text');
    if (typeTarget) {
        const textToType = typeTarget.getAttribute('data-text');
        typeTarget.textContent = ''; // clear initially
        
        const typeObj = { length: 0 };
        gsap.to(typeObj, {
            length: textToType.length,
            duration: 3,
            ease: "none",
            scrollTrigger: {
                trigger: ".site-footer",
                start: "top 85%",
                toggleActions: 'play none none reverse'
            },
            onUpdate: () => {
                typeTarget.textContent = textToType.substring(0, Math.floor(typeObj.length));
            }
        });
    }

    gsap.from('.footer-middle > *, .btn-demo, .white-text', {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: 'expo.out',
        scrollTrigger: {
            trigger: ".site-footer",
            start: "top 85%",
            toggleActions: 'play none none reverse'
        }
    });

});
