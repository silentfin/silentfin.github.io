// Initialize particles.js for the background
particlesJS("particles-js", {
    particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },  // White particles (stars)
        shape: {
            type: "circle",  // Simple circular particles (star-like)
        },
        opacity: { value: 0.7 },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            opacity: 0.5,
            color: "#ffffff"  // White lines connecting the particles
        },
        move: {
            enable: true,
            speed: 3,  // Faster particle movement to simulate stars in space
            direction: "none",
            random: true,
            out_mode: "out"
        }
    },
    interactivity: {
        events: {
            onhover: { enable: true, mode: "repulse" },  // Repulsion effect on hover
        }
    },
    retina_detect: true
});

// Canvas setup for clicking shapes
const clickCanvas = document.getElementById("clickCanvas");
const ctx = clickCanvas.getContext("2d");

// Resize the canvas to full screen
function resizeCanvas() {
    clickCanvas.width = window.innerWidth;
    clickCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// --- Random Movement of "51N6H" with DVD-style Bounce ---

// Store the "51N6H" text
const movingText = document.createElement("div");
movingText.innerText = "51N6H";
movingText.style.position = "absolute";
movingText.style.fontSize = "50px";
movingText.style.fontWeight = "bold";
movingText.style.color = "#ff4d4d";  // Neon red color
movingText.style.zIndex = "100";
movingText.style.pointerEvents = "none";  // To ensure it doesn't block clicks
movingText.style.transition = "left 0.1s ease, top 0.1s ease";  // Smooth transition when moving

document.body.appendChild(movingText);

// Initial random position and velocity (increased speed)
let x = Math.random() * window.innerWidth;
let y = Math.random() * window.innerHeight;
let dx = (Math.random() - 0.5) * 7;  // Increased speed in x direction
let dy = (Math.random() - 0.5) * 7;  // Increased speed in y direction
let moveInterval = 1000 / 60;  // Frame rate (60fps)

// Function to update the position of the "51N6H" text with DVD-style bounce
function updateTextPosition() {
    // Update the position based on current velocity
    x += dx;
    y += dy;

    // Check for boundaries (bounce effect)
    if (x + movingText.offsetWidth > window.innerWidth || x < 0) {
        dx = -dx;  // Reverse direction on x-axis
    }
    if (y + movingText.offsetHeight > window.innerHeight || y < 0) {
        dy = -dy;  // Reverse direction on y-axis
    }

    // Ensure the text never goes out of bounds
    if (x < 0) x = 0;
    if (x + movingText.offsetWidth > window.innerWidth) x = window.innerWidth - movingText.offsetWidth;
    if (y < 0) y = 0;
    if (y + movingText.offsetHeight > window.innerHeight) y = window.innerHeight - movingText.offsetHeight;

    // Update the style to move the text
    movingText.style.left = `${x}px`;
    movingText.style.top = `${y}px`;
}

// Mouse proximity settings
const mouseThreshold = 200;  // Distance threshold for mouse interaction

// Function to check if the mouse is near the text
let mouseX = 0;
let mouseY = 0;
document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// Function to check if the text is near the mouse cursor
function checkMouseProximity() {
    const distance = Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2));

    // If the mouse is within the threshold distance, move the text to a new random location
    if (distance < mouseThreshold) {
        // Swiftly move the text to a new random location
        x = Math.random() * window.innerWidth;
        y = Math.random() * window.innerHeight;
        dx = (Math.random() - 0.5) * 7;  // Randomize velocity with increased speed
        dy = (Math.random() - 0.5) * 7;  // Randomize velocity with increased speed
    }
}

// Main animation loop
function animate() {
    updateTextPosition();
    checkMouseProximity();
    requestAnimationFrame(animate);
}

// Start the animation
animate();
