#!/usr/bin/env node
/**
 * Interactive AI Workflow
 * Choose from predefined workflows combining Phi-3 and CodeLlama
 */

const { exec } = require("child_process");
const util = require("util");
const readline = require("readline");
const fs = require("fs").promises;

const execPromise = util.promisify(exec);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

async function queryModel(model, prompt, temperature = 0.2) {
  try {
    const { stdout } = await execPromise(
      `ollama run ${model} "${prompt.replace(
        /"/g,
        '\\"'
      )}" --temperature ${temperature} --verbose false`
    );
    return stdout.trim();
  } catch (error) {
    console.error(`Error querying ${model}:`, error.message);
    return null;
  }
}

const workflows = {
  1: {
    name: "Plan & Implement",
    description: "Plan with Phi-3, implement with CodeLlama",
    async execute(input) {
      console.log("\\n📋 Planning phase (Phi-3)...");
      const plan = await queryModel(
        "phi3:mini",
        `Create a detailed implementation plan for: ${input}`
      );
      console.log(plan);

      console.log("\\n💻 Implementation phase (CodeLlama)...");
      const code = await queryModel(
        "codellama:7b-instruct",
        `Implement this plan with production-ready code:\\n${plan}`
      );
      console.log(code);

      return { plan, code };
    },
  },
  2: {
    name: "Learn & Practice",
    description: "Learn concept with Phi-3, practice with CodeLlama",
    async execute(input) {
      console.log("\\n📚 Learning phase (Phi-3)...");
      const explanation = await queryModel(
        "phi3:mini",
        `Explain ${input} in detail with examples and use cases`
      );
      console.log(explanation);

      console.log("\\n💪 Practice phase (CodeLlama)...");
      const exercises = await queryModel(
        "codellama:7b-instruct",
        `Create 3 coding exercises to practice ${input}, with solutions`
      );
      console.log(exercises);

      return { explanation, exercises };
    },
  },
  3: {
    name: "Debug & Fix",
    description: "Analyze with Phi-3, fix with CodeLlama",
    async execute(input) {
      console.log("\\n🔍 Analysis phase (Phi-3)...");
      const analysis = await queryModel(
        "phi3:mini",
        `Analyze this error and explain the root cause:\\n${input}`
      );
      console.log(analysis);

      console.log("\\n🔧 Fix phase (CodeLlama)...");
      const fix = await queryModel(
        "codellama:7b-instruct",
        `Fix this issue:\\nProblem: ${input}\\nAnalysis: ${analysis}`
      );
      console.log(fix);

      return { analysis, fix };
    },
  },
  4: {
    name: "Code Review",
    description: "Technical review (CodeLlama) + Architecture review (Phi-3)",
    async execute(input) {
      console.log("\\n🔧 Technical review (CodeLlama)...");
      const techReview = await queryModel(
        "codellama:7b-instruct",
        `Review this code for bugs, optimizations, and best practices:\\n${input}`
      );
      console.log(techReview);

      console.log("\\n🏗️  Architecture review (Phi-3)...");
      const archReview = await queryModel(
        "phi3:mini",
        `Review architecture and design patterns:\\n${input}`
      );
      console.log(archReview);

      console.log("\\n✨ Improvements (CodeLlama)...");
      const improved = await queryModel(
        "codellama:7b-instruct",
        `Improve based on reviews:\\nCode: ${input}\\nTech: ${techReview}\\nArch: ${archReview}`
      );
      console.log(improved);

      return { techReview, archReview, improved };
    },
  },
  5: {
    name: "Explain & Document",
    description: "Explain code with Phi-3, add docs with CodeLlama",
    async execute(input) {
      console.log("\\n📖 Explanation phase (Phi-3)...");
      const explanation = await queryModel(
        "phi3:mini",
        `Explain what this code does and how it works:\\n${input}`
      );
      console.log(explanation);

      console.log("\\n📝 Documentation phase (CodeLlama)...");
      const documented = await queryModel(
        "codellama:7b-instruct",
        `Add comprehensive documentation to this code:\\n${input}`
      );
      console.log(documented);

      return { explanation, documented };
    },
  },
};

async function saveResults(workflow, input, results) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `ai-outputs/workflow_${workflow}_${timestamp}.md`;

  let content = `# AI Workflow: ${workflows[workflow].name}\\n`;
  content += `**Date**: ${new Date().toLocaleString()}\\n\\n`;
  content += `## Input\\n${input}\\n\\n`;
  content += `## Results\\n`;

  for (const [key, value] of Object.entries(results)) {
    content += `\\n### ${key}\\n${value}\\n`;
  }

  await fs.mkdir("ai-outputs", { recursive: true });
  await fs.writeFile(filename, content);
  console.log(`\\n✅ Results saved to: ${filename}`);
}

async function main() {
  console.log("\\n🤖 AI Workflow Manager");
  console.log("=".repeat(60));
  console.log("\\nAvailable Workflows:\\n");

  for (const [key, workflow] of Object.entries(workflows)) {
    console.log(`${key}. ${workflow.name}`);
    console.log(`   ${workflow.description}\\n`);
  }

  const choice = await question("Select workflow (1-5): ");

  if (!workflows[choice]) {
    console.log("Invalid choice");
    rl.close();
    return;
  }

  console.log(`\\n✓ Selected: ${workflows[choice].name}`);
  const input = await question("\\nEnter your input: ");

  if (!input.trim()) {
    console.log("No input provided");
    rl.close();
    return;
  }

  console.log("\\n🚀 Starting workflow...");
  const results = await workflows[choice].execute(input);

  const save = await question("\\nSave results? (y/n): ");
  if (save.toLowerCase() === "y") {
    await saveResults(choice, input, results);
  }

  rl.close();
}

main().catch(console.error);
