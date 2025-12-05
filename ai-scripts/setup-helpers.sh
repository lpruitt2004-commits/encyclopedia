#!/bin/bash
# AI Model Helper Scripts for Phi-3 Mini & CodeLlama

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== AI Model Helper Scripts ===${NC}\n"

# Check if Ollama is installed
if ! command -v ollama &> /dev/null; then
    echo -e "${YELLOW}Ollama is not installed. Install with: brew install ollama${NC}"
    exit 1
fi

# Function to query Phi-3
phi3() {
    echo -e "${GREEN}[Phi-3 Mini]${NC}"
    ollama run phi3:mini "$@"
}

# Function to query CodeLlama
codellama() {
    echo -e "${GREEN}[CodeLlama 7B-Instruct]${NC}"
    ollama run codellama:7b-instruct "$@"
}

# Export functions
export -f phi3
export -f codellama

echo "Helper functions loaded!"
echo ""
echo "Usage:"
echo "  phi3 'your question here'"
echo "  codellama 'write a function...'"
echo ""
echo "Examples:"
echo "  phi3 'Explain quantum computing'"
echo "  codellama 'Write a Python binary search function'"
