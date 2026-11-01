(() => {
  "use strict";

  const locationSection = document.querySelector("[data-office-address]");
  if (!locationSection) return;

  const address = locationSection.dataset.officeAddress;
  if (!address) return;

  const encodedAddress = encodeURIComponent(address);
  const urls = {
    route: `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`,
    search: `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
  };

  locationSection.querySelectorAll("[data-map-action]").forEach((link) => {
    const url = urls[link.dataset.mapAction];
    if (url) link.href = url;
  });

  const map = locationSection.querySelector("[data-office-map]");
  const embedUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed&z=17&hl=pt-BR`;
  if (map && map.getAttribute("src") !== embedUrl) map.src = embedUrl;
  // Hrefs e src completos também existem no HTML para funcionamento sem JS.
})();

(() => {
  "use strict";

  const header = document.querySelector("[data-site-header]");
  if (!header) return;

  const toggle = header.querySelector(".site-header__toggle");
  const navigation = header.querySelector(".site-nav");
  if (!toggle || !navigation) return;

  const desktop = window.matchMedia("(min-width: 75rem)");
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let isOpen = false;
  let menuAnimation;
  let scrollFrame = 0;
  let measureFrame = 0;

  const syncNavigationIndicator = () => {
    const hash = window.location.hash || "#conteudo";
    const currentHash = hash === "#inicio" ? "#conteudo" : hash;
    navigation.querySelectorAll('a[href^="#"]').forEach((link) => {
      if (link.hash === currentHash) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const cancelMenuAnimation = () => {
    if (menuAnimation) menuAnimation.cancel();
    menuAnimation = undefined;
  };

  const setMenuOpen = (open, returnFocus = false) => {
    cancelMenuAnimation();
    isOpen = !desktop.matches && open;
    navigation.hidden = !desktop.matches && !isOpen;
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação");
    header.toggleAttribute("data-menu-open", isOpen);

    if (returnFocus) toggle.focus({ preventScroll: true });
    if (!isOpen || motionPreference.matches || typeof navigation.animate !== "function") return;
    if (navigation.contains(document.activeElement)) return;

    try {
      const animation = navigation.animate([
        { opacity: 0, transform: "translateY(-10px)" },
        { opacity: 1, transform: "translateY(0)" },
      ], { duration: 320, easing: "cubic-bezier(0.22, 1, 0.36, 1)" });
      menuAnimation = animation;
      const releaseAnimation = () => {
        if (menuAnimation === animation) menuAnimation = undefined;
      };
      animation.finished.then(releaseAnimation, releaseAnimation);
    } catch {
      // O painel continua acessível quando a animação não está disponível.
    }
  };

  const updateHeaderHeight = () => {
    const height = Math.ceil(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty("--site-header-height", `${height}px`);
    document.documentElement.style.setProperty("--header-offset", `${height + 16}px`);
  };

  const scheduleMeasurement = () => {
    if (measureFrame) return;
    measureFrame = window.requestAnimationFrame(() => {
      measureFrame = 0;
      updateHeaderHeight();
    });
  };

  const syncBreakpoint = () => {
    const focusWasInNavigation = navigation.contains(document.activeElement);
    const focusWasOnToggle = document.activeElement === toggle;
    toggle.hidden = desktop.matches;
    setMenuOpen(false);

    if (!desktop.matches && focusWasInNavigation) toggle.focus({ preventScroll: true });
    if (desktop.matches && focusWasOnToggle) {
      const firstLink = navigation.querySelector("a[href]");
      if (firstLink) firstLink.focus({ preventScroll: true });
    }
    scheduleMeasurement();
  };

  toggle.addEventListener("click", () => {
    setMenuOpen(!isOpen);
  });

  toggle.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowDown" || desktop.matches) return;
    event.preventDefault();
    setMenuOpen(true);
    const firstLink = navigation.querySelector("a[href]");
    if (firstLink) firstLink.focus({ preventScroll: true });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !isOpen) return;
    event.preventDefault();
    setMenuOpen(false, true);
  });

  navigation.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || !navigation.contains(link) || desktop.matches) return;
    setMenuOpen(false);
    // Mantém o destino e o histórico nativos; o foco segue a âncora válida.
    if (link.hash) {
      const destination = document.getElementById(link.hash.slice(1));
      if (destination) destination.focus({ preventScroll: true });
    }
  });

  document.addEventListener("pointerdown", (event) => {
    if (isOpen && !header.contains(event.target)) setMenuOpen(false);
  });

  document.addEventListener("focusin", (event) => {
    if (navigation.contains(event.target)) cancelMenuAnimation();
    if (isOpen && !header.contains(event.target)) setMenuOpen(false);
  });

  window.addEventListener("scroll", () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(() => {
      scrollFrame = 0;
      header.toggleAttribute("data-scrolled", window.scrollY > 16);
    });
  }, { passive: true });

  window.addEventListener("resize", scheduleMeasurement, { passive: true });
  window.addEventListener("hashchange", syncNavigationIndicator);

  if (typeof desktop.addEventListener === "function") {
    desktop.addEventListener("change", syncBreakpoint);
    motionPreference.addEventListener("change", cancelMenuAnimation);
  } else {
    desktop.addListener(syncBreakpoint);
    motionPreference.addListener(cancelMenuAnimation);
  }

  // O botão só aparece depois de todos os eventos estarem prontos.
  syncBreakpoint();
  header.setAttribute("data-navigation-ready", "");
  document.body.classList.add("has-site-header");
  syncNavigationIndicator();
  header.toggleAttribute("data-scrolled", window.scrollY > 16);
  updateHeaderHeight();

  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(scheduleMeasurement);
    resizeObserver.observe(header);
  }
})();

(() => {
  "use strict";

  const elements = Array.from(document.querySelectorAll("[data-reveal]"));

  if (elements.length === 0) return;

  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const activeAnimations = new Map();
  const revealedElements = new WeakSet();
  let observer;

  const getDelay = (element) => {
    const configuredDelay = Number(element.dataset.revealDelay);
    if (Number.isFinite(configuredDelay)) {
      return Math.min(Math.max(configuredDelay, 0), 240);
    }

    const group = element.closest("[data-stagger]");
    if (!group) return 0;

    const siblings = Array.from(group.querySelectorAll("[data-reveal]"));
    return Math.min(Math.max(siblings.indexOf(element), 0) * 80, 240);
  };

  const reveal = (element) => {
    if (revealedElements.has(element)) return;
    revealedElements.add(element);

    if (motionPreference.matches || typeof element.animate !== "function") return;
    if (element.contains(document.activeElement)) return;

    const variants = {
      opacity: [
        { opacity: 0 },
        { opacity: 1 },
      ],
      fade: [
        { opacity: 0, transform: "translateY(28px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      title: [
        { opacity: 0, clipPath: "inset(0 0 100% 0)", transform: "translateY(24px)" },
        { opacity: 1, clipPath: "inset(0 0 0 0)", transform: "translateY(0)" },
      ],
      line: [
        { transform: "scaleX(0)" },
        { transform: "scaleX(1)" },
      ],
    };

    try {
      const animation = element.animate(variants[element.dataset.reveal] || variants.fade, {
        duration: element.dataset.reveal === "line" ? 850 : 700,
        delay: getDelay(element),
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "backwards",
      });

      activeAnimations.set(element, animation);
      animation.finished.then(
        () => activeAnimations.delete(element),
        () => activeAnimations.delete(element),
      );
    } catch {
      // Sem suporte à animação, o conteúdo permanece visível no seu estado natural.
    }
  };

  const stopAnimations = () => {
    if (observer) observer.disconnect();
    activeAnimations.forEach((animation) => animation.cancel());
    activeAnimations.clear();
  };

  const startAnimations = () => {
    if (motionPreference.matches) return;

    if (!("IntersectionObserver" in window)) {
      // O fallback não oculta nem atrasa nenhum conteúdo.
      return;
    }

    try {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          reveal(entry.target);
        });
      }, { threshold: 0, rootMargin: "0px 0px -6% 0px" });

      elements.forEach((element) => {
        if (!revealedElements.has(element)) observer.observe(element);
      });
    } catch {
      stopAnimations();
    }
  };

  const onMotionPreferenceChange = () => {
    stopAnimations();
    startAnimations();
  };

  document.addEventListener("focusin", (event) => {
    activeAnimations.forEach((animation, element) => {
      if (element.contains(event.target)) animation.cancel();
    });
  });

  if (typeof motionPreference.addEventListener === "function") {
    motionPreference.addEventListener("change", onMotionPreferenceChange);
  } else if (typeof motionPreference.addListener === "function") {
    motionPreference.addListener(onMotionPreferenceChange);
  }

  startAnimations();
})();

(() => {
  "use strict";

  const link = document.querySelector("[data-whatsapp-float]");
  if (!link) return;

  const obstacles = Array.from(document.querySelectorAll(".location__map, .contact__details"));
  const alternatives = Array.from(document.querySelectorAll('a[href^="https://wa.me/"]'))
    .filter((candidate) => candidate !== link);
  const header = document.querySelector("[data-site-header]");
  let updatePending = false;

  const updateVisibility = () => {
    try {
      // O controle nunca desaparece enquanto a pessoa está usando o teclado nele.
      if (document.activeElement === link) {
        link.removeAttribute("data-obscured");
        return;
      }

      const floatingRect = link.getBoundingClientRect();
      const headerBottom = header ? Math.max(0, header.getBoundingClientRect().bottom) : 0;
      const inlineLinkVisible = alternatives.some((candidate) => {
        const rect = candidate.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0
          && rect.top >= headerBottom && rect.bottom <= window.innerHeight
          && rect.left >= 0 && rect.right <= window.innerWidth;
      });
      const overlaps = obstacles.some((obstacle) => {
        const rect = obstacle.getBoundingClientRect();
        return Math.min(floatingRect.right, rect.right) > Math.max(floatingRect.left, rect.left)
          && Math.min(floatingRect.bottom, rect.bottom) > Math.max(floatingRect.top, rect.top);
      });

      link.toggleAttribute("data-obscured", overlaps || inlineLinkVisible);
    } catch {
      // Uma falha de medição não impede o acesso ao WhatsApp.
      link.removeAttribute("data-obscured");
    }
  };

  const scheduleUpdate = () => {
    if (updatePending) return;
    updatePending = true;

    const run = () => {
      updatePending = false;
      updateVisibility();
    };

    if (typeof window.requestAnimationFrame === "function") {
      try {
        window.requestAnimationFrame(run);
        return;
      } catch {
        // Sem essa API, a medição ainda pode acontecer no próprio evento.
      }
    }

    run();
  };

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
  window.addEventListener("load", scheduleUpdate);
  document.addEventListener("focusin", scheduleUpdate);
  document.addEventListener("focusout", scheduleUpdate);

  if (typeof window.ResizeObserver === "function") {
    try {
      const observer = new window.ResizeObserver(scheduleUpdate);
      if (document.body) observer.observe(document.body);
      obstacles.forEach((obstacle) => observer.observe(obstacle));
    } catch {
      // Os eventos de janela e foco continuam funcionando sem esse observador.
    }
  }

  scheduleUpdate();
})();
