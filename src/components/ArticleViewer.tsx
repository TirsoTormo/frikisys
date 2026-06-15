import React, { useEffect, useRef } from 'react';

export interface CodeBlock {
  language: string;
  code: string;
  filename?: string;
}

export const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const parseMarkdown = (md: string): string => {
  // Process line by line to avoid block-level elements getting wrapped in <p>
  const lines = md.split('\n');
  const result: string[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLang = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Fenced code block handling
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        // Start code block
        inCodeBlock = true;
        codeLang = line.slice(3).trim() || 'bash';
        codeBuffer = [];
      } else {
        // End code block
        inCodeBlock = false;
        const lang = codeLang || 'bash';
        const code = codeBuffer.join('\n');
        result.push(`<pre class="code-fence" data-lang="${lang}"><code class="language-${lang}">${escapeHtml(code.trim())}</code></pre>`);
        codeBuffer = [];
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // Skip empty lines
    if (!line.trim()) {
      result.push('');
      continue;
    }

    // Headers (## = h2, ### = h3)
    if (line.startsWith('#### ')) {
      result.push(`<h4>${escapeHtml(line.slice(5))}</h4>`);
    } else if (line.startsWith('### ')) {
      result.push(`<h3>${escapeHtml(line.slice(4))}</h3>`);
    } else if (line.startsWith('## ')) {
      result.push(`<h2>${escapeHtml(line.slice(3))}</h2>`);
    } else if (line.startsWith('# ')) {
      result.push(`<h1>${escapeHtml(line.slice(2))}</h1>`);
    }
    // List items
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      result.push(`<li>${escapeHtml(line.slice(2))}</li>`);
    }
    // Paragraph text
    else {
      // Apply inline formatting to paragraph text
      let processed = line;
      // Bold + italic
      processed = processed.replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>');
      // Bold
      processed = processed.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
      // Italic
      processed = processed.replace(/\*(.*?)\*/gim, '<em>$1</em>');
      // Inline code
      processed = processed.replace(/`([^`]+)`/gim, '<code class="inline-code">$1</code>');
      // Links
      processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
      result.push(`<p>${processed}</p>`);
    }
  }

  // Wrap consecutive <li> items in <ul>
  const html = result.join('\n');
  return html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
};

export interface ArticleViewerProps {
  title: string;
  articleId?: string;
  category: string;
  content: string;
  codeBlocks?: CodeBlock[];
  tags?: string[];
  date?: string;
  author?: string;
  onBack?: () => void;
  onRelatedArticleClick?: (articleId: string) => void;
  onTagClick?: (tag: string) => void;
}

const ArticleViewer: React.FC<ArticleViewerProps> = ({
  title,
  articleId,
  category,
  content,
  codeBlocks = [],
  tags = [],
  date,
  author = 'Frikisys Team',
  onBack,
  onRelatedArticleClick,
  onTagClick,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const getCategoryFolder = (id: string): string => {
    const linux = ['intro-linux','comandos-basicos','gestion-usuarios','permisos','systemd','redes','disco-almacenamiento','procesos','scripts-bash','ssh','troubleshooting-cpu','troubleshooting-disk','troubleshooting-memory','troubleshooting-network','troubleshooting-ssh'];
    if (linux.includes(id)) return 'linux';
    const virt = ['intro-virtualizacion','docker','lxc','kvm','vmware','redes-virtuales','almacenamiento-virtual'];
    if (virt.includes(id)) return 'virtualizacion';
    const redes = ['tcp-ip-fundamentos','firewall-iptables','dns-bind','vpn-wireguard','monitoring-red'];
    if (redes.includes(id)) return 'redes';
    const seg = ['ssh-hardening','fail2ban','ssl-letsencrypt','audit-linux','hardening-servidor'];
    if (seg.includes(id)) return 'seguridad';
    const db = ['postgresql-intro','mysql-mariadb','redis-cache','mongodb','backup-db'];
    if (db.includes(id)) return 'bases-de-datos';
    const cloud = ['docker-intro','kubernetes-intro','terraform-intro','ci-cd','aws-ec2-s3'];
    if (cloud.includes(id)) return 'cloud';
    return 'linux';
  };

  // Construct GitHub edit URL
  const githubEditUrl = articleId
    ? `https://github.com/TirsoTormo/frikisys/edit/main/src/content/${getCategoryFolder(articleId)}/${articleId}.json`
    : null;

  // Simple markdown to HTML conversion
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = parseMarkdown(content);
    }
  }, [content]);

  const categoryColors: Record<string, string> = {
    linux: 'border-l-[#6b7280]',
    virtualización: 'border-l-[#3b82f6]',
    redes: 'border-l-[#8b5cf6]',
    seguridad: 'border-l-[#ef4444]',
    'bases de datos': 'border-l-[#f59e0b]',
    cloud: 'border-l-[#06b6d4]',
  };

  const categoryColor = categoryColors[category.toLowerCase()] || 'border-l-accent';

  const languageLabels: Record<string, string> = {
    bash: 'Bash',
    sh: 'Shell',
    zsh: 'Zsh',
    powershell: 'PowerShell',
    python: 'Python',
    yaml: 'YAML',
    json: 'JSON',
    sql: 'SQL',
    dockerfile: 'Dockerfile',
    terraform: 'Terraform',
    nginx: 'Nginx',
    apache: 'Apache',
  };

  return (
    <article className="w-full max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-6 text-text-secondary hover:text-text-primary transition-colors group"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="square" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="font-mono text-sm">Volver</span>
      </button>

      {/* Article header */}
      <header className={`mb-8 pb-6 border-b-2 border-base-border border-l-4 ${categoryColor} pl-4`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-sm text-accent">[{category}]</span>
          {date && (
            <>
              <span className="text-text-muted">•</span>
              <span className="font-mono text-xs text-text-muted">{date}</span>
            </>
          )}
        </div>
        
        <h1 className="font-mono text-2xl md:text-3xl font-bold text-text-primary mb-4">
          {title}
        </h1>

        <div className="flex items-center gap-2 text-text-muted">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="font-mono text-xs">{author}</span>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-base-card border border-base-border rounded font-mono text-xs text-text-secondary hover:border-accent transition-colors cursor-pointer"
                onClick={() => onTagClick?.(tag)}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Article content */}
      <div className="article-content mb-12">
        <div
          ref={contentRef}
          className="prose prose-invert max-w-none"
        />
      </div>

      {/* Code blocks */}
      {codeBlocks.length > 0 && (
        <section className="mb-12">
          <div className="pixel-separator mb-6">
            <h2 className="font-mono text-lg font-semibold text-text-primary px-4 bg-base-bg">
              Ejemplos de Código
            </h2>
          </div>

          <div className="space-y-6">
            {codeBlocks.map((block, index) => (
              <div key={index} className="code-block" data-language={block.language}>
                {/* Header */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-base-border">
                  <div className="flex items-center gap-2">
                    {/* Language indicator dots */}
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-[#ef4444] rounded-full" />
                      <div className="w-2 h-2 bg-[#f59e0b] rounded-full" />
                      <div className="w-2 h-2 bg-[#22c55e] rounded-full" />
                    </div>
                    {block.filename && (
                      <span className="font-mono text-xs text-text-muted ml-2">
                        {block.filename}
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-xs text-text-muted px-2 py-0.5 bg-base-bg rounded">
                    {languageLabels[block.language] || block.language}
                  </span>
                </div>

                {/* Code */}
                <pre className="overflow-x-auto">
                  <code className={`language-${block.language} text-text-primary font-mono text-sm`}>
                    {block.code}
                  </code>
                </pre>

                {/* Copy button */}
                <button
                  className="absolute top-3 right-3 p-1.5 text-text-muted hover:text-text-primary hover:bg-base-hover rounded transition-colors"
                  onClick={() => {
                    navigator.clipboard.writeText(block.code);
                  }}
                  title="Copiar código"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Article footer */}
      <footer className="pt-6 border-t border-base-border">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Comments link */}
          <a
            href={articleId ? `https://github.com/TirsoTormo/frikisys/issues/new?title=${encodeURIComponent(`[Artículo] ${title}`)}&body=${encodeURIComponent(`\n\n---\nArtículo: ${title}\nhttps://github.com/TirsoTormo/frikisys/blob/main/src/content/${getCategoryFolder(articleId)}/${articleId}.json\n\n**Tu comentario:**\n`)}` : '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-base-hover rounded transition-colors border border-base-border cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="font-mono text-sm">Abrir discusión</span>
          </a>

          {/* Edit on GitHub */}
          {githubEditUrl && (
            <a
              href={githubEditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-base-hover rounded transition-colors border border-base-border"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span className="font-mono text-sm">Editar en GitHub</span>
            </a>
          )}
        </div>
      </footer>
    </article>
  );
};

export default ArticleViewer;
