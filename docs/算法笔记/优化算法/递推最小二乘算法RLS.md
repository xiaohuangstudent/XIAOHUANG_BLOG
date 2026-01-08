# 递推最小二乘（RLursive Least Squares-RLS）

算法的核心思想是基于递归计算，对新的观测数据实时更新参数估计，从而避免重复计算全部历史数据的批量最小二乘解。以下为从批量最小二乘到 RLS 算法的详细推导过程，所有行间公式均已居中排版。

## 问题描述

考虑线性模型：

$$
y(t) = \boldsymbol{\psi}^T(t) \boldsymbol{\theta} + e(t)
$$

其中：

- $\boldsymbol{\theta} \in \mathbb{R}^n$ 为待估计的参数向量。
- $\boldsymbol{\psi}(t) \in \mathbb{R}^n$ 为在时刻 $t$ 的输入（回归）向量。
- $y(t)$ 为时刻 $t$ 的输出观测值。
- $e(t)$ 为建模误差或噪声。

## 算法结论-RLS 算法步骤

1. **初始化**：

   $$
   \hat{\boldsymbol{\theta}}_0 = \boldsymbol{0}, \quad \boldsymbol{P}_0 = \delta \boldsymbol{I}, \quad \delta \text{为一个很大的正数（如}10^3 \sim 10^6\text{）}
   $$

2. **对每个时刻 $t=1,2,\dots$ 执行**：

   - 收集新数据：获得 $\boldsymbol{\psi}(t)$ 和 $y(t)$。
   - 计算先验误差：

     $$
     \epsilon(t) = y(t) - \boldsymbol{\psi}^T(t) \hat{\boldsymbol{\theta}}_{t-1}
     $$

   - 计算增益向量：

     $$
     \boldsymbol{k}_t = \frac{\boldsymbol{P}_{t-1} \boldsymbol{\psi}(t)}{1 + \boldsymbol{\psi}^T(t) \boldsymbol{P}_{t-1} \boldsymbol{\psi}(t)}
     $$

   - 更新参数估计：

     $$
     \hat{\boldsymbol{\theta}}_t = \hat{\boldsymbol{\theta}}_{t-1} + \boldsymbol{k}_t \epsilon(t)
     $$

   - 更新协方差矩阵：

     $$
     \boldsymbol{P}_t = \boldsymbol{P}_{t-1} - \boldsymbol{k}_t \boldsymbol{\psi}^T(t) \boldsymbol{P}_{t-1}
     $$

   - （可选）准备下一时刻：$t \leftarrow t+1$。

**算法核心直观解释**：新参数估计 $\hat{\boldsymbol{\theta}}_t$ 等于旧估计 $\hat{\boldsymbol{\theta}}_{t-1}$ 加上一个修正项。修正项的大小由**增益** $\boldsymbol{k}_t$ 和**新数据带来的预测误差** $\epsilon(t)$ 共同决定。增益 $\boldsymbol{k}_t$ 决定了新数据在更新中的权重，而协方差矩阵 $\boldsymbol{P}_t$ 则反映了参数估计的不确定度，会随着数据增多而逐渐减小。

### RLS 算法证明

基于 $t$ 个观测数据 $\{\boldsymbol{\psi}(i), y(i)\}_{i=1}^{t}$，定义数据矩阵 $\boldsymbol{\Phi}_t$ 和输出向量 $\boldsymbol{Y}_t$：

$$
\boldsymbol{\Phi}_t = \begin{bmatrix}
\boldsymbol{\psi}^T(1) \\
\vdots \\
\boldsymbol{\psi}^T(t)
\end{bmatrix}, \quad \boldsymbol{Y}_t = \begin{bmatrix}
y(1) \\
\vdots \\
y(t)
\end{bmatrix}
$$

批量最小二乘的目标是最小化残差平方和：

$$
J(\boldsymbol{\theta}) = \sum_{i=1}^{t} [y(i) - \boldsymbol{\psi}^T(i)\boldsymbol{\theta}]^2 = (\boldsymbol{Y}_t - \boldsymbol{\Phi}_t\boldsymbol{\theta})^T(\boldsymbol{Y}_t - \boldsymbol{\Phi}_t\boldsymbol{\theta})
$$

其解析解（正则方程）为：

$$
\hat{\boldsymbol{\theta}}_t = (\boldsymbol{\Phi}_t^T\boldsymbol{\Phi}_t)^{-1} \boldsymbol{\Phi}_t^T \boldsymbol{Y}_t
$$

定义两个关键矩阵：

$$
\boldsymbol{P}_t^{-1} = \boldsymbol{\Phi}_t^T\boldsymbol{\Phi}_t = \sum_{i=1}^{t} \boldsymbol{\psi}(i)\boldsymbol{\psi}^T(i)
$$

$$
\boldsymbol{B}_t = \boldsymbol{\Phi}_t^T \boldsymbol{Y}_t = \sum_{i=1}^{t} \boldsymbol{\psi}(i) y(i)
$$

则批量解可写为：

$$
\hat{\boldsymbol{\theta}}_t = \boldsymbol{P}_t \boldsymbol{B}_t
$$

---

**递推关系推导**

目的是从 $t-1$ 时刻的估计 $\hat{\boldsymbol{\theta}}_{t-1}$ 及相关矩阵，递推出 $t$ 时刻的估计 $\hat{\boldsymbol{\theta}}_t$。

---

**$\boldsymbol{P}_t^{-1}$ 和 $\boldsymbol{B}_t$ 的递推**

根据定义，它们具有简单的累加形式：

$$
\boldsymbol{P}_t^{-1} = \sum_{i=1}^{t} \boldsymbol{\psi}(i)\boldsymbol{\psi}^T(i) = \boldsymbol{P}_{t-1}^{-1} + \boldsymbol{\psi}(t)\boldsymbol{\psi}^T(t)
$$

$$
\boldsymbol{B}_t = \sum_{i=1}^{t} \boldsymbol{\psi}(i) y(i) = \boldsymbol{B}_{t-1} + \boldsymbol{\psi}(t) y(t)
$$

---

**$\boldsymbol{P}_t$ 的递推（应用矩阵求逆引理）**

已知：

$$
\boldsymbol{P}_t^{-1} = \boldsymbol{P}_{t-1}^{-1} + \boldsymbol{\psi}(t)\boldsymbol{\psi}^T(t)
$$

这是一个秩为 1 的更新。根据**矩阵求逆引理（Woodbury Identity）**：
若 $\boldsymbol{A}^{-1} = \boldsymbol{B}^{-1} + \boldsymbol{C}\boldsymbol{D}^{-1}\boldsymbol{C}^T$，则 $\boldsymbol{A} = \boldsymbol{B} - \boldsymbol{B}\boldsymbol{C}(\boldsymbol{D} + \boldsymbol{C}^T\boldsymbol{B}\boldsymbol{C})^{-1}\boldsymbol{C}^T\boldsymbol{B}$。
令：$\boldsymbol{A} = \boldsymbol{P}_t$, $\boldsymbol{B} = \boldsymbol{P}_{t-1}$, $\boldsymbol{C} = \boldsymbol{\psi}(t)$, $\boldsymbol{D} = 1$，代入得：

$$
\boldsymbol{P}_t = \boldsymbol{P}_{t-1} - \boldsymbol{P}_{t-1}\boldsymbol{\psi}(t) [1 + \boldsymbol{\psi}^T(t)\boldsymbol{P}_{t-1}\boldsymbol{\psi}(t)]^{-1} \boldsymbol{\psi}^T(t)\boldsymbol{P}_{t-1}
$$

定义**增益向量（Kalman Gain）** $\boldsymbol{k}_t$：

$$
\boldsymbol{k}_t = \frac{\boldsymbol{P}_{t-1}\boldsymbol{\psi}(t)}{1 + \boldsymbol{\psi}^T(t)\boldsymbol{P}_{t-1}\boldsymbol{\psi}(t)}
$$

则 $\boldsymbol{P}_t$ 的更新公式简化为：

$$
\boldsymbol{P}_t = \boldsymbol{P}_{t-1} - \boldsymbol{k}_t \boldsymbol{\psi}^T(t) \boldsymbol{P}_{t-1}
$$

---

**$\hat{\boldsymbol{\theta}}_t$ 的递推**

由批量解 $\hat{\boldsymbol{\theta}}_t = \boldsymbol{P}_t \boldsymbol{B}_t$ 出发，代入 $\boldsymbol{B}_t$ 和 $\boldsymbol{P}_t$ 的递推式：

$$
\begin{aligned}
\hat{\boldsymbol{\theta}}_t &= \boldsymbol{P}_t \boldsymbol{B}_t \\
&= \boldsymbol{P}_t [\boldsymbol{B}_{t-1} + \boldsymbol{\psi}(t) y(t)] \\
&= \boldsymbol{P}_t \boldsymbol{B}_{t-1} + \boldsymbol{P}_t \boldsymbol{\psi}(t) y(t)
\end{aligned}
$$

关键是将 $\boldsymbol{P}_t \boldsymbol{B}_{t-1}$ 转换为包含 $\hat{\boldsymbol{\theta}}_{t-1}$ 的形式。注意 $\hat{\boldsymbol{\theta}}_{t-1} = \boldsymbol{P}_{t-1} \boldsymbol{B}_{t-1}$，即 $\boldsymbol{B}_{t-1} = \boldsymbol{P}_{t-1}^{-1} \hat{\boldsymbol{\theta}}_{t-1}$。代入：

$$
\boldsymbol{P}_t \boldsymbol{B}_{t-1} = \boldsymbol{P}_t \boldsymbol{P}_{t-1}^{-1} \hat{\boldsymbol{\theta}}_{t-1}
$$

而 $\boldsymbol{P}_t \boldsymbol{P}_{t-1}^{-1}$ 可从 $\boldsymbol{P}_t$ 的更新公式变换得到。由 $\boldsymbol{P}_t^{-1} = \boldsymbol{P}_{t-1}^{-1} + \boldsymbol{\psi}(t)\boldsymbol{\psi}^T(t)$，两边左乘 $\boldsymbol{P}_t$，右乘 $\boldsymbol{P}_{t-1}$，得：

$$
\boldsymbol{P}_{t-1} = \boldsymbol{P}_t \boldsymbol{P}_{t-1}^{-1} \boldsymbol{P}_{t-1} + \boldsymbol{P}_t \boldsymbol{\psi}(t)\boldsymbol{\psi}^T(t) \boldsymbol{P}_{t-1} = \boldsymbol{P}_t + \boldsymbol{P}_t \boldsymbol{\psi}(t)\boldsymbol{\psi}^T(t) \boldsymbol{P}_{t-1}
$$

整理得：

$$
\boldsymbol{P}_t = \boldsymbol{P}_{t-1} - \boldsymbol{P}_t \boldsymbol{\psi}(t)\boldsymbol{\psi}^T(t) \boldsymbol{P}_{t-1}
$$

对比之前 $\boldsymbol{P}_t$ 的公式，可知 $\boldsymbol{P}_t \boldsymbol{\psi}(t) = \boldsymbol{k}_t$。将 $\boldsymbol{P}_t \boldsymbol{\psi}(t) = \boldsymbol{k}_t$ 代入上式，并移项：

$$
\boldsymbol{P}_t = \boldsymbol{P}_{t-1} - \boldsymbol{k}_t \boldsymbol{\psi}^T(t) \boldsymbol{P}_{t-1} \\
\Rightarrow \boldsymbol{P}_t = [\boldsymbol{I} - \boldsymbol{k}_t \boldsymbol{\psi}^T(t)] \boldsymbol{P}_{t-1} \\
\Rightarrow \boldsymbol{P}_t \boldsymbol{P}_{t-1}^{-1} = \boldsymbol{I} - \boldsymbol{k}_t \boldsymbol{\psi}^T(t)
$$

将此关系式 $\boldsymbol{P}_t \boldsymbol{P}_{t-1}^{-1} = \boldsymbol{I} - \boldsymbol{k}_t \boldsymbol{\psi}^T(t)$ 代回 $\hat{\boldsymbol{\theta}}_t$ 的表达式：

$$
\begin{aligned}
\hat{\boldsymbol{\theta}}_t &= [\boldsymbol{I} - \boldsymbol{k}_t \boldsymbol{\psi}^T(t)] \hat{\boldsymbol{\theta}}_{t-1} + \boldsymbol{k}_t y(t) \\
&= \hat{\boldsymbol{\theta}}_{t-1} + \boldsymbol{k}_t [y(t) - \boldsymbol{\psi}^T(t) \hat{\boldsymbol{\theta}}_{t-1}]
\end{aligned}
$$

定义**先验误差（或新息）**：

$$
\epsilon(t) = y(t) - \boldsymbol{\psi}^T(t) \hat{\boldsymbol{\theta}}_{t-1}
$$

则参数更新公式为：

$$
\hat{\boldsymbol{\theta}}_t = \hat{\boldsymbol{\theta}}_{t-1} + \boldsymbol{k}_t \epsilon(t)
$$
