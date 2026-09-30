export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image?: string;
  sizes: string;
  category: "Dresses" | "Sets" | "Skirt" | "Tops";
  inStock: boolean;
}

export const products: Product[] = [
  { id: "amara", name: "The Amara Dress", price: "KSh 4,500", description: "A floor-length wrap dress in brushed cotton, cut generously through the sleeve and cinched softly at the waist.", sizes: "XS – XL, made to order", category: "Dresses", inStock: true },
  { id: "nia", name: "The Nia Set", price: "KSh 5,200", description: "A relaxed maxi skirt and matching long-sleeve top, finished with a hand-pressed pleat panel.", sizes: "XS – XL, made to order", category: "Sets", inStock: true },
  { id: "zawadi", name: "The Zawadi Abaya", price: "KSh 6,000", description: "An open-front abaya in flowing crepe, with a wide belt and deep pockets for everyday wear.", sizes: "XS – XL, made to order", category: "Skirt", inStock: false },
  { id: "imani", name: "The Imani Blouse", price: "KSh 2,800", description: "A high-neck blouse with a covered button placket and softly gathered cuffs.", sizes: "XS – XL, made to order", category: "Tops", inStock: true },
];
