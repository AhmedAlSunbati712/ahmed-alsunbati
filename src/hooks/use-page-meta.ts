import { useEffect } from "react";

const SITE_URL = "https://ahmed-alsunbati.vercel.app";

type PageMeta = {
  title: string;
  description: string;
  path?: string;
};

const setMetaContent = (selector: string, content: string) => {
  const element = document.querySelector<HTMLMetaElement>(selector);
  if (element) element.content = content;
};

export const usePageMeta = ({ title, description, path = "/" }: PageMeta) => {
  useEffect(() => {
    document.title = title;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[property="og:url"]', `${SITE_URL}${path}`);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);

    const canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (canonical) canonical.href = `${SITE_URL}${path}`;
  }, [description, path, title]);
};
