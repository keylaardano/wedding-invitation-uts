
const coverPage = document.getElementById("cover-page");
const insidePage = document.getElementById("inside-page");

const openButton = document.getElementById("open-button");
const backButton = document.getElementById("back-button");

openButton.addEventListener("click", function () {
coverPage.classList.remove("active");
coverPage.hidden = true;

insidePage.hidden = false;
insidePage.classList.add("active");
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


const pageThree = document.querySelector(".page-three");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        pageThree.classList.add("animate-in");
        observer.unobserve(pageThree);
      }
    });
  },
  {
    threshold: 0.2
  }
);

observer.observe(pageThree);


const viewMap = document.getElementById("viewMap");

viewMap.addEventListener("click", function () {
  const mapUrl =
    "https://www.google.com/maps/search/?api=1&query=Villa+la+Vigie+Monaco";

  window.open(mapUrl, "_blank");
});


const weddingDate = new Date("2027-02-28T00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance <= 0) {
    document.querySelector(".countdown-timer").innerHTML =
      "<p>Today is the day!</p>";
    document.querySelector(".countdown-date").textContent =
      "28 February 2027";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor(
    (distance % (1000 * 60)) / 1000
  );

  document.getElementById("days").textContent =
    String(days).padStart(3, "0");

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


const rsvpForm = document.getElementById("rsvp-form");

if (rsvpForm) {
  rsvpForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(rsvpForm);

    const data = {
      guest_name: formData.get("guest_name")?.trim(),
      email: formData.get("email")?.trim(),
      attendance: formData.get("attendance"),
      guest_count: formData.get("guest_count")
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/rsvp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "RSVP gagal dikirim.");
        return;
      }

      alert(result.message);
      rsvpForm.reset();

    } catch (error) {
      console.error("RSVP error:", error);

      alert(
        "Tidak dapat mengirim RSVP. Pastikan server RSVP sedang berjalan."
      );
    }
  });
}


const whatsappNumber = "6285730738637";
const questionsForm = document.getElementById("questions-form");

if (questionsForm) {
  questionsForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const guestName = document
      .getElementById("question-name")
      .value.trim();

    const guestQuestion = document
      .getElementById("question-message")
      .value.trim();

    if (!guestName || !guestQuestion) {
      alert("Please fill in your name and question.");
      return;
    }

    const message =
      `Hello! My name is ${guestName}.\n\n` +
      `I have a question about your wedding:\n${guestQuestion}`;

    const whatsappUrl =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  });
}


const song = document.getElementById("wedding-song");
const vinyl = document.getElementById("vinyl-record");
const musicToggle = document.getElementById("music-toggle");
const musicStatus = document.getElementById("music-status");
const musicIndicator = document.getElementById("music-indicator");

musicToggle.addEventListener("click", async function () {
  if (song.paused) {
    try {
      await song.play();
    } catch (error) {
      musicStatus.textContent = "Unable to play";
    }
  } else {
    song.pause();
  }
});

song.addEventListener("play", function () {
  vinyl.classList.add("playing");
  musicIndicator.classList.add("playing");
  musicToggle.textContent = "Ⅱ";
  musicToggle.setAttribute("aria-label", "Pause music");
  musicStatus.textContent = "Now playing";
});

song.addEventListener("pause", function () {
  vinyl.classList.remove("playing");
  musicIndicator.classList.remove("playing");
  musicToggle.textContent = "▶";
  musicToggle.setAttribute("aria-label", "Play music");
  musicStatus.textContent = "Music paused";
});

song.addEventListener("ended", function () {
  musicStatus.textContent = "Song ended";
});



