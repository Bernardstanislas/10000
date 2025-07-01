# Changelog

## [Unreleased] - 2025-07-01

### Changed
- **BREAKING**: Migrated from Bun to npm as package manager
  - Removed `bun.lockb`, replaced with `package-lock.json`
  - Updated all documentation to use npm commands instead of Bun
  - Removed `@types/bun` dependency as it's no longer needed
  - Updated `predeploy` script to use `npm run build:css` instead of `bun run build:css`

### Migration Notes
- **Runtime**: No impact - application still runs on Cloudflare Workers
- **Development**: All existing workflows (`dev`, `test`, `deploy`) remain the same
- **Performance**: Slightly slower package installation, but no runtime impact
- **Dependencies**: All existing dependencies remain unchanged

### Files Modified
- `README.md`: Updated installation and command instructions
- `package.json`: Removed `@types/bun`, updated predeploy script
- Removed: `bun.lockb`
- Added: `package-lock.json`

### Rollback Instructions
If needed, rollback by:
1. `rm package-lock.json`
2. `bun install` (restores bun.lockb)
3. Revert changes to README.md and package.json