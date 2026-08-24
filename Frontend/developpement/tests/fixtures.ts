// tests/fixtures.ts
import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(() => {
      document.addEventListener("click", (e) => {
        const halo = document.createElement("div");
        halo.style.position = "fixed";
        halo.style.left = `${e.clientX - 25}px`;
        halo.style.top = `${e.clientY - 25}px`;
        halo.style.width = "50px";
        halo.style.height = "50px";
        halo.style.borderRadius = "50%";
        halo.style.backgroundColor = "rgba(255, 0, 0, 0.4)";
        halo.style.border = "2px solid red";
        halo.style.boxShadow = "0 0 15px red";
        halo.style.pointerEvents = "none";
        halo.style.zIndex = "999999";
        halo.style.transition =
          "transform 0.4s ease-out, opacity 0.4s ease-out";

        document.body.appendChild(halo);

        requestAnimationFrame(() => {
          halo.style.transform = "scale(2)";
          halo.style.opacity = "0";
        });

        setTimeout(() => halo.remove(), 400);
      });
    });

    await use(page);
  },
});

export { expect } from '@playwright/test';