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
import troubleshootingCpu from '../content/linux/troubleshooting-cpu.json';
import troubleshootingDisk from '../content/linux/troubleshooting-disk.json';
import troubleshootingMemory from '../content/linux/troubleshooting-memory.json';
import troubleshootingNetwork from '../content/linux/troubleshooting-network.json';
import troubleshootingSsh from '../content/linux/troubleshooting-ssh.json';

// Import all Virtualizacion articles
import introVirtualizacion from '../content/virtualizacion/intro-virtualizacion.json';
import docker from '../content/virtualizacion/docker.json';
import lxc from '../content/virtualizacion/lxc.json';
import kvm from '../content/virtualizacion/kvm.json';
import vmware from '../content/virtualizacion/vmware.json';
import redesVirtuales from '../content/virtualizacion/redes-virtuales.json';
import almacenamientoVirtual from '../content/virtualizacion/almacenamiento-virtual.json';

// Import all Redes articles
import tcpIpFundamentos from '../content/redes/tcp-ip-fundamentos.json';
import firewallIptables from '../content/redes/firewall-iptables.json';
import dnsBind from '../content/redes/dns-bind.json';
import vpnWireguard from '../content/redes/vpn-wireguard.json';
import monitoringRed from '../content/redes/monitoring-red.json';

// Import all Seguridad articles
import sshHardening from '../content/seguridad/ssh-hardening.json';
import fail2ban from '../content/seguridad/fail2ban.json';
import sslLetsencrypt from '../content/seguridad/ssl-letsencrypt.json';
import auditLinux from '../content/seguridad/audit-linux.json';
import hardeningServidor from '../content/seguridad/hardening-servidor.json';

// Import all Bases de Datos articles
import postgresqlIntro from '../content/bases-de-datos/postgresql-intro.json';
import mysqlMariadb from '../content/bases-de-datos/mysql-mariadb.json';
import redisCache from '../content/bases-de-datos/redis-cache.json';
import mongodb from '../content/bases-de-datos/mongodb.json';
import backupDb from '../content/bases-de-datos/backup-db.json';

// Import all Cloud articles
import dockerIntro from '../content/cloud/docker-intro.json';
import kubernetesIntro from '../content/cloud/kubernetes-intro.json';
import terraformIntro from '../content/cloud/terraform-intro.json';
import ciCd from '../content/cloud/ci-cd.json';
import awsEc2S3 from '../content/cloud/aws-ec2-s3.json';

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
  destacado?: boolean;
  contenido: ContentBlock[];
}

// Map categoria JSON to display name
const categoryDisplayNames: Record<string, string> = {
  'linux': 'Linux',
  'redes': 'Redes',
  'seguridad': 'Seguridad',
  'virtualizacion': 'Virtualización',
  'Bases de Datos': 'Bases de Datos',
  'Cloud': 'Cloud',
};

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
  const totalChars = json.contenido.reduce((sum, block) => sum + block.valor.length, 0);
  const readTime = Math.max(1, Math.ceil(totalChars / 1500));
  const contentText = json.contenido.map(block => block.valor).join(' ').toLowerCase();
  
  return {
    id: json.id,
    title: json.titulo,
    category: categoryDisplayNames[json.categoria] || json.categoria,
    description: json.descripcion,
    tags: getTagsForArticle(json.id),
    date: undefined,
    readTime: `${readTime} min`,
    contentText,
    destacado: json.destacado || false,
  };
};

// Get tags based on article ID
export const getTagsForArticle = (id: string): string[] => {
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
    'troubleshooting-cpu': ['cpu', 'rendimiento', 'troubleshooting'],
    'troubleshooting-disk': ['disco', 'almacenamiento', 'troubleshooting'],
    'troubleshooting-memory': ['memoria', 'ram', 'oom'],
    'troubleshooting-network': ['red', 'conectividad', 'troubleshooting'],
    'troubleshooting-ssh': ['ssh', 'conexion', 'troubleshooting'],
    'intro-virtualizacion': ['virtualizacion', 'vm', 'conceptos'],
    'docker': ['docker', 'contenedores', 'devops'],
    'lxc': ['lxc', 'contenedores', 'linux'],
    'kvm': ['kvm', 'virtualizacion', 'kernel'],
    'vmware': ['vmware', 'virtualizacion', 'vsphere'],
    'redes-virtuales': ['redes', 'virtualizacion', 'vlan'],
    'almacenamiento-virtual': ['storage', 'virtualizacion', 'san'],
    'tcp-ip-fundamentos': ['tcp/ip', 'redes', 'ip'],
    'firewall-iptables': ['firewall', 'iptables', 'seguridad'],
    'dns-bind': ['dns', 'bind', 'nombres'],
    'vpn-wireguard': ['vpn', 'wireguard', 'red'],
    'monitoring-red': ['tcpdump', 'red', 'diagnostico'],
    'ssh-hardening': ['ssh', 'seguridad', 'hardening'],
    'fail2ban': ['fail2ban', 'seguridad', 'ataques'],
    'ssl-letsencrypt': ['ssl', 'tls', 'https'],
    'audit-linux': ['auditd', 'seguridad', 'logs'],
    'hardening-servidor': ['hardening', 'linux', 'seguridad'],
    'postgresql-intro': ['postgresql', 'sql', 'bases-de-datos'],
    'mysql-mariadb': ['mysql', 'mariadb', 'bases-de-datos'],
    'redis-cache': ['redis', 'cache', 'memoria'],
    'mongodb': ['mongodb', 'nosql', 'bases-de-datos'],
    'backup-db': ['backup', 'restauracion', 'datos'],
    'docker-intro': ['docker', 'contenedores', 'cloud'],
    'kubernetes-intro': ['kubernetes', 'k8s', 'orquestacion'],
    'terraform-intro': ['terraform', 'iac', 'cloud'],
    'ci-cd': ['ci/cd', 'github-actions', 'deploy'],
    'aws-ec2-s3': ['aws', 'ec2', 's3'],
  };
  return tagMap[id] || ['articulo'];
};

// All articles combined
export const allArticles: ArticleContent[] = [
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
  toArticleContent(troubleshootingCpu),
  toArticleContent(troubleshootingDisk),
  toArticleContent(troubleshootingMemory),
  toArticleContent(troubleshootingNetwork),
  toArticleContent(troubleshootingSsh),
  toArticleContent(introVirtualizacion),
  toArticleContent(docker),
  toArticleContent(lxc),
  toArticleContent(kvm),
  toArticleContent(vmware),
  toArticleContent(redesVirtuales),
  toArticleContent(almacenamientoVirtual),
  toArticleContent(tcpIpFundamentos),
  toArticleContent(firewallIptables),
  toArticleContent(dnsBind),
  toArticleContent(vpnWireguard),
  toArticleContent(monitoringRed),
  toArticleContent(sshHardening),
  toArticleContent(fail2ban),
  toArticleContent(sslLetsencrypt),
  toArticleContent(auditLinux),
  toArticleContent(hardeningServidor),
  toArticleContent(postgresqlIntro),
  toArticleContent(mysqlMariadb),
  toArticleContent(redisCache),
  toArticleContent(mongodb),
  toArticleContent(backupDb),
  toArticleContent(dockerIntro),
  toArticleContent(kubernetesIntro),
  toArticleContent(terraformIntro),
  toArticleContent(ciCd),
  toArticleContent(awsEc2S3),
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