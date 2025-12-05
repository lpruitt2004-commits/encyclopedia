# AI Model Scripts - README

Collection of helper scripts for using Phi-3 Mini and CodeLlama together.

## Setup

1. Make scripts executable:

```bash
chmod +x *.sh *.py
chmod +x workflow.js
```

2. Ensure Ollama is installed and running:

```bash
brew install ollama
ollama serve
```

3. Pull required models:

```bash
ollama pull phi3:mini
ollama pull codellama:7b-instruct
```

## Available Scripts

### 1. setup-helpers.sh

Quick helper functions for terminal use.

**Usage:**

```bash
source setup-helpers.sh
phi3 "your question"
codellama "write code..."
```

### 2. chain-prompt.sh

Automated workflow: Plan → Implement → Document

**Usage:**

```bash
./chain-prompt.sh "build a REST API for todo management"
```

**Output:** Saves complete workflow to `ai-outputs/`

### 3. code-review.py

Comprehensive code review using both models.

**Usage:**

```bash
# Review a file
./code-review.py mycode.py -l python

# Review code string
./code-review.py "def hello(): print('hi')" -o review.md
```

**Options:**

- `-l, --language`: Specify programming language
- `-o, --output`: Output file for review

### 4. workflow.js

Interactive workflow selector.

**Usage:**

```bash
node workflow.js
```

**Available Workflows:**

1. Plan & Implement
2. Learn & Practice
3. Debug & Fix
4. Code Review
5. Explain & Document

## Quick Examples

### Example 1: Build a Feature

```bash
./chain-prompt.sh "user authentication with JWT tokens"
```

### Example 2: Review Code

```bash
./code-review.py app.js -l javascript -o review.md
```

### Example 3: Learn a Concept

```bash
node workflow.js
# Select: 2 (Learn & Practice)
# Input: "React hooks"
```

### Example 4: Debug an Error

```bash
node workflow.js
# Select: 3 (Debug & Fix)
# Input: "TypeError: Cannot read property 'map' of undefined"
```

## Output Directory

All scripts save outputs to `ai-outputs/` with timestamps.

## Tips

1. **Chain prompting** works best for new projects
2. **Code review** is great for existing code
3. **Workflows** are interactive and flexible
4. Check `ai-outputs/` for saved results

## Troubleshooting

**Issue**: Command not found

```bash
chmod +x script-name.sh
```

**Issue**: Ollama not responding

```bash
ollama serve
# In new terminal:
ollama ps
```

**Issue**: Model not found

```bash
ollama pull phi3:mini
ollama pull codellama:7b-instruct
```

## Advanced Usage

### Custom Temperature

Edit scripts to adjust creativity:

- `0.1-0.3`: Precise, consistent
- `0.4-0.7`: Balanced
- `0.8-1.0`: Creative, varied

### Batch Processing

```bash
# Process multiple files
for file in *.py; do
    ./code-review.py "$file" -o "review_$file.md"
done
```

### Integration

Source helpers in your `.zshrc`:

```bash
echo "source ~/path/to/setup-helpers.sh" >> ~/.zshrc
```

## Model Information

**Phi-3 Mini**

- Best for: Planning, analysis, documentation
- Speed: Fast
- RAM: Low (2-3GB)

**CodeLlama 7B-Instruct**

- Best for: Code generation, debugging, review
- Speed: Medium
- RAM: Medium (4-5GB)

## License

MIT - Use freely for personal and commercial projects.
