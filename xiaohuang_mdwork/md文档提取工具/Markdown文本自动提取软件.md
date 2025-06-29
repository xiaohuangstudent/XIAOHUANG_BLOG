# Markdown文本自动提取软件

 [Markdown文本自动提取软件.pdf](/docs/Markdown文本自动提取软件_localdata/Markdown文本自动提取软件.pdf) 

```
import os
import re
import shutil
import tkinter as tk
from tkinter import ttk, filedialog, messagebox, scrolledtext
from pathlib import Path
from urllib.parse import unquote

class MarkdownExporterApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Markdown文档导出工具")
        self.root.geometry("800x600")
        self.root.resizable(True, True)
        
        # 设置应用图标
        # self.root.iconbitmap("yours.ico")
        
        # 创建主框架
        main_frame = ttk.Frame(root, padding=15)
        main_frame.pack(fill=tk.BOTH, expand=True)
        
        # 创建标签页
        notebook = ttk.Notebook(main_frame)
        notebook.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        # 导出设置标签页
        export_frame = ttk.Frame(notebook, padding=10)
        notebook.add(export_frame, text="导出设置")
        
        # 源文件选择
        source_frame = ttk.LabelFrame(export_frame, text="1. 选择源Markdown文件", padding=10)
        source_frame.pack(fill=tk.X, padx=5, pady=5)
        
        self.source_path = tk.StringVar()
        ttk.Entry(source_frame, textvariable=self.source_path, state='readonly', width=70).pack(
            side=tk.LEFT, fill=tk.X, expand=True, padx=(0, 5))
        ttk.Button(source_frame, text="浏览...", command=self.select_source_file).pack(side=tk.RIGHT)
        
        # 素材导出路径
        asset_frame = ttk.LabelFrame(export_frame, text="2. 选择素材导出路径", padding=10)
        asset_frame.pack(fill=tk.X, padx=5, pady=5)
        
        self.asset_path = tk.StringVar()
        ttk.Entry(asset_frame, textvariable=self.asset_path, state='readonly', width=70).pack(
            side=tk.LEFT, fill=tk.X, expand=True, padx=(0, 5))
        ttk.Button(asset_frame, text="浏览...", command=self.select_asset_folder).pack(side=tk.RIGHT)
        
        # Markdown导出路径
        md_frame = ttk.LabelFrame(export_frame, text="3. 选择Markdown导出路径", padding=10)
        md_frame.pack(fill=tk.X, padx=5, pady=5)
        
        self.md_path = tk.StringVar()
        ttk.Entry(md_frame, textvariable=self.md_path, state='readonly', width=70).pack(
            side=tk.LEFT, fill=tk.X, expand=True, padx=(0, 5))
        ttk.Button(md_frame, text="浏览...", command=self.select_md_folder).pack(side=tk.RIGHT)
        
        # 导出按钮
        button_frame = ttk.Frame(export_frame)
        button_frame.pack(fill=tk.X, padx=5, pady=15)
        
        self.export_btn = ttk.Button(
            button_frame, 
            text="开始导出", 
            command=self.export_markdown,
            style="Accent.TButton"
        )
        self.export_btn.pack(pady=10)
        
        # 日志区域
        log_frame = ttk.LabelFrame(export_frame, text="处理日志", padding=10)
        log_frame.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        self.log = scrolledtext.ScrolledText(
            log_frame, 
            height=10, 
            state='disabled',
            wrap=tk.WORD
        )
        self.log.pack(fill=tk.BOTH, expand=True)
        
        # 添加样式
        self.setup_styles()
        
        # 状态变量
        self.source_file =None
        self.asset_dir = None
        self.md_dir = None
    def get_relative_path(self,newmd,newdata):
        relative_path = newdata.relative_to(newmd.parent)
    def setup_styles(self):
        style = ttk.Style()
        style.configure("Accent.TButton", font=('Segoe UI', 10, 'bold'), foreground="#2c3e50")
        style.map("Accent.TButton", 
                  foreground=[('active', '#3498db'), ('pressed', '#2980b9')],
                  background=[('active', '#ecf0f1'), ('pressed', '#bdc3c7')])
        
        # 配置标签页样式
        style.configure("TNotebook", background="#ecf0f1")
        style.configure("TNotebook.Tab", font=('Segoe UI', 9), padding=[10, 5])
        style.map("TNotebook.Tab", 
                  background=[("selected", "#3498db")],
                  foreground=[("selected", "white")])
        
        # 配置日志区域
        self.log.tag_config("success", foreground="#27ae60")
        self.log.tag_config("info", foreground="#3498db")
        self.log.tag_config("warning", foreground="#f39c12")
        self.log.tag_config("error", foreground="#e74c3c")
        self.log.tag_config("bold", font=('Segoe UI', 9, 'bold'))
    
    def log_message(self, message, tag="info"):
        """添加日志消息"""
        self.log.config(state='normal')
        self.log.insert(tk.END, message + "\n", tag)
        self.log.config(state='disabled')
        self.log.see(tk.END)
        self.root.update()
    
    def select_source_file(self):
        """选择源Markdown文件"""
        file_path = filedialog.askopenfilename(
            title="选择Markdown文件",
            filetypes=[("Markdown文件", "*.md"), ("所有文件", "*.*")]
        )
        if file_path:
            self.source_file = file_path
            self.source_path.set(file_path)
            self.log_message(f"已选择源文件: {file_path}", "info")
    
    def select_asset_folder(self):
        """选择素材导出路径"""
        dir_path = filedialog.askdirectory(title="选择素材导出路径")
        if dir_path:
            self.asset_dir = dir_path
            self.asset_path.set(dir_path)
            self.log_message(f"素材将导出到: {dir_path}", "info")
    
    def select_md_folder(self):
        """选择MD导出路径"""
        dir_path = filedialog.askdirectory(title="选择Markdown导出路径")
        if dir_path:
            self.md_dir = dir_path
            self.md_path.set(dir_path)
            self.log_message(f"Markdown文件将导出到: {dir_path}", "info")
    
    def export_markdown(self):
        """执行导出操作"""
        # 验证输入
        if not self.source_path.get() and not self.source_file:
            messagebox.showerror("错误", "请先选择Markdown源文件！")
            return
        if not self.asset_path.get() and not self.asset_dir:
            messagebox.showerror("错误", "请选择素材导出路径！")
            return
        if not self.md_path.get() and not self.md_dir:
            messagebox.showerror("错误", "请选择Markdown文件导出路径！")
            return
        
        try:
            self.export_btn.config(state=tk.DISABLED)
            self.log_message("=" * 60, "bold")
            self.log_message("开始导出Markdown文档及关联资源...", "bold")
            
            # 获取源文件信息
            source_path = Path(self.source_path.get())
            file_name = source_path.stem
            base_dir = source_path.parent
            
            # 创建资源文件夹
            asset_folder = Path(self.asset_path.get() +'/docs/'+ f"{file_name}_localdata")
            asset_folder.mkdir(parents=True, exist_ok=True)
            self.log_message(f"创建资源文件夹: {asset_folder}", "success")
            
            # 读取Markdown内容
            with open(source_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 查找所有本地资源链接
            local_links = []
            # 匹配图片链接和普通文件链接
            pattern = r'!?\[.*?\]\(([^\s]+?)\)'
            for match in re.finditer(pattern, content):
                link = match.group(1)
                # 排除网络链接
                if not re.match(r'https?://', link, re.IGNORECASE):
                    # 处理URL编码的路径
                    decoded_link = unquote(link)
                    # 替换Windows路径分隔符
                    normalized_link = decoded_link.replace('\\', '/')
                    local_links.append(normalized_link)
            
            self.log_message(f"找到 {len(local_links)} 个本地资源链接", "info")
            print(local_links)
            # 复制资源文件并更新内容
            link_map = {}
            processed_files = set()
            
            for i, link in enumerate(local_links):
                # 修复：将相对路径转换为相对于原始md文档的绝对路径
                if link.startswith('/'):
                    # Unix绝对路径
                    src_path = Path(link)
                elif re.match(r'^[a-zA-Z]:', link):
                    # Windows绝对路径 (如 C:/path)
                    src_path = Path(link)
                else:
                    # 相对路径 - 转换为相对于源文档的绝对路径
                    # 处理多层上级目录 (如 ../../../)
                    print(base_dir, link)
                    abs_link = (base_dir / link).resolve()
                    print(abs_link)
                    src_path = abs_link
                
                # 检查文件是否存在
                if not src_path.exists() or not src_path.is_file():
                    if src_path.is_dir():
                        self.log_message(f"⚠️ 资源文件为文件夹，注意存储大小: {src_path}", "warning")
                    else:
                        self.log_message(f"⚠️ 资源文件不存在: {src_path}", "warning")
                        continue
                
                # 创建目标路径
                dest_path = asset_folder / src_path.name
                
                # 处理同名文件
                counter = 1
                while dest_path.exists() and dest_path not in processed_files:
                    stem = src_path.stem
                    suffix = src_path.suffix
                    dest_path = asset_folder / f"{stem}_{counter}{suffix}"
                    counter += 1
                
                # try:
                if src_path.is_dir():
                # 复制文件夹
                    print("复制文件夹", src_path, dest_path)
                    # shutil.copytree(src_path, dest_path)
                else:    
                    # 复制文件
                    shutil.copy2(src_path, dest_path)
                    processed_files.add(dest_path)
                
                # 记录新旧路径映射
                link_map[link] = f"{file_name}_localdata/{dest_path.name}"
                self.log_message(f"✅ ({i+1}/{len(local_links)}) 复制资源: {src_path.name}", "success")
                # except Exception as e:
                #     self.log_message(f"❌ 复制失败: {src_path.name} - {str(e)}", "error")
            
            # 替换Markdown中的链接
            for old_link, new_link in link_map.items():
                # 转义特殊字符用于正则替换

                # escaped_old_link = re.escape(old_link)
                escaped_old_link=old_link.replace("/","\\")
                new_link='docs/'+new_link
                print(escaped_old_link,new_link)
                # 使用正则替换确保准确匹配
                # content = re.sub(f'({re.escape("(")}{escaped_old_link}{re.escape(")")}', 
                #                 f'\\1{new_link}\\2', content)
                # content = re.sub(r'\(\b' + re.escape(old_link) + r'\b\)', 
                #     f'({new_link})', content)
                content=content.replace(escaped_old_link,new_link)
                # content = re.sub(f'\\({re.escape(escaped_old_link)}\\)', f'\\1{new_link}\\2', content )


            # 保存新Markdown文件
            new_md_path = Path(self.md_path.get()) / source_path.name
            with open(new_md_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            self.log_message("=" * 60, "bold")
            self.log_message(f"🎉 导出成功！", "success")
            self.log_message(f"新Markdown文件: {new_md_path}", "bold")
            self.log_message(f"资源文件夹: {asset_folder}", "bold")
            self.log_message("=" * 60, "bold")
            
            # 显示成功消息
            messagebox.showinfo(
                "导出完成", 
                f"Markdown文档导出成功！\n\n"
                f"新文档位置: {new_md_path}\n"
                f"资源文件夹: {asset_folder}"
            )
    
        except Exception as e:
            self.log_message(f"❌ 导出过程中发生错误: {str(e)}", "error")
            messagebox.showerror("错误", f"导出过程中发生错误:\n{str(e)}")
        finally:
            self.export_btn.config(state=tk.NORMAL)

if __name__ == "__main__":
    root = tk.Tk()
    app = MarkdownExporterApp(root)
    root.mainloop()
```

<img src="/docs/Markdown文本自动提取软件_localdata/image-20250630005945084.png" alt="image-20250630005945084" style="zoom:50%;" />