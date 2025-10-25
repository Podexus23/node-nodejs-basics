const parseArgs = () => {
  const args = process.argv.slice(2);
  const formattedArgs = args
    .map((e, i) => {
      if (e.startsWith("--")) return `${e.slice(2)} is ${args[i + 1]}`;
    })
    .filter(Boolean);
  console.log(formattedArgs.join(", "));
};

parseArgs();
