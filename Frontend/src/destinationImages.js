const repositoryAssetBase =
  "https://raw.githubusercontent.com/saifullahimtiaz699-cmyk/tourism/main/Frontend/public";

const destinationImages = {
  Multan: `${repositoryAssetBase}/multan.webp`,
  Gwadar: `${repositoryAssetBase}/gwadar.webp`,
  Chitral: `${repositoryAssetBase}/chitral.webp`,
  Taxila: `${repositoryAssetBase}/taxila.webp`,
  Shogran: `${repositoryAssetBase}/shogran.webp`,
  "Mohenjo-daro": `${repositoryAssetBase}/mohenjo-daro.gif`,
  "Deosai National Park": `${repositoryAssetBase}/deosai-national-park.webp`,
  "Kalash Valley": `${repositoryAssetBase}/kalash-valley.webp`,
  "Attabad Lake": `${repositoryAssetBase}/attabad-lake.webp`,
};

export function getDestinationImage(destination, size = 900) {
  return (
    destinationImages[destination.name] ||
    destination.image ||
    `https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=${size}&q=80`
  );
}