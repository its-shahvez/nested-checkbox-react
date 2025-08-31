

export const initialNodes = [
  {
    id: 'fruits',
    name: 'Fruits 🍓',
    children: [
      { id: 'apple', name: 'Apple 🍎' },
      { id: 'banana', name: 'Banana 🍌' },
      { id: 'orange', name: 'Orange 🍊' },
    ],
  },
  {
    id: 'vegetables',
    name: 'Vegetables 🥦',
    children: [
      { id: 'carrot', name: 'Carrot 🥕' },
      { id: 'broccoli', name: 'Broccoli 🥦' },
      { id: 'potato', name: 'Potato 🥔' },
      {
        id: 'leafy-greens',
        name: 'Leafy Greens 🥬',
        children: [
          { id: 'spinach', name: 'Spinach' },
          { id: 'kale', name: 'Kale' },
        ],
      },
    ],
  },
];