function withTimeout(promise, ms, message) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(message)), ms)
    ),
  ]);
}

export async function prepareImage(file, options = {}) {
  const {
    quality = 0.9,
    outputFileName = "image.jpg",
  } = options;

  const fileName = file.name?.toLowerCase() || "";

  const isHeic =
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    fileName.endsWith(".heic") ||
    fileName.endsWith(".heif");

  // اگر HEIC نیست، مستقیم برگردان
  if (!isHeic) {
    return file;
  }

  try {
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

    const blob = Array.isArray(convertedBlob)
      ? convertedBlob[0]
      : convertedBlob;

    return new File([blob], outputFileName, {
      type: "image/jpeg",
    });
  } catch (err) {
    console.error("HEIC CONVERT ERROR:", err);

    throw new Error(
      "تبدیل عکس HEIC انجام نشد. لطفاً در تنظیمات دوربین، فرمت عکس را روی JPG قرار بده یا عکس دیگری انتخاب کن."
    );
  }
}