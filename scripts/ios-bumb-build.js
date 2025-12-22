const fs = require('fs');

// iOS
const pbx = 'ios/App/App.xcodeproj/project.pbxproj';
let p = fs.readFileSync(pbx, 'utf8');
p = p.replace(/CURRENT_PROJECT_VERSION = (\d+);/g,
    (_, v) => `CURRENT_PROJECT_VERSION = ${Number(v) + 1};`
);
fs.writeFileSync(pbx, p);

// Android
const gradle = 'android/app/build.gradle';
let g = fs.readFileSync(gradle, 'utf8');
g = g.replace(/versionCode (\d+)/,
    (_, v) => `versionCode ${Number(v) + 1}`
);
fs.writeFileSync(gradle, g);

console.log('✅ autoIncrement aplicado (iOS + Android)');
