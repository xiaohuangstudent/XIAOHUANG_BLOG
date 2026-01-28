import{_ as n,o as a,c as p,a4 as e}from"./chunks/framework.PZCYvDoh.js";const l="/XIAOHUANG_BLOG/docs/Markdown%E6%96%87%E6%9C%AC%E8%87%AA%E5%8A%A8%E6%8F%90%E5%8F%96%E8%BD%AF%E4%BB%B6_localdata/image-20250630005945084.png",f=JSON.parse('{"title":"Markdown文本自动提取软件","description":"","frontmatter":{},"headers":[],"relativePath":"xiaohuang_mdwork/快速软件/md文档提取工具/Markdown文本自动提取软件.md","filePath":"xiaohuang_mdwork/快速软件/md文档提取工具/Markdown文本自动提取软件.md"}'),t={name:"xiaohuang_mdwork/快速软件/md文档提取工具/Markdown文本自动提取软件.md"};function o(i,s,c,r,u,d){return a(),p("div",null,[...s[0]||(s[0]=[e(`<h1 id="markdown文本自动提取软件" tabindex="-1">Markdown文本自动提取软件 <a class="header-anchor" href="#markdown文本自动提取软件" aria-label="Permalink to &quot;Markdown文本自动提取软件&quot;">​</a></h1><p><a href="/XIAOHUANG_BLOG/docs/Markdown%E6%96%87%E6%9C%AC%E8%87%AA%E5%8A%A8%E6%8F%90%E5%8F%96%E8%BD%AF%E4%BB%B6_localdata/Markdown%E6%96%87%E6%9C%AC%E8%87%AA%E5%8A%A8%E6%8F%90%E5%8F%96%E8%BD%AF%E4%BB%B6.pdf">Markdown文本自动提取软件.pdf</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import os</span></span>
<span class="line"><span>import re</span></span>
<span class="line"><span>import shutil</span></span>
<span class="line"><span>import tkinter as tk</span></span>
<span class="line"><span>from tkinter import ttk, filedialog, messagebox, scrolledtext</span></span>
<span class="line"><span>from pathlib import Path</span></span>
<span class="line"><span>from urllib.parse import unquote</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class MarkdownExporterApp:</span></span>
<span class="line"><span>    def __init__(self, root):</span></span>
<span class="line"><span>        self.root = root</span></span>
<span class="line"><span>        self.root.title(&quot;Markdown文档导出工具&quot;)</span></span>
<span class="line"><span>        self.root.geometry(&quot;800x600&quot;)</span></span>
<span class="line"><span>        self.root.resizable(True, True)</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        # 设置应用图标</span></span>
<span class="line"><span>        # self.root.iconbitmap(&quot;yours.ico&quot;)</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        # 创建主框架</span></span>
<span class="line"><span>        main_frame = ttk.Frame(root, padding=15)</span></span>
<span class="line"><span>        main_frame.pack(fill=tk.BOTH, expand=True)</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        # 创建标签页</span></span>
<span class="line"><span>        notebook = ttk.Notebook(main_frame)</span></span>
<span class="line"><span>        notebook.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        # 导出设置标签页</span></span>
<span class="line"><span>        export_frame = ttk.Frame(notebook, padding=10)</span></span>
<span class="line"><span>        notebook.add(export_frame, text=&quot;导出设置&quot;)</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        # 源文件选择</span></span>
<span class="line"><span>        source_frame = ttk.LabelFrame(export_frame, text=&quot;1. 选择源Markdown文件&quot;, padding=10)</span></span>
<span class="line"><span>        source_frame.pack(fill=tk.X, padx=5, pady=5)</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        self.source_path = tk.StringVar()</span></span>
<span class="line"><span>        ttk.Entry(source_frame, textvariable=self.source_path, state=&#39;readonly&#39;, width=70).pack(</span></span>
<span class="line"><span>            side=tk.LEFT, fill=tk.X, expand=True, padx=(0, 5))</span></span>
<span class="line"><span>        ttk.Button(source_frame, text=&quot;浏览...&quot;, command=self.select_source_file).pack(side=tk.RIGHT)</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        # 素材导出路径</span></span>
<span class="line"><span>        asset_frame = ttk.LabelFrame(export_frame, text=&quot;2. 选择素材导出路径&quot;, padding=10)</span></span>
<span class="line"><span>        asset_frame.pack(fill=tk.X, padx=5, pady=5)</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        self.asset_path = tk.StringVar()</span></span>
<span class="line"><span>        ttk.Entry(asset_frame, textvariable=self.asset_path, state=&#39;readonly&#39;, width=70).pack(</span></span>
<span class="line"><span>            side=tk.LEFT, fill=tk.X, expand=True, padx=(0, 5))</span></span>
<span class="line"><span>        ttk.Button(asset_frame, text=&quot;浏览...&quot;, command=self.select_asset_folder).pack(side=tk.RIGHT)</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        # Markdown导出路径</span></span>
<span class="line"><span>        md_frame = ttk.LabelFrame(export_frame, text=&quot;3. 选择Markdown导出路径&quot;, padding=10)</span></span>
<span class="line"><span>        md_frame.pack(fill=tk.X, padx=5, pady=5)</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        self.md_path = tk.StringVar()</span></span>
<span class="line"><span>        ttk.Entry(md_frame, textvariable=self.md_path, state=&#39;readonly&#39;, width=70).pack(</span></span>
<span class="line"><span>            side=tk.LEFT, fill=tk.X, expand=True, padx=(0, 5))</span></span>
<span class="line"><span>        ttk.Button(md_frame, text=&quot;浏览...&quot;, command=self.select_md_folder).pack(side=tk.RIGHT)</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        # 导出按钮</span></span>
<span class="line"><span>        button_frame = ttk.Frame(export_frame)</span></span>
<span class="line"><span>        button_frame.pack(fill=tk.X, padx=5, pady=15)</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        self.export_btn = ttk.Button(</span></span>
<span class="line"><span>            button_frame, </span></span>
<span class="line"><span>            text=&quot;开始导出&quot;, </span></span>
<span class="line"><span>            command=self.export_markdown,</span></span>
<span class="line"><span>            style=&quot;Accent.TButton&quot;</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>        self.export_btn.pack(pady=10)</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        # 日志区域</span></span>
<span class="line"><span>        log_frame = ttk.LabelFrame(export_frame, text=&quot;处理日志&quot;, padding=10)</span></span>
<span class="line"><span>        log_frame.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        self.log = scrolledtext.ScrolledText(</span></span>
<span class="line"><span>            log_frame, </span></span>
<span class="line"><span>            height=10, </span></span>
<span class="line"><span>            state=&#39;disabled&#39;,</span></span>
<span class="line"><span>            wrap=tk.WORD</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>        self.log.pack(fill=tk.BOTH, expand=True)</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        # 添加样式</span></span>
<span class="line"><span>        self.setup_styles()</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        # 状态变量</span></span>
<span class="line"><span>        self.source_file =None</span></span>
<span class="line"><span>        self.asset_dir = None</span></span>
<span class="line"><span>        self.md_dir = None</span></span>
<span class="line"><span>    def get_relative_path(self,newmd,newdata):</span></span>
<span class="line"><span>        relative_path = newdata.relative_to(newmd.parent)</span></span>
<span class="line"><span>    def setup_styles(self):</span></span>
<span class="line"><span>        style = ttk.Style()</span></span>
<span class="line"><span>        style.configure(&quot;Accent.TButton&quot;, font=(&#39;Segoe UI&#39;, 10, &#39;bold&#39;), foreground=&quot;#2c3e50&quot;)</span></span>
<span class="line"><span>        style.map(&quot;Accent.TButton&quot;, </span></span>
<span class="line"><span>                  foreground=[(&#39;active&#39;, &#39;#3498db&#39;), (&#39;pressed&#39;, &#39;#2980b9&#39;)],</span></span>
<span class="line"><span>                  background=[(&#39;active&#39;, &#39;#ecf0f1&#39;), (&#39;pressed&#39;, &#39;#bdc3c7&#39;)])</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        # 配置标签页样式</span></span>
<span class="line"><span>        style.configure(&quot;TNotebook&quot;, background=&quot;#ecf0f1&quot;)</span></span>
<span class="line"><span>        style.configure(&quot;TNotebook.Tab&quot;, font=(&#39;Segoe UI&#39;, 9), padding=[10, 5])</span></span>
<span class="line"><span>        style.map(&quot;TNotebook.Tab&quot;, </span></span>
<span class="line"><span>                  background=[(&quot;selected&quot;, &quot;#3498db&quot;)],</span></span>
<span class="line"><span>                  foreground=[(&quot;selected&quot;, &quot;white&quot;)])</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        # 配置日志区域</span></span>
<span class="line"><span>        self.log.tag_config(&quot;success&quot;, foreground=&quot;#27ae60&quot;)</span></span>
<span class="line"><span>        self.log.tag_config(&quot;info&quot;, foreground=&quot;#3498db&quot;)</span></span>
<span class="line"><span>        self.log.tag_config(&quot;warning&quot;, foreground=&quot;#f39c12&quot;)</span></span>
<span class="line"><span>        self.log.tag_config(&quot;error&quot;, foreground=&quot;#e74c3c&quot;)</span></span>
<span class="line"><span>        self.log.tag_config(&quot;bold&quot;, font=(&#39;Segoe UI&#39;, 9, &#39;bold&#39;))</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    def log_message(self, message, tag=&quot;info&quot;):</span></span>
<span class="line"><span>        &quot;&quot;&quot;添加日志消息&quot;&quot;&quot;</span></span>
<span class="line"><span>        self.log.config(state=&#39;normal&#39;)</span></span>
<span class="line"><span>        self.log.insert(tk.END, message + &quot;\\n&quot;, tag)</span></span>
<span class="line"><span>        self.log.config(state=&#39;disabled&#39;)</span></span>
<span class="line"><span>        self.log.see(tk.END)</span></span>
<span class="line"><span>        self.root.update()</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    def select_source_file(self):</span></span>
<span class="line"><span>        &quot;&quot;&quot;选择源Markdown文件&quot;&quot;&quot;</span></span>
<span class="line"><span>        file_path = filedialog.askopenfilename(</span></span>
<span class="line"><span>            title=&quot;选择Markdown文件&quot;,</span></span>
<span class="line"><span>            filetypes=[(&quot;Markdown文件&quot;, &quot;*.md&quot;), (&quot;所有文件&quot;, &quot;*.*&quot;)]</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>        if file_path:</span></span>
<span class="line"><span>            self.source_file = file_path</span></span>
<span class="line"><span>            self.source_path.set(file_path)</span></span>
<span class="line"><span>            self.log_message(f&quot;已选择源文件: {file_path}&quot;, &quot;info&quot;)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    def select_asset_folder(self):</span></span>
<span class="line"><span>        &quot;&quot;&quot;选择素材导出路径&quot;&quot;&quot;</span></span>
<span class="line"><span>        dir_path = filedialog.askdirectory(title=&quot;选择素材导出路径&quot;)</span></span>
<span class="line"><span>        if dir_path:</span></span>
<span class="line"><span>            self.asset_dir = dir_path</span></span>
<span class="line"><span>            self.asset_path.set(dir_path)</span></span>
<span class="line"><span>            self.log_message(f&quot;素材将导出到: {dir_path}&quot;, &quot;info&quot;)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    def select_md_folder(self):</span></span>
<span class="line"><span>        &quot;&quot;&quot;选择MD导出路径&quot;&quot;&quot;</span></span>
<span class="line"><span>        dir_path = filedialog.askdirectory(title=&quot;选择Markdown导出路径&quot;)</span></span>
<span class="line"><span>        if dir_path:</span></span>
<span class="line"><span>            self.md_dir = dir_path</span></span>
<span class="line"><span>            self.md_path.set(dir_path)</span></span>
<span class="line"><span>            self.log_message(f&quot;Markdown文件将导出到: {dir_path}&quot;, &quot;info&quot;)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    def export_markdown(self):</span></span>
<span class="line"><span>        &quot;&quot;&quot;执行导出操作&quot;&quot;&quot;</span></span>
<span class="line"><span>        # 验证输入</span></span>
<span class="line"><span>        if not self.source_path.get() and not self.source_file:</span></span>
<span class="line"><span>            messagebox.showerror(&quot;错误&quot;, &quot;请先选择Markdown源文件！&quot;)</span></span>
<span class="line"><span>            return</span></span>
<span class="line"><span>        if not self.asset_path.get() and not self.asset_dir:</span></span>
<span class="line"><span>            messagebox.showerror(&quot;错误&quot;, &quot;请选择素材导出路径！&quot;)</span></span>
<span class="line"><span>            return</span></span>
<span class="line"><span>        if not self.md_path.get() and not self.md_dir:</span></span>
<span class="line"><span>            messagebox.showerror(&quot;错误&quot;, &quot;请选择Markdown文件导出路径！&quot;)</span></span>
<span class="line"><span>            return</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        try:</span></span>
<span class="line"><span>            self.export_btn.config(state=tk.DISABLED)</span></span>
<span class="line"><span>            self.log_message(&quot;=&quot; * 60, &quot;bold&quot;)</span></span>
<span class="line"><span>            self.log_message(&quot;开始导出Markdown文档及关联资源...&quot;, &quot;bold&quot;)</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            # 获取源文件信息</span></span>
<span class="line"><span>            source_path = Path(self.source_path.get())</span></span>
<span class="line"><span>            file_name = source_path.stem</span></span>
<span class="line"><span>            base_dir = source_path.parent</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            # 创建资源文件夹</span></span>
<span class="line"><span>            asset_folder = Path(self.asset_path.get() +&#39;/docs/&#39;+ f&quot;{file_name}_localdata&quot;)</span></span>
<span class="line"><span>            asset_folder.mkdir(parents=True, exist_ok=True)</span></span>
<span class="line"><span>            self.log_message(f&quot;创建资源文件夹: {asset_folder}&quot;, &quot;success&quot;)</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            # 读取Markdown内容</span></span>
<span class="line"><span>            with open(source_path, &#39;r&#39;, encoding=&#39;utf-8&#39;) as f:</span></span>
<span class="line"><span>                content = f.read()</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            # 查找所有本地资源链接</span></span>
<span class="line"><span>            local_links = []</span></span>
<span class="line"><span>            # 匹配图片链接和普通文件链接</span></span>
<span class="line"><span>            pattern = r&#39;!?\\[.*?\\]\\(([^\\s]+?)\\)&#39;</span></span>
<span class="line"><span>            for match in re.finditer(pattern, content):</span></span>
<span class="line"><span>                link = match.group(1)</span></span>
<span class="line"><span>                # 排除网络链接</span></span>
<span class="line"><span>                if not re.match(r&#39;https?://&#39;, link, re.IGNORECASE):</span></span>
<span class="line"><span>                    # 处理URL编码的路径</span></span>
<span class="line"><span>                    decoded_link = unquote(link)</span></span>
<span class="line"><span>                    # 替换Windows路径分隔符</span></span>
<span class="line"><span>                    normalized_link = decoded_link.replace(&#39;\\\\&#39;, &#39;/&#39;)</span></span>
<span class="line"><span>                    local_links.append(normalized_link)</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            self.log_message(f&quot;找到 {len(local_links)} 个本地资源链接&quot;, &quot;info&quot;)</span></span>
<span class="line"><span>            print(local_links)</span></span>
<span class="line"><span>            # 复制资源文件并更新内容</span></span>
<span class="line"><span>            link_map = {}</span></span>
<span class="line"><span>            processed_files = set()</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            for i, link in enumerate(local_links):</span></span>
<span class="line"><span>                # 修复：将相对路径转换为相对于原始md文档的绝对路径</span></span>
<span class="line"><span>                if link.startswith(&#39;/&#39;):</span></span>
<span class="line"><span>                    # Unix绝对路径</span></span>
<span class="line"><span>                    src_path = Path(link)</span></span>
<span class="line"><span>                elif re.match(r&#39;^[a-zA-Z]:&#39;, link):</span></span>
<span class="line"><span>                    # Windows绝对路径 (如 C:/path)</span></span>
<span class="line"><span>                    src_path = Path(link)</span></span>
<span class="line"><span>                else:</span></span>
<span class="line"><span>                    # 相对路径 - 转换为相对于源文档的绝对路径</span></span>
<span class="line"><span>                    # 处理多层上级目录 (如 ../../../)</span></span>
<span class="line"><span>                    print(base_dir, link)</span></span>
<span class="line"><span>                    abs_link = (base_dir / link).resolve()</span></span>
<span class="line"><span>                    print(abs_link)</span></span>
<span class="line"><span>                    src_path = abs_link</span></span>
<span class="line"><span>                </span></span>
<span class="line"><span>                # 检查文件是否存在</span></span>
<span class="line"><span>                if not src_path.exists() or not src_path.is_file():</span></span>
<span class="line"><span>                    if src_path.is_dir():</span></span>
<span class="line"><span>                        self.log_message(f&quot;⚠️ 资源文件为文件夹，注意存储大小: {src_path}&quot;, &quot;warning&quot;)</span></span>
<span class="line"><span>                    else:</span></span>
<span class="line"><span>                        self.log_message(f&quot;⚠️ 资源文件不存在: {src_path}&quot;, &quot;warning&quot;)</span></span>
<span class="line"><span>                        continue</span></span>
<span class="line"><span>                </span></span>
<span class="line"><span>                # 创建目标路径</span></span>
<span class="line"><span>                dest_path = asset_folder / src_path.name</span></span>
<span class="line"><span>                </span></span>
<span class="line"><span>                # 处理同名文件</span></span>
<span class="line"><span>                counter = 1</span></span>
<span class="line"><span>                while dest_path.exists() and dest_path not in processed_files:</span></span>
<span class="line"><span>                    stem = src_path.stem</span></span>
<span class="line"><span>                    suffix = src_path.suffix</span></span>
<span class="line"><span>                    dest_path = asset_folder / f&quot;{stem}_{counter}{suffix}&quot;</span></span>
<span class="line"><span>                    counter += 1</span></span>
<span class="line"><span>                </span></span>
<span class="line"><span>                # try:</span></span>
<span class="line"><span>                if src_path.is_dir():</span></span>
<span class="line"><span>                # 复制文件夹</span></span>
<span class="line"><span>                    print(&quot;复制文件夹&quot;, src_path, dest_path)</span></span>
<span class="line"><span>                    # shutil.copytree(src_path, dest_path)</span></span>
<span class="line"><span>                else:    </span></span>
<span class="line"><span>                    # 复制文件</span></span>
<span class="line"><span>                    shutil.copy2(src_path, dest_path)</span></span>
<span class="line"><span>                    processed_files.add(dest_path)</span></span>
<span class="line"><span>                </span></span>
<span class="line"><span>                # 记录新旧路径映射</span></span>
<span class="line"><span>                link_map[link] = f&quot;{file_name}_localdata/{dest_path.name}&quot;</span></span>
<span class="line"><span>                self.log_message(f&quot;✅ ({i+1}/{len(local_links)}) 复制资源: {src_path.name}&quot;, &quot;success&quot;)</span></span>
<span class="line"><span>                # except Exception as e:</span></span>
<span class="line"><span>                #     self.log_message(f&quot;❌ 复制失败: {src_path.name} - {str(e)}&quot;, &quot;error&quot;)</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            # 替换Markdown中的链接</span></span>
<span class="line"><span>            for old_link, new_link in link_map.items():</span></span>
<span class="line"><span>                # 转义特殊字符用于正则替换</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                # escaped_old_link = re.escape(old_link)</span></span>
<span class="line"><span>                escaped_old_link=old_link.replace(&quot;/&quot;,&quot;\\\\&quot;)</span></span>
<span class="line"><span>                new_link=&#39;docs/&#39;+new_link</span></span>
<span class="line"><span>                print(escaped_old_link,new_link)</span></span>
<span class="line"><span>                # 使用正则替换确保准确匹配</span></span>
<span class="line"><span>                # content = re.sub(f&#39;({re.escape(&quot;(&quot;)}{escaped_old_link}{re.escape(&quot;)&quot;)}&#39;, </span></span>
<span class="line"><span>                #                 f&#39;\\\\1{new_link}\\\\2&#39;, content)</span></span>
<span class="line"><span>                # content = re.sub(r&#39;\\(\\b&#39; + re.escape(old_link) + r&#39;\\b\\)&#39;, </span></span>
<span class="line"><span>                #     f&#39;({new_link})&#39;, content)</span></span>
<span class="line"><span>                content=content.replace(escaped_old_link,new_link)</span></span>
<span class="line"><span>                # content = re.sub(f&#39;\\\\({re.escape(escaped_old_link)}\\\\)&#39;, f&#39;\\\\1{new_link}\\\\2&#39;, content )</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>            # 保存新Markdown文件</span></span>
<span class="line"><span>            new_md_path = Path(self.md_path.get()) / source_path.name</span></span>
<span class="line"><span>            with open(new_md_path, &#39;w&#39;, encoding=&#39;utf-8&#39;) as f:</span></span>
<span class="line"><span>                f.write(content)</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            self.log_message(&quot;=&quot; * 60, &quot;bold&quot;)</span></span>
<span class="line"><span>            self.log_message(f&quot;🎉 导出成功！&quot;, &quot;success&quot;)</span></span>
<span class="line"><span>            self.log_message(f&quot;新Markdown文件: {new_md_path}&quot;, &quot;bold&quot;)</span></span>
<span class="line"><span>            self.log_message(f&quot;资源文件夹: {asset_folder}&quot;, &quot;bold&quot;)</span></span>
<span class="line"><span>            self.log_message(&quot;=&quot; * 60, &quot;bold&quot;)</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            # 显示成功消息</span></span>
<span class="line"><span>            messagebox.showinfo(</span></span>
<span class="line"><span>                &quot;导出完成&quot;, </span></span>
<span class="line"><span>                f&quot;Markdown文档导出成功！\\n\\n&quot;</span></span>
<span class="line"><span>                f&quot;新文档位置: {new_md_path}\\n&quot;</span></span>
<span class="line"><span>                f&quot;资源文件夹: {asset_folder}&quot;</span></span>
<span class="line"><span>            )</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>        except Exception as e:</span></span>
<span class="line"><span>            self.log_message(f&quot;❌ 导出过程中发生错误: {str(e)}&quot;, &quot;error&quot;)</span></span>
<span class="line"><span>            messagebox.showerror(&quot;错误&quot;, f&quot;导出过程中发生错误:\\n{str(e)}&quot;)</span></span>
<span class="line"><span>        finally:</span></span>
<span class="line"><span>            self.export_btn.config(state=tk.NORMAL)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == &quot;__main__&quot;:</span></span>
<span class="line"><span>    root = tk.Tk()</span></span>
<span class="line"><span>    app = MarkdownExporterApp(root)</span></span>
<span class="line"><span>    root.mainloop()</span></span></code></pre></div><img src="`+l+'" alt="image-20250630005945084" style="zoom:50%;">',4)])])}const q=n(t,[["render",o]]);export{f as __pageData,q as default};
