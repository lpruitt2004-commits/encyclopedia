#!/usr/bin/env python3
"""
Collaborative AI Code Review
Uses both Phi-3 and CodeLlama for comprehensive code review
"""

import subprocess
import sys
import argparse
from datetime import datetime

def query_model(model, prompt, temperature=0.2):
    """Query an Ollama model"""
    cmd = [
        'ollama', 'run', model, prompt,
        '--temperature', str(temperature),
        '--verbose', 'false'
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    return result.stdout.strip()

def read_code_file(filepath):
    """Read code from file"""
    try:
        with open(filepath, 'r') as f:
            return f.read()
    except FileNotFoundError:
        print(f"Error: File '{filepath}' not found")
        sys.exit(1)

def collaborative_review(code, language=None):
    """Perform collaborative code review"""
    
    lang_hint = f" (Language: {language})" if language else ""
    
    print("\n🔍 Starting Collaborative Code Review...")
    print("=" * 60)
    
    # Step 1: CodeLlama technical review
    print("\n💻 CodeLlama: Technical Review" + lang_hint)
    print("-" * 60)
    tech_prompt = f"""Review this code for:
- Bugs and errors
- Performance issues
- Security vulnerabilities
- Best practices
- Code optimization

Code:
{code}
"""
    tech_review = query_model('codellama:7b-instruct', tech_prompt)
    print(tech_review)
    
    # Step 2: Phi-3 architecture review
    print("\n🏗️  Phi-3: Architecture & Design Review")
    print("-" * 60)
    arch_prompt = f"""Review this code for:
- Architecture patterns
- Design principles
- Maintainability
- Scalability
- Code organization

Code:
{code}
"""
    arch_review = query_model('phi3:mini', arch_prompt)
    print(arch_review)
    
    # Step 3: CodeLlama suggests improvements
    print("\n✨ CodeLlama: Suggested Improvements")
    print("-" * 60)
    improve_prompt = f"""Based on these reviews, provide improved code:

Original Code:
{code}

Technical Review:
{tech_review}

Architecture Review:
{arch_review}

Generate improved code addressing the issues found.
"""
    improvements = query_model('codellama:7b-instruct', improve_prompt, temperature=0.3)
    print(improvements)
    
    # Step 4: Phi-3 summary
    print("\n📊 Phi-3: Review Summary")
    print("-" * 60)
    summary_prompt = f"""Summarize the code review findings in bullet points:

Technical Issues:
{tech_review}

Architecture Issues:
{arch_review}

Provide: 
1. Top 3 critical issues
2. Top 3 improvements made
3. Overall quality rating (1-10)
"""
    summary = query_model('phi3:mini', summary_prompt)
    print(summary)
    
    return {
        'tech_review': tech_review,
        'arch_review': arch_review,
        'improvements': improvements,
        'summary': summary
    }

def save_review(code, results, output_file=None):
    """Save review results to file"""
    if not output_file:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_file = f"code_review_{timestamp}.md"
    
    with open(output_file, 'w') as f:
        f.write("# Collaborative AI Code Review\\n")
        f.write(f"**Date**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\\n\\n")
        
        f.write("## Original Code\\n```\\n")
        f.write(code)
        f.write("\\n```\\n\\n")
        
        f.write("## Technical Review (CodeLlama)\\n")
        f.write(results['tech_review'])
        f.write("\\n\\n")
        
        f.write("## Architecture Review (Phi-3)\\n")
        f.write(results['arch_review'])
        f.write("\\n\\n")
        
        f.write("## Improved Code (CodeLlama)\\n```\\n")
        f.write(results['improvements'])
        f.write("\\n```\\n\\n")
        
        f.write("## Summary (Phi-3)\\n")
        f.write(results['summary'])
        f.write("\\n")
    
    print(f"\\n✅ Review saved to: {output_file}")

def main():
    parser = argparse.ArgumentParser(description='Collaborative AI Code Review')
    parser.add_argument('input', help='Code file to review or code string')
    parser.add_argument('-l', '--language', help='Programming language')
    parser.add_argument('-o', '--output', help='Output file for review')
    
    args = parser.parse_args()
    
    # Determine if input is file or code string
    try:
        code = read_code_file(args.input)
    except:
        code = args.input
    
    if not code.strip():
        print("Error: No code provided")
        sys.exit(1)
    
    # Perform review
    results = collaborative_review(code, args.language)
    
    # Save results
    save_review(code, results, args.output)

if __name__ == "__main__":
    main()
