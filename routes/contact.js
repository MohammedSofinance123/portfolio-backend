const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: "Nouveau message du portfolio",
      html: `<p><strong>Nom:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`
    });

    res.status(200).json({ message: "Message envoyé avec succès." });
  } catch (error) {
    console.error("Erreur lors de l'envoi :", error);
    res.status(500).json({ error: "Erreur lors de l'envoi de l'email." });
  }
});

module.exports = router;
