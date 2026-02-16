
import { Town } from "@/types/town";

export const towns: Town[] = [
  {
    code: "CHL",
    name: "Cashel",
    latitude: 52.5158,
    longitude: -7.8853,
    address: {
      street: "Circular Road",
      city: "Cashel",
      county: "Tipperary",
      eircode: "E25 KT92"
    },
    link: "https://maps.app.goo.gl/euvA8okXBouKrXsQ6",
    photoGalleryUrl: "https://photos.app.goo.gl/oZ2ZeA7RvdmxmcJaA",
    isNew: false
  },
  {
    code: "CRK",
    name: "Cork",
    latitude: 51.8979,
    longitude: -8.4701,
    address: {
      street: "Oliver Plunkett Street",
      city: "Cork",
      county: "Cork",
      eircode: "T12 RX8D"
    },
    link: "https://maps.app.goo.gl/q7BK8v3vb8ibNwvB6",
    isNew: false
  },
  {
    code: "DUB",
    name: "Dublin",
    latitude: 53.3498,
    longitude: -6.2603,
    address: {
      street: "O'Connell Street",
      city: "Dublin",
      county: "Dublin",
      eircode: "D01 F2H7"
    },
    link: "https://maps.app.goo.gl/dSvY5ED6UfGQE6fc8",
    isNew: false
  },
  {
    code: "GAL",
    name: "Galway",
    latitude: 53.2707,
    longitude: -9.0568,
    address: {
      street: "Eyre Square",
      city: "Galway",
      county: "Galway",
      eircode: "H91 X8FF"
    },
    link: "https://maps.app.goo.gl/zvMfGTTsbDEEWmpS8",
    isNew: false
  }
];

// Add a town by code
export function getTownByCode(code: string): Town | undefined {
  return towns.find(town => town.code === code);
}

// Get all towns
export function getAllTowns(): Town[] {
  return towns;
}

// Update towns data (useful for the Town Manager)
export function updateTowns(updatedTowns: Town[]): void {
  // This is a simple implementation since we can't modify the original array reference
  // In a real app, this might connect to an API or database
  towns.splice(0, towns.length, ...updatedTowns);
}
