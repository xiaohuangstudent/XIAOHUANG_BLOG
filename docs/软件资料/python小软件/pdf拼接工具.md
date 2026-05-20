# pdf拼接工具

```python
import os
import PyPDF2
from tkinter import *
from tkinter import filedialog, messagebox
from tkinter.ttk import Treeview, Scrollbar, Button, Frame

class PDFMergerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("PDF 合并工具")
        self.root.geometry("700x500")

        # 变量
        self.pdf_files = []
        self.selected_folder = StringVar()

        # 创建界面
        self.create_widgets()

    def create_widgets(self):
        # 顶部框架 - 文件夹选择和合并按钮
        top_frame = Frame(self.root)
        top_frame.pack(pady=10, fill=X)

        # 文件夹选择按钮
        Button(top_frame, text="选择文件夹", command=self.select_folder).pack(side=LEFT, padx=5)

        # 文件夹路径显示
        Label(top_frame, textvariable=self.selected_folder, width=50, relief=SUNKEN, anchor="w").pack(side=LEFT, padx=5, fill=X, expand=True)

        # 合并按钮
        Button(top_frame, text="合并PDF", command=self.merge_pdfs).pack(side=LEFT, padx=5)

        # 中间框架 - PDF文件列表
        mid_frame = Frame(self.root)
        mid_frame.pack(pady=10, fill=BOTH, expand=True)

        # 列表标题
        Label(mid_frame, text="PDF文件列表 (可拖动调整顺序)").pack()

        # 创建Treeview用于显示PDF文件
        self.tree = Treeview(mid_frame, columns=("name", "path"), show="headings")
        self.tree.heading("name", text="文件名")
        self.tree.heading("path", text="路径")
        self.tree.column("name", width=200)
        self.tree.column("path", width=350)
        self.tree.pack(side=LEFT, fill=BOTH, expand=True)

        # 滚动条
        scrollbar = Scrollbar(mid_frame, orient="vertical", command=self.tree.yview)
        scrollbar.pack(side=RIGHT, fill=Y)
        self.tree.configure(yscrollcommand=scrollbar.set)

        # 底部框架 - 操作按钮
        bottom_frame = Frame(self.root)
        bottom_frame.pack(pady=10, fill=X)

        # 上移按钮
        Button(bottom_frame, text="上移", command=self.move_up).pack(side=LEFT, padx=5)

        # 下移按钮
        Button(bottom_frame, text="下移", command=self.move_down).pack(side=LEFT, padx=5)

        # 移除按钮
        Button(bottom_frame, text="移除", command=self.remove_item).pack(side=LEFT, padx=5)

        # 清空按钮
        Button(bottom_frame, text="清空", command=self.clear_list).pack(side=LEFT, padx=5)

    def select_folder(self):
        folder_path = filedialog.askdirectory(title="选择包含PDF的文件夹")
        if folder_path:
            self.selected_folder.set(folder_path)
            self.load_pdf_files(folder_path)

    def load_pdf_files(self, folder_path):
        self.clear_list()
        self.pdf_files = []

        for filename in os.listdir(folder_path):
            if filename.lower().endswith('.pdf'):
                full_path = os.path.join(folder_path, filename)
                self.pdf_files.append((filename, full_path))

        # 按文件名排序
        self.pdf_files.sort(key=lambda x: x[0])

        # 添加到Treeview
        for name, path in self.pdf_files:
            self.tree.insert("", "end", values=(name, path))

    def move_up(self):
        selected = self.tree.selection()
        if not selected:
            return

        selected_item = selected[0]
        prev_item = self.tree.prev(selected_item)

        if prev_item:
            # 获取当前和上一个项目的数据
            current_data = self.tree.item(selected_item, "values")
            prev_data = self.tree.item(prev_item, "values")

            # 交换位置
            self.tree.item(selected_item, values=prev_data)
            self.tree.item(prev_item, values=current_data)

            # 更新内部列表
            index = self.tree.index(selected_item)
            self.pdf_files[index-1], self.pdf_files[index] = self.pdf_files[index], self.pdf_files[index-1]

            # 重新选择移动后的项目
            self.tree.selection_set(prev_item)

    def move_down(self):
        selected = self.tree.selection()
        if not selected:
            return

        selected_item = selected[0]
        next_item = self.tree.next(selected_item)

        if next_item:
            # 获取当前和下一个项目的数据
            current_data = self.tree.item(selected_item, "values")
            next_data = self.tree.item(next_item, "values")

            # 交换位置
            self.tree.item(selected_item, values=next_data)
            self.tree.item(next_item, values=current_data)

            # 更新内部列表
            index = self.tree.index(selected_item)
            self.pdf_files[index], self.pdf_files[index+1] = self.pdf_files[index+1], self.pdf_files[index]

            # 重新选择移动后的项目
            self.tree.selection_set(next_item)

    def remove_item(self):
        selected = self.tree.selection()
        if not selected:
            return

        for item in selected:
            index = self.tree.index(item)
            del self.pdf_files[index]
            self.tree.delete(item)

    def clear_list(self):
        self.tree.delete(*self.tree.get_children())
        self.pdf_files = []

    def merge_pdfs(self):
        if not self.pdf_files:
            messagebox.showwarning("警告", "没有可合并的PDF文件！")
            return

        # 选择输出文件位置
        output_path = filedialog.asksaveasfilename(
            title="保存合并后的PDF",
            defaultextension=".pdf",
            filetypes=[("PDF文件", "*.pdf")]
        )

        if not output_path:
            return

        try:
            pdf_merger = PyPDF2.PdfMerger()

            for _, path in self.pdf_files:
                pdf_merger.append(path)

            with open(output_path, "wb") as output_file:
                pdf_merger.write(output_file)

            messagebox.showinfo("成功", f"PDF合并完成！\n保存位置: {output_path}")
        except Exception as e:
            messagebox.showerror("错误", f"合并PDF时出错:\n{str(e)}")

if __name__ == "__main__":
    root = Tk()
    app = PDFMergerApp(root)
    root.mainloop()

```
