// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when clicking a link (mobile)
  navMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Menu filter + search
const menuGrid = document.getElementById("menuGrid");
const searchInput = document.getElementById("searchInput");
const pills = document.querySelectorAll(".pill");

let activeFilter = "all";

function applyMenuFilters() {
  if (!menuGrid) return;

  const q = (searchInput?.value || "").trim().toLowerCase();
  const cards = menuGrid.querySelectorAll(".menuCard");

  cards.forEach(card => {
    const category = card.getAttribute("data-category");
    const text = card.innerText.toLowerCase();

    const matchFilter = (activeFilter === "all") || (category === activeFilter);
    const matchSearch = !q || text.includes(q);

    card.style.display = (matchFilter && matchSearch) ? "" : "none";
  });
}

pills.forEach(p => {
  p.addEventListener("click", () => {
    pills.forEach(x => {
      x.classList.remove("is-active");
      x.setAttribute("aria-selected", "false");
    });
    p.classList.add("is-active");
    p.setAttribute("aria-selected", "true");

    activeFilter = p.getAttribute("data-filter") || "all";
    applyMenuFilters();
  });
});

searchInput?.addEventListener("input", applyMenuFilters);
applyMenuFilters();
