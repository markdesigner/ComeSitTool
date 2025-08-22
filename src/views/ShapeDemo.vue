<template>
  <div class="canvas-demo">
    <div class="container">
      <div class="background-image">
        <img src="@/assets/screenshot.png" alt="background" />
      </div>
      <div class="canvas-container">
        <canvas ref="excludeCanvas"></canvas>
      </div>
    </div>
    <div class="button-container">
      <button @click="generateExcludeArea">Generate Exclude Area</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShapeDemo",
  data() {
    return {
      canvas: null,
      ctx: null,
      size: {
        width: 800,
        height: 600,
      },
      points: [
        { x: 100, y: 100 },
        { x: 300, y: 100 },
        { x: 300, y: 300 },
        { x: 100, y: 300 },
      ],
      isDragging: false,
      selectedPoint: null,
      isMovingShape: false,
      lastMousePos: { x: 0, y: 0 },
    };
  },
  mounted() {
    this.initCanvas();
    this.addEventListeners();
  },
  methods: {
    initCanvas() {
      this.canvas = this.$refs.excludeCanvas;
      this.canvas.width = this.size.width;
      this.canvas.height = this.size.height;
      this.ctx = this.canvas.getContext("2d");
    },
    addEventListeners() {
      this.canvas.addEventListener("mousedown", this.handleMouseDown);
      this.canvas.addEventListener("mousemove", this.handleMouseMove);
      this.canvas.addEventListener("mouseup", this.handleMouseUp);
    },
    // 檢查是否點擊到頂點
    getClickedPoint(x, y) {
      const radius = 5; // 點的半徑
      return this.points.findIndex((point) => {
        const distance = Math.sqrt(
          Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2)
        );
        return distance <= radius;
      });
    },
    // 判斷點是否在圖形內
    isPointInShape(x, y) {
      let inside = false;
      for (
        let i = 0, j = this.points.length - 1;
        i < this.points.length;
        j = i++
      ) {
        const xi = this.points[i].x;
        const yi = this.points[i].y;
        const xj = this.points[j].x;
        const yj = this.points[j].y;

        const intersect =
          yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
      }
      return inside;
    },
    // 處理滑鼠按下事件
    handleMouseDown(e) {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 先檢查是否點擊到頂點
      const pointIndex = this.getClickedPoint(x, y);
      if (pointIndex !== -1) {
        this.isDragging = true;
        this.selectedPoint = pointIndex;
        return;
      }

      // 如果不是頂點，檢查是否在圖形內
      if (this.isPointInShape(x, y)) {
        this.isMovingShape = true;
        this.lastMousePos = { x, y };
      }
    },
    // 處理滑鼠移動事件
    handleMouseMove(e) {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 處理頂點拖曳
      if (this.isDragging) {
        this.points[this.selectedPoint].x = x;
        this.points[this.selectedPoint].y = y;
        this.drawShape();
        return;
      }

      // 處理整體移動
      if (this.isMovingShape) {
        const dx = x - this.lastMousePos.x;
        const dy = y - this.lastMousePos.y;

        // 移動所有點
        this.points = this.points.map((point) => ({
          x: point.x + dx,
          y: point.y + dy,
        }));

        this.lastMousePos = { x, y };
        this.drawShape();
      }
    },
    // 處理滑鼠放開事件
    handleMouseUp() {
      this.isDragging = false;
      this.selectedPoint = null;
      this.isMovingShape = false;
    },
    // 繪製整個圖形
    drawShape() {
      // 清除畫布
      this.ctx.clearRect(0, 0, this.size.width, this.size.height);

      const pointColor = "#FF0000";
      const lineColor = "#0000FF";

      // 畫線
      this.ctx.beginPath();
      this.ctx.strokeStyle = lineColor;
      this.ctx.lineWidth = 2;
      this.points.forEach((point, index) => {
        if (index === 0) {
          this.ctx.moveTo(point.x, point.y);
        } else {
          this.ctx.lineTo(point.x, point.y);
        }
      });
      // 連接回第一個點
      this.ctx.lineTo(this.points[0].x, this.points[0].y);
      this.ctx.stroke();

      // 畫點
      this.points.forEach((point) => {
        this.ctx.beginPath();
        this.ctx.fillStyle = pointColor;
        this.ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
        this.ctx.fill();
      });
    },
    generateExcludeArea() {
      this.drawShape();
    },
  },
  beforeDestroy() {
    // 移除事件監聽
    this.canvas.removeEventListener("mousedown", this.handleMouseDown);
    this.canvas.removeEventListener("mousemove", this.handleMouseMove);
    this.canvas.removeEventListener("mouseup", this.handleMouseUp);
  },
};
</script>
<style lang="scss" scoped>
.canvas-demo {
  .container {
    position: relative;
    width: 800px;
    height: 600px;
    padding: 0;
    .background-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .canvas-container {
      width: 100%;
      height: 100%;
      canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
