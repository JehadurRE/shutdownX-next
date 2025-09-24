export const setupScrollReveal = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view")
        }
      })
    },
    { threshold: 0.15 },
  )

  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el)
  })

  return observer
}

export const setupParallax = () => {
  const parallaxElements = Array.from(document.querySelectorAll(".parallax"))
  let lastScrollY = window.scrollY
  let ticking = false

  const updateParallax = () => {
    lastScrollY = window.scrollY

    parallaxElements.forEach((el) => {
      const speed = Number.parseFloat((el as HTMLElement).dataset.speed || "0.08")
      ;(el as HTMLElement).style.transform = `translateY(${-(lastScrollY * speed)}px)`
    })

    ticking = false
  }

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax)
      ticking = true
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true })
  updateParallax()

  return () => {
    window.removeEventListener("scroll", onScroll)
  }
}

export const setupRippleEffects = () => {
  document.querySelectorAll(".ripple").forEach((button) => {
    button.addEventListener("pointermove", (e) => {
      const rect = button.getBoundingClientRect()
      const x = (e as PointerEvent).clientX - rect.left
      const y = (e as PointerEvent).clientY - rect.top
      ;(button as HTMLElement).style.setProperty("--x", `${x}px`)
      ;(button as HTMLElement).style.setProperty("--y", `${y}px`)
    })
  })
}

export const setupTiltEffects = () => {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const dx = ((e as MouseEvent).clientX - rect.left) / rect.width - 0.5
      const dy = ((e as MouseEvent).clientY - rect.top) / rect.height - 0.5
      ;(card as HTMLElement).style.setProperty("--ry", `${dx * 8}deg`)
      ;(card as HTMLElement).style.setProperty("--rx", `${-dy * 8}deg`)
    })

    card.addEventListener("mouseleave", () => {
      ;(card as HTMLElement).style.setProperty("--ry", "0deg")
      ;(card as HTMLElement).style.setProperty("--rx", "0deg")
    })
  })
}
