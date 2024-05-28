import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN,
});
const preference = new Preference(client);

export default {
  createPreference: async (ctx) => {
    try {
      const products = ctx.request.body;

      //* Crea una nueva preferencia de pago con los datos del producto
      const result = await preference.create({
        body: {
          items: products,
          back_urls: {
            success: "https://ecommerce-games-taupe.vercel.app/",
          },
          auto_return: "approved",
        },
      });

      const { id, init_point } = result;
      return { id, init_point };
    } catch (error) {
      console.error("Error al crear la preferencia de pago:", error);
      return ctx.badRequest("Error al crear la preferencia de pago");
    }
  },
};
