import autocannon from "autocannon";

const baseUrl = process.env.BASE_URL || "https://referlabs.com.au";
const duration = Number(process.env.DURATION || 20);
const connections = Number(process.env.CONNECTIONS || 10);
const pipelining = Number(process.env.PIPELINE || 1);

const targets = [
  "/",
  "/linkedin-growth",
  "/linkedin-growth/business",
  "/linkedin-growth/influencer",
  "/api/health/attribution",
];

const runTarget = (path) =>
  new Promise((resolve, reject) => {
    const url = `${baseUrl}${path}`;
    const instance = autocannon(
      {
        url,
        duration,
        connections,
        pipelining,
        headers: {
          "user-agent": "referlabs-load-test/1.0",
        },
      },
      (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({ path, result });
      },
    );

    autocannon.track(instance, { renderProgressBar: true });
  });

const run = async () => {
  // eslint-disable-next-line no-console
  console.log(
    `Running load test against ${baseUrl} (duration=${duration}s, connections=${connections}, pipelining=${pipelining})`,
  );

  for (const path of targets) {
    // eslint-disable-next-line no-console
    console.log(`\n▶ Testing ${path}`);
    try {
      const { result } = await runTarget(path);
      const p99 = result.latency?.p99 ?? "n/a";
      const rate = result.requests?.average ?? "n/a";
      const errors = result.errors ?? 0;
      const timeouts = result.timeouts ?? 0;
      const non2xx = result.non2xx ?? 0;

      // eslint-disable-next-line no-console
      console.log(
        `Requests/sec: ${rate} | p99: ${p99} ms | errors: ${errors} | timeouts: ${timeouts} | non-2xx: ${non2xx}`,
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`Failed to test ${path}:`, err);
    }
  }
};

run();
