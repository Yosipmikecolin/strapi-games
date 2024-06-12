import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN,
});
const preference = new Preference(client);

export default {
  createPreference: async (ctx) => {
    try {
      const { products, filename, token, address, user_id } = ctx.request.body;

      //* Crea una nueva preferencia de pago con los datos del producto
      const result = await preference.create({
        body: {
          items: products,
          back_urls: {
            success: "https://ecommerce-games-taupe.vercel.app/",
            failure: "https://ecommerce-games-taupe.vercel.app/",
            pending: "https://ecommerce-games-taupe.vercel.app/order",
          },
          auto_return: "approved",
          payment_methods: {
            installments: 12,
          },
          notification_url:
            "https://ecommerce-games-taupe.vercel.app/api/webhooks/mercado-pago",
          metadata: {
            filename,
            token,
            address,
            user_id,
          },
        },
      });

      const { id, sandbox_init_point } = result;
      return { id, sandbox_init_point };
    } catch (error) {
      console.error("Error al crear la preferencia de pago:", error);
      return ctx.badRequest("Error al crear la preferencia de pago");
    }
  },
};
