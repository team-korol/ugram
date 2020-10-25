import React, { useRef, useLayoutEffect } from 'react';
import style from './index.module.css';

/**
 * 利用する際は以下のように情報を渡すようにする
 * const waveConfig = {
 *   UNIT: 30,
 *   waves: [
 *     {
 *       color: '#00c2ff',
 *       zoom: 1.5,
 *       delay: 0,
 *     },
 *     {
 *       color: '#fb14ff',
 *       zoom: 0.7,
 *       delay: 200,
 *     },
 *   ],
 * };
 */

type Props = {
  waveConfig: WaveConfig;
};

type WaveConfig = {
  UNIT: number;
  waves: Wave[];
};

type Wave = {
  color: string;
  zoom: number;
  delay: number;
};

type DrawArgs = {
  context: CanvasRenderingContext2D;
  waveConfig: WaveConfig;
  height: number;
  width: number;
  xAxis: number;
  yAxis: number;
  time: number;
};

type MetaData = {
  context: CanvasRenderingContext2D;
  height: number;
  width: number;
  xAxis: number;
  yAxis: number;
};

type DrawWaveArgs = {
  metaData: MetaData;
  wave: Wave;
  unit: number;
  time: number;
};

type DrawSineArgs = {
  metaData: MetaData;
  time: number;
  zoom: number;
  delay: number;
  unit: number;
};

const draw = ({
  context,
  width,
  height,
  xAxis,
  yAxis,
  waveConfig,
  time,
}: DrawArgs) => {
  // キャンバスの描画をクリア
  context.clearRect(0, 0, width, height);
  waveConfig.waves.forEach((wave) => {
    drawWave({
      metaData: { context, width, height, xAxis, yAxis },
      wave,
      unit: waveConfig.UNIT,
      time,
    });
  });
};

const drawWave = ({ metaData, wave, unit, time }: DrawWaveArgs) => {
  const { context, width, height } = metaData;
  const { color, zoom, delay } = wave;
  context.beginPath();
  drawSine({ metaData, time, zoom, delay, unit });
  context.lineTo(width + 40, height + 40); //パスをCanvasの右下へ
  context.lineTo(-40, height + 40); //パスをCanvasの左下へ
  context.closePath();
  context.strokeStyle = color;
  context.lineWidth = 1;
  context.stroke();
};

const drawSine = ({ metaData, time, zoom, delay, unit }: DrawSineArgs) => {
  const { context, yAxis, xAxis, width } = metaData;
  let x = (time * Math.PI) / 0.5; //時間を横の位置とする
  let y = Math.sin(x) / zoom;
  context.moveTo(yAxis, unit * y + xAxis); //スタート位置にパスを置く

  // Loop to draw segments (横幅の分、波を描画)
  for (let i = yAxis; i <= width + 10; i += 10) {
    x = time + (-yAxis + i) / unit / zoom;
    y = Math.sin(x - delay) / 3;
    context.lineTo(i, unit * y + xAxis);
  }
};

const WaveCanvas: React.FC<Props> = ({ waveConfig }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    canvasRef.current.width = canvasRef.current.offsetWidth;
    canvasRef.current.height = 50;
    const height = canvasRef.current.height;
    const width = canvasRef.current.width;

    const xAxis = Math.floor(height / 2);
    const yAxis = 0;

    const context = canvasRef.current.getContext('2d');
    if (!context) {
      return;
    }
    let time = 0;
    const callDraw = (time: number) => {
      draw({ context, waveConfig, height, width, xAxis, yAxis, time });
      time += 0.1;
      setTimeout(() => callDraw(time + 0.1), 50);
    };
    callDraw(time);
  }, [canvasRef, waveConfig]);

  return <canvas ref={canvasRef} className={style.wave} />;
};

export default WaveCanvas;
