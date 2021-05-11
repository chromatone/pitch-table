cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:chromatone/pitch-table.git master:gh-pages

cd -