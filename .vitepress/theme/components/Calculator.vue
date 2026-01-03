<!-- 简易计算机用于测试vue组件 -->
<template>
  <div class="calculator-wrapper">
    <div class="calculator">
      <div class="display">
        <input
          v-model="displayValue"
          type="text"
          readonly
          @keydown="handleKeyDown"
        />
      </div>
      <div class="buttons">
        <button @click="clear" class="clear">C</button>
        <button @click="append('/')">/</button>
        <button @click="append('*')">×</button>
        <button @click="backspace">⌫</button>

        <button @click="append('7')">7</button>
        <button @click="append('8')">8</button>
        <button @click="append('9')">9</button>
        <button @click="append('-')">-</button>

        <button @click="append('4')">4</button>
        <button @click="append('5')">5</button>
        <button @click="append('6')">6</button>
        <button @click="append('+')">+</button>

        <button @click="append('1')">1</button>
        <button @click="append('2')">2</button>
        <button @click="append('3')">3</button>
        <button @click="calculate" class="equals" style="grid-row: span 2">
          =
        </button>

        <button @click="append('0')" style="grid-column: span 2">0</button>
        <button @click="append('.')">.</button>
      </div>
      <div class="history" v-if="history.length > 0">
        <h4>计算历史</h4>
        <ul>
          <li v-for="(item, index) in history" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const displayValue = ref("");
const history = ref([]);

const append = (value) => {
  displayValue.value += value;
};

const clear = () => {
  displayValue.value = "";
};

const backspace = () => {
  displayValue.value = displayValue.value.slice(0, -1);
};

const calculate = () => {
  try {
    const expression = displayValue.value;
    // 使用更安全的计算方式
    const result = new Function("return " + expression)();
    history.value.unshift(`${expression} = ${result}`);
    if (history.value.length > 5) {
      history.value.pop();
    }
    displayValue.value = result.toString();
  } catch (error) {
    displayValue.value = "Error";
  }
};

const handleKeyDown = (event) => {
  const key = event.key;

  // 数字和运算符
  if (/[\d\+\-\*\/\.\(\)]/.test(key)) {
    append(key);
    event.preventDefault();
  }

  // 回车计算
  if (key === "Enter") {
    calculate();
    event.preventDefault();
  }

  // 退格删除
  if (key === "Backspace") {
    backspace();
    event.preventDefault();
  }

  // ESC 清空
  if (key === "Escape") {
    clear();
    event.preventDefault();
  }
};

onMounted(() => {
  // 组件挂载后的初始化
});
</script>

<style scoped>
.calculator-wrapper {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}

.calculator {
  width: 100%;
  max-width: 320px;
  background: linear-gradient(145deg, #f0f0f0, #ffffff);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid #e0e0e0;
}

.display {
  margin-bottom: 20px;
}

.display input {
  width: 100%;
  height: 60px;
  font-size: 28px;
  text-align: right;
  padding: 0 15px;
  border: none;
  border-radius: 10px;
  background: #222;
  color: #4caf50;
  font-family: "Courier New", monospace;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5);
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

button {
  padding: 18px 0;
  font-size: 20px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  color: #333;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all 0.2s ease;
  user-select: none;
}

button:hover {
  background: linear-gradient(145deg, #e6e6e6, #ffffff);
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.clear {
  background: linear-gradient(145deg, #ff6b6b, #ff4444);
  color: white;
}

.equals {
  background: linear-gradient(145deg, #4caf50, #45a049);
  color: white;
}

.history {
  margin-top: 20px;
  padding: 15px;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 10px;
  border-left: 4px solid #4caf50;
}

.history h4 {
  margin: 0 0 10px 0;
  color: #333;
}

.history ul {
  margin: 0;
  padding-left: 20px;
  font-size: 14px;
  color: #666;
}

.history li {
  margin-bottom: 5px;
}
</style>