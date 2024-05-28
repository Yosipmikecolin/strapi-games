module.exports = ({ env }) => ({
  upload: {
    
    config: {
      provider: "aws-s3",
      providerOptions: {
        s3Options: {
          credentials: {
            accessKeyId: env("AWS_ACCESS_KEY_ID"),
            secretAccessKey: env("AWS_ACCESS_SECRET"),
          },
          region: env("AWS_REGION"),
          params: {
            Bucket: env("AWS_BUCKET"),
          },
        },
      },
      uploadOptions: {
        transform: false, // <--- Agrega esta línea para deshabilitar la transformación de imágenes
      },
      sizeOptimization: {
        enabled: false, // <--- Agrega esta línea para deshabilitar la optimización de tamaño
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});