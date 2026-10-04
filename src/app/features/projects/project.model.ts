export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  cover: string;
  images: string[];
  type: string;
  domain: string;
  tags: string[];
  livePreviewUrl?: string;
  sourceCodeUrl?: string;
  year?: number;
  featured?: boolean;
  order?: number;
  contentHtml: string;
}
