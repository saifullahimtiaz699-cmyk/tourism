const destinationNames = [
  ["Hunza Valley", "Gilgit-Baltistan", "Mountain"],
  ["Skardu", "Gilgit-Baltistan", "Mountain"],
  ["Naran", "Khyber Pakhtunkhwa", "Mountain"],
  ["Kaghan Valley", "Khyber Pakhtunkhwa", "Mountain"],
  ["Swat Valley", "Khyber Pakhtunkhwa", "Mountain"],
  ["Kalam", "Khyber Pakhtunkhwa", "Mountain"],
  ["Malam Jabba", "Khyber Pakhtunkhwa", "Adventure"],
  ["Kumrat Valley", "Khyber Pakhtunkhwa", "Mountain"],
  ["Chitral", "Khyber Pakhtunkhwa", "Cultural"],
  ["Kalash Valley", "Khyber Pakhtunkhwa", "Cultural"],
  ["Fairy Meadows", "Gilgit-Baltistan", "Adventure"],
  ["Naltar Valley", "Gilgit-Baltistan", "Mountain"],
  ["Astore Valley", "Gilgit-Baltistan", "Mountain"],
  ["Neelum Valley", "Azad Kashmir", "Mountain"],
  ["Murree", "Punjab", "Mountain"],
  ["Galiyat", "Khyber Pakhtunkhwa", "Mountain"],
  ["Shogran", "Khyber Pakhtunkhwa", "Mountain"],
  ["Ratti Gali Lake", "Azad Kashmir", "Lake"],
  ["Deosai National Park", "Gilgit-Baltistan", "Adventure"],
  ["Attabad Lake", "Gilgit-Baltistan", "Lake"],
  ["Saif-ul-Muluk Lake", "Khyber Pakhtunkhwa", "Lake"],
  ["Mahodand Lake", "Khyber Pakhtunkhwa", "Lake"],
  ["Pir Sohawa", "Islamabad Capital Territory", "Adventure"],
  ["Lahore", "Punjab", "Historical"],
  ["Islamabad", "Islamabad Capital Territory", "Historical"],
  ["Taxila", "Punjab", "Historical"],
  ["Multan", "Punjab", "Cultural"],
  ["Gwadar", "Balochistan", "Beach"],
];

const imageUpdates = {
  Multan:
    "https://saifullahimtiaz699-cmyk.github.io/tourism/multan.webp",
  Gwadar:
    "https://raw.githubusercontent.com/saifullahimtiaz699-cmyk/tourism/main/Frontend/public/gwadar.webp",
  Chitral:
    "https://raw.githubusercontent.com/saifullahimtiaz699-cmyk/tourism/main/Frontend/public/chitral.webp",
  Taxila:
    "https://raw.githubusercontent.com/saifullahimtiaz699-cmyk/tourism/main/Frontend/public/taxila.webp",
  Shogran:
    "https://raw.githubusercontent.com/saifullahimtiaz699-cmyk/tourism/main/Frontend/public/shogran.webp",
  "Deosai National Park":
    "https://raw.githubusercontent.com/saifullahimtiaz699-cmyk/tourism/main/Frontend/public/deosai-national-park.webp",
  "Kalash Valley":
    "https://raw.githubusercontent.com/saifullahimtiaz699-cmyk/tourism/main/Frontend/public/kalash-valley.webp",
  "Attabad Lake":
    "https://raw.githubusercontent.com/saifullahimtiaz699-cmyk/tourism/main/Frontend/public/attabad-lake.webp",
};

const seedDestinations = destinationNames.map(([name, location, category]) => ({
  name,
  location,
  category,
  description: `${name} is a remarkable Pakistani destination known for its scenery, culture, and memorable experiences for travelers.`,
  image:
    imageUpdates[name] ||
    `https://placehold.co/800x600/jpg?text=${encodeURIComponent(name)}`,
  bestTime: "April to October",
  budget: 15000,
}));

async function seedMissingDestinations(Destination) {
  await Destination.deleteMany({ name: "Mohenjo-daro" });

  const existingNames = new Set(
    (await Destination.find({}, { name: 1 }).lean()).map(
      (destination) => destination.name.toLowerCase()
    )
  );
  const missing = seedDestinations.filter(
    (destination) => !existingNames.has(destination.name.toLowerCase())
  );

  if (missing.length > 0) {
    await Destination.insertMany(missing);
    console.log(`Seeded ${missing.length} destinations`);
  }

  await Promise.all(
    Object.entries(imageUpdates).map(([name, image]) =>
      Destination.updateOne({ name }, { $set: { image } })
    )
  );
}

module.exports = seedMissingDestinations;