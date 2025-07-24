import { pipeAgregationJob_US } from './pipeAgregationJob_US.js';

async function runAggregationJob_US() {
  try {
    await pipeAgregationJob_US();  // Await the pipeline job
    console.log('Pipeline ejecutado con éxito');
  } catch (error) {
    console.error('Error ejecutando pipeline:', error);
  }
}

runAggregationJob_US();
