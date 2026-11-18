// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle (remembers choice when storage is available)
const root = document.documentElement;
try {
  const saved = localStorage.getItem('theme');
  if (saved) root.dataset.theme = saved;
} catch (e) {}
document.getElementById('theme').addEventListener('click', () => {
  const dark = getComputedStyle(root).colorScheme === 'dark';
  const next = dark ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// Simulated real-time stock, like the WebSocket updates in MyShop
const products = [
  { name: 'Wireless mouse', qty: 14 },
  { name: 'USB-C hub', qty: 6 },
  { name: 'Mechanical keyboard', qty: 9 },
  { name: 'Laptop stand', qty: 4 }
];
const list = document.getElementById('stock-list');

function render() {
  list.innerHTML = '';
  products.forEach((p, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${p.name}</span><span class="qty ${p.qty <= 5 ? 'low' : ''}">${p.qty}</span>`;
    list.appendChild(li);
  });
}
render();

function tick() {
  const i = Math.floor(Math.random() * products.length);
  const p = products[i];
  p.qty = p.qty > 0 ? p.qty - 1 : 15; // sold one, or restocked
  render();
  const li = list.children[i];
  li.classList.add('flash');
  setTimeout(() => li.classList.remove('flash'), 600);
}
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setInterval(tick, 2200);
}
