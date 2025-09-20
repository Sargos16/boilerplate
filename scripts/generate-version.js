import { execSync } from 'child_process';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

function getGitInfo() {
  try {
    const commitHash = execSync('git rev-parse --short HEAD', {
      encoding: 'utf8',
    }).trim();
    const branch = execSync('git rev-parse --abbrev-ref HEAD', {
      encoding: 'utf8',
    }).trim();
    const lastCommitDate = execSync('git log -1 --format=%ci', {
      encoding: 'utf8',
    }).trim();

    return {
      commitHash,
      branch,
      lastCommitDate: new Date(lastCommitDate).toISOString().split('T')[0],
    };
  } catch (error) {
    console.warn('Git information not available:', error.message);
    return {
      commitHash: 'unknown',
      branch: 'unknown',
      lastCommitDate: new Date().toISOString().split('T')[0],
    };
  }
}

function getCurrentVersion() {
  const versionFile = join(process.cwd(), 'src', 'version.ts');
  if (!existsSync(versionFile)) {
    return { major: 1, minor: 0, patch: 0 };
  }

  try {
    const content = readFileSync(versionFile, 'utf8');
    const versionMatch = content.match(/UI_VERSION = 'v(\d+)\.(\d+)\.(\d+)'/);
    if (versionMatch) {
      return {
        major: parseInt(versionMatch[1]),
        minor: parseInt(versionMatch[2]),
        patch: parseInt(versionMatch[3]),
      };
    }
  } catch (error) {
    console.warn('Could not read current version:', error.message);
  }

  return { major: 1, minor: 0, patch: 0 };
}

function getCommitType() {
  try {
    const lastCommitMessage = execSync('git log -1 --pretty=%B', {
      encoding: 'utf8',
    }).trim();

    if (lastCommitMessage.startsWith('feat:')) return 'minor';
    if (lastCommitMessage.startsWith('fix:')) return 'patch';
    if (lastCommitMessage.startsWith('BREAKING CHANGE:')) return 'major';
    if (lastCommitMessage.includes('!:')) return 'major';
    if (lastCommitMessage.startsWith('add:')) return 'minor';
    if (lastCommitMessage.startsWith('improve:')) return 'minor';
    if (lastCommitMessage.startsWith('update:')) return 'patch';
    if (lastCommitMessage.startsWith('refactor:')) return 'patch';
    if (lastCommitMessage.startsWith('style:')) return 'patch';
    if (lastCommitMessage.startsWith('chore:')) return 'patch';
    if (lastCommitMessage.startsWith('docs:')) return 'patch';
    if (lastCommitMessage.startsWith('test:')) return 'patch';

    return 'patch';
  } catch (error) {
    console.warn('Could not determine commit type:', error.message);
    return 'patch';
  }
}

function incrementVersion(currentVersion, commitType) {
  const { major, minor, patch } = currentVersion;

  switch (commitType) {
    case 'major':
      return { major: major + 1, minor: 0, patch: 0 };
    case 'minor':
      return { major, minor: minor + 1, patch: patch };
    case 'patch':
    default:
      return { major, minor, patch: patch + 1 };
  }
}

function generateVersion() {
  const gitInfo = getGitInfo();
  const currentVersion = getCurrentVersion();
  const commitType = getCommitType();
  const newVersion = incrementVersion(currentVersion, commitType);
  const version = `v${newVersion.major}.${newVersion.minor}.${newVersion.patch}`;

  return {
    version,
    commitType,
    previousVersion: `v${currentVersion.major}.${currentVersion.minor}.${currentVersion.patch}`,
    ...gitInfo,
  };
}

function main() {
  const versionInfo = generateVersion();

  const versionFile = `// Auto-generated version file
// Generated at: ${new Date().toISOString()}

export const VERSION_INFO = ${JSON.stringify(versionInfo, null, 2)};

export const UI_VERSION = '${versionInfo.version}';
`;

  const outputPath = join(process.cwd(), 'src', 'version.ts');
  writeFileSync(outputPath, versionFile);

  console.log(
    `✅ Version updated: ${versionInfo.previousVersion} → ${versionInfo.version}`
  );
  console.log(`📝 Commit type: ${versionInfo.commitType}`);
  console.log(`🌿 Branch: ${versionInfo.branch}`);
  console.log(`📁 Written to: ${outputPath}`);
}

main();
