const publicAsset = (filename) =>
  `${import.meta.env.BASE_URL}${filename}`;

const destinationImages = {
  Multan: publicAsset("multan.webp"),
  Gwadar: publicAsset("gwadar.webp"),
  Chitral: publicAsset("chitral.webp"),
  Taxila: publicAsset("taxila.webp"),
  Shogran: publicAsset("shogran.webp"),
  "Deosai National Park": publicAsset("deosai-national-park.webp"),
  "Kalash Valley": publicAsset("kalash-valley.webp"),
  "Attabad Lake": publicAsset("attabad-lake.webp"),
  "Naltar Valley": publicAsset("naltar-valley.jpg"),
  "Kumrat Valley": publicAsset("attabad-lake.webp"),
  Galiyat: publicAsset("attabad-lake.webp"),
  "Fairy Meadows": publicAsset("fairy-meadows.jpg"),
  "Swat Valley": publicAsset("swat-valley.webp"),
};

export function getDestinationImage(destination, size = 900) {
  return (
    destinationImages[destination.name] ||
    destination.image ||
    `https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=${size}&q=80`
  );
}