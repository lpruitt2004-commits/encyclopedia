#!/bin/bash
# Chain Prompting: Plan with Phi-3, Implement with CodeLlama

if [ $# -eq 0 ]; then
    echo "Usage: ./chain-prompt.sh 'describe what you want to build'"
    echo "Example: ./chain-prompt.sh 'a user authentication system with JWT'"
    exit 1
fi

TASK="$1"

echo "🎯 Task: $TASK"
echo ""

# Step 1: Planning with Phi-3
echo "📋 Step 1: Planning with Phi-3 Mini..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
PLAN=$(ollama run phi3:mini "Create a detailed implementation plan for: $TASK. Include architecture, components, and step-by-step approach." --verbose false)
echo "$PLAN"
echo ""

# Step 2: Implementation with CodeLlama  
echo "💻 Step 2: Implementation with CodeLlama..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
CODE=$(ollama run codellama:7b-instruct "Based on this plan, generate the main implementation code:

$PLAN

Provide clean, production-ready code with comments." --verbose false)
echo "$CODE"
echo ""

# Step 3: Documentation with Phi-3
echo "📝 Step 3: Documentation with Phi-3 Mini..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
DOCS=$(ollama run phi3:mini "Create user documentation for this implementation:

Code:
$CODE

Include: overview, usage examples, and API reference if applicable." --verbose false)
echo "$DOCS"
echo ""

# Save outputs
OUTPUT_DIR="./ai-outputs"
mkdir -p "$OUTPUT_DIR"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
OUTPUT_FILE="$OUTPUT_DIR/chain_prompt_$TIMESTAMP.md"

cat > "$OUTPUT_FILE" << EOF
# AI Chain Prompt Output
**Task**: $TASK
**Date**: $(date)

## Plan (Phi-3 Mini)
$PLAN

## Implementation (CodeLlama)
\`\`\`
$CODE
\`\`\`

## Documentation (Phi-3 Mini)
$DOCS
EOF

echo "✅ Output saved to: $OUTPUT_FILE"
