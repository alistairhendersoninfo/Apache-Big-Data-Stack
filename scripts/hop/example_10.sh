# Initialize Git repository
cd /opt/hop/my-hop-project
git init
git add *.hpl *.hwf config/
git commit -m "Initial pipeline commit"
git push origin main