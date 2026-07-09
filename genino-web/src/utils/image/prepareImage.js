//D:\projects\Genino\genino-web\src\utils\image\preparelmage.js

function withTimeout(promise, ms, message) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(message)), ms)
    ),
  ]);
}

function loadImageFromBlob(blob) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("IMAGE_LOAD_ERROR"));
    };

    img.src = url;
  });
}

export async function prepareImage(file, options = {}) {
  const {
    quality = 0.88,
    maxWidthOrHeight = 1800,
    outputFileName = "image.jpg",
  } = options;

  const fileName = file.name?.toLowerCase() || "";

  const isHeic =
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    fileName.endsWith(".heic") ||
    fileName.endsWith(".heif");

  let sourceBlob = file;

  try {
    if (isHeic) {
      const { default: heic2any } = await withTimeout(
        import("heic2any"),
        8000,
        "LOAD_HEIC_CONVERTER_TIMEOUT"
      );

      const convertedBlob = await withTimeout(
        heic2any({
          blob: file,
          toType: "image/jpeg",
          quality,
        }),
        30000,
        "HEIC_CONVERT_TIMEOUT"
      );

      sourceBlob = Array.isArray(convertedBlob)
        ? convertedBlob[0]
        : convertedBlob;
    }

    const img = await loadImageFromBlob(sourceBlob);

    const maxSide = Math.max(img.width, img.height);
    const scale = Math.min(1, maxWidthOrHeight / maxSide);

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const outputBlob = await new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) reject(new Error("IMAGE_COMPRESS_ERROR"));
          else resolve(blob);
        },
        "image/jpeg",
        quality
      );
    });

    return new File([outputBlob], outputFileName, {
      type: "image/jpeg",
    });
  } catch (err) {
    console.error("PREPARE IMAGE ERROR:", err);

    throw new Error(
      "آماده‌سازی عکس انجام نشد. لطفاً یک عکس JPG، PNG یا WEBP انتخاب کن یا اگر عکس HEIC است، فرمت دوربین را روی JPG بگذار."
    );
  }
}