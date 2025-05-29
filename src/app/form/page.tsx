"use client";

import { useState } from "react";

export default function AdvertiseForm() {
  const [formData, setFormData] = useState({
    businessName: "",
    contactEmail: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/send-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ businessName: "", contactEmail: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-lg mx-auto my-16 px-4"
    >
      <h3 className="text-2xl font-semibold mb-6 text-center">
        Formulario para solicitar anuncio
      </h3>

      <div>
        <label htmlFor="businessName" className="block mb-1 font-medium">
          Nombre del negocio:
        </label>
        <input
          type="text"
          id="businessName"
          name="businessName"
          required
          value={formData.businessName}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div>
        <label htmlFor="contactEmail" className="block mb-1 font-medium">
          Correo electrónico:
        </label>
        <input
          type="email"
          id="contactEmail"
          name="contactEmail"
          required
          value={formData.contactEmail}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div>
        <label htmlFor="message" className="block mb-1 font-medium">
          Mensaje o detalles:
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-blue-900 text-white py-3 rounded-md font-semibold hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Enviando..." : "Enviar solicitud"}
      </button>

      {status === "success" && (
        <p className="text-green-600 mt-4 text-center">
          ¡Solicitud enviada correctamente!
        </p>
      )}
      {status === "error" && (
        <p className="text-red-600 mt-4 text-center">
          Error al enviar la solicitud. Intenta de nuevo.
        </p>
      )}
    </form>
  );
}
