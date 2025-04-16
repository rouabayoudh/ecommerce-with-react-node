import { TreeViewBaseItem } from "@mui/x-tree-view/models";

type ExtendedTreeItemProps = {
  id: string;
  label: string;
  level?: number;
};
const categories: TreeViewBaseItem<ExtendedTreeItemProps>[] = [
  {
    id: "electronics",
    label: "Electronics",
    level: 1,
    children: [
      {
        id: "smartphones",
        label: "Smartphones",
        level: 2,
        children: [
          { id: "smartphones-android", label: "Android Phones", level: 3 },
          { id: "smartphones-ios", label: "iOS Phones", level: 3 },
        ],
      },
      {
        id: "laptops",
        label: "Laptops",
        level: 2,
        children: [
          { id: "laptops-ultrabooks", label: "Ultrabooks", level: 3 },
          { id: "laptops-gaming", label: "Gaming Laptops", level: 3 },
          { id: "laptops-business", label: "Business Laptops", level: 3 },
        ],
      },
      {
        id: "headphones",
        label: "Headphones",
        level: 2,
        children: [
          { id: "headphones-over-ear", label: "Over-Ear Headphones", level: 3 },
          { id: "headphones-in-ear", label: "In-Ear Headphones", level: 3 },
          { id: "headphones-wireless", label: "Wireless Headphones", level: 3 },
        ],
      },
      {
        id: "tablets",
        label: "Tablets",
        level: 2,
        children: [
          { id: "tablets-android", label: "Android Tablets", level: 3 },
          { id: "tablets-ios", label: "iOS Tablets", level: 3 },
        ],
      },
    ],
  },
  {
    id: "home-appliances",
    label: "Home Appliances",
    level: 1,
    children: [
      {
        id: "kitchen-appliances",
        label: "Kitchen Appliances",
        level: 2,
        children: [
          {
            id: "kitchen-appliances-refrigerators",
            label: "Refrigerators",
            level: 3,
          },
          {
            id: "kitchen-appliances-microwaves",
            label: "Microwaves",
            level: 3,
          },
          {
            id: "kitchen-appliances-coffeemakers",
            label: "Coffeemakers",
            level: 3,
          },
        ],
      },
      {
        id: "vacuum-cleaners",
        label: "Vacuum Cleaners",
        level: 2,
        children: [
          { id: "vacuum-cleaners-robot", label: "Robot Vacuums", level: 3 },
          { id: "vacuum-cleaners-upright", label: "Upright Vacuums", level: 3 },
          {
            id: "vacuum-cleaners-canister",
            label: "Canister Vacuums",
            level: 3,
          },
        ],
      },
      {
        id: "air-conditioners",
        label: "Air Conditioners",
        level: 2,
        children: [
          { id: "air-conditioners-window", label: "Window Units", level: 3 },
          { id: "air-conditioners-split", label: "Split Systems", level: 3 },
          { id: "air-conditioners-portable", label: "Portable ACs", level: 3 },
        ],
      },
    ],
  },
  {
    id: "personal-care",
    label: "Personal Care",
    level: 1,
    children: [
      {
        id: "beauty-products",
        label: "Beauty Products",
        level: 2,
        children: [
          { id: "beauty-products-skincare", label: "Skincare", level: 3 },
          { id: "beauty-products-makeup", label: "Makeup", level: 3 },
          { id: "beauty-products-haircare", label: "Haircare", level: 3 },
        ],
      },
      {
        id: "grooming",
        label: "Grooming",
        level: 2,
        children: [
          {
            id: "grooming-electric-shavers",
            label: "Electric Shavers",
            level: 3,
          },
          { id: "grooming-hair-clippers", label: "Hair Clippers", level: 3 },
        ],
      },
      {
        id: "healthcare",
        label: "Healthcare",
        level: 2,
        children: [
          { id: "healthcare-thermometers", label: "Thermometers", level: 3 },
          {
            id: "healthcare-blood-pressure-monitors",
            label: "Blood Pressure Monitors",
            level: 3,
          },
        ],
      },
    ],
  },
];

export default categories;
