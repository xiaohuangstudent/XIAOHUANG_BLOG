<template>
  <div class="gear-calculator">
    <h2>⚙️ 标准直齿圆柱齿轮参数计算器</h2>

    <div class="grid">
      <!-- 输入区 -->
      <div class="panel">
        <h3>输入参数</h3>
        <form @submit.prevent="compute">
          <div class="form-group">
            <label>模数 <i>m</i> (mm)</label>
            <input
              type="number"
              v-model.number="inputs.module"
              step="0.1"
              min="0.1"
              required
            />
          </div>
          <div class="form-group">
            <label>中心距 <i>d</i> (mm)</label>
            <input
              type="number"
              v-model.number="inputs.distance"
              step="0.1"
              min="0.1"
              required
            />
          </div>
          <div class="form-group">
            <label>传动比 <i>i</i> = z₂/z₁</label>
            <input
              type="number"
              v-model.number="inputs.ratio"
              step="0.01"
              min="1"
              required
            />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>压力角 α</label>
              <select v-model.number="inputs.pressureAngle">
                <option value="14.5">14.5°</option>
                <option value="20" selected>20°</option>
                <option value="25">25°</option>
              </select>
            </div>
            <div class="form-group">
              <label>齿顶高系数 hₐ*</label>
              <input
                type="number"
                v-model.number="inputs.haStar"
                step="0.05"
                min="0.1"
              />
            </div>
          </div>
          <div class="form-group">
            <label>顶隙系数 c*</label>
            <input
              type="number"
              v-model.number="inputs.cStar"
              step="0.01"
              min="0"
            />
          </div>
          <div class="btn-group">
            <button type="submit" class="btn btn-primary">计算</button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="loadExample1"
            >
              示例1 (m=1,d=50,i=1.5)
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="loadExample2"
            >
              示例2 (m=2,d=120,i=2)
            </button>
          </div>
        </form>

        <div
          v-if="result"
          class="validation"
          :class="result.isValid ? 'valid' : 'invalid'"
        >
          <template v-if="result.isValid">
            ✅ 齿数校验通过：z₁ = {{ result.Z1_round }}，z₂ =
            {{ result.Z2_round }}
          </template>
          <template v-else>
            ❌ 齿数校验失败！理论值 z₁ = {{ result.z1_theory.toFixed(4) }}，z₂ =
            {{ result.z2_theory.toFixed(4) }} 不是整数。请调整参数。
          </template>
        </div>
      </div>

      <!-- 输出区 -->
      <div class="panel">
        <h3>计算结果</h3>
        <div v-if="result" class="result-content">
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>参数</th>
                  <th>符号</th>
                  <th>公式</th>
                  <th>小齿轮</th>
                  <th>大齿轮</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>齿数</td>
                  <td>z</td>
                  <td>给定/计算</td>
                  <td>{{ result.Z1 }}</td>
                  <td>{{ result.Z2 }}</td>
                </tr>
                <tr>
                  <td>分度圆直径</td>
                  <td>d</td>
                  <td>m·z</td>
                  <td>{{ result.d1.toFixed(3) }}</td>
                  <td>{{ result.d2.toFixed(3) }}</td>
                </tr>
                <tr>
                  <td>齿顶圆直径</td>
                  <td>dₐ</td>
                  <td>m·(z+2hₐ*)</td>
                  <td>{{ result.da1.toFixed(3) }}</td>
                  <td>{{ result.da2.toFixed(3) }}</td>
                </tr>
                <tr>
                  <td>齿根圆直径</td>
                  <td>d_f</td>
                  <td>m·(z-2(hₐ*+c*))</td>
                  <td>{{ result.df1.toFixed(3) }}</td>
                  <td>{{ result.df2.toFixed(3) }}</td>
                </tr>
                <tr>
                  <td>基圆直径</td>
                  <td>d_b</td>
                  <td>d·cosα</td>
                  <td>{{ result.db1.toFixed(3) }}</td>
                  <td>{{ result.db2.toFixed(3) }}</td>
                </tr>
                <tr>
                  <td>齿顶高</td>
                  <td>hₐ</td>
                  <td>m·hₐ*</td>
                  <td colspan="2">{{ result.ha.toFixed(3) }}</td>
                </tr>
                <tr>
                  <td>齿根高</td>
                  <td>h_f</td>
                  <td>m·(hₐ*+c*)</td>
                  <td colspan="2">{{ result.hf.toFixed(3) }}</td>
                </tr>
                <tr>
                  <td>全齿高</td>
                  <td>h</td>
                  <td>hₐ+h_f</td>
                  <td colspan="2">{{ result.h.toFixed(3) }}</td>
                </tr>
                <tr>
                  <td>分度圆齿厚</td>
                  <td>s</td>
                  <td>πm/2</td>
                  <td colspan="2">{{ result.s.toFixed(4) }}</td>
                </tr>
                <tr>
                  <td>分度圆齿槽宽</td>
                  <td>e</td>
                  <td>πm/2</td>
                  <td colspan="2">{{ result.e.toFixed(4) }}</td>
                </tr>
                <tr>
                  <td>齿距</td>
                  <td>p</td>
                  <td>π·m</td>
                  <td colspan="2">{{ result.p.toFixed(4) }}</td>
                </tr>
                <tr>
                  <td>基圆齿距</td>
                  <td>p_b</td>
                  <td>p·cosα</td>
                  <td colspan="2">{{ result.pb.toFixed(4) }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="summary-grid">
            <div>
              <span class="label">实际中心距</span><br />{{
                result.a.toFixed(3)
              }}
              mm <span class="note">(校验)</span>
            </div>
            <div>
              <span class="label">实际传动比</span><br />{{
                result.ratio.toFixed(4)
              }}
              <span class="note">(校验)</span>
            </div>
            <div>
              <span class="label">端面重合度 ε<sub>α</sub></span
              ><br />{{
                isNaN(result.epsilon) ? "—" : result.epsilon.toFixed(4)
              }}
            </div>
            <div>
              <span class="label">最小齿数 (防根切)</span><br />{{
                result.zMin.toFixed(2)
              }}
            </div>
            <div>
              <span class="label">压力角 α</span><br />{{ result.alpha_deg }}°
            </div>
            <div>
              <span class="label">齿顶高系数 hₐ*</span><br />{{ result.haStar }}
            </div>
            <div>
              <span class="label">顶隙系数 c*</span><br />{{ result.cStar }}
            </div>
            <div v-if="!isNaN(result.alpha_a1) && !isNaN(result.alpha_a2)">
              <span class="label">小齿轮齿顶压力角</span><br />{{
                ((result.alpha_a1 * 180) / Math.PI).toFixed(2)
              }}°
            </div>
            <div v-if="!isNaN(result.alpha_a1) && !isNaN(result.alpha_a2)">
              <span class="label">大齿轮齿顶压力角</span><br />{{
                ((result.alpha_a2 * 180) / Math.PI).toFixed(2)
              }}°
            </div>
          </div>

          <div class="action-buttons">
            <button class="btn-outline" @click="copyResults">
              📋 复制结果
            </button>
            <button class="btn-outline" @click="exportJSON">
              📄 导出 JSON
            </button>
            <button class="btn-outline" @click="exportCSV">📊 导出 CSV</button>
            <button class="btn-outline" @click="window.print()">🖨️ 打印</button>
          </div>
        </div>
        <div v-else class="placeholder">请填写参数并点击“计算”</div>
      </div>
    </div>

    <footer class="footer">
      标准直齿圆柱齿轮 · 基于渐开线几何 · 仅供工程设计参考
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

// 输入参数
const inputs = reactive({
  module: 1,
  distance: 50,
  ratio: 1.5,
  pressureAngle: 20,
  haStar: 1.0,
  cStar: 0.25,
});

const result = ref(null);

// 核心计算函数
function calcGear(m, d, i, alphaDeg, haStar, cStar) {
  const alpha = (alphaDeg * Math.PI) / 180;
  const z1_theory = (2 * d) / (m * (1 + i));
  const z2_theory = z1_theory * i;

  const eps = 1e-9;
  const isInt1 = Math.abs(z1_theory - Math.round(z1_theory)) < eps;
  const isInt2 = Math.abs(z2_theory - Math.round(z2_theory)) < eps;
  const isValid = isInt1 && isInt2;

  const Z1 = Math.round(z1_theory);
  const Z2 = Math.round(z2_theory);
  const useZ1 = isValid ? Z1 : z1_theory;
  const useZ2 = isValid ? Z2 : z2_theory;

  const d1 = m * useZ1;
  const d2 = m * useZ2;
  const da1 = m * (useZ1 + 2 * haStar);
  const da2 = m * (useZ2 + 2 * haStar);
  const df1 = m * (useZ1 - 2 * (haStar + cStar));
  const df2 = m * (useZ2 - 2 * (haStar + cStar));
  const db1 = d1 * Math.cos(alpha);
  const db2 = d2 * Math.cos(alpha);
  const ha = haStar * m;
  const hf = (haStar + cStar) * m;
  const h = ha + hf;
  const s = (Math.PI * m) / 2;
  const e = (Math.PI * m) / 2;
  const p = Math.PI * m;
  const pb = p * Math.cos(alpha);
  const a = (d1 + d2) / 2;
  const ratio = useZ2 / useZ1;

  let epsilon = NaN;
  let alpha_a1 = 0,
    alpha_a2 = 0;
  if (isValid && da1 > db1 && da2 > db2) {
    alpha_a1 = Math.acos(db1 / da1);
    alpha_a2 = Math.acos(db2 / da2);
    epsilon =
      (useZ1 * (Math.tan(alpha_a1) - Math.tan(alpha)) +
        useZ2 * (Math.tan(alpha_a2) - Math.tan(alpha))) /
      (2 * Math.PI);
  }
  const zMin = (2 * haStar) / Math.sin(alpha) ** 2;

  return {
    Z1: useZ1,
    Z2: useZ2,
    Z1_round: Z1,
    Z2_round: Z2,
    z1_theory,
    z2_theory,
    isValid,
    d1,
    d2,
    da1,
    da2,
    df1,
    df2,
    db1,
    db2,
    ha,
    hf,
    h,
    s,
    e,
    p,
    pb,
    a,
    ratio,
    epsilon,
    alpha_a1,
    alpha_a2,
    zMin,
    alpha_deg: alphaDeg,
    haStar,
    cStar,
    m,
  };
}

function compute() {
  const m = inputs.module;
  const d = inputs.distance;
  const i = inputs.ratio;
  const alphaDeg = inputs.pressureAngle;
  const haStar = inputs.haStar;
  const cStar = inputs.cStar;
  if (m <= 0 || d <= 0 || i < 1 || haStar <= 0 || cStar < 0) {
    alert("请检查输入参数：模数、中心距>0，传动比≥1，齿顶高系数>0，顶隙系数≥0");
    return;
  }
  result.value = calcGear(m, d, i, alphaDeg, haStar, cStar);
}

function loadExample1() {
  inputs.module = 1;
  inputs.distance = 50;
  inputs.ratio = 1.5;
  inputs.pressureAngle = 20;
  inputs.haStar = 1.0;
  inputs.cStar = 0.25;
  compute();
}
function loadExample2() {
  inputs.module = 2;
  inputs.distance = 120;
  inputs.ratio = 2.0;
  inputs.pressureAngle = 20;
  inputs.haStar = 1.0;
  inputs.cStar = 0.25;
  compute();
}
// 初次加载自动计算示例1
loadExample1();

// 导出功能
function copyResults() {
  const data = result.value;
  if (!data) return;
  let text = "标准直齿圆柱齿轮参数计算结果\n";
  text += `模数 m = ${data.m} mm, 中心距 d = ${
    data.a
  } mm, 传动比 i = ${data.ratio.toFixed(4)}\n`;
  text += `齿数 z1 = ${data.Z1}, z2 = ${data.Z2}\n`;
  text += `分度圆直径: d1=${data.d1.toFixed(3)}, d2=${data.d2.toFixed(3)}\n`;
  text += `齿顶圆直径: da1=${data.da1.toFixed(3)}, da2=${data.da2.toFixed(
    3
  )}\n`;
  text += `齿根圆直径: df1=${data.df1.toFixed(3)}, df2=${data.df2.toFixed(
    3
  )}\n`;
  text += `基圆直径: db1=${data.db1.toFixed(3)}, db2=${data.db2.toFixed(3)}\n`;
  text += `齿顶高: ${data.ha.toFixed(3)}, 齿根高: ${data.hf.toFixed(
    3
  )}, 全齿高: ${data.h.toFixed(3)}\n`;
  text += `分度圆齿厚: ${data.s.toFixed(4)}, 齿槽宽: ${data.e.toFixed(
    4
  )}, 齿距: ${data.p.toFixed(4)}, 基圆齿距: ${data.pb.toFixed(4)}\n`;
  text += `重合度: ${
    isNaN(data.epsilon) ? "—" : data.epsilon.toFixed(4)
  }, 最小齿数: ${data.zMin.toFixed(2)}`;
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("结果已复制到剪贴板");
    })
    .catch(() => {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      alert("结果已复制");
    });
}

function exportJSON() {
  const data = result.value;
  if (!data) return;
  const json = JSON.stringify(data, null, 2);
  downloadFile(json, "gear_result.json", "application/json");
}

function exportCSV() {
  const data = result.value;
  if (!data) return;
  const rows = [
    ["参数", "小齿轮", "大齿轮"],
    ["齿数", data.Z1, data.Z2],
    ["分度圆直径 (mm)", data.d1.toFixed(3), data.d2.toFixed(3)],
    ["齿顶圆直径 (mm)", data.da1.toFixed(3), data.da2.toFixed(3)],
    ["齿根圆直径 (mm)", data.df1.toFixed(3), data.df2.toFixed(3)],
    ["基圆直径 (mm)", data.db1.toFixed(3), data.db2.toFixed(3)],
    ["齿顶高 (mm)", data.ha.toFixed(3), ""],
    ["齿根高 (mm)", data.hf.toFixed(3), ""],
    ["全齿高 (mm)", data.h.toFixed(3), ""],
    ["分度圆齿厚 (mm)", data.s.toFixed(4), ""],
    ["分度圆齿槽宽 (mm)", data.e.toFixed(4), ""],
    ["齿距 (mm)", data.p.toFixed(4), ""],
    ["基圆齿距 (mm)", data.pb.toFixed(4), ""],
    ["实际中心距 (mm)", data.a.toFixed(3), ""],
    ["实际传动比", data.ratio.toFixed(4), ""],
    ["重合度", isNaN(data.epsilon) ? "—" : data.epsilon.toFixed(4), ""],
    ["最小齿数", data.zMin.toFixed(2), ""],
  ];
  const csvContent = rows.map((row) => row.join(",")).join("\n");
  downloadFile(csvContent, "gear_result.csv", "text/csv");
}

function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
</script>

<style scoped>
.gear-calculator {
  max-width: 1200px;
  margin: 1.5rem auto;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  font-family: system-ui, -apple-system, sans-serif;
  transition: background 0.2s, color 0.2s;
}
h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #0f172a;
  margin-top: 0;
  margin-bottom: 1.5rem;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
.panel {
  background: #ffffff;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  transition: background 0.2s, border-color 0.2s;
}
.panel h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 1rem;
  color: #1e293b;
}
.form-group {
  margin-bottom: 1rem;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #334155;
  margin-bottom: 0.25rem;
}
input,
select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background: #ffffff;
  color: #1e293b;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
input::placeholder {
  color: #94a3b8;
}
.btn-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.btn {
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.btn-primary {
  background: #2563eb;
  color: white;
}
.btn-primary:hover {
  background: #1d4ed8;
}
.btn-secondary {
  background: #e2e8f0;
  color: #1e293b;
}
.btn-secondary:hover {
  background: #cbd5e1;
}
.validation {
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}
.valid {
  background: #dcfce7;
  color: #166534;
  border: 1px solid #bbf7d0;
}
.invalid {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fecaca;
}
.table-wrapper {
  overflow-x: auto;
  margin-bottom: 1.5rem;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}
th,
td {
  padding: 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  text-align: center;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
th {
  background: #f1f5f9;
  font-weight: 600;
}
.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 0.75rem;
  background: #f1f5f9;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  transition: background 0.2s;
}
.summary-grid .label {
  font-weight: 500;
  font-size: 0.8rem;
  color: #475569;
}
.summary-grid .note {
  font-size: 0.75rem;
  color: #64748b;
}
.summary-grid div {
  /* 数值部分默认继承父级颜色，但为保险我们显式指定 */
  color: inherit;
}
.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.btn-outline {
  background: transparent;
  border: 1px solid #cbd5e1;
  padding: 0.4rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  color: #1e293b;
}
.btn-outline:hover {
  background: #f1f5f9;
  border-color: #94a3b8;
}
.placeholder {
  color: #94a3b8;
  text-align: center;
  padding: 2rem 0;
}
.footer {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.8rem;
  color: #94a3b8;
  border-top: 1px solid #e2e8f0;
  padding-top: 1rem;
  transition: color 0.2s, border-color 0.2s;
}

/* ---------- 暗色模式（大幅提高文字亮度） ---------- */
@media (prefers-color-scheme: dark) {
  .gear-calculator {
    background: #0f172a;
  }
  .panel {
    background: #1e293b;
    border-color: #334155;
  }
  h2,
  .panel h3,
  .gear-calculator h2 {
    color: #f1f5f9;
  }
  label,
  .summary-grid .label {
    color: #cbd5e1;
  }
  .summary-grid .note,
  .footer {
    color: #94a3b8;
  }
  /* 输入框 */
  input,
  select {
    background: #0f172a;
    color: #f1f5f9; /* 更亮 */
    border-color: #475569;
  }
  input::placeholder {
    color: #64748b;
  }
  /* 表格 */
  th {
    background: #334155;
    color: #f1f5f9; /* 更亮 */
  }
  td {
    color: #f1f5f9; /* 更亮 */
    border-color: #475569;
  }
  /* 摘要网格 */
  .summary-grid {
    background: #0f172a;
  }
  .summary-grid div {
    color: #f1f5f9; /* 数值颜色 */
  }
  /* 按钮 */
  .btn-secondary {
    background: #334155;
    color: #f1f5f9;
  }
  .btn-secondary:hover {
    background: #475569;
  }
  .btn-outline {
    border-color: #475569;
    color: #f1f5f9;
  }
  .btn-outline:hover {
    background: #334155;
    border-color: #64748b;
  }
  .placeholder {
    color: #64748b;
  }
  .validation.valid {
    background: #064e3b;
    color: #86efac;
    border-color: #065f46;
  }
  .validation.invalid {
    background: #7f1d1d;
    color: #fca5a5;
    border-color: #991b1b;
  }
  .footer {
    border-top-color: #334155;
  }
}
</style>