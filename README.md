# apollo-react-timing-repro

## Reproduction steps
 - Install packages
 - `yarn test`

## Expected outcome
Error is persisted, and both tests pass

## Actual outcome
A subsequent rerender causes the error prop to be removed - with one test consistently failing, and the other intermittently failing.

Note: this repository is using `react@16.9.0-rc.0` for `async act(...)` - however the issue exists in `react@16.8.6` also.