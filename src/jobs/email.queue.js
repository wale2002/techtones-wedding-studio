// const queue = [];

// /**
//  * Add job to queue
//  */
// const addJob = (job) => {
//   queue.push(job);
// };

// /**
//  * Process queue every 3 seconds
//  */
// const startQueue = () => {
//   setInterval(async () => {
//     if (queue.length === 0) return;

//     const job = queue.shift();

//     try {
//       await job();
//     } catch (err) {
//       console.error("Job failed:", err.message);
//     }
//   }, 3000);
// };

// module.exports = { addJob, startQueue };

const queue = [];

/**
 * Add job to queue
 */
const addJob = (job) => {
  queue.push({
    job,
    retries: 0,
  });
};

/**
 * Process queue every 3 seconds
 */
const startQueue = () => {
  setInterval(async () => {
    if (queue.length === 0) return;

    const item = queue.shift();

    try {
      await item.job();
    } catch (err) {
      console.error("❌ Job failed:", err.message);

      // Retry logic (max 3 attempts)
      if (item.retries < 3) {
        queue.push({
          job: item.job,
          retries: item.retries + 1,
        });
      }
    }
  }, 3000);
};

module.exports = { addJob, startQueue };
