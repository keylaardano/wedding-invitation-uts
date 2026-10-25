
const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/api/rsvp", async (req, res) => {
    const { guest_name, email, attendance, guest_count } = req.body;

    const name = typeof guest_name === "string"
        ? guest_name.trim()
        : "";

    const guestEmail = typeof email === "string"
        ? email.trim()
        : "";

    const count = Number(guest_count);

    // Validasi data dari form
    if (
        !name ||
        name.length > 150 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestEmail) ||
        guestEmail.length > 150 ||
        !["attending", "not_attending"].includes(attendance) ||
        ![1, 2].includes(count)
    ) {
        return res.status(400).json({
            success: false,
            message: "Please check your RSVP details."
        });
    }

    try {
        await db.execute(
            `INSERT INTO rsvp
            (guest_name, email, attendance, guest_count)
            VALUES (?, ?, ?, ?)`,
            [name, guestEmail, attendance, count]
        );

        return res.json({
            success: true,
            message: "Your RSVP has been recorded. Thank you!"
        });

    } catch (error) {
        // Email yang sama tidak bisa mendaftar dua kali
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                success: false,
                message: "This email has already been registered."
            });
        }

        console.error("RSVP error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to save your RSVP. Please try again."
        });
    }
});

app.listen(PORT, () => {
    console.log(`RSVP server running at http://localhost:${PORT}`);
});
