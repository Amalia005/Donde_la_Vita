// datos/menuData.js
// Datos locales de la carta — portados del diseño Figma (Interface_cliente/data/menuData.ts)
// Se usan como fallback cuando el backend no está disponible

export const menuData = [
  // ── Menús del día ──────────────────────────────────────────────────────────
  {
    id: 'm1',
    nombre: 'ECONÓMICO: Porotos con rienda + Huevo',
    precio: 3800,
    categoria: 'Menús del día',
    imagen: 'https://images.unsplash.com/photo-1612504258838-fbf14fe4437d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    descripcion: 'Plato económico del día con porotos con rienda acompañado de huevo',
    ingredientes: ['Porotos', 'Rienda', 'Huevo'],
  },
  {
    id: 'm4',
    nombre: 'Porotos con rienda + Longaniza o Huevo',
    precio: 5500,
    categoria: 'Menús del día',
    imagen: 'https://images.unsplash.com/photo-1612504258838-fbf14fe4437d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    descripcion: 'Porotos con rienda acompañado de longaniza o huevo y ensalada',
    ingredientes: ['Porotos', 'Rienda', 'Longaniza o huevo', 'Ensalada'],
  },
  {
    id: 'm11',
    nombre: '1/4 de pollo (arroz o ensalada)',
    precio: 5200,
    categoria: 'Menús del día',
    imagen: 'https://images.unsplash.com/photo-1577194509876-4bb24787a641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    descripcion: 'Un cuarto de pollo con 1 agregado (arroz o ensalada)',
    ingredientes: ['1/4 de pollo', 'Arroz o ensalada'],
  },
  {
    id: 'm12',
    nombre: '1/4 de pollo (papas)',
    precio: 5500,
    categoria: 'Menús del día',
    imagen: 'https://images.unsplash.com/photo-1577194509876-4bb24787a641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    descripcion: 'Un cuarto de pollo con papas mayo, papas fritas o puré',
    ingredientes: ['1/4 de pollo', 'Papas a elección'],
  },

  // ── Platos de fondo ────────────────────────────────────────────────────────
  {
    id: 'm2',
    nombre: 'Truto o Pechuga arvejada',
    precio: 6200,
    categoria: 'Platos de fondo',
    imagen: 'https://images.unsplash.com/photo-1762631934518-f75e233413ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    descripcion: 'Truto o pechuga arvejada con 2 agregados, ensalada y consomé',
    ingredientes: ['Truto o pechuga', 'Arvejas', '2 agregados a elección', 'Ensalada', 'Consomé'],
  },
  {
    id: 'm3',
    nombre: 'Cazuela de vacuno',
    precio: 6000,
    categoria: 'Platos de fondo',
    imagen: 'https://images.unsplash.com/photo-1638043139484-1534e2c14bcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    descripcion: 'Tradicional cazuela de vacuno con ensalada',
    ingredientes: ['Carne de vacuno', 'Papas', 'Zapallo', 'Choclo', 'Ensalada'],
  },
  {
    id: 'm8',
    nombre: 'Bistec',
    precio: 6500,
    categoria: 'Platos de fondo',
    imagen: 'https://images.unsplash.com/photo-1708615017161-2eff302d0389?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    descripcion: 'Bistec con 2 agregados, ensalada y consomé',
    ingredientes: ['Bistec', '2 agregados a elección', 'Ensalada', 'Consomé'],
  },

  // ── Agregados ──────────────────────────────────────────────────────────────
  {
    id: 'a1',
    nombre: 'Arroz',
    precio: 0,
    categoria: 'Agregados',
    imagen: 'https://images.unsplash.com/photo-1743674452796-ad8d0cf38005?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    descripcion: 'Arroz blanco como agregado',
    ingredientes: ['Arroz'],
  },
  {
    id: 'a4',
    nombre: 'Papas fritas',
    precio: 1500,
    categoria: 'Agregados',
    imagen: 'https://images.unsplash.com/photo-1630431341973-02e1b662ec35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    descripcion: 'Papas fritas crocantes',
    ingredientes: ['Papas fritas'],
  },
  {
    id: 'a5',
    nombre: 'Ensalada',
    precio: 1000,
    categoria: 'Agregados',
    imagen: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    descripcion: 'Ensalada fresca del día',
    ingredientes: ['Lechuga', 'Tomate', 'Cebolla'],
  },

  // ── Bebestibles ────────────────────────────────────────────────────────────
  {
    id: 'b1',
    nombre: 'Bebida express',
    precio: 850,
    categoria: 'Bebestibles',
    imagen: 'https://images.unsplash.com/photo-1501474587451-40f1e29a4223?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    descripcion: 'Bebida express fría',
    ingredientes: ['Bebida express'],
  },
  {
    id: 'b3',
    nombre: 'Medio Coca-Cola (Coca-Cola, Sprite, Fanta, etc)',
    precio: 1500,
    categoria: 'Bebestibles',
    imagen: 'https://images.unsplash.com/photo-1501474587451-40f1e29a4223?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    descripcion: 'Medio litro de Coca-Cola, Sprite, Fanta u otra bebida',
    ingredientes: ['Coca-Cola, Sprite, Fanta, etc'],
  },
];
