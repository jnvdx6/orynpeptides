"use client";

interface ProductVideoProps {
  videoUrl: string;
  productName: string;
}

function getEmbedUrl(url: string): { type: "youtube" | "vimeo" | "self-hosted"; src: string } {
  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch) {
    return { type: "youtube", src: `https://www.youtube.com/embed/${ytMatch[1]}?rel=0` };
  }

  // Vimeo
  const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/);
  if (vimeoMatch) {
    return { type: "vimeo", src: `https://player.vimeo.com/video/${vimeoMatch[1]}` };
  }

  return { type: "self-hosted", src: url };
}

export function ProductVideo({ videoUrl, productName }: ProductVideoProps) {
  const embed = getEmbedUrl(videoUrl);

  return (
    <div className="w-full aspect-video bg-oryn-black/5 overflow-hidden">
      {embed.type === "self-hosted" ? (
        <video
          className="w-full h-full object-contain"
          controls
          preload="metadata"
          playsInline
        >
          <source src={embed.src} />
        </video>
      ) : (
        <iframe
          className="w-full h-full"
          src={embed.src}
          title={`${productName} video`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}
