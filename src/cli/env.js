const parseEnv = () => {
  const rssEnv = Object.entries(process.env)
    .filter((e) => e[0].startsWith("RSS_"))
    .map((e) => `${e[0]}=${e[1]}`)
    .join("; ");
  console.log(rssEnv);
};

parseEnv();
