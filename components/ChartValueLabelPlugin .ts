import { Plugin } from 'chart.js';

export const ChartValueLabelPlugin: Plugin<'bar'> = {
  id: 'valueLabel',
  afterDatasetsDraw(chart) {
    const { ctx } = chart;
    chart.data.datasets.forEach((dataset, i) => {
      const meta = chart.getDatasetMeta(i);
      if (!meta.hidden) {
        meta.data.forEach((element, index) => {
          const data = dataset.data[index] as number;
          ctx.fillStyle = 'black';
          const fontSize = 12;
          const fontStyle = 'normal';
          const fontFamily = 'Calibri';
          ctx.font = `${fontSize}px ${fontFamily}`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const padding = 5;
          const position = element.tooltipPosition(true); // Pass the required argument
          ctx.fillText(data.toString(), position.x, position.y - (fontSize / 2) - padding);
        });
      }
    });
  },
};