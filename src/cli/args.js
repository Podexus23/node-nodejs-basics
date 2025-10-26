const parseArgs = () => {
  try {
    const args = process.argv.slice(2);
    const formattedArgs = args
      .map((e, i) => {
        if (e.startsWith("--")) return `${e.slice(2)} is ${args[i + 1]}`;
      })
      .filter(Boolean);
    console.log(formattedArgs.join(", "));
  } catch (error) {
    throw new Error("CLI operation failed");
  }
};

parseArgs();
