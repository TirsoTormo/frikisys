// Content loader for Frikisys articles
import { Article, CodeBlock } from '../components';

// Import all Linux articles
import introLinux from '../content/linux/intro-linux.json';
import comandosBasicos from '../content/linux/comandos-basicos.json';
import gestionUsuarios from '../content/linux/gestion-usuarios.json';
import permisos from '../content/linux/permisos.json';
import systemd from '../content/linux/systemd.json';
import redes from '../content/linux/redes.json';
import discoAlmacenamiento from '../content/linux/disco-almacenamiento.json';
import procesos from '../content/linux/procesos.json';
import scriptsBash from '../content/linux/scripts-bash.json';
import ssh from '../content/linux/ssh.json';

import introVirtualizacion from '../content/virtualizacion/intro-virtualizacion.json';
import docker from '../content/virtualizacion/docker.json';
import lxc from '../content/virtualizacion/lxc.json';
import kvm from '../content/virtualizacion/kvm.json';
import vmware from '../content/virtualizacion/vmware.json';
import redesVirtuales from '../content/virtualizacion/redes-virtuales.json';
import almacenamientoVirtual from '../content/virtualizacion/almacenamiento-virtual.json';

export interface ContentBlock {
  tipo: 'texto' | 'titulo' | 'comando' | 'lista';
  valor: string;
  descripcion?: string;
}

export interface ArticleContent {
  id: string;
  titulo: string;
  categoria: string;
  descripcion: string;
  contenido: ContentBlock[];
}

// Cast imported JSON to ArticleContent type
const toArticleContent = (json: any): ArticleContent => ({
  id: json.id,
  titulo: json.titulo,
  categoria: json.categoria,
  descripcion: json.descripcion,
  contenido: json.contenido.map((block: any) => ({
    tipo: block.tipo as ContentBlock['tipo'],
    valor: block.valor,
    descripcion: block.descripcion,
  })),
});

// Map JSON format to Article format
const mapJsonToArticle = (json: ArticleContent): Article => {
  // Calculate read time based on content length
  const totalChars = json.contenido.reduce((sum, block) => sum + block.valor.length, 0);
  const readTime = Math.max(1, Math.ceil(totalChars / 1500));
  
  return {
    id: json.id,
    title: json.titulo,
    category: json.categoria === 'linux' ? 'Linux' : 'Virtualización',
    description: json.descripcion,
    tags: getTagsForArticle(json.id),
    date: undefined,
    readTime: `${readTime} min`,
  };
};

// Get tags based on article ID
const getTagsForArticle = (id: string): string[] => {
  const tagMap: Record<string, string[]> = {
    'intro-linux': ['linux', 'fundamentos', 'sysadmin'],
    'comandos-basicos': ['comandos', 'bash', 'terminal'],
    'gestion-usuarios': ['usuarios', 'grupos', 'autenticacion'],
    'permisos': ['chmod', 'chown', 'acl'],
    'systemd': ['systemd', 'servicios', 'init'],
    'redes': ['tcp/ip', 'firewall', 'dns'],
    'disco-almacenamiento': ['disk', 'particiones', 'lvm'],
    'procesos': ['ps', 'top', 'systemd'],
    'scripts-bash': ['bash', 'scripting', 'automation'],
    'ssh': ['ssh', 'seguridad', 'keys'],
    'intro-virtualizacion': ['virtualizacion', 'vm', 'conceptos'],
    'docker': ['docker', 'contenedores', 'devops'],
    'lxc': ['lxc', 'contenedores', 'linux'],
    'kvm': ['kvm', 'virtualizacion', 'kernel'],
    'vmware': ['vmware', 'virtualizacion', 'vsphere'],
    'redes-virtuales': ['redes', 'virtualizacion', 'vlan'],
    'almacenamiento-virtual': ['storage', 'virtualizacion', 'san'],
  };
  return tagMap[id] || ['articulo'];
};

// All Linux articles
export const linuxArticles: ArticleContent[] = [
  toArticleContent(introLinux),
  toArticleContent(comandosBasicos),
  toArticleContent(gestionUsuarios),
  toArticleContent(permisos),
  toArticleContent(systemd),
  toArticleContent(redes),
  toArticleContent(discoAlmacenamiento),
  toArticleContent(procesos),
  toArticleContent(scriptsBash),
  toArticleContent(ssh),
];

// All Virtualization articles
export const virtualizationArticles: ArticleContent[] = [
  toArticleContent(introVirtualizacion),
  toArticleContent(docker),
  toArticleContent(lxc),
  toArticleContent(kvm),
  toArticleContent(vmware),
  toArticleContent(redesVirtuales),
  toArticleContent(almacenamientoVirtual),
];

// All articles combined
export const allArticles: ArticleContent[] = [
  ...linuxArticles,
  ...virtualizationArticles,
];

// Map to Article interface for grid display
export const allArticleCards: Article[] = allArticles.map(mapJsonToArticle);

// Get article by ID
export const getArticleById = (id: string): ArticleContent | undefined => {
  return allArticles.find(article => article.id === id);
};

// Convert content blocks to code blocks for ArticleViewer
export const contentToCodeBlocks = (content: ContentBlock[]): CodeBlock[] => {
  return content
    .filter(block => block.tipo === 'comando')
    .map((block, index) => ({
      language: 'bash',
      code: block.valor,
      filename: block.descripcion || `Comando ${index + 1}`,
    }));
};

// Convert content blocks to markdown for ArticleViewer
export const contentToMarkdown = (content: ContentBlock[]): string => {
  return content
    .map(block => {
      switch (block.tipo) {
        case 'texto':
          return block.valor;
        case 'titulo':
          return `## ${block.valor}`;
        case 'comando':
          return `\`\`\`bash\n${block.valor}\n\`\`\``;
        case 'lista':
          return block.valor
            .split('\n')
            .map((item: string) => `- ${item}`)
            .join('\n');
        default:
          return block.valor;
      }
    })
    .join('\n\n');
};