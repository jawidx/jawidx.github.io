const userAgent = navigator.userAgent.toLowerCase()
const platform =
  userAgent.includes("windows") || userAgent.includes("win64")
    ? "windows"
    : userAgent.includes("mac") || userAgent.includes("iphone")
      ? "mac"
      : null

if (platform) {
  document
    .querySelectorAll(`[data-platform="${platform}"]`)
    .forEach((link) => link.classList.add("is-recommended"))

  document
    .querySelector(`[data-download-option="${platform}"]`)
    ?.classList.add("is-recommended")
}

document.getElementById("current-year").textContent = String(
  new Date().getFullYear(),
)

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches

if (!reduceMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add("is-visible")
        observer.unobserve(entry.target)
      })
    },
    { threshold: 0.12 },
  )

  document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element)
  })

  const stage = document.querySelector(".product-stage")
  const layers = stage?.querySelectorAll("[data-depth]")

  stage?.addEventListener("pointermove", (event) => {
    const bounds = stage.getBoundingClientRect()
    const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5
    const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5

    layers?.forEach((layer) => {
      const depth = Number(layer.dataset.depth)
      layer.style.transform = `translate(${offsetX * depth}px, ${offsetY * depth}px)`
    })
  })

  stage?.addEventListener("pointerleave", () => {
    layers?.forEach((layer) => {
      layer.style.transform = ""
    })
  })
} else {
  document
    .querySelectorAll(".reveal")
    .forEach((element) => element.classList.add("is-visible"))
}
