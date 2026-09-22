# flores_rosy 🌻

Regalito del día de las flores amarillas (21 de septiembre) para Rosy.

Son dos pantallas: la primera dice **"Tu amorsote tiene un regalo para ti"** con un
botón para abrirlo, y al tocarlo aparece un campo de girasoles con
**"Feliz día de las flores amarillas"** y un vale por una mordida gratis.

Es un sitio estático sin dependencias ni build: solo HTML, CSS y un poco de
JavaScript. Está pensado para verse en celular.

## Publicarlo en GitHub Pages

1. En GitHub, entra a **Settings → Pages**.
2. En *Build and deployment* elige **Deploy from a branch**.
3. Branch: `main`, carpeta `/ (root)`. Guarda.

En un par de minutos queda disponible en:

```
https://llorco.github.io/flores_rosy/
```

Ese es el link que se le manda. Al compartirlo por WhatsApp se muestra la
miniatura `og.jpg`, que a propósito solo enseña la invitación y no el regalo.

## Verlo en la compu antes de mandarlo

```bash
python3 -m http.server 8080
# luego abre http://localhost:8080
```

Para saltarte la primera pantalla y revisar directo el regalo:
`http://localhost:8080/#regalo`.

## Cambiar los textos

Todos los textos están en `index.html`, en texto plano, para que se vean aunque
el JavaScript no cargue. Los que suelen querer cambiarse:

| Qué | Dónde |
| --- | --- |
| Saludo y mensaje principal | `.intro__eyebrow`, `.intro__title` |
| Título del regalo | `.gift__title` |
| Premio del vale y letra chica | `.coupon__prize`, `.coupon__fine` |
| Firma | `.coupon__sign` |

En `app.js`, el objeto `CONFIG` de arriba controla lo que se anima: cuántos
girasoles salen, cuántos pétalos caen, la vibración al abrir el regalo y el
mensaje que aparece al canjearlo.

## Regenerar la miniatura (`og.jpg`)

Solo hace falta si cambias los textos y quieres que la vista previa del link
también cambie. La imagen se arma con `tools/og.html` (1200×630) y se captura
con Chrome:

```bash
python3 -m http.server 8080
timeout 20 google-chrome --headless=new --screenshot=og.jpg \
  --window-size=1200,630 --hide-scrollbars \
  http://localhost:8080/tools/og.html
```

El `timeout` es a propósito: Chrome guarda la imagen pero a veces no se cierra
solo. Si prefieres, abre `tools/og.html` en el navegador con la ventana en
1200×630 y toma la captura a mano.

## Detalles pensados para el celular

- Alto con `100dvh`, para que la barra de direcciones de Safari no corte nada.
- Respeto del notch y la barra inferior del iPhone (`safe-area-inset`).
- Textos que escalan con `clamp()`: se ven bien de un iPhone SE a un teléfono grande.
- Botones de 50 px o más de alto y sin efectos que dependan del cursor.
- Vibración corta al abrir el regalo en Android (en iPhone simplemente no pasa nada).
- Si el teléfono tiene activado "reducir movimiento", las animaciones se apagan.
- Los girasoles son SVG generados en el navegador: nada de imágenes que tarden en bajar.
