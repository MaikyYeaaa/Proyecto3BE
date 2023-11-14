document.addEventListener("DOMContentLoaded", function () {
  const sections = Array.from(document.getElementsByClassName("animar"));

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Optional: Stop observing after animation
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section, index) => {
    if (index % 2 === 0) {
      section.classList.add("even");
    }
    observer.observe(section);
  });
});
