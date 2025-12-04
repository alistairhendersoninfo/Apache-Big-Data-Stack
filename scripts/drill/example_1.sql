-- In Drill shell or web UI

-- Basic query
SELECT * FROM dfs.`/tmp/drill_data/employees.json`;

-- Filter and project
SELECT name, department, salary
FROM dfs.`/tmp/drill_data/employees.json`
WHERE salary > 75000;

-- Query nested arrays
SELECT name, FLATTEN(skills) AS skill
FROM dfs.`/tmp/drill_data/employees.json`;

-- Aggregations
SELECT department, COUNT(*) as count, AVG(salary) as avg_salary
FROM dfs.`/tmp/drill_data/employees.json`
GROUP BY department
ORDER BY avg_salary DESC;

-- Array functions
SELECT name, REPEATED_COUNT(skills) as num_skills
FROM dfs.`/tmp/drill_data/employees.json`
WHERE REPEATED_CONTAINS(skills, 'Python');