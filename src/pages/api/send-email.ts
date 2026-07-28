export const prerender = false;
import type { APIRoute } from "astro";
import { BrevoClient } from "@getbrevo/brevo";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const { name, email, message } = data;

  const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
  });

  try {
    await brevo.transactionalEmails.sendTransacEmail({
      subject: `Nuevo mensaje de: ${name}`,
      sender: {
        name: "Portfolio",
        email: "joseprogrammerdeveloper@gmail.com",
      },
      to: [{ email: "jabecerramorilla21@gmail.com" }],

      htmlContent: `
        <p><strong>De:</strong> ${name} (${email})</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    return new Response(
      JSON.stringify({ message: "Correo enviado con éxito" }),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error al enviar correo:", error);
    return new Response(JSON.stringify({ message: "Error al enviar" }), {
      status: 500,
    });
  }
};
