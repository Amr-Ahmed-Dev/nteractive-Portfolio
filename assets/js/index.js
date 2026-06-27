// -------------  Scroll Active  ------------ //
var htmlTag = document.documentElement;
var btnChangeMode = document.getElementById("theme-toggle-button");

document.addEventListener("DOMContentLoaded", function () {
  var navlinks = document.querySelectorAll(".nav-links a");
  var sections = [];

  for (var i = 0; i < navlinks.length; i++) {
    var sectionId = navlinks[i].getAttribute("href");
    var section = document.querySelector(sectionId);
    if (section) {
      sections.push(section);
    }
  }

  var currentActiveLink = null;

  window.onscroll = function () {
    var scrollPosition = window.scrollY + 150;

    for (var j = 0; j < sections.length; j++) {
      var sectionTop = sections[j].offsetTop;
      var sectionBottom = sectionTop + sections[j].offsetHeight;
      var id = sections[j].getAttribute("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        var targetLink = document.querySelector(
          ".nav-links a[href='#" + id + "']",
        );

        if (targetLink && currentActiveLink !== targetLink) {
          if (currentActiveLink) {
            currentActiveLink.classList.remove("text-primary");
            currentActiveLink.classList.add(
              "text-slate-600",
              "dark:text-slate-300",
            );
          }

          targetLink.classList.add("text-primary");
          targetLink.classList.remove("text-slate-600", "dark:text-slate-300");

          currentActiveLink = targetLink;
        }

        break;
      }
    }
  };
});
// -------------  Dark Theme  --------------- //

btnChangeMode.addEventListener("click", function () {
  htmlTag.classList.toggle("dark");

  if (htmlTag.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
function initTheme() {
  var savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    htmlTag.classList.add("dark");
  } else if (savedTheme === "light") {
    htmlTag.classList.remove("dark");
  }
}
initTheme();
// ------------- Navs & Tabs ---------------- //

var tabs = document.querySelectorAll("#portfolio-filters button");
var allProjects = document.querySelectorAll("#portfolio-grid .portfolio-item");

for (var i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function () {
    var filterValue = this.getAttribute("data-filter");

    for (var j = 0; j < allProjects.length; j++) {
      var project = allProjects[j];
      var projectCategory = project.getAttribute("data-category");

      if (filterValue === "all" || projectCategory === filterValue) {
        project.classList.remove("hidden");
      } else {
        project.classList.add("hidden");
      }
    }
  });
}
// ------------- Carousel ------------------- //
var nextBottom = document.getElementById("next-testimonial");
var prevBottom = document.getElementById("prev-testimonial");
var carouselTrack = document.querySelector("#testimonials-carousel");
var indicators = document.querySelectorAll(".carousel-indicator");

var maxSlides = 3;
var currentSlide = 0;

function updateSlider() {
  var amountToMove = currentSlide * (100 / 3);

  carouselTrack.style.transform = "translateX(+" + amountToMove + "%)";

  for (var k = 0; k < indicators.length; k++) {
    if (k === currentSlide) {
      indicators[k].setAttribute("aria-selected", "true");
    } else {
      indicators[k].setAttribute("aria-selected", "false");
    }
  }
}

function nextSlide() {
  if (currentSlide < maxSlides) {
    currentSlide++;
  } else {
    currentSlide = 0;
  }
  updateSlider();
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
  } else {
    currentSlide = maxSlides;
  }
  updateSlider();
}

nextBottom.addEventListener("click", nextSlide);
prevBottom.addEventListener("click", prevSlide);

for (var i = 0; i < indicators.length; i++) {
  indicators[i].addEventListener("click", function () {
    currentSlide = parseInt(this.getAttribute("data-index"));
    updateSlider();
  });
}

updateSlider();
// ---------------- gear icon ----------- //

var settingsToggle = document.getElementById("settings-toggle");
var settingsSidebar = document.getElementById("settings-sidebar");
var closeSettings = document.getElementById("close-settings");
var fontOption = document.querySelectorAll(".font-option");

settingsToggle.addEventListener("click", function (e) {
  e.stopPropagation();
  settingsSidebar.classList.replace("translate-x-full", "translate-x-0");
  settingsToggle.setAttribute("aria-expanded", "true");
});

closeSettings.addEventListener("click", function () {
  settingsSidebar.classList.replace("translate-x-0", "translate-x-full");
  settingsToggle.setAttribute("aria-expanded", "false");
});

settingsSidebar.addEventListener("click", function (e) {
  e.stopPropagation();
});

document.addEventListener("click", function () {
  if (settingsSidebar.classList.contains("translate-x-0")) {
    settingsSidebar.classList.replace("translate-x-0", "translate-x-full");
    settingsToggle.setAttribute("aria-expanded", "false");
  }
});
//--------------- Font-Option ---------------- //
var currentFont = localStorage.getItem("currentFont") || "font-tajawal";

document.body.classList.add(currentFont);

for (var k = 0; k < fontOption.length; k++) {
  if (fontOption[k].getAttribute("data-font") === currentFont) {
    fontOption[k].classList.add("active");
    fontOption[k].setAttribute("aria-checked", "true");
    break;
  }
}

for (var i = 0; i < fontOption.length; i++) {
  fontOption[i].addEventListener("click", function () {
    for (var j = 0; j < fontOption.length; j++) {
      fontOption[j].classList.remove("active");
      fontOption[j].setAttribute("aria-checked", "false");
    }

    this.classList.add("active");
    this.setAttribute("aria-checked", "true");

    var selectedFont = this.getAttribute("data-font");
    localStorage.setItem("currentFont", selectedFont);

    document.body.classList.remove(currentFont);
    document.body.classList.add(selectedFont);

    currentFont = selectedFont;
  });
}
// ------------- ColorTheme --------------- //
var buttonsTheme = document.querySelectorAll(
  "#theme-colors-grid .theme-option",
);

var savedTheme = JSON.parse(localStorage.getItem("themeColors")) || {
  primary: "#6366f1",
  secondary: "#8b5cf6",
  accent: "#845EF5",
};

document.documentElement.style.setProperty(
  "--color-primary",
  savedTheme.primary,
);
document.documentElement.style.setProperty(
  "--color-secondary",
  savedTheme.secondary,
);
document.documentElement.style.setProperty("--color-accent", savedTheme.accent);

for (var k = 0; k < buttonsTheme.length; k++) {
  if (buttonsTheme[k].getAttribute("data-primary") === savedTheme.primary) {
    buttonsTheme[k].setAttribute("aria-checked", "true");
    buttonsTheme[k].classList.add(
      "ring-2",
      "ring-primary",
      "ring-offset-2",
      "ring-offset-white",
      "dark:ring-offset-slate-900",
    );
    break;
  }
}

for (var i = 0; i < buttonsTheme.length; i++) {
  buttonsTheme[i].addEventListener("click", function () {
    var primaryColor = this.getAttribute("data-primary");
    var secondaryColor = this.getAttribute("data-secondary");
    var accentColor = this.getAttribute("data-accent");

    document.documentElement.style.setProperty("--color-primary", primaryColor);
    document.documentElement.style.setProperty(
      "--color-secondary",
      secondaryColor,
    );
    document.documentElement.style.setProperty("--color-accent", accentColor);

    var themeToSave = {
      primary: primaryColor,
      secondary: secondaryColor,
      accent: accentColor,
    };
    localStorage.setItem("themeColors", JSON.stringify(themeToSave));

    for (var j = 0; j < buttonsTheme.length; j++) {
      buttonsTheme[j].setAttribute("aria-checked", "false");
      buttonsTheme[j].classList.remove(
        "ring-2",
        "ring-primary",
        "ring-offset-2",
        "ring-offset-white",
        "dark:ring-offset-slate-900",
      );
    }

    this.setAttribute("aria-checked", "true");
    this.classList.add(
      "ring-2",
      "ring-primary",
      "ring-offset-2",
      "ring-offset-white",
      "dark:ring-offset-slate-900",
    );
  });
}
// ------------- Reset Settings ------------ //
var resetSettings = document.getElementById("reset-settings");

resetSettings.addEventListener("click", function () {
  var defaultFont = "font-tajawal";
  var defaultTheme = {
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#845EF5",
  };

  localStorage.setItem("currentFont", defaultFont);
  localStorage.setItem("themeColors", JSON.stringify(defaultTheme));

  document.body.classList.remove(currentFont);
  document.body.classList.add(defaultFont);
  currentFont = defaultFont;

  document.documentElement.style.setProperty(
    "--color-primary",
    defaultTheme.primary,
  );
  document.documentElement.style.setProperty(
    "--color-secondary",
    defaultTheme.secondary,
  );
  document.documentElement.style.setProperty(
    "--color-accent",
    defaultTheme.accent,
  );

  for (var i = 0; i < fontOption.length; i++) {
    fontOption[i].classList.remove("active");
    fontOption[i].setAttribute("aria-checked", "false");

    if (fontOption[i].getAttribute("data-font") === defaultFont) {
      fontOption[i].classList.add("active");
      fontOption[i].setAttribute("aria-checked", "true");
    }
  }

  for (var j = 0; j < buttonsTheme.length; j++) {
    buttonsTheme[j].setAttribute("aria-checked", "false");
    buttonsTheme[j].classList.remove(
      "ring-2",
      "ring-primary",
      "ring-offset-2",
      "ring-offset-white",
      "dark:ring-offset-slate-900",
    );

    if (buttonsTheme[j].getAttribute("data-primary") === defaultTheme.primary) {
      buttonsTheme[j].setAttribute("aria-checked", "true");
      buttonsTheme[j].classList.add(
        "ring-2",
        "ring-primary",
        "ring-offset-2",
        "ring-offset-white",
        "dark:ring-offset-slate-900",
      );
    }
  }
});
// ------------ scroll OnTab -------------- //
var scrollTopButtom = document.getElementById("scroll-to-top");
var fristSection = document.getElementById("hero-section");

window.addEventListener("scroll", function () {
  if (fristSection) {
    var fristSectionHeight = fristSection.offsetHeight - 100;

    if (window.scrollY > fristSectionHeight) {
      scrollTopButtom.classList.remove("opacity-0", "invisible");
      scrollTopButtom.classList.add("opacity-100", "visible");
    } else {
      scrollTopButtom.classList.remove("opacity-110", "visible");
      scrollTopButtom.classList.add("opacity-0", "invisible");
    }
  }
});
scrollTopButtom.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
  });
});
