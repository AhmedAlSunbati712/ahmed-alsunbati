import { useEffect, useRef } from "react";

import { assetUrl } from "@/lib/utils";

type Tile = {
  sourceX: number;
  sourceY: number;
  sourceWidth: number;
  sourceHeight: number;
  x: number;
  y: number;
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
  velocityX: number;
  velocityY: number;
  activity: number;
};

const imageSource = assetUrl("/ascii-variants/ascii-fine-180.png");

export const AsciiSpringBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;

    if (!canvas || !parent) return;

    const canvasContext = canvas.getContext("2d");
    if (!canvasContext) return;
    const context: CanvasRenderingContext2D = canvasContext;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const image = new Image();
    const tiles: Tile[] = [];

    let animationFrame = 0;
    let canvasWidth = 0;
    let canvasHeight = 0;
    let imageX = 0;
    let imageY = 0;
    let imageWidth = 0;
    let imageHeight = 0;
    let baseOpacity = 0.16;
    let isReady = false;

    const requestDraw = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const buildTiles = () => {
      if (!isReady) return;

      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const compact = bounds.width < 700;

      canvasWidth = bounds.width;
      canvasHeight = bounds.height;
      canvas.width = Math.max(1, Math.round(canvasWidth * pixelRatio));
      canvas.height = Math.max(1, Math.round(canvasHeight * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.imageSmoothingEnabled = true;

      imageWidth = compact
        ? Math.min(580, canvasWidth * 1.12)
        : Math.min(900, canvasWidth * 0.82);
      const imageScale = imageWidth / image.naturalWidth;
      imageHeight = image.naturalHeight * imageScale;
      imageX = compact
        ? canvasWidth - imageWidth * 0.8
        : canvasWidth - imageWidth + 66;
      imageY = Math.max(18, canvasHeight - imageHeight - 22);
      baseOpacity = compact ? 0.07 : 0.16;

      tiles.length = 0;

      const sampleCanvas = document.createElement("canvas");
      sampleCanvas.width = image.naturalWidth;
      sampleCanvas.height = image.naturalHeight;
      const sampleContext = sampleCanvas.getContext("2d", {
        willReadFrequently: true,
      });

      sampleContext?.drawImage(image, 0, 0);
      const pixels = sampleContext?.getImageData(
        0,
        0,
        image.naturalWidth,
        image.naturalHeight
      ).data;

      const sourceTileSize = 18;

      for (
        let sourceY = 0;
        sourceY < image.naturalHeight;
        sourceY += sourceTileSize
      ) {
        for (
          let sourceX = 0;
          sourceX < image.naturalWidth;
          sourceX += sourceTileSize
        ) {
          const sourceWidth = Math.min(
            sourceTileSize,
            image.naturalWidth - sourceX
          );
          const sourceHeight = Math.min(
            sourceTileSize,
            image.naturalHeight - sourceY
          );

          if (pixels) {
            let containsGlyph = false;

            for (
              let sampleY = sourceY;
              sampleY < sourceY + sourceHeight && !containsGlyph;
              sampleY += 6
            ) {
              for (
                let sampleX = sourceX;
                sampleX < sourceX + sourceWidth;
                sampleX += 6
              ) {
                if (
                  pixels[
                    (sampleY * image.naturalWidth + sampleX) * 4 + 3
                  ] > 8
                ) {
                  containsGlyph = true;
                  break;
                }
              }
            }

            if (!containsGlyph) continue;
          }

          tiles.push({
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            x: imageX + sourceX * imageScale,
            y: imageY + sourceY * imageScale,
            width: sourceWidth * imageScale,
            height: sourceHeight * imageScale,
            offsetX: 0,
            offsetY: 0,
            velocityX: 0,
            velocityY: 0,
            activity: 0,
          });
        }
      }

      requestDraw();
    };

    const applyImpulse = (pointerX: number, pointerY: number) => {
      if (reducedMotionQuery.matches) return;

      const radius = canvasWidth < 700 ? 64 : 92;

      for (const tile of tiles) {
        const centerX = tile.x + tile.width / 2 + tile.offsetX;
        const centerY = tile.y + tile.height / 2 + tile.offsetY;
        const deltaX = centerX - pointerX;
        const deltaY = centerY - pointerY;
        const distance = Math.hypot(deltaX, deltaY);

        if (distance >= radius) continue;

        const strength = (1 - distance / radius) * 2.15;
        const directionX = distance > 0 ? deltaX / distance : 0;
        const directionY = distance > 0 ? deltaY / distance : -1;

        tile.velocityX += directionX * strength;
        tile.velocityY += directionY * strength;
        tile.activity = Math.max(tile.activity, 1 - distance / radius);
      }

      requestDraw();
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      applyImpulse(event.clientX - bounds.left, event.clientY - bounds.top);
    };

    function draw() {
      animationFrame = 0;
      context.clearRect(0, 0, canvasWidth, canvasHeight);

      if (reducedMotionQuery.matches) {
        context.globalAlpha = baseOpacity;
        context.drawImage(image, imageX, imageY, imageWidth, imageHeight);
        context.globalAlpha = 1;
        return;
      }

      let stillMoving = false;

      context.globalAlpha = baseOpacity;
      context.drawImage(image, imageX, imageY, imageWidth, imageHeight);

      for (const tile of tiles) {
        tile.velocityX += -tile.offsetX * 0.075;
        tile.velocityY += -tile.offsetY * 0.075;
        tile.velocityX *= 0.84;
        tile.velocityY *= 0.84;
        tile.offsetX += tile.velocityX;
        tile.offsetY += tile.velocityY;
        tile.activity *= 0.91;

        if (
          Math.abs(tile.offsetX) > 0.025 ||
          Math.abs(tile.offsetY) > 0.025 ||
          Math.abs(tile.velocityX) > 0.025 ||
          Math.abs(tile.velocityY) > 0.025
        ) {
          stillMoving = true;
        } else {
          tile.offsetX = 0;
          tile.offsetY = 0;
          tile.velocityX = 0;
          tile.velocityY = 0;
        }

        if (
          tile.activity < 0.01 &&
          tile.offsetX === 0 &&
          tile.offsetY === 0
        ) {
          continue;
        }

        context.globalAlpha = Math.min(0.42, 0.12 + tile.activity * 0.3);
        context.drawImage(
          image,
          tile.sourceX,
          tile.sourceY,
          tile.sourceWidth,
          tile.sourceHeight,
          tile.x + tile.offsetX,
          tile.y + tile.offsetY,
          tile.width + 0.35,
          tile.height + 0.35
        );
      }

      context.globalAlpha = 1;

      if (stillMoving) requestDraw();
    }

    const resizeObserver = new ResizeObserver(buildTiles);
    const handleMotionPreference = () => {
      buildTiles();
      requestDraw();
    };

    image.addEventListener("load", () => {
      isReady = true;
      buildTiles();
    });
    image.src = imageSource;

    parent.addEventListener("pointermove", handlePointerMove);
    reducedMotionQuery.addEventListener("change", handleMotionPreference);
    resizeObserver.observe(parent);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      parent.removeEventListener("pointermove", handlePointerMove);
      reducedMotionQuery.removeEventListener("change", handleMotionPreference);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="ascii-spring-background"
      aria-hidden="true"
    />
  );
};
