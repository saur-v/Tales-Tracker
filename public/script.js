// ==========================================================================
// The Starlight Weaver - Interactive Storytelling Experience
// ==========================================================================

// Import GSAP and plugins
const gsap = window.gsap
const ScrollTrigger = window.ScrollTrigger
const MotionPathPlugin = window.MotionPathPlugin

// GSAP Registration
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

// ==========================================================================
// Custom Cursor
// ==========================================================================
class CustomCursor {
  constructor() {
    this.cursor = document.querySelector(".custom-cursor")
    this.init()
  }

  init() {
    // Mouse move event
    document.addEventListener("mousemove", (e) => {
      gsap.to(this.cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.1,
        ease: "power2.out",
      })
    })

    // Hover effects
    const hoverElements = document.querySelectorAll("a, button, .choice-card, .magnetic-btn")

    hoverElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        this.cursor.classList.add("hover")
      })

      element.addEventListener("mouseleave", () => {
        this.cursor.classList.remove("hover")
      })
    })
  }
}

// ==========================================================================
// Navigation Controller
// ==========================================================================
class NavigationController {
  constructor() {
    this.nav = document.getElementById("navigation")
    this.navLinks = document.querySelectorAll(".nav-links a")
    this.indicator = document.querySelector(".nav-indicator")
    this.sections = document.querySelectorAll("section")
    this.lastScrollY = window.scrollY

    this.init()
  }

  init() {
    // Hide/show navigation on scroll
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
        this.nav.classList.add("hidden")
      } else {
        this.nav.classList.remove("hidden")
      }

      this.lastScrollY = currentScrollY
      this.updateActiveSection()
    })

    // Smooth scroll for navigation links
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = link.getAttribute("href")
        const targetSection = document.querySelector(targetId)

        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }

  updateActiveSection() {
    let current = ""

    this.sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    this.navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
        this.updateIndicator(link)
      }
    })
  }

  updateIndicator(activeLink) {
    const linkRect = activeLink.getBoundingClientRect()
    const navRect = this.nav.getBoundingClientRect()

    gsap.to(this.indicator, {
      width: linkRect.width,
      x: linkRect.left - navRect.left,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    })
  }
}

// ==========================================================================
// Hero Section Animations
// ==========================================================================
class HeroAnimations {
  constructor() {
    this.titleChars = document.querySelectorAll(".title-char")
    this.subtitle = document.querySelector(".hero-subtitle")
    this.scrollArrow = document.querySelector(".scroll-arrow")

    this.init()
  }

  init() {
    // Create hero timeline
    const heroTL = gsap.timeline({ delay: 0.5 })

    // Animate title characters
    heroTL.fromTo(
      this.titleChars,
      {
        opacity: 0,
        y: 50,
        rotationX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(1.7)",
      },
    )

    // Animate subtitle
    heroTL.fromTo(
      this.subtitle,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.3",
    )

    // Animate scroll arrow
    heroTL.fromTo(
      this.scrollArrow.parentElement,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.5",
    )
  }
}

// ==========================================================================
// Weaver Section Animations
// ==========================================================================
class WeaverAnimations {
  constructor() {
    this.weaverText = document.querySelector(".weaver-text")
    this.weaverImage = document.querySelector(".weaver-image")

    this.init()
  }

  init() {
    // Create ScrollTrigger for weaver section
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".weaver-section",
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      })
      .to(this.weaverText, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
      })
      .to(
        this.weaverImage,
        {
          opacity: 1,
          x: 0,
          rotation: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.5",
      )
  }
}

// ==========================================================================
// Quest Section - Star Path Animation
// ==========================================================================
class QuestAnimations {
  constructor() {
    this.starTraveler = document.querySelector(".star-traveler")
    this.motionPath = document.querySelector("#motion-path")

    this.init()
  }

  init() {
    // Create star path animation
    const questTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".quest-section",
        start: "top 60%",
        end: "bottom 40%",
        toggleActions: "play none none reverse",
      },
    })

    // Animate star along path
    questTL
      .fromTo(
        this.starTraveler,
        {
          opacity: 0,
          scale: 0,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
      )
      .to(this.starTraveler, {
        motionPath: {
          path: "#motion-path",
          align: "#motion-path",
          alignOrigin: "0.5 0.5",
          autoRotate: true,
        },
        duration: 3,
        ease: "power2.inOut",
      })

    // Add pulsing glow effect
    gsap.to(this.starTraveler, {
      filter: "drop-shadow(0 0 10px #ffd166) drop-shadow(0 0 20px #4cc9f0)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    })
  }
}

// ==========================================================================
// Journey Section - Parallax Effects
// ==========================================================================
class JourneyAnimations {
  constructor() {
    this.journeyPanels = document.querySelectorAll(".journey-panel")
    this.journeyCards = document.querySelectorAll(".journey-card")

    this.init()
  }

  init() {
    // Set background images
    this.journeyPanels.forEach((panel, index) => {
      const bgUrl = panel.dataset.bg
      if (bgUrl) {
        panel.style.backgroundImage = `url(${bgUrl})`
      }
    })

    // Animate journey cards
    this.journeyCards.forEach((card, index) => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        })
        .to(card, {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
        })
    })

    // Parallax effect for background images
    this.journeyPanels.forEach((panel) => {
      gsap.to(panel, {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: panel,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    })
  }
}

// ==========================================================================
// Revelation Section - Crystal Animation
// ==========================================================================
class RevelationAnimations {
  constructor() {
    this.revelationContent = document.querySelector(".revelation-content")
    this.crystal = document.querySelector(".crystal")
    this.crystalFacets = document.querySelectorAll(".crystal-facet")

    this.init()
  }

  init() {
    // Animate revelation content
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".revelation-section",
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      })
      .to(this.revelationContent, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
      })

    // Enhanced crystal animation
    this.crystalFacets.forEach((facet, index) => {
      gsap.to(facet, {
        filter: `hue-rotate(${index * 90}deg) brightness(1.5)`,
        duration: 2,
        repeat: -1,
        yoyo: true,
        delay: index * 0.5,
        ease: "power2.inOut",
      })
    })

    // Crystal glow pulse
    gsap.to(this.crystal, {
      filter: "drop-shadow(0 0 30px #4cc9f0) drop-shadow(0 0 60px #7b4bcf)",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    })
  }
}

// ==========================================================================
// Choice Section - Interactive Elements
// ==========================================================================
class ChoiceInteractions {
  constructor() {
    this.choiceCards = document.querySelectorAll(".choice-card")
    this.choiceButtons = document.querySelectorAll(".choice-button")
    this.choiceResult = document.getElementById("choice-result")

    this.init()
  }

  init() {
    // Add magnetic effect to choice cards
    this.choiceCards.forEach((card) => {
      card.addEventListener("mouseenter", (e) => {
        gsap.to(card, {
          scale: 1.05,
          rotationY: 5,
          duration: 0.3,
          ease: "power2.out",
        })
      })

      card.addEventListener("mouseleave", (e) => {
        gsap.to(card, {
          scale: 1,
          rotationY: 0,
          duration: 0.3,
          ease: "power2.out",
        })
      })

      // Add wave effect on hover
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        gsap.to(card, {
          "--mouse-x": `${x}px`,
          "--mouse-y": `${y}px`,
          duration: 0.1,
        })
      })
    })

    // Handle choice selection
    this.choiceButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const choice = e.target.closest(".choice-card").dataset.choice
        this.handleChoice(choice, e.target)
      })
    })
  }

  handleChoice(choice, button) {
    // Animate button click
    gsap.to(button, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    })

    // Show result
    const resultText =
      choice === "rekindle"
        ? "Elara's sacrifice illuminates the cosmos, her light becoming eternal in every star she rekindles. The universe lives on, forever grateful for her selfless choice."
        : "Elara merges with the First Star, becoming a new cosmic force. Light and darkness dance in perfect harmony, creating a universe more beautiful than ever imagined."

    this.choiceResult.innerHTML = `
            <h3 style="color: var(--shimmering-gold); margin-bottom: 1rem;">Your Choice Echoes Through Eternity</h3>
            <p>${resultText}</p>
        `

    gsap.fromTo(
      this.choiceResult,
      {
        opacity: 0,
        y: 30,
        display: "none",
      },
      {
        opacity: 1,
        y: 0,
        display: "block",
        duration: 1,
        ease: "power2.out",
      },
    )
  }
}

// ==========================================================================
// Epilogue Section - Form Interactions
// ==========================================================================
class EpilogueAnimations {
  constructor() {
    this.epilogueContent = document.querySelector(".epilogue-content")
    this.newsletterForm = document.getElementById("newsletter-form")
    this.emailInput = document.getElementById("email")
    this.submitBtn = document.querySelector(".submit-btn")

    this.init()
  }

  init() {
    // Animate epilogue content
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".epilogue-section",
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      })
      .to(this.epilogueContent, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
      })

    // Enhanced form interactions
    this.emailInput.addEventListener("focus", () => {
      gsap.to(this.emailInput, {
        scale: 1.02,
        boxShadow: "0 0 30px rgba(76, 201, 240, 0.3)",
        duration: 0.3,
        ease: "power2.out",
      })
    })

    this.emailInput.addEventListener("blur", () => {
      gsap.to(this.emailInput, {
        scale: 1,
        boxShadow: "none",
        duration: 0.3,
        ease: "power2.out",
      })
    })

    // Form submission
    this.newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()
      this.handleFormSubmission()
    })

    // Magnetic button effect
    this.addMagneticEffect(this.submitBtn)
  }

  addMagneticEffect(element) {
    element.addEventListener("mouseenter", (e) => {
      gsap.to(element, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      })
    })

    element.addEventListener("mouseleave", (e) => {
      gsap.to(element, {
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      })
    })

    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(element, {
        x: x * 0.1,
        y: y * 0.1,
        duration: 0.1,
        ease: "power2.out",
      })
    })
  }

  handleFormSubmission() {
    const email = this.emailInput.value

    if (email) {
      // Animate success
      gsap.to(this.submitBtn, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
          this.submitBtn.innerHTML = '<span class="btn-text">Welcome to the Constellation! ✨</span>'
          gsap.to(this.submitBtn, {
            backgroundColor: "#4cc9f0",
            duration: 0.5,
            ease: "power2.out",
          })
        },
      })

      // Clear form after delay
      setTimeout(() => {
        this.emailInput.value = ""
        this.submitBtn.innerHTML = '<span class="btn-text">Weave Your Light</span><span class="btn-glow"></span>'
        gsap.to(this.submitBtn, {
          backgroundColor: "linear-gradient(135deg, var(--shimmering-gold), var(--iridescent-blue))",
          duration: 0.5,
          ease: "power2.out",
        })
      }, 3000)
    }
  }
}

// ==========================================================================
// Intersection Observer for Fade-in Effects
// ==========================================================================
class FadeInObserver {
  constructor() {
    this.elements = document.querySelectorAll(".fade-in")
    this.init()
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    this.elements.forEach((element) => {
      observer.observe(element)
    })
  }
}

// ==========================================================================
// Performance Optimization
// ==========================================================================
class PerformanceOptimizer {
  constructor() {
    this.init()
  }

  init() {
    // Lazy load images
    const images = document.querySelectorAll('img[loading="lazy"]')

    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target
            img.src = img.dataset.src || img.src
            img.classList.remove("lazy")
            imageObserver.unobserve(img)
          }
        })
      })

      images.forEach((img) => imageObserver.observe(img))
    }

    // Optimize GSAP performance
    gsap.config({
      force3D: true,
      nullTargetWarn: false,
    })

    // Reduce motion for users who prefer it
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.globalTimeline.timeScale(0.5)
    }
  }
}

// ==========================================================================
// Application Initialization
// ==========================================================================
class StarlightWeaverApp {
  constructor() {
    this.init()
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.initializeComponents())
    } else {
      this.initializeComponents()
    }
  }

  initializeComponents() {
    // Initialize all components
    new CustomCursor()
    new NavigationController()
    new HeroAnimations()
    new WeaverAnimations()
    new QuestAnimations()
    new JourneyAnimations()
    new RevelationAnimations()
    new ChoiceInteractions()
    new EpilogueAnimations()
    new FadeInObserver()
    new PerformanceOptimizer()

    // Add global scroll effects
    this.initGlobalEffects()

    console.log("🌟 The Starlight Weaver experience has begun...")
  }

  initGlobalEffects() {
    // Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })

    // Add scroll-based opacity effects
    gsap.utils.toArray(".section-content").forEach((content) => {
      gsap.fromTo(
        content,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: content,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })
  }
}

// Initialize the application
new StarlightWeaverApp()

// ==========================================================================
// Additional Utility Functions
// ==========================================================================

// Debounce function for performance
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Random number generator for effects
function random(min, max) {
  return Math.random() * (max - min) + min
}

// Easing functions
const easing = {
  easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
  easeOutQuart: (t) => 1 - --t * t * t * t,
  easeInOutQuart: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),
}

// Console styling for development
console.log("%c🌟 The Starlight Weaver", "color: #ffd166; font-size: 24px; font-weight: bold;")
console.log("%cA cinematic storytelling experience", "color: #4cc9f0; font-size: 14px;")
console.log("%cBuilt with GSAP, ScrollTrigger, and pure JavaScript", "color: #7b4bcf; font-size: 12px;")
