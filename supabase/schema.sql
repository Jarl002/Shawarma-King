-- Shawarma King – menu data
-- Run this once in Supabase: SQL Editor → New query → paste → Run.
-- It can be run again safely: it recreates the table and its data.

drop table if exists public.products;

create table public.products (
  id           text primary key,                       -- slug used in the URL, e.g. /menu/durum-rulle
  name         text    not null,
  description  text,
  price        integer not null check (price >= 0),    -- whole Danish kroner
  category     text    not null,
  image        text,                                   -- path in /public, e.g. /menu/durum-rulle.webp
  banner       text,                                   -- optional wide photo for the product page
  featured     boolean not null default false,         -- shown under "Mest bestilt"
  popular      boolean not null default false,         -- shows the "Populær" badge
  customizable boolean not null default false,         -- has protein, vegetable and sauce choices
  sort_order   integer not null
);

comment on table public.products is 'Menu items shown in the ordering flow. Read-only for the app.';

-- Security: the table is locked with Row Level Security.
-- Visitors (anon) may only read the menu. Nobody can insert, update or delete through the API.
alter table public.products enable row level security;

grant select on public.products to anon, authenticated;

create policy "Menuen kan læses af alle"
  on public.products
  for select
  to anon, authenticated
  using (true);

insert into public.products (id, name, description, price, category, image, featured, popular, customizable, sort_order) values
  ('durum-rulle',    'Durum rulle',           'Valgfrit protein, iceberg, løg, rødkål, tomat og cremefraiche', 110, 'Durum',          '/menu/durum-rulle.webp',   true,  true,  true,  1),
  ('pitabroed',      'Pitabrød (hjemmebagt)', 'Valgfrit protein, iceberg, løg, rødkål, tomat og cremefraiche',  99, 'Pita',           '/menu/pitabroed.webp', true,  false, true,  2),
  ('kebabmix',       'Kebabmix',              'Valgfrit protein med salat og cremefraiche',                    155, 'Kebabmix',       '/menu/kebabmix.webp',      true,  false, true,  3),
  ('tyrkisk-broed',  'Tyrkisk brød Flutes',   null,                                                            125, 'Tyrkisk brød',   '/menu/tyrkisk-broed.webp',                  false, false, true,  4),
  ('lille-pommes',   'Lille pommes frites',   null,                                                             65, 'Snacks',         '/menu/pommes-frites.webp',                  false, false, false, 5),
  ('stor-pommes',    'Stor pommes frites',    null,                                                             85, 'Snacks',         '/menu/pommes-frites.webp',                  false, false, false, 6),
  ('falafel-snack',  'Falafel snack',         null,                                                             65, 'Snacks',         '/menu/falafel.webp',                  false, false, false, 7),
  ('ketchup',        'Ketchup',               null,                                                             10, 'Dyppelse',       '/menu/ketchup.webp',                  false, false, false, 8),
  ('remoulade',      'Remoulade',             null,                                                             10, 'Dyppelse',       '/menu/remoulade.webp',                  false, false, false, 9),
  ('pommes-sauce',   'Pommes frites-sauce',   null,                                                             10, 'Dyppelse',       '/menu/pommes-sauce.webp',                  false, false, false, 10),
  ('cola',           'Coca-Cola',             null,                                                             30, 'Drikkevarer',    '/menu/cola.webp',                  false, false, false, 11),
  ('cola-zero',      'Coca-Cola Zero',        null,                                                             30, 'Drikkevarer',    '/menu/cola-zero.webp',                  false, false, false, 12),
  ('pepsi-max',      'Pepsi Max',             null,                                                             30, 'Drikkevarer',    '/menu/pepsi-max.webp',                  false, false, false, 13),
  ('faxe-kondi',     'Faxe Kondi',            null,                                                             30, 'Drikkevarer',    '/menu/faxe-kondi.webp',                  false, false, false, 14),
  ('fanta',          'Fanta Orange',          null,                                                             30, 'Drikkevarer',    '/menu/fanta.webp',                  false, false, false, 15),
  ('gazoz',          'Gazoz',                 null,                                                             30, 'Drikkevarer',    '/menu/gazoz.webp',                  false, false, false, 16),
  ('ayran',          'Ayran',                 null,                                                             25, 'Drikkevarer',    '/menu/ayran.webp',                  false, false, false, 17),
  ('servietter',     'Servietter',            null,                                                              0, 'Engangsservice', '/menu/servietter.webp',                  false, false, false, 18);

-- Wide banner photo on the product page (02 Vælg din mad). Others fall back to image.
update public.products set banner = '/menu/durum-rulle-banner.webp' where id = 'durum-rulle';
