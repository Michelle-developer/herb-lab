import { Github, Linkedin, Mail } from 'lucide-react';

function Footer() {
  return (
    <div>
      <footer className="bg-oliver flex items-center justify-center gap-4 px-4 py-8 text-center text-xs tracking-wide text-stone-200">
        Copyright © 2025 Michelle Chen
        <a
          href="https://github.com/MichelleChen99/herb-lab.git"
          aria-label="連結到 Michelle Chen 的 GitHub Herb Lab 專案倉庫"
          className="rounded-full border-2 border-stone-200 hover:bg-stone-400"
          target="_blank"
          rel="noreferrer"
        >
          <Github className="m-2 h-6 w-6" />
        </a>
        <a
          href="https://www.linkedin.com/in/michelle-chen-99y24"
          aria-label="連結到 Michelle Chen 的 LinkedIn 主頁"
          className="rounded-full border-2 border-stone-200 hover:bg-stone-400"
          target="_blank"
          rel="noreferrer"
        >
          <Linkedin className="m-2 h-6 w-6" />
        </a>
        <a
          href="mailto: miiitiiigg@gmail.com"
          aria-label="寄信給 Michelle Chen"
          className="rounded-full border-2 border-stone-200 hover:bg-stone-400"
          target="_blank"
          rel="noreferrer"
        >
          <Mail className="m-2 h-6 w-6" />
        </a>
      </footer>
    </div>
  );
}

export default Footer;
