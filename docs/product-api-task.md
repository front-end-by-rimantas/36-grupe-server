# API

product - preke

## POST: /api/product/

sukuriamas agurkas.json failas su atsiusto objekto turiniu

```json
{
    "name": "Agurkas",
    "price": 3.59,
    "inStock": 10
}
```

```json
{
    "name": "Raudonas pomidoras",
    "price": 7.77,
    "inStock": 100
}
```

## GET: /api/product/agurkas

gauni pilna objekta

## PUT: /api/product/agurkas

siunciam objekta, kur gali atnaujinti viska, isskyrus "name"

```json
{
    "name": "Agurkas2",
    "price": 4,
    "inStock": 8
}
```

## DELETE: /api/product/agurkas

istrina produkto faila agurkas.json
