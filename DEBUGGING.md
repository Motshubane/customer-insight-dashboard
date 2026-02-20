 Debugging Guide

## Installation Issues

- Node version mismatch → Use Node 18+  
- Dependency conflicts → `npm install --legacy-peer-deps`

## TypeScript Errors

- Path alias misconfig → Update `tsconfig.json` and `vite.config.ts`  
- Type-only imports needed → `import type { FilterRiskLevel } from '@/shared/types'`

## Vite Issues

- Port in use → Change `server.port` or kill process  
- HMR not connecting → Clear `.vite` cache

## Runtime / UI Issues

- Blank screens → Check `index.html` root element, main.tsx, CSS imports  
- Charts not rendering → Ensure container has width/height  
- useFilters errors → Wrap with `<FilterProvider>`

## Test Failures

- Missing providers → Wrap with `<BrowserRouter>` & `<FilterProvider>` in test  
- Async operations → Use `waitFor` in tests

## Performance Debugging

- Detect unnecessary re-renders → `why-did-you-render`  
- Check bundle size → `npx source-map-explorer dist/assets/*.js`

## Recovery Steps

```bash
rm -rf node_modules package-lock.json .vite
npm install
npm run dev