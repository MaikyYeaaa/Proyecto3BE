document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("body > section");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target;
          const index = Array.from(sections).indexOf(section);
          const isEven = index % 2 === 0;

          // Determine the animation direction
          const animationDirection = isEven ? "-500px" : "500px";

          // Animate the section
          section.animate(
            [
              { opacity: 0, transform: `translateX(${animationDirection})` },
              { opacity: 1, transform: "translateX(0)" },
            ],
            {
              duration: 400,
              fill: "forwards",
            }
          );

          // Stop observing the section after it has animated
          observer.unobserve(section);
        }
      });
    },
    {
      // Adjust the threshold and other options if needed
      threshold: 0.1,
    }
  );

  sections.forEach((section) => {
    // Start observing each section
    observer.observe(section);
  });
});
