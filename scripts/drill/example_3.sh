# Create sample JSON file
mkdir -p /tmp/drill_data
cat > /tmp/drill_data/employees.json << 'EOF'
{"id": 1, "name": "Alice", "department": "Engineering", "salary": 85000, "skills": ["Python", "Java"]}
{"id": 2, "name": "Bob", "department": "Sales", "salary": 72000, "skills": ["Communication"]}
{"id": 3, "name": "Charlie", "department": "Engineering", "salary": 92000, "skills": ["Go", "Rust", "Python"]}
{"id": 4, "name": "Diana", "department": "Marketing", "salary": 68000, "skills": ["SEO", "Analytics"]}
EOF