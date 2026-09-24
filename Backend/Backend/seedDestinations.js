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
  ["Mohenjo-daro", "Sindh", "Historical"],
  ["Gwadar", "Balochistan", "Beach"],
];

const seedDestinations = destinationNames.map(([name, location, category]) => ({
  name,
  location,
  category,
  description: `${name} is a remarkable Pakistani destination known for its scenery, culture, and memorable experiences for travelers.`,
  image:
    name === "Multan"
      ? "https://saifullahimtiaz699-cmyk.github.io/tourism/multan.webp"
      : name === "Gwadar"
        ? "https://saifullahimtiaz699-cmyk.github.io/tourism/gwadar.webp"
      : `https://placehold.co/800x600/jpg?text=${encodeURIComponent(name)}`,
  bestTime: "April to October",
  budget: 15000,
}));

async function seedMissingDestinations(Destination) {
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

  await Destination.updateOne(
    { name: "Multan" },
    { $set: { image: "https://saifullahimtiaz699-cmyk.github.io/tourism/multan.webp" } }
  );
  await Destination.updateOne(
    { name: "Gwadar" },
    { $set: { image: "https://saifullahimtiaz699-cmyk.github.io/tourism/gwadar.webp" } }
  );
}

module.exports = seedMissingDestinations;