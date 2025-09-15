"use strict";

// Initialize AOS if available
if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  });
}

// Mobile sidebar functionality
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileSidebar = document.getElementById("mobile-sidebar");
const sidebarContent = document.getElementById("sidebar-content");
const closeSidebar = document.getElementById("close-sidebar");
const sidebarOverlay = document.getElementById("sidebar-overlay");

function openSidebar() {
  if (!mobileSidebar || !sidebarContent) return;
  mobileSidebar.classList.remove("hidden");
  setTimeout(() => {
    sidebarContent.classList.remove("translate-x-full");
  }, 10);
}

function closeSidebarFunc() {
  if (!mobileSidebar || !sidebarContent) return;
  sidebarContent.classList.add("translate-x-full");
  setTimeout(() => {
    mobileSidebar.classList.add("hidden");
  }, 300);
}

if (mobileMenuButton) mobileMenuButton.addEventListener("click", openSidebar);
if (closeSidebar) closeSidebar.addEventListener("click", closeSidebarFunc);
if (sidebarOverlay) sidebarOverlay.addEventListener("click", closeSidebarFunc);

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const animationClass = entry.target.getAttribute("data-animation");
      if (animationClass) {
        entry.target.classList.add(animationClass);
        observer.unobserve(entry.target);
      }
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll("[data-animation]");
  animatedElements.forEach((el) => {
    observer.observe(el);
  });
});

// Enhanced intersection observer with better performance
const enhancedObserverOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const enhancedObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const animationClass = entry.target.getAttribute("data-animation");
      if (animationClass) {
        entry.target.classList.add(animationClass);
        if (entry.target.classList.contains("stagger-1")) {
          entry.target.style.animationDelay = "0.1s";
        } else if (entry.target.classList.contains("stagger-2")) {
          entry.target.style.animationDelay = "0.2s";
        } else if (entry.target.classList.contains("stagger-3")) {
          entry.target.style.animationDelay = "0.3s";
        }
        enhancedObserver.unobserve(entry.target);
      }
    }
  });
}, enhancedObserverOptions);

// Initialize enhanced animations
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll("[data-animation]");
  animatedElements.forEach((el) => {
    enhancedObserver.observe(el);
  });

  // Add parallax effect to background elements
  const parallaxElements = document.querySelectorAll(".parallax-bg");
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    parallaxElements.forEach((element) => {
      const rate = scrolled * -0.5;
      element.style.transform = `translateY(${rate}px)`;
    });
  });

  // Trigger sequential border animations when section comes into view
  const borderAnimationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll(".border-animation");
          cards.forEach((card, index) => {
            card.style.animation = "none";
            // trigger reflow
            void card.offsetHeight;
            setTimeout(() => {
              card.style.animation = `borderSlide 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards`;
            }, (index + 1) * 1000);
          });
          borderAnimationObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  const cardsSection = document.querySelector(".border-animation")?.closest("section");
  if (cardsSection) {
    borderAnimationObserver.observe(cardsSection);
  }
});

// Function to handle app store button clicks
function openAppStore(store) {
  if (store === "google") {
    window.open(
      "https://play.google.com/store/apps/details?id=com.oenod.app",
      "_blank"
    );
  } else if (store === "apple") {
    window.open("https://apps.apple.com/app/oenod/id123456789", "_blank");
  }
}

// =============================
// Automated Tab Animation
// =============================

class AutoTabAnimation {
  constructor() {
    this.container = document.getElementById("autoTabContainer");
    this.cards = this.container ? this.container.querySelectorAll(".auto-tab-card") : [];
    this.currentIndex = 0;
    this.isAnimating = false;
    this.animationInterval = null;
    this.cycleDuration = 8000; // 8 seconds per cycle
    this.cardDisplayDuration = 2000; // 2 seconds per card

    this.init();
  }

  init() {
    if (this.cards.length === 0) return;
    this.startAnimation();
    this.cards.forEach((card, index) => {
      card.addEventListener("click", () => {
        this.highlightCard(index);
      });
    });
  }

  startAnimation() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
    this.resetCards();
    this.animateSequence();
    this.animationInterval = setInterval(() => {
      this.animateSequence();
    }, this.cycleDuration);
  }

  resetCards() {
    this.cards.forEach((card) => {
      card.classList.remove("animate-in", "highlight");
      card.style.opacity = "0";
      card.style.transform = "translateX(-30px) scale(0.95)";
    });
    this.currentIndex = 0;
  }

  animateSequence() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.resetCards();
    this.cards.forEach((card, index) => {
      setTimeout(() => {
        this.animateCard(card, index);
      }, index * 1000);
    });
    setTimeout(() => {
      this.isAnimating = false;
    }, this.cards.length * 1000 + 2000);
  }

  animateCard(card, index) {
    card.classList.add("animate-in");
    setTimeout(() => {
      card.classList.add("highlight");
      setTimeout(() => {
        card.classList.remove("highlight");
      }, 800);
    }, 300);
  }

  highlightCard(index) {
    if (index < 0 || index >= this.cards.length) return;
    this.cards.forEach((card) => card.classList.remove("highlight"));
    this.cards[index].classList.add("highlight");
    setTimeout(() => {
      this.cards[index].classList.remove("highlight");
    }, 800);
  }

  stop() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }

  restart() {
    this.stop();
    setTimeout(() => {
      this.startAnimation();
    }, 100);
  }
}

// Initialize the auto tab animation when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    window.autoTabInstance = new AutoTabAnimation();
  }, 500);
});

// Optional: Pause animation on hover and resume on mouse leave
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("autoTabContainer");
  if (container) {
    container.addEventListener("mouseenter", () => {
      if (window.autoTabInstance) {
        window.autoTabInstance.stop();
      }
    });
    container.addEventListener("mouseleave", () => {
      if (window.autoTabInstance) {
        window.autoTabInstance.restart();
      }
    });
  }
});

// Price Toggle Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Payroll Plan
  const payrollMonthly = document.getElementById("payroll-monthly");
  const payrollYearly = document.getElementById("payroll-yearly");
  const payrollPrice = document.getElementById("payroll-price");
  const payrollOriginalPrice = document.getElementById("payroll-original-price");

  if (payrollMonthly && payrollYearly && payrollPrice && payrollOriginalPrice) {
    payrollMonthly.addEventListener("change", function () {
      if (this.checked) {
        payrollPrice.textContent = "$50";
        payrollOriginalPrice.textContent = "$100";
      }
    });
    payrollYearly.addEventListener("change", function () {
      if (this.checked) {
        payrollPrice.textContent = "$1000";
        payrollOriginalPrice.textContent = "$1200";
      }
    });
  }

  // Basic Plan
  const basicMonthly = document.getElementById("basic-monthly");
  const basicYearly = document.getElementById("basic-yearly");
  const basicPrice = document.getElementById("basic-price");
  const basicOriginalPrice = document.getElementById("basic-original-price");

  if (basicMonthly && basicYearly && basicPrice && basicOriginalPrice) {
    basicMonthly.addEventListener("change", function () {
      if (this.checked) {
        basicPrice.textContent = "$10";
        basicOriginalPrice.textContent = "$20";
      }
    });
    basicYearly.addEventListener("change", function () {
      if (this.checked) {
        basicPrice.textContent = "$300";
        basicOriginalPrice.textContent = "$360";
      }
    });
  }

  // Advanced Plan
  const advancedMonthly = document.getElementById("advanced-monthly");
  const advancedYearly = document.getElementById("advanced-yearly");
  const advancedPrice = document.getElementById("advanced-price");
  const advancedOriginalPrice = document.getElementById("advanced-original-price");

  if (advancedMonthly && advancedYearly && advancedPrice && advancedOriginalPrice) {
    advancedMonthly.addEventListener("change", function () {
      if (this.checked) {
        advancedPrice.textContent = "$50";
        advancedOriginalPrice.textContent = "$100";
      }
    });
    advancedYearly.addEventListener("change", function () {
      if (this.checked) {
        advancedPrice.textContent = "$400";
        advancedOriginalPrice.textContent = "$600";
      }
    });
  }

  // Standard Plan
  const standardMonthly = document.getElementById("standard-monthly");
  const standardYearly = document.getElementById("standard-yearly");
  const standardPrice = document.getElementById("standard-price");
  const standardOriginalPrice = document.getElementById("standard-original-price");

  if (standardMonthly && standardYearly && standardPrice && standardOriginalPrice) {
    standardMonthly.addEventListener("change", function () {
      if (this.checked) {
        standardPrice.textContent = "$30";
        standardOriginalPrice.textContent = "$60";
      }
    });
    standardYearly.addEventListener("change", function () {
      if (this.checked) {
        standardPrice.textContent = "$300";
        standardOriginalPrice.textContent = "$360";
      }
    });
  }

  // Premium Plan
  const premiumMonthly = document.getElementById("premium-monthly");
  const premiumYearly = document.getElementById("premium-yearly");
  const premiumPrice = document.getElementById("premium-price");
  const premiumOriginalPrice = document.getElementById("premium-original-price");

  if (premiumMonthly && premiumYearly && premiumPrice && premiumOriginalPrice) {
    premiumMonthly.addEventListener("change", function () {
      if (this.checked) {
        premiumPrice.textContent = "$100";
        premiumOriginalPrice.textContent = "$200";
      }
    });
    premiumYearly.addEventListener("change", function () {
      if (this.checked) {
        premiumPrice.textContent = "$1000";
        premiumOriginalPrice.textContent = "$1200";
      }
    });
  }
});



