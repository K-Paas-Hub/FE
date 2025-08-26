#!/usr/bin/env node

/**
 * 스타일 분리 마이그레이션 스크립트
 * 
 * 사용법:
 * node scripts/migrate-styles.js [컴포넌트명]
 * 
 * 예시:
 * node scripts/migrate-styles.js StatsSection
 * node scripts/migrate-styles.js VisaDetailPage
 */

const fs = require('fs');
const path = require('path');

// 색상 출력을 위한 유틸리티
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function error(message) {
  log(`❌ ${message}`, 'red');
}

function success(message) {
  log(`✅ ${message}`, 'green');
}

function info(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function warning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

// styled-components 패턴 찾기
function findStyledComponents(content) {
  const patterns = [
    /const\s+(\w+)\s*=\s*styled\.(\w+)/g,
    /const\s+(\w+)\s*=\s*styled\((\w+)\)/g,
    /const\s+(\w+)\s*=\s*styled\(motion\.(\w+)\)/g
  ];
  
  const styledComponents = [];
  
  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      styledComponents.push({
        name: match[1],
        element: match[2],
        fullMatch: match[0]
      });
    }
  });
  
  return styledComponents;
}

// 스타일 코드 추출
function extractStyleCode(content, componentName) {
  const startPattern = new RegExp(`const\\s+${componentName}\\s*=\\s*styled`);
  const startIndex = content.search(startPattern);
  
  if (startIndex === -1) return null;
  
  let braceCount = 0;
  let inTemplate = false;
  let endIndex = startIndex;
  
  for (let i = startIndex; i < content.length; i++) {
    const char = content[i];
    
    if (char === '`' && !inTemplate) {
      inTemplate = true;
      continue;
    }
    
    if (char === '`' && inTemplate) {
      inTemplate = false;
      continue;
    }
    
    if (inTemplate) continue;
    
    if (char === '{') {
      braceCount++;
    } else if (char === '}') {
      braceCount--;
      if (braceCount === 0) {
        endIndex = i + 1;
        break;
      }
    }
  }
  
  return content.substring(startIndex, endIndex);
}

// 스타일 파일 생성
function createStyleFile(componentName, styledComponents, styleCode) {
  const styleFilePath = path.join(__dirname, '..', 'src', 'styles', 'components', `${componentName}.styles.ts`);
  
  let styleFileContent = `import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS, ANIMATIONS } from '../../constants';

`;

  // 각 styled component를 export로 변환
  styledComponents.forEach(comp => {
    const exportLine = `export const ${comp.name} = styled.${comp.element}\`\n  // TODO: 스타일 코드를 여기에 추가하세요\n\`;\n\n`;
    styleFileContent += exportLine;
  });
  
  fs.writeFileSync(styleFilePath, styleFileContent);
  return styleFilePath;
}

// 컴포넌트 파일 수정
function updateComponentFile(componentPath, componentName, styledComponents) {
  let content = fs.readFileSync(componentPath, 'utf8');
  
  // styled-components import 제거
  content = content.replace(/import\s+styled\s+from\s+['"]styled-components['"];?\n?/g, '');
  
  // styled-components 코드 제거
  styledComponents.forEach(comp => {
    const pattern = new RegExp(`const\\s+${comp.name}\\s*=\\s*styled[^}]+};?\n?`, 'gs');
    content = content.replace(pattern, '');
  });
  
  // 스타일 import 추가
  const importStatement = `import {
  ${styledComponents.map(comp => comp.name).join(',\n  ')}
} from '../../styles/components/${componentName}.styles';`;
  
  // React import 다음에 추가
  const reactImportIndex = content.indexOf('import React');
  const nextLineIndex = content.indexOf('\n', reactImportIndex) + 1;
  
  content = content.slice(0, nextLineIndex) + '\n' + importStatement + '\n' + content.slice(nextLineIndex);
  
  fs.writeFileSync(componentPath, content);
}

// 메인 함수
function migrateComponent(componentName) {
  try {
    info(`마이그레이션 시작: ${componentName}`);
    
    // 컴포넌트 파일 경로
    const componentPath = path.join(__dirname, '..', 'src', 'components', componentName, `${componentName}.tsx`);
    
    if (!fs.existsSync(componentPath)) {
      error(`컴포넌트 파일을 찾을 수 없습니다: ${componentPath}`);
      return false;
    }
    
    // 파일 내용 읽기
    const content = fs.readFileSync(componentPath, 'utf8');
    
    // styled-components 찾기
    const styledComponents = findStyledComponents(content);
    
    if (styledComponents.length === 0) {
      warning(`styled-components를 찾을 수 없습니다: ${componentName}`);
      return false;
    }
    
    info(`발견된 styled-components: ${styledComponents.length}개`);
    styledComponents.forEach(comp => {
      info(`  - ${comp.name} (${comp.element})`);
    });
    
    // 스타일 파일 생성
    const styleFilePath = createStyleFile(componentName, styledComponents);
    success(`스타일 파일 생성: ${styleFilePath}`);
    
    // 컴포넌트 파일 수정
    updateComponentFile(componentPath, componentName, styledComponents);
    success(`컴포넌트 파일 수정: ${componentPath}`);
    
    info(`마이그레이션 완료: ${componentName}`);
    info(`다음 단계:`);
    info(`1. ${styleFilePath} 파일에서 스타일 코드를 추가하세요`);
    info(`2. TypeScript 컴파일 에러를 확인하세요`);
    info(`3. 스타일이 정상적으로 적용되는지 확인하세요`);
    
    return true;
    
  } catch (err) {
    error(`마이그레이션 실패: ${err.message}`);
    return false;
  }
}

// CLI 실행
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    log('스타일 분리 마이그레이션 스크립트', 'bright');
    log('');
    log('사용법:', 'cyan');
    log('  node scripts/migrate-styles.js [컴포넌트명]', 'yellow');
    log('');
    log('예시:', 'cyan');
    log('  node scripts/migrate-styles.js StatsSection', 'yellow');
    log('  node scripts/migrate-styles.js VisaDetailPage', 'yellow');
    log('');
    log('참고:', 'cyan');
    log('  - 컴포넌트는 src/components/[컴포넌트명]/[컴포넌트명].tsx 경로에 있어야 합니다', 'reset');
    log('  - 스타일 파일은 src/styles/components/[컴포넌트명].styles.ts에 생성됩니다', 'reset');
    return;
  }
  
  const componentName = args[0];
  
  if (!componentName) {
    error('컴포넌트명을 입력해주세요');
    return;
  }
  
  migrateComponent(componentName);
}

// 스크립트 실행
if (require.main === module) {
  main();
}

module.exports = { migrateComponent };
