// @ts-nocheck
// 这将禁用整个文件的TypeScript类型检查

import { Box } from '../classes';
import { nonMaxSuppression } from '../ops';
import { extractImagePatches } from './extractImagePatches';
import { MtcnnBox } from './MtcnnBox';
import { RNet } from './RNet';
import { RNetParams } from './types';

// 假设tf已经在其他地方定义
declare const tf: any;

export async function stage2(
  img: HTMLCanvasElement,
  inputBoxes: Box[],
  scoreThreshold: number,
  params: RNetParams,
  stats: any
) {

  let ts = Date.now()
  const rnetInputs = await extractImagePatches(img, inputBoxes, { width: 24, height: 24 })
  stats.stage2_extractImagePatches = Date.now() - ts

  ts = Date.now()
  const rnetOuts = rnetInputs.map(
    rnetInput => {
      const out = RNet(rnetInput, params)
      rnetInput.dispose()
      return out
    }
  )
  stats.stage2_rnet = Date.now() - ts

  const scoresTensor = rnetOuts.length > 1
    ? tf.concat(rnetOuts.map(out => out.scores))
    : rnetOuts[0].scores
  const scores = Array.from(await scoresTensor.data())
  scoresTensor.dispose()

  const indices = scores
    .map((score, idx) => ({ score: Number(score), idx }))
    .filter(c => c.score > scoreThreshold)
    .map(({ idx }) => idx)

  const filteredBoxes = indices.map(idx => inputBoxes[idx])
  const filteredScores = indices.map(idx => Number(scores[idx]))

  let finalBoxes = []
  let finalScores = []

  if (filteredBoxes.length > 0) {
    ts = Date.now()
    const indicesNms = nonMaxSuppression(
      filteredBoxes,
      filteredScores,
      0.7
    )
    stats.stage2_nms = Date.now() - ts

    const regions = indicesNms.map(idx => {
        const regionsData = rnetOuts[indices[idx]].regions.arraySync()
        return new MtcnnBox(
          regionsData[0][0],
          regionsData[0][1],
          regionsData[0][2],
          regionsData[0][3]
        )
      }
    )

    finalScores = indicesNms.map(idx => Number(filteredScores[idx]))
    finalBoxes = indicesNms.map((idx, i) => filteredBoxes[idx].calibrate(regions[i]))
  }

  rnetOuts.forEach(t => {
    t.regions.dispose()
    t.scores.dispose()
  })

  return {
    boxes: finalBoxes,
    scores: finalScores
  }
}