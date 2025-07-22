// Enhanced Orange-themed Interactive Website
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all effects
  initializeParticleSystem();
  initializeCursorEffect();
  initializeScrollEffects();
  initializeNavigationEffects();
  initializeStatistics();
  initializeCardAnimations();
  initializeHeroTypewriter();
  initializeInteractiveButtons();
  initializeMobileMenu();

  // Orange particle system
  function initializeParticleSystem() {
    const particlesContainer = document.createElement("div");
    particlesContainer.className = "particles-container";
    particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
    document.body.appendChild(particlesContainer);

    // Create floating orange particles
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement("div");
      const size = Math.random() * 6 + 3;
      const opacity = Math.random() * 0.6 + 0.2;

      particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, #FF8C00${Math.floor(
                  opacity * 255
                )
                  .toString(16)
                  .padStart(2, "0")}, transparent);
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: orangeParticleFloat ${
                  20 + Math.random() * 30
                }s linear infinite;
                animation-delay: ${Math.random() * 10}s;
            `;
      particlesContainer.appendChild(particle);
    }

    // Add particle animation keyframes
    const particleStyle = document.createElement("style");
    particleStyle.textContent = `
            @keyframes orangeParticleFloat {
                0% {
                    transform: translateY(100vh) translateX(0px) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) translateX(${
                      Math.random() * 200 - 100
                    }px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
    document.head.appendChild(particleStyle);
  }

  // Enhanced cursor effect with orange theme (desktop only)
  function initializeCursorEffect() {
    // Skip cursor effect on mobile devices
    if (window.innerWidth <= 768 || "ontouchstart" in window || /Mobi|Android/i.test(navigator.userAgent)) {
      return;
    }

    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    cursor.style.cssText = `
            position: fixed;
            width: 25px;
            height: 25px;
            background: radial-gradient(circle, rgba(255, 140, 0, 0.8), rgba(255, 165, 0, 0.3));
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.08s cubic-bezier(0.4, 0, 0.2, 1);
            mix-blend-mode: multiply;
            border: 2px solid rgba(255, 140, 0, 0.5);
        `;
    document.body.appendChild(cursor);

    let mouseX = 0,
      mouseY = 0;
    let cursorX = 0,
      cursorY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      const speed = 0.3;
      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;

      cursor.style.left = cursorX - 12.5 + "px";
      cursor.style.top = cursorY - 12.5 + "px";
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Enhanced hover effects
    const interactiveElements = document.querySelectorAll(
      "a, button, .feature-card, .category-card, .opportunity-card"
    );
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursor.style.transform = "scale(1.8)";
        cursor.style.background =
          "radial-gradient(circle, rgba(255, 140, 0, 0.9), rgba(255, 184, 77, 0.4))";
        cursor.style.border = "2px solid rgba(255, 140, 0, 0.8)";
      });

      element.addEventListener("mouseleave", () => {
        cursor.style.transform = "scale(1)";
        cursor.style.background =
          "radial-gradient(circle, rgba(255, 140, 0, 0.8), rgba(255, 165, 0, 0.3))";
        cursor.style.border = "2px solid rgba(255, 140, 0, 0.5)";
      });
    });
  }

  // Enhanced scroll progress with orange theme
  function initializeScrollEffects() {
    const progress = document.createElement("div");
    progress.className = "scroll-progress";
    progress.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(90deg, #FF8C00, #FFA500, #FFB84D);
            z-index: 1001;
            transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 0 15px rgba(255, 140, 0, 0.6);
        `;
    document.body.appendChild(progress);

    // Simplified scroll animations (desktop only)
    if (window.innerWidth > 768) {
      const observerOptions = {
        threshold: 0.2,
        rootMargin: "0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // Stop observing once visible
          }
        });
      }, observerOptions);

      // Only observe cards, not titles
      const animatedElements = document.querySelectorAll(
        ".feature-card, .category-card"
      );
      animatedElements.forEach((element) => {
        observer.observe(element);
      });
    } else {
      // On mobile, show all cards immediately
      const cards = document.querySelectorAll(".feature-card, .category-card");
      cards.forEach((card) => {
        card.classList.add("visible");
      });
    }

    // Update scroll progress
    window.addEventListener("scroll", () => {
      const scrolled =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100;
      progress.style.width = Math.min(scrolled, 100) + "%";
    });
  }

  // Navigation effects
  function initializeNavigationEffects() {
    const header = document.querySelector(".header");
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    // Smooth scrolling for navigation
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 100;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });

    // Header background change on scroll
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        header.style.background = "rgba(255, 255, 255, 0.98)";
        header.style.boxShadow = "0 4px 25px rgba(255, 140, 0, 0.15)";
      } else {
        header.style.background = "rgba(255, 255, 255, 0.95)";
        header.style.boxShadow = "0 4px 20px rgba(255, 140, 0, 0.1)";
      }
    });
  }

  // Animated statistics counter
  function initializeStatistics() {
    const statsSection = document.querySelector(".statistics");
    if (!statsSection) return;

    const statNumbers = document.querySelectorAll(".stat-number");

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statsObserver.observe(statsSection);

    function animateStats() {
      const targets = [
        { element: statNumbers[0], target: 10000, suffix: "+" },
        { element: statNumbers[1], target: 50000, suffix: "+" },
        { element: statNumbers[2], target: 95, suffix: "%" },
        { element: statNumbers[3], target: 247, suffix: "", display: "24/7" },
      ];

      targets.forEach(({ element, target, suffix, display }, index) => {
        if (!element) return;

        let current = 0;
        const increment = target / 80;
        const duration = 2000 + index * 300;
        const stepTime = duration / (target / increment);

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }

          if (display) {
            element.textContent = display;
          } else {
            element.textContent = Math.floor(current).toLocaleString() + suffix;
          }
        }, stepTime);
      });
    }
  }

  // Card hover animations (desktop only)
  function initializeCardAnimations() {
    // Skip card animations on mobile
    if (window.innerWidth <= 768) {
      return;
    }

    const cards = document.querySelectorAll(".feature-card, .category-card");

    cards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        if (window.innerWidth > 768) {
          this.style.transform = "translateY(-8px)";
        }
      });

      card.addEventListener("mouseleave", function () {
        if (window.innerWidth > 768) {
          this.style.transform = "translateY(0)";
        }
      });
    });
  }

  // Hero smooth animations
  function initializeHeroTypewriter() {
    const heroTitle = document.querySelector(".hero-title");
    const heroDescription = document.querySelector(".hero-description");
    const heroActions = document.querySelector(".hero-actions");

    // Add staggered animations to hero elements
    if (heroTitle) {
      // Title already has CSS animation, just ensure it's visible
      heroTitle.style.opacity = "0";
    }

    if (heroDescription) {
      heroDescription.style.opacity = "0";
      heroDescription.style.transform = "translateY(20px)";
      heroDescription.style.transition =
        "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";

      setTimeout(() => {
        heroDescription.style.opacity = "0.9";
        heroDescription.style.transform = "translateY(0)";
      }, 400);
    }

    if (heroActions) {
      heroActions.style.opacity = "0";
      heroActions.style.transform = "translateY(20px)";
      heroActions.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";

      setTimeout(() => {
        heroActions.style.opacity = "1";
        heroActions.style.transform = "translateY(0)";
      }, 800);
    }
  }

  // Interactive button effects
  function initializeInteractiveButtons() {
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach((button) => {
      // Ripple effect on click
      button.addEventListener("click", function (e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement("span");
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 140, 0, 0.4);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: rippleEffect 0.8s ease-out;
                    pointer-events: none;
                `;

        this.style.position = "relative";
        this.style.overflow = "hidden";
        this.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 800);
      });

      // Simple hover effect (only on desktop)
      if (window.innerWidth > 768) {
        button.addEventListener("mouseenter", function () {
          this.style.transform = "translateY(-2px)";
        });

        button.addEventListener("mouseleave", function () {
          this.style.transform = "translateY(0)";
        });
      }
    });

    // Add ripple animation
    const rippleStyle = document.createElement("style");
    rippleStyle.textContent = `
            @keyframes rippleEffect {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
    document.head.appendChild(rippleStyle);
  }

  // Download button interactions (simplified)
  const downloadBtns = document.querySelectorAll(".download-btn");
  downloadBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      // Simple feedback
      const originalText = this.textContent || "다운로드";
      this.style.opacity = "0.7";

      setTimeout(() => {
        this.style.opacity = "1";
        alert("곧 출시 예정입니다!");
      }, 200);
    });
  });

  // Simplified parallax effect (desktop only)
  if (window.innerWidth > 768) {
    let ticking = false;

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const hero = document.querySelector(".hero");
          if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.2}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // Mobile menu functionality
  function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (!mobileMenuBtn || !navLinks) return;

    mobileMenuBtn.addEventListener("click", function () {
      this.classList.toggle("active");
      navLinks.classList.toggle("mobile-open");

      // Prevent body scroll when menu is open
      if (navLinks.classList.contains("mobile-open")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });

    // Close menu when clicking on a nav link
    const navLinkItems = navLinks.querySelectorAll("a");
    navLinkItems.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuBtn.classList.remove("active");
        navLinks.classList.remove("mobile-open");
        document.body.style.overflow = "";
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        mobileMenuBtn.classList.remove("active");
        navLinks.classList.remove("mobile-open");
        document.body.style.overflow = "";
      }
    });

    // Close menu on window resize if screen gets larger
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        mobileMenuBtn.classList.remove("active");
        navLinks.classList.remove("mobile-open");
        document.body.style.overflow = "";
      }
    });
  }

  // Set current year in footer
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = currentYear;
  }
});
